form = document.getElementById('contact-request-form')

//db initialize
firebase.initializeApp({
    apiKey: "AIzaSyAn3eeoZ52fCepqUmgc2X7UOGFlMT8w7CI",
    authDomain: "cdek-8927886351.firebaseapp.com",
    projectId: "cdek-8927886351",
});

var db = firebase.firestore();

function addData(form) {
    db.collection("contact requests").add({
        name: form.name.value,
        email: form.email.value,
        message: form.subject.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        location.reload();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

//Create Request
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addData(form);
})