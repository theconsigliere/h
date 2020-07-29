// INTERSECTION OBSERVER
const titleGroup = document.querySelectorAll('h3, h4, .kids-header-font')
const pTags = document.querySelectorAll('.p-fade')



// Config intersection observer

let config = {
  rootMargin: '0px',
  threshold: .5
};

let observer = new IntersectionObserver((entries) => {
    // console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeInUp')
    } 

  });
}, config);


// Observe Titles

 titleGroup.forEach(title => {
     observer.observe(title);
 })


 pTags.forEach(tag => {
  observer.observe(tag);
})


