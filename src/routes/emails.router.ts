import { Router } from "express";
import multer from 'multer';
import { createEmailWithAttachments, getAllEmailsUserRecievedWithFiles, getAllEmailsUserSentWithFiles, getEmailsWithAttachedFiles } from "../controllers/emailsWithAttachments.controller";
import userNameMiddleware from "../middlewares/userName.middleware";
import validateRequestMiddleware from "../middlewares/emailInput.middleware";

const emailsRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Define all the emails related routes.
emailsRouter.post("/add-email", upload.array('files'), validateRequestMiddleware, createEmailWithAttachments)
emailsRouter.get("/get-emails/sent/:user", userNameMiddleware, getAllEmailsUserSentWithFiles);
emailsRouter.get("/get-emails/received/:user", userNameMiddleware, getAllEmailsUserRecievedWithFiles);
emailsRouter.get("/get-emails/:user", userNameMiddleware, getEmailsWithAttachedFiles);

export default emailsRouter;