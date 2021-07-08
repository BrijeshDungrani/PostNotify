const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const database = admin.database();
const rootRef = database.ref("User");
/* eslint-disable eol-last */
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*  exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
}); */
exports.makeLppercase = functions.database.ref("/messages/{pushId}/original")
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      functions.logger.log("Uppercasing", context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // writing to the Firebase Realtime Database.
      return snapshot.ref.parent.child("upper").set(uppercase);
    });

exports.newNodeDetected = functions.database.ref("User/{userId}/Notify")
    .onWrite((change, context) => {
      const newval = change.after.val();
      if (newval) {
        rootRef.on("value", (snapshot) => {
          const emailadd = snapshot.child("U1/email").val();
          return database.ref("metadata/lc/").set(emailadd);
        });
      }
    });