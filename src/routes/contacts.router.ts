import { Router } from "express";
import { getAllContacts } from "../controllers/contacts.controller";

const contactRouter = Router();

contactRouter.get("/get-contacts", getAllContacts); 

export default contactRouter;