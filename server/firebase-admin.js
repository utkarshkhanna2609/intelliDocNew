

import admin from 'firebase-admin';
import serviceAccount from '../firebaseServiceAccount.json'; // Path to your service account key JSON file

let firebaseApp;

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

