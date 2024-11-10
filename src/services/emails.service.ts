import PostgresDataSource from '../typeOrm/typeormConfig'
import { Email } from '../models/Email.model'
import { AttachedFiles } from '../models/AttachedFiles.model';

export const emailsRepository = PostgresDataSource.getRepository(Email);
export const attachedFileRepository = PostgresDataSource.getRepository(AttachedFiles);

// Function to fetch all the emails with the attached files from the DB.
export const getAllEmailsWithAttachments = async (user: string): Promise<Email[]> => {
  return await emailsRepository.find({
    where: [
      { sender: user },
      { receiver: user }
    ],
    order: { createdAt: 'DESC' },
    relations: ['attachedFile']
  });
};

// Function to fetch all the emails a specific user sent and their attached files from the DB.
export const getAllEmailsUserSent = async (user: string): Promise<Email[]> => {
  return await emailsRepository.find({
    where: [{ sender: user }],
    order: { createdAt: 'DESC' },
    relations: ['attachedFile'],
  });
};

// Function to fetch all the emails a specific user recived and their attached files from the DB.
export const getAllEmailsUserRecieved = async (user: string): Promise<Email[]> => {
  return await emailsRepository.find({
    where: [{ receiver: user }],
    order: { createdAt: 'DESC' },
    relations: ['attachedFile'],
  });
};

// Function to add a new email with attached files to the DB.
export const addNewEmailWithAttachments = async (sender: string, receiver: string, subject: string, body: string, files: Express.Multer.File[]) => {  
  const email = emailsRepository.create({
    sender,
    receiver,
    subject,
    body,
    createdAt: new Date(),
  });

  // Save the email to generate an ID
  await emailsRepository.save(email);
  
  
  if (files && files.length > 0) {
    const attachedFiles = files.map((file) => 
      attachedFileRepository.create({
        filename: file.originalname,
        fileContent: file.buffer,
        email,
      })
    );
    // Save all attached files
    await attachedFileRepository.save(attachedFiles);
    return email
  }
}
