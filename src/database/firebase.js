import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
  update,
} from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Setup
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_databaseURL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Fetch users list
let userList = [];
const refUsersList = ref(db, "users");
onValue(refUsersList, (snapshot) => {
  let data;
  try {
    data = Object.values(snapshot.val());
  } catch (error) {
    data = snapshot.val();
  }
  userList = data ?? [];
});

// Get & store user detail
let userID = "";
const getUserDetail = (uid = false) => {
  if (uid) userID = uid;
  return userList.filter((item) => item.id == userID)[0] ?? [];
};

export { getUserDetail };
