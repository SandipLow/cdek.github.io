form = document.getElementById('contact-request-form')

//db initialize
firebase.initializeApp({
    apiKey: "AIzaSyAn3eeoZ52fCepqUmgc2X7UOGFlMT8w7CI",
    authDomain: "cdek-8927886351.firebaseapp.com",
    projectId: "cdek-8927886351",
});

var db = firebase.firestore();

function addData(form) {
    db.collection("contact_request").add({
        name: form.name.value,
        email: form.email.value,
        message: form.subject.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        prompt("Thanks for contacting... ; )")
    })
    .catch((error) => {
        alert("Error adding document: ", error);
        console.log("Error adding document: ", error);
    });
}

//Create Request
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addData(form);
})