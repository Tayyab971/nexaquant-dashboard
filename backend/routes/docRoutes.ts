import express from "express";
import userAuth from "../middlewere/userAuth.js";
import {
  CreateDoc,
  DeleteDoc,
  UpdateDoc,
} from "../controllers/docController.js";

const DocumentRouter = express.Router();

DocumentRouter.post("/createdoc", userAuth, CreateDoc);
DocumentRouter.put("/update/:id", userAuth, UpdateDoc);
DocumentRouter.delete("/delete/:id", userAuth, DeleteDoc);
export default DocumentRouter;
