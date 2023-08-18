import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL,deleteObject,listAll } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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
const storage = getStorage(app)

let upload = document.getElementById('upload');
const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        )
    })
}
upload.addEventListener('mouseover', async () => {
    try {
        let file = document.getElementById('file')
        const res = await uploadFile(file.files[0])
        console.log("res--->", res);
        let img = document.getElementById('img')
        img.src = res;
    } catch (err) {
        console.log(err);
    }
})

let deletebtn = document.getElementById('delete')
deletebtn.addEventListener('click', async () => {
    try {
        const imagesFolderRef = ref(storage, 'images/');
        const filesList = await listAll(imagesFolderRef);

        await Promise.all(filesList.items.map(async (file) => {
            await deleteObject(file);
            console.log(`File ${file.name} deleted successfully.`);
            location.reload()
        }));
    } catch (error) {
        console.log("Error deleting files:", error);
    }
});
