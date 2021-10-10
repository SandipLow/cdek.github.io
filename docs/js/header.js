title = document.getElementById('title');
search = document.getElementById('search');
menu = document.getElementById('menu');
menubar = document.getElementById('menubar');
logo = document.getElementById('logo');
header = document.getElementById("header");

tx = parseInt(window.getComputedStyle(title, null).getPropertyValue('left'));
sx = parseInt(window.getComputedStyle(search, null).getPropertyValue('left'));

if (tx-sx > -100) {
    title.style.display = "none";
}

function mb() {

    if (menubar.style.display != 'none') {
        menubar.style.display = 'none';
        menu.style.height = 66 + "%";
    }

    else {
        menubar.style.display = 'block';
        menu.style.height = 25 + "%";
    }

    // if (header.style.height == "fit-content") {
    //     header.style.height = 30 + "%";
    //     menubar.style.display = 'block';
    // } else {
    //     header.style.height = "fit-content";
    //     menubar.style.display = 'none';
    // }
}