import PostgresDataSource from '../typeOrm/typeormConfig'
import { Contacts } from '../models/Contacts.model';

export const contactsRepository = PostgresDataSource.getRepository(Contacts);

// Service to fetch all the contacts and their details from the DB using typeOrm.
export const getContacts = async (): Promise<Contacts[]> => {
  return await contactsRepository.find({
    order: { createdAt: 'DESC' },
  });
};