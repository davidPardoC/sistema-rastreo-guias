const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({ email: data.email, password: data.password })
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: data.admin });
    }).then(()=>{
        return {message: 'Success'}
    }).catch((e)=>{
        return e
    });
});
