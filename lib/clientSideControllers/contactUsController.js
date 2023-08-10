import ContactUsModel from '../clientSideModels/contactUsModel';
//import createError, { ERROR_CODES } from '../common/customError'; // Update this line

 import { createError, ERROR_CODES } from '../common/customError';
 import * as firebaseManager  from "../firebase-manager"

const contactUsController = {
  async getAllContactQueries() {
    try {
      // Get all documents from the "contactus-test" collection
      console.log(" Contact us controller --Get all documents from the contactus-test" );
      const documents = await firebaseManager.getAllDocuments('contactus-test');

      // Return the documents
      return documents;
    } catch (error) {
      throw createError(
        ERROR_CODES.FIREBASE_READ_FAILED,
        'Error getting contact queries',
        error,
        'high'
      );
    }
  },

  async getContact(messageID) {
    try {
      // Get the document with the given messageID from the "contactus-test" collection
      const document = await firebaseManager.getDocument('contactus-test', messageID);

      // If document not found, throw an error
      if (!document) {
        throw createError(
          ERROR_CODES.FIREBASE_READ_FAILED,
          'Contact not found',
          { messageID },
          'low'
        );
      }

      // Return the document
      return document;
    } catch (error) {
      throw createError(
        ERROR_CODES.FIREBASE_READ_FAILED,
        'Error getting contact',
        error,
        'high'
      );
    }
  },

  async addCreateContactUs(senderID, data) {
    try {
      // Create the contact us document
      console.log(" in addcreatecontactus ", senderID, data);
      const documentId = await ContactUsModel.createContactUs(senderID,data);

      // Perform any additional logic, such as sending notifications, if needed

      // Return the ID of the created document
      return documentId;
    } catch (error) {
      console.log(" in addcreatecontactus error ", error);

      throw createError(
        ERROR_CODES.FIREBASE_WRITE_FAILED,
        'Error adding contact us',
        error,
        'high'
      );
    }
  },

  async deleteContactUs(messageID) {
    try {
      // Delete the document with the given messageID from the "contactus-test" collection
      const success = await firebaseManager.deleteDocument('contactus-test', messageID);

      // If deletion failed, throw an error
      if (!success) {
        throw createError(
          ERROR_CODES.FIREBASE_WRITE_FAILED,
          'Error deleting contact',
          { messageID },
          'low'
        );
      }

      // Return success
      return success;
    } catch (error) {
      throw createError(
        ERROR_CODES.FIREBASE_WRITE_FAILED,
        'Error deleting contact',
        error,
        'high'
      );
    }
  },
  async updateContactUs(messageID, newData) {
    try {
      // Update the document with the given messageID in the "contactus-test" collection
      const success = await firebaseManager.updateDocument('contactus-test', messageID, newData);

      // If update failed, throw an error
      if (!success) {
        throw createError(
          ERROR_CODES.FIREBASE_WRITE_FAILED,
          'Error updating contact',
          { messageID },
          'low'
        );
      }

      // Return success
      return success;
    } catch (error) {
      throw createError(
        ERROR_CODES.FIREBASE_WRITE_FAILED,
        'Error updating contact',
        error,
        'high'
      );
    }
  },
};



export default contactUsController;
