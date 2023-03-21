import dotenv from "dotenv";
import path from "path";
import xss from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import express, { Request, Response } from "express";
import { config } from "./config/securityOptions";
import { getDevState } from "./utils/getDevState";
import { router } from "./router";
import { initDatabase } from "./database";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const rateLimitConfig = {
  max: config.rateLimit.maxRequests,
  windowMs: config.rateLimit.windowMS,
  message: config.rateLimit.message,
};

app.use(xss()); //prevent cross site scripting XSS
app.use(helmet()); //use unique header for http requests
app.use(cors());
app.use(express.json({ limit: config.jsonLimit }));

//RATE LIMITS
app.use("/api", rateLimit({ ...rateLimitConfig }));

//ROUTES
app.use("/api", router);

//DB CONNECTION
initDatabase();

//HANDLER ALL REQUESTS
app.get("*", (req: Request, res: Response) => {
  if (getDevState()) {
    res.send("We are working in dev mode.");
  } else {
    res.sendFile(path.resolve(__dirname, "Public", "build", "index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
