const form = document.getElementById('contact-request-form')

function addData(form) {
    fetch("https://api.sandiplow.me/contact/message", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            message: form.subject.value
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert("Thanks for contacting...😉")
        form.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error adding document...😢");
    });
}

//Create Request
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addData(form);
})