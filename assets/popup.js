function modal () {
    // grab the Content in Modal

const modalContent = document.querySelector('.preorder-description')

const title = modalContent.querySelector('.font-bolder').textContent
const desc = modalContent.querySelector('.small-p').textContent


// Get the modal
const modal = document.getElementById('myModal');


// if we have modal activated
if (modalContent) {
    


    let modalTitle = document.querySelector('.modal_title')
    let modalDesc = document.querySelector('.modal-desc')

    modalTitle.textContent = title
    modalDesc.textContent = title

    // Get the <span> element that closes the modal
    const close = document.querySelector('.close-group')

    // When the user clicks on <span> (x), close the modal
    function hide() {
        modal.style.display = "none";
    }

    function show() {
        modal.style.display = "block";
    }

    const button = document.getElementById('add-to-cart-button')
    button.addEventListener('click', show )


    close.addEventListener('click', hide)

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {

        hide()

    }
}
}





function delay() {
    setTimeout(function() {
        modal();
    }, 200);
}

if (document.readyState == 'complete') {
    delay();
} else {
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            delay();
        }
    }
}