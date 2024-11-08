import { Request, Response } from 'express';
import { getContacts } from '../services/contacts.service'

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    console.log("i get contacts")
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