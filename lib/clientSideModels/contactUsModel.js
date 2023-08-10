import { v4 as uuidv4 } from 'uuid';
import { validate } from 'jsonschema';
import contactUsSchema from '../clientSideSchemas/contactus-test-schema';
//import createError, { ERROR_CODES } from '../common/customError'; // Update this line
import { createError, ERROR_CODES } from '../common/customError';

import * as firebaseManager  from "../firebase-manager"
//import { getSenderId } from '../common/utility'; // Assuming you have a utility function to get the current user's ID

const createContactUs = (senderID,data) => {
  const messageID = uuidv4();
  const createdAt = new Date().toISOString();
  const senderId = senderID; // Assuming you have a function to get the current user's ID

  return {
    messageID,
    createdAt,
    senderId,
    ...data,
  };
};

const ContactUsModel = {
  async createContactUs(senderID,data) {
    // Validate the data against the schema
    const validationResult = validate(data, contactUsSchema);
    if (!validationResult.valid) {
      throw createError(
        ERROR_CODES.INVALID_DATA,
        'Invalid data provided',
        { errors: validationResult.errors },
        'low'
      );
    }

    const contactUsData = createContactUs(senderID,data);

    try {
      // Create the document in the "contactus-test" collection
      const docRef = await firebaseManager.addOrCreateDocument('contactus-test', contactUsData);

      // Return the ID of the created document
      return docRef.id;
    } catch (error) {
      throw createError(
        ERROR_CODES.FIREBASE_WRITE_FAILED,
        'Error creating contact us document',
        error,
        'high'
      );
    }
  },
};

export default ContactUsModel;
