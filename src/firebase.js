import Firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCzyOq6RSgoXZp5cjQy-L0veoYEcAbwC7I",
    authDomain: "test-app-lightit.firebaseapp.com",
    databaseURL: "https://test-app-lightit.firebaseio.com",
    projectId: "test-app-lightit",
    storageBucket: "test-app-lightit.appspot.com",
    messagingSenderId: "352051341056"
};

const firebase = Firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();


export { auth, database, storage }
export default firebase
