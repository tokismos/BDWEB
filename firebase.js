import { initializeApp } from "firebase/app";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDrHAl6QWafSMu9MFVbIj2Z2Fr5cr6Og",
  authDomain: "food-app-5c687.firebaseapp.com",
  databaseURL: "https://food-app-5c687-default-rtdb.firebaseio.com",
  projectId: "food-app-5c687",
  storageBucket: "food-app-5c687.appspot.com",
  messagingSenderId: "954088809444",
  appId: "1:954088809444:web:0714e4191f1876959a1df1",
};
console.log("firevbase initialid");
initializeApp(firebaseConfig);
const storage = getStorage();

const addImage = async (name, imageURL, set) => {
  const url = imageURL.split(",");
  const storageRef = ref(storage, `${name}.jpg`);
  //add the base64 to sotrage of firebase
  await uploadString(storageRef, url[1], "base64").then((snapshot) => {
    console.log("sbnnap", snapshot);
    console.log("Uploaded a base64 string!");
  });
  //get url of the image
  await getDownloadURL(storageRef).then((downloadURL) => {
    console.log("File available at", downloadURL);
    set(downloadURL);
  });
};

// Points to 'images'

// console.log("patttth", path);
// Get a list of cities from your database

export { addImage };
