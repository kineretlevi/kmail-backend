import PostgresDataSource from '../typeOrm/typeormConfig'
import { Email } from '../models/Email.model'
import { AttachedFiles } from '../models/AttachedFiles.model';

export const emailsRepository = PostgresDataSource.getRepository(Email);
export const attachedFileRepository = PostgresDataSource.getRepository(AttachedFiles);

// Function to fetch all the contacts and their details from the DB.
export const getAllEmailsWithAttachments = async (): Promise<Email[]> => {
  return await emailsRepository.find({
    relations: ['attachedFile']
  });
};

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
  // Add each file as an attachment
  if (files && files.length > 0) {
    const attachedFiles = files.map((file) => 
      attachedFileRepository.create({
        filename: file.originalname,
        fileContent: file.buffer,
        email, // Associate this file with the email
      })
    );
    // Save all attached files
    await attachedFileRepository.save(attachedFiles);
    return email
  }
}
