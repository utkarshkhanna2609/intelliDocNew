

import admin from 'firebase-admin'; // Path to your service account key JSON file
import dotenv from 'dotenv';
let firebaseApp;




dotenv.config();
const serviceAccount = {
  type: process.env.GC_TYPE,
  project_id: process.env.GC_PROJECT_ID,
  private_key_id: process.env.GC_PRIVATE_KEY_ID,
  private_key: process.env.GC_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GC_CLIENT_EMAIL,
  client_id: process.env.GC_CLIENT_ID,
  auth_uri: process.env.GC_AUTH_URI,
  token_uri: process.env.GC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GC_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GC_CLIENT_CERT_URL,
};




try {
  console.log("firebase-manager admin get app");
  firebaseApp = admin.app(); // Attempt to retrieve the default app instance
} catch (error) {
  console.log("firebase-manager admin get app--- app not avaliable so initialize it");

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://aaq-login-db-chat.firebaseio.com', // Replace with your Firebase project URL
    // to do - in url part the project url shal come from config file idelly fro env 
  });
}

export default firebaseApp;

