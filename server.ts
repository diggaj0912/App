import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // In-memory database (for now)
  let users: any[] = [];
  let events: any[] = [];

  // ------------------ SIGNUP ------------------
  app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    users.push({ email, password });
    res.json({ message: "User created successfully" });
  });

  // ------------------ LOGIN ------------------
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", user });
  });

  // ------------------ CREATE EVENT ------------------
  app.post("/create-event", (req, res) => {
    const { title, owner } = req.body;

    const event = {
      id: Date.now(),
      title,
      owner,
    };

    events.push(event);

    res.json({ message: "Event created", event });
  });

  // ------------------ GET USER EVENTS ------------------
  app.get("/events/:email", (req, res) => {
    const userEvents = events.filter(
      e => e.owner === req.params.email
    );

    res.json(userEvents);
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
  // IMPORTANT: Must use port 3000 in this environment
  const PORT = 3000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
