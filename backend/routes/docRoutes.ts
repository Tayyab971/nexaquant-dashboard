import express from "express";
import userAuth from "../middlewere/userAuth.js";
import {
  CreateDoc,
  DeleteDoc,
  generateDocSummary,
  getUserDocuments,
  UpdateDoc,
} from "../controllers/docController.js";

const DocumentRouter = express.Router();

DocumentRouter.post("/create", userAuth, CreateDoc);
DocumentRouter.put("/update/:id", userAuth, UpdateDoc);
DocumentRouter.delete("/delete/:id", userAuth, DeleteDoc);
DocumentRouter.get("/docs", userAuth, getUserDocuments);
DocumentRouter.patch("/generate-summary/:id", userAuth, generateDocSummary)
export default DocumentRouter;
