content_blog = document.querySelector('.content_blog');
form = document.getElementById('add-comment');

function render(doc) {
    let blog = document.createElement('div');
    blog.classList.add('blog');
    let name = document.createElement('h3');
    let comment = document.createElement('p');

    name.innerHTML = doc.data().name;
    comment.innerHTML = doc.data().comment;
    
    blog.appendChild(name);
    blog.appendChild(comment);

    content_blog.appendChild(blog);

    console.log("Rendered "+doc.id);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addData(form);
})