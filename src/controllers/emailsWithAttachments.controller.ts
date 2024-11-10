import { Request, Response } from 'express';
import { addNewEmailWithAttachments, getAllEmailsUserRecieved, getAllEmailsUserSent, getAllEmailsWithAttachments } from '../services/emails.service';

export const getEmailsWithAttachedFiles = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const emailWithFiles = await getAllEmailsWithAttachments(user); 
    if (emailWithFiles) {
      res.json(emailWithFiles);
    } else {
      res.status(404).json({ message: "Error emails not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails with attached files"});
  }
};

export const getAllEmailsUserSentWithFiles = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const emailUserSentWithFiles = await getAllEmailsUserSent(user); 
    if (emailUserSentWithFiles) {      
      res.json(emailUserSentWithFiles);
    } else {
      res.status(404).json({ message: "Error emails user sent was not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails the user sent with attached files"});
  }
};

export const getAllEmailsUserRecievedWithFiles = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const emailUserRecievedWithFiles = await getAllEmailsUserRecieved(user); 
    if (emailUserRecievedWithFiles) {
      res.json(emailUserRecievedWithFiles);
    } else {
      res.status(404).json({ message: "Error emails user recieved was not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails the user recieved with attached files"});
  }
};

export const createEmailWithAttachments = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const {sender, receiver, subject, body} = req.body;

    const email = await addNewEmailWithAttachments(sender, receiver, subject, body, files)
    res.status(201).json({ message: 'Email created with attachments', email });
    } catch (error) {
      res.status(500).json({ message: 'Error creating email with attachments' });
    }
}