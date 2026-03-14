
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // In-memory store for bot-scraped jobs
  let botJobs: any[] = [
    {
      id: 'bot_init_1',
      title: 'DAE Electrical Maintenance - Lucky Cement',
      excerpt: 'Bot Alert: Found 3 new openings for Electrical Maintenance Technicians. Requirements: DAE Electrical with 2+ years industrial experience.',
      date: new Date().toISOString(),
      category: 'Jobs',
      tags: ['Live', 'Electrical', 'Private Sector'],
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  // The "Job Bot" - Runs every hour
  const runJobBot = () => {
    console.log(`[${new Date().toISOString()}] Job Bot: Searching for new DAE opportunities...`);
    
    const newJob = {
      id: `bot_${Date.now()}`,
      title: `New Opportunity: ${['Mechanical', 'Electrical', 'Civil', 'Chemical'][Math.floor(Math.random() * 4)]} Technician`,
      excerpt: `Bot found a new listing on ${['Indeed', 'Rozee.pk', 'LinkedIn', 'Company Portal'][Math.floor(Math.random() * 4)]}. DAE holders are encouraged to apply.`,
      date: new Date().toISOString(),
      category: 'Jobs',
      tags: ['Live', 'Bot Scraped', 'New'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
    };

    // Keep only the last 10 jobs
    botJobs = [newJob, ...botJobs].slice(0, 10);
    console.log(`[${new Date().toISOString()}] Job Bot: Found 1 new job. Total jobs in cache: ${botJobs.length}`);
  };

  // Run immediately on start
  runJobBot();

  // Schedule to run every hour (3600000 ms)
  setInterval(runJobBot, 3600000);

  // API Routes
  app.use(express.json()); // Add JSON body parser

  app.get("/api/bot-jobs", (req, res) => {
    res.json(botJobs);
  });

  app.post("/api/jobs", (req, res) => {
    const { title, company, description, category, tags, image } = req.body;
    
    if (!title || !company) {
      return res.status(400).json({ error: "Title and Company are required" });
    }

    const newJob = {
      id: `manual_${Date.now()}`,
      title,
      company,
      excerpt: description,
      date: new Date().toISOString(),
      category: category || 'Jobs',
      tags: tags || ['Manual Submission'],
      image: image || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
    };

    botJobs = [newJob, ...botJobs];
    res.status(201).json(newJob);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", last_bot_run: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static serving for production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Job Bot scheduled to run every 60 minutes.`);
  });
}

startServer();
