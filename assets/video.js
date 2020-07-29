
const videoButton = document.querySelectorAll('.js-video')
const videoPopGroup = document.querySelectorAll('.video-pop-up-group')
const videoPopup = document.querySelectorAll('.pop-up-video')
const closePopup = document.querySelectorAll('.pop-up-close')



function displayVideoPopUp(event) {

    const button = event.currentTarget;
    const popupGroup = button.closest('.video-pop-up-group');
    const popup = popupGroup.getElementsByClassName('pop-up-video')[0]

    popup.classList.add('js-display')

};


videoButton.forEach( button => {
    button.addEventListener("click", displayVideoPopUp);
})




//CLOSE VIDEO

videoPopup.forEach( popup => {
   popup.addEventListener('click', function () {
       popup.classList.remove('js-display');
      let videoIframe = popup.getElementsByClassName('video-iframe')[0]

    //  console.log(videoIframe)

      var player = new Vimeo.Player(videoIframe);
      player.pause()

    })
})


// use close button
closePopup.forEach( close => {
    close.addEventListener('click', function () {
        videoPopup.forEach( popup => {
            popup.classList.remove('js-display');

            let videoIframe = popup.getElementsByClassName('video-iframe')[0]

        //    console.log(videoIframe)

            var player = new Vimeo.Player(videoIframe);
            player.pause()
      
        })
     })
 })