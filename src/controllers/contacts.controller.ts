import { Request, Response } from 'express';
import { getContacts } from '../services/contacts.service'

// Controller of fetching the contacts
export const getAllContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await getContacts(); 
    if (contacts) {
      res.json(contacts);
    } else {
      res.status(404).json({ message: "Error contacts not found"});
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts"});
  }
};