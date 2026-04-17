import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";

// Use process.cwd() for persistent file storage paths
const DATA_FILE = path.join(process.cwd(), "projects-db.json");
const CONFIG_FILE = path.join(process.cwd(), "site-config.json");
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Ensure directories and files exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const INITIAL_CONFIG = {
  greeting: "Hello, I'm Alex",
  role: "Creative Developer & Video Editor",
  introTitle: "A bit about me",
  introBody: "I merge the technical logic of code with the emotional resonance of visual storytelling. Based in Shanghai, working globally.",
  portraitUrl: "/portrait.jpg",
  email: "wbsept1@qq.com"
};

const INITIAL_DATA = [
  {
    id: '1',
    title: 'Integrated Media Showcase',
    description: 'A comprehensive project demonstrating support for video, code snippets, GitHub repositories, and document distribution.',
    fullDescription: 'This entry showcases the versatility of the updated portfolio system. It now seamlessly integrates embedded YouTube videos for visual demonstrations, high-performance code blocks for technical exposition, and direct links to external resources like GitHub or PDF documentation.',
    thumbnail: 'https://picsum.photos/seed/multimedia/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    githubUrl: 'https://github.com/wb20030901',
    docUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    codeSnippet: `// Example: Custom Scramble Animation Logic
const startScramble = (text: string) => {
  let iteration = 0;
  const interval = setInterval(() => {
    setDisplayText(
      text.split("").map((char, index) => {
        if (index < iteration) return text[index];
        return CHARS[Math.floor(Math.random() * 62)];
      }).join("")
    );
    if (iteration >= text.length) clearInterval(interval);
    iteration += 1/3;
  }, 30);
};`,
    tag: 'DYNAMIC',
    company: 'Vibecoding',
    year: '2026',
    category: 'Development',
    role: 'Full Stack Engineer'
  }
];

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2));
}

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(INITIAL_CONFIG, null, 2));
}

// Multer Config for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  
  // Serve uploads folder as static
  app.use("/uploads", express.static(UPLOADS_DIR));

  // API Routes
  app.get("/api/config", (req, res) => {
    try {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read config" });
    }
  });

  app.post("/api/config", (req, res) => {
    const isAdmin = req.headers['x-admin-mode'] === 'true';
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized" });

    try {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save config" });
    }
  });

  app.get("/api/projects", (req, res) => {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read projects" });
    }
  });

  app.post("/api/projects", (req, res) => {
    const isAdmin = req.headers['x-admin-mode'] === 'true';
    if (!isAdmin) {
      return res.status(403).json({ error: "Unauthorized. Admin mode required." });
    }

    try {
      const newProject = req.body;
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      const updatedData = [newProject, ...data];
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: "Failed to save project" });
    }
  });

  // Upload Endpoint
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Vite middleware
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
