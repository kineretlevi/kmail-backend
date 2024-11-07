import { Request, Response } from 'express';
import { addNewEmailWithAttachments, getAllEmailsWithAttachments } from '../services/emails.service';

export const getEmailsWithAttachedFiles = async (req: Request, res: Response) => {
  try {
    const emailWithFiles = await getAllEmailsWithAttachments(); 
    if (emailWithFiles) {
      res.json(emailWithFiles);
    } else {
      res.status(404).json({ message: "Error emails not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails with attached files"});
  }
};

export const createEmailWithAttachments = async (req: Request, res: Response) => {
  try {
    const {sender, receiver, subject, body} = req.body;
    const files = req.files as Express.Multer.File[]

    const email = await addNewEmailWithAttachments(sender, receiver, subject, body, files)
    res.status(201).json({ message: 'Email created with attachments', email });
    } catch (error) {
      res.status(500).json({ message: 'Error creating email with attachments' });
    }
}