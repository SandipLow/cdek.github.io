firebase.initializeApp({
    apiKey: "AIzaSyAn3eeoZ52fCepqUmgc2X7UOGFlMT8w7CI",
    authDomain: "cdek-8927886351.firebaseapp.com",
    projectId: "cdek-8927886351",
});

var db = firebase.firestore();

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        render(doc);
    });
});

function addData(form) {
    db.collection("users").add({
        name: form.name.value,
        comment: form.comment.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        location.reload();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}