import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    /* 
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    PhoneAuthProvider.PROVIDER_ID
    */
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
      customParameters: {
        // Forces password re-entry.
        auth_type: "reauthenticate",
      },
    },
    // PhoneAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "/terms-of-service",
  // Privacy policy url.
  privacyPolicyUrl: "/privacy-policy",
};
