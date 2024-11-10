import { Router } from "express";
import { getAllContacts } from "../controllers/contacts.controller";

const contactRouter = Router();

// Defint the get contacts route
contactRouter.get("/get-contacts", getAllContacts); 

export default contactRouter;