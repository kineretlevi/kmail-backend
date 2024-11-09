import { Router } from "express";
import multer from 'multer';
import { createEmailWithAttachments, getAllEmailsUserRecievedWithFiles, getAllEmailsUserSentWithFiles, getEmailsWithAttachedFiles } from "../controllers/emailsWithAttachments.controller";

const emailsRouter = Router();
const upload = multer(); // Set up multer for handling file uploads


emailsRouter.post("/add-email", upload.array('files'), createEmailWithAttachments)
emailsRouter.get("/get-emails/sent/:user", getAllEmailsUserSentWithFiles);
emailsRouter.get("/get-emails/received/:user", getAllEmailsUserRecievedWithFiles);
emailsRouter.get("/get-emails/:user", getEmailsWithAttachedFiles);




export default emailsRouter;