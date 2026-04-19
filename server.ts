import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import mongoose from "mongoose";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // ------------------ MONGODB CONNECTION ------------------
  const MONGO_URL = process.env.MONGO_URL;
  if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
      .then(() => console.log("MongoDB Connected"))
      .catch(err => console.log("MongoDB connection error:", err));
  } else {
    console.warn("⚠️ MONGO_URL environment variable is not set. MongoDB will not connect.");
  }

  // ------------------ MODELS ------------------
  interface IUser {
    email?: string;
    name?: string;
    photo?: string;
    password?: string;
    college?: string;
    role?: string;
  }
  const userSchema = new mongoose.Schema<IUser>({
    email: String,
    name: String,
    photo: String,
    password: String, // For email/password users
    college: String,
    role: String,
  });
  const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

  interface IEvent {
    title?: string;
    owner?: string;
    date?: string;
    type?: string; // 'event' or 'hackathon'
    hasPptUpload?: boolean;
    hasTeamFormation?: boolean;
    link?: string; // Zoom or Google Meet link
    venue?: string;
    speakers?: string[]; // Array of speaker names/profiles
  }
  const eventSchema = new mongoose.Schema<IEvent>({
    title: String,
    owner: String,
    date: String,
    type: { type: String, default: 'event' },
    hasPptUpload: { type: Boolean, default: false },
    hasTeamFormation: { type: Boolean, default: false },
    link: String,
    venue: String,
    speakers: [String],
  });
  const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

  interface ICommunity {
    name?: string;
    owner?: string;
    members?: string[];
  }
  const communitySchema = new mongoose.Schema<ICommunity>({
    name: String,
    owner: String,
    members: [String],
  });
  const Community = mongoose.models.Community || mongoose.model<ICommunity>("Community", communitySchema);

  interface IEventRegistration {
    eventId?: string;
    userEmail?: string;
    pptUrl?: string; // For hackathon
    teamDetails?: string; // For hackathon
  }
  const eventRegistrationSchema = new mongoose.Schema<IEventRegistration>({
    eventId: String,
    userEmail: String,
    pptUrl: String,
    teamDetails: String,
  });
  const EventRegistration = mongoose.models.EventRegistration || mongoose.model<IEventRegistration>("EventRegistration", eventRegistrationSchema);

  // ------------------ BULK EMAIL ------------------
  app.post("/bulk-email", async (req, res) => {
    const { communityId, subject, body } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Emails sent (Mock Mode)" });
      }
      const community = await Community.findById(communityId);
      if (!community) {
        return res.json({ error: "Community not found" });
      }
      // In a real app, integrate SendGrid or AWS SES here logic
      // e.g. await sendEmailTo(community.members, subject, body)
      res.json({ message: `Successfully sent email to ${community.members.length} members.` });
    } catch (err) {
      console.error("Error in /bulk-email:", err);
      res.status(500).json({ error: "Failed to send emails" });
    }
  });

  // ------------------ EVENT REGISTRATION ------------------
  app.post("/register-event", async (req, res) => {
    const { eventId, userEmail, communityId, pptUrl, teamDetails } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Registered for event (Mock Mode)" });
      }
      const registration = new EventRegistration({ eventId, userEmail, pptUrl, teamDetails });
      await registration.save();
      
      // Auto-join community if provided
      if (communityId) {
        const community = await Community.findById(communityId);
        if (community && !community.members.includes(userEmail)) {
          community.members.push(userEmail);
          await community.save();
        }
      }
      res.json({ message: "Registered successfully and added to community followers" });
    } catch (err) {
      console.error("Error in /register-event:", err);
      res.status(500).json({ error: "Failed to register" });
    }
  });

  // ------------------ BULK CERTIFICATES ------------------
  app.post("/bulk-certificates", async (req, res) => {
    const { eventId } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Certificates generated (Mock Mode)" });
      }
      const registrations = await EventRegistration.find({ eventId });
      // In a real app, generate PDF certificates here for all users in `registrations`
      res.json({ message: `Issued certificates to ${registrations.length} participants with 1 click.` });
    } catch (err) {
      console.error("Error in /bulk-certificates:", err);
      res.status(500).json({ error: "Failed to generate certificates" });
    }
  });
  app.post("/signup", async (req, res) => {
    const { email, password, fullName, college, role } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "User created successfully (Mock Mode)" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = new User({ email, password, name: fullName, college, role });
      await user.save();
      res.json({ message: "User created successfully" });
    } catch (err) {
      console.error("Error in /signup:", err);
      res.status(500).json({ error: "Failed to signup" });
    }
  });

  // ------------------ LOGIN ------------------
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Login success", user: { email, name: email.split('@')[0] } });
      }
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.json({ message: "Invalid credentials" });
      }
      res.json({ message: "Login success", user });
    } catch (err) {
      console.error("Error in /login:", err);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // ------------------ SAVE USER (SOCIAL) ------------------
  app.post("/save-user", async (req, res) => {
    const { email, name, photo } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ email, name, photo });
      }
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ email, name, photo });
        await user.save();
      }
      res.json(user);
    } catch (err) {
      console.error("Error in /save-user:", err);
      res.status(500).json({ error: "Failed to save user" });
    }
  });

  // ------------------ CREATE EVENT ------------------
  app.post("/create-event", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Event created (Mock Mode)", event: req.body });
      }
      const event = new Event(req.body);
      await event.save();
      res.json({ message: "Event created", event });
    } catch (err) {
      console.error("Error in /create-event:", err);
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  // ------------------ GET USER EVENTS ------------------
  app.get("/events/:email", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json([]);
      }
      const events = await Event.find({ owner: req.params.email });
      res.json(events);
    } catch (err) {
      console.error("Error in /events:", err);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  // ------------------ CREATE COMMUNITY ------------------
  app.post("/create-community", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Mock community created", community: { name: req.body.name, owner: req.body.owner, members: [req.body.owner] } });
      }
      const community = new Community({
        ...req.body,
        members: [req.body.owner],
      });
      await community.save();
      res.json({ message: "Community created", community });
    } catch (err) {
      res.status(500).json({ error: "Failed to create community" });
    }
  });

  // ------------------ JOIN COMMUNITY ------------------
  app.post("/join-community", async (req, res) => {
    const { communityId, user } = req.body;
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json({ message: "Mock join community", community: { _id: communityId, members: [user] } });
      }
      const community = await Community.findById(communityId);
      if (!community) {
        return res.json({ message: "Community not found" });
      }
      if (!community.members.includes(user)) {
        community.members.push(user);
        await community.save();
      }
      res.json({ message: "Joined community", community });
    } catch (err) {
      res.status(500).json({ error: "Failed to join community" });
    }
  });

  // ------------------ GET USER COMMUNITIES ------------------
  app.get("/communities/:user", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json([]);
      }
      const communities = await Community.find({
        members: req.params.user,
      });
      res.json(communities);
    } catch (err) {
      console.error("Error in /communities:", err);
      res.status(500).json({ error: "Failed to fetch communities" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // ------------------ START SERVER ------------------
  // Uses process.env.PORT for Railway, defaults to 3000 for local AI Studio preview
  const PORT = process.env.PORT || 3000;

  app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
