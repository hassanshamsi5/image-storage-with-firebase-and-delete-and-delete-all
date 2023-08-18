import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyC2EgeScovr8gEXah9ES7Yxij5MySYLWzg",
    authDomain: "email-login-544c6.firebaseapp.com",
    databaseURL: "https://email-login-544c6-default-rtdb.firebaseio.com",
    projectId: "email-login-544c6",
    storageBucket: "email-login-544c6.appspot.com",
    messagingSenderId: "120073716628",
    appId: "1:120073716628:web:acefb9b63f07584ad7c581",
    measurementId: "G-SVP6CFCJYB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
