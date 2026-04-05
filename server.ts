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
  }
  const userSchema = new mongoose.Schema<IUser>({
    email: String,
    name: String,
    photo: String,
    password: String, // For email/password users
  });
  const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

  interface IEvent {
    title?: string;
    owner?: string;
    date?: string;
  }
  const eventSchema = new mongoose.Schema<IEvent>({
    title: String,
    owner: String,
    date: String,
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

  // ------------------ SIGNUP ------------------
  app.post("/signup", async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = new User({ email, password, name: fullName });
      await user.save();
      res.json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to signup" });
    }
  });

  // ------------------ LOGIN ------------------
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.json({ message: "Invalid credentials" });
      }
      res.json({ message: "Login success", user });
    } catch (err) {
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // ------------------ SAVE USER (SOCIAL) ------------------
  app.post("/save-user", async (req, res) => {
    const { email, name, photo } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ email, name, photo });
        await user.save();
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to save user" });
    }
  });

  // ------------------ CREATE EVENT ------------------
  app.post("/create-event", async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      res.json({ message: "Event created", event });
    } catch (err) {
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  // ------------------ GET USER EVENTS ------------------
  app.get("/events/:email", async (req, res) => {
    try {
      const events = await Event.find({ owner: req.params.email });
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  // ------------------ CREATE COMMUNITY ------------------
  app.post("/create-community", async (req, res) => {
    try {
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
      const communities = await Community.find({
        members: req.params.user,
      });
      res.json(communities);
    } catch (err) {
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
