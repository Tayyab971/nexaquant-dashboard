import { Request, Response } from "express";
import prisma from "../config/client.js";

interface DocumentRequest extends Request {
  userId?: string;
}
export const CreateDoc = async (
  req: DocumentRequest,
  res: Response
): Promise<any> => {
  const { title, description, tags, summary } = req.body;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User ID missing.",
    });
  }

  if (!title || !description || !tags || !Array.isArray(tags)) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and tags are required.",
    });
  }

  try {
    const newDoc = await prisma.document.create({
      data: {
        title,
        description,
        tags,
        summary,
        userId: req.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document created successfully.",
      data: newDoc,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create document.",
    });
  }
};

export const UpdateDoc = async (
  req: DocumentRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { title, description, tags, summary } = req.body;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Document ID is required",
    });
  }

  try {
    // Check if document exists and belongs to the user
    const existingDoc = await prisma.document.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    const updatedDoc = await prisma.document.update({
      where: { id },
      data: {
        title: title ?? existingDoc.title,
        description: description ?? existingDoc.description,
        tags: tags ?? existingDoc.tags,
        summary: summary ?? existingDoc.summary,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: updatedDoc,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Update failed",
    });
  }
};

export const DeleteDoc = async (
  req: DocumentRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Document ID is required",
    });
  }

  try {
    const existingDoc = await prisma.document.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Document not found or not authorized to delete",
      });
    }

    await prisma.document.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to delete document",
    });
  }
};


export const getUserDocuments = async (
  req: DocumentRequest,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const generateDocSummary = async (req: DocumentRequest, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const doc = await prisma.document.findUnique({
      where: { id },
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }


    //just for delaying the repsonse so it looks like its real.
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const predefinedSummaries = [
      "This document highlights key objectives and goals.",
      "Summary: " + doc.description?.split(" ").slice(0, 30).join(" ") + "...",
      "An overview of the main points and insights provided in the document.",
      "Core elements and intentions are distilled in this summary.",
      "Summarized version of the key ideas and concepts.",
      "Hello Nexa Quanta Ai.."
    ];


    const summary =
      predefinedSummaries[Math.floor(Math.random() * predefinedSummaries.length)];


    const updatedDoc = await prisma.document.update({
      where: { id },
      data: { summary },
    });

    return res.json({
      success: true,
      message: "Summary generated successfully",
      data: updatedDoc,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
} 