import { Router } from "express";
import multer from 'multer';
import { createEmailWithAttachments, getEmailsWithAttachedFiles } from "../controllers/emailsWithAttachments.controller";

const emailsRouter = Router();
const upload = multer(); // Set up multer for handling file uploads


emailsRouter.get("/get-emails", getEmailsWithAttachedFiles); 
emailsRouter.post("/add-email", upload.array('files'), createEmailWithAttachments)

export default emailsRouter;