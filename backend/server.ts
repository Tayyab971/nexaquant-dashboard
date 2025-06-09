import express, { Application, Request, Response } from "express";
import cors from "cors";
import AuthRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import DocumentRouter from "./routes/docRoutes.js";

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Nexa Quanta Server up and running.");
});

app.use("/api/auth", AuthRouter);
app.use("/api/document", DocumentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
