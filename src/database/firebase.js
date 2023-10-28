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
import {
  getStorage,
  deleteObject,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import moment from "moment";

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
const storage = getStorage(app);

// Check is complete initialize
let isInit = false;
const checkDoneInit = async () =>
  await new Promise((resolve) => {
    let timer = setInterval(() => {
      if (isInit) {
        clearInterval(timer);
        resolve();
      }
    }, 200);
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
  isInit = true;
});

// Fetch menu list
let menuList = [];
const refMenuList = ref(db, "menu");
onValue(refMenuList, (snapshot) => {
  let data;
  try {
    data = Object.values(snapshot.val());
  } catch (error) {
    data = snapshot.val();
  }
  menuList = data ?? [];
});

// Get & store user detail
let userID = "";
const getUserDetail = (uid = false) => {
  if (uid) userID = uid;
  return userList.filter((item) => item.id == userID)[0] ?? [];
};

// User Register Account
const userRegister = async (userID, email, phone, password, role) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(db, `users/${user.uid}`), {
        id: user.uid,
        userID: userID,
        email: email,
        phone: phone,
        role: role,
        credit: 0,
        status: "Pending",
      });
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      return false;
    });
};

// User Login Function
const userLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      let result = userList.filter((item) => item.id == user.uid)[0];
      getUserDetail(user.uid);
      return result;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      return false;
    });
};

// Reset user password
const userResetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      return false;
    });
};

// Update user status
const userUpdateStatus = async (userID, status) => {
  update(ref(db, `users/${userID}/`), { status });
};

// Update user credit
const userUpdateCredit = async (userID, credit) => {
  update(ref(db, `users/${userID}/`), { credit });
};

// Adding new menu
const onAddMenu = async (image, name, description, price) => {
  const menuID = push(ref(db, `menu/`), {}).key;
  const imageURL = await uploadImage(image, menuID);
  set(ref(db, `menu/${menuID}`), {
    id: menuID,
    name,
    description,
    price,
    imageURL,
  });
};

// Update menu
const onUpdateMenu = async (menuID, image, name, description, price) => {
  const imageURL = image.uri.includes("https")
    ? image.uri
    : await uploadImage(image, menuID);
  update(ref(db, `menu/${menuID}`), {
    name,
    description,
    price,
    imageURL,
  });
};

// Delete menu
const onDeleteMenu = async (menuID) => {
  remove(ref(db, `menu/${menuID}`));
  deleteObject(sRef(storage, `/menuImages/${menuID}`));
};

// Upload Image
const uploadImage = async (file, menuID) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", file.uri, true);
    xhr.send(null);
  });
  return await uploadBytes(sRef(storage, `/menuImages/${menuID}`), blob).then(
    (snapshot) =>
      getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL)
  );
};

// Push Notification
const onPushNotification = (userID, title, body) => {
  push(ref(db, `users/${userID}/msgList`), { title, body });
};

// Receive Notification
const onReceiveNotification = (userID) => {
  onValue(ref(db, `users/${userID}/msgList`), (snapshot) => {
    let data;
    try {
      data = Object.values(snapshot.val());
    } catch (error) {
      data = snapshot.val();
    }
    let msgList = data ?? [];

    if (msgList.length != 0) {
      msgList.map(
        async (item) =>
          await Notifications.scheduleNotificationAsync({
            content: {
              title: item.title,
              body: item.body,
            },
            trigger: null,
          })
      );
      remove(ref(db, `users/${userID}/msgList`));
    }
  });
};

// Update user cart
const onCartUpdate = (menuDetail, amount) => {
  set(ref(db, `users/${userID}/cart/${menuDetail.id}`), {
    id: menuDetail.id,
    name: menuDetail.name,
    price: menuDetail.price,
    amount,
  });
};

// Remove user cart
const onCartRemove = (menuID) => {
  remove(ref(db, `users/${userID}/cart/${menuID}`));
};

// Submit new cart
const onCartSubmit = (detail) => {
  let orderID = push(ref(db, `order`), {}).key;
  set(ref(db, `order/${orderID}`), {
    id: orderID,
    userID: detail.userID,
    amount: detail.amount,
    items: detail.items,
    status: "Pending",
    createdTime: moment().format("X"),
  });
  remove(ref(db, `users/${userID}/cart`));
  update(ref(db, `users/${userID}/`), {
    credit: detail.credit,
  });
};

export {
  onValue,
  ref,
  db,
  getUserDetail,
  checkDoneInit,
  userRegister,
  userLogin,
  userResetPassword,
  userUpdateStatus,
  userUpdateCredit,
  onAddMenu,
  onUpdateMenu,
  onDeleteMenu,
  onPushNotification,
  onReceiveNotification,
  onCartUpdate,
  onCartRemove,
  onCartSubmit,
  userList,
  menuList,
};
