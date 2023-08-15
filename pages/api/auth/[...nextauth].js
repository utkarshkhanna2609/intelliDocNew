import NextAuth from 'next-auth';
import { signIn } from 'next-auth/react'
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
//import { cert } from 'firebase-admin/app';

import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { getFirebaseConfig } from '../../../lib/firebase-config';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminApp from '../../../server/firebase-admin'; // Import your initialized Firebase Admin SDK app
const firebaseAuth = getAuth(firebaseAdminApp);

//import { signInWithCustomTokenFromNextAuth } from '../../../lib/firebase-manager'; // Import the signInWithCustomTokenFromNextAuth function


// to do 
//setup session option to set the session expiry time 
// setup and test jwt strategy 
// setup and try cookies options 
// check local storage options 
// connect with custom mongodb provider 

export const options = {
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge:  2 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 2 * 60, // 24 hours
    
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    /*
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    } 
    */
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    firebaseConfig: getFirebaseConfig(),
  }),

  callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
        //  console.log("next-auth callback--- signin ",user );
        //  console.log("next-auth callback--- account ",account );
        console.log("next-auth callback--- signin ");
          // to do add checks such as user is allowed or not 
          // or extend the user object
          return true
        },
        async redirect({ url, baseUrl }) {
          console.log("next-auth callback--- redirect ");

         // console.log("next-auth callback--- redirect ", url, baseUrl);

          return baseUrl
        },
        async session({ session, user, token }) {
                // Customize the session object and add custom claims
                session.user.id = user.id;
                session.user.role = user.role;
              //  console.log("session call back ",session, user, token );
                console.log("session call back ")


                // Generate a custom token with custom claims
                const customToken = await firebaseAuth.createCustomToken(user.id, {
                  role:"broadcaster"
                  //role: user.role,
                });

                session.accessToken = customToken;
             //   console.log("sesssion value after generating the custom token ",session, user, token )
                console.log("sesssion value after generating the custom token " )


                return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          console.log("next-auth callback--- jwt ", token );

          return token
        }
    }
};


  /*
  callbacks: {
    async signIn(user, account, profile) {
      console.log("Generate a custom token based on user's authentication", user);
      // Generate a custom token based on user's authentication
      const customToken = await generateCustomToken(user);

      // Sign in to Firebase using custom token
      await signInWithCustomTokenFromNextAuth(customToken);

      return true;
    },
  },
};*/

export default (req, res) => NextAuth(req, res, options);
