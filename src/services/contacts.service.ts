import PostgresDataSource from '../typeOrm/typeormConfig'
import { Contacts } from '../models/Contacts.model';

export const contactsRepository = PostgresDataSource.getRepository(Contacts);

// Function to fetch all the contacts and their details from the DB.
export const getContacts = async (): Promise<Contacts[]> => {
  return await contactsRepository.find();
};