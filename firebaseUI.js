import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  PhoneAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "./firebase";
import {
  doc,
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
      if (authResult.additionalUserInfo.isNewUser) {
        const user = authResult.user;
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          },
          {
            userImg: user.photoURL,
          },
          {
            timestamp: serverTimestamp(),
          }
        );
      }
      return false;
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      //scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: "select_account",
      },
    },
    {
      provider: FacebookAuthProvider.PROVIDER_ID,
      scopes: ["public_profile", "email"],
    },
    //PhoneAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "/terms-of-service",
  // Privacy policy url.
  privacyPolicyUrl: "/privacy-policy",
};
