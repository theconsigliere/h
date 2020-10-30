// SLIDESHOWS
// --------------------------------------------------------------------
//
let slidesSelector = ".js-slides",
  prevButtonSelector = ".js-slider-button-prev",
  nextButtonSelector = ".js-slider-button-next",
  slideNav = '.slider-nav'


// PRODUCT Page
//----------------------------------------------------------------------
let productSlideshowSelector = ".js-product-slideshow",
  currentSlideSelector = ".js-current-slide",
  productSlideshows = {
    // change text ie '1 of 2' when slide has been changed
    onBeforeChange: function(event, slick, currentSlide, nextSlide) {
      // slick.$slider finds the current slider jquery info in slick
      let $currentSlide = slick.$slider
        .closest(productSlideshowSelector)
        .find(currentSlideSelector);

      $currentSlide.text(nextSlide + 1);
    },
    setup: function($element) {
      // find slides we need to run in slideshow
      let $slides = $element.find(slidesSelector),
        $prevButton = $element.find(prevButtonSelector),
       $nextButton = $element.find(nextButtonSelector),
        // options to pass to slick (js) github.com/kenwheeler/slick
        productSlideshowOptions = {
          fade: true,
          nextArrow: $nextButton,
          prevArrow: $prevButton,
          autoplay: true,
          autoplaySpeed: 2000,
          asNavFor: '.slider-nav'
        }

        const SlidesLength = $slides.children().length

      // if only one image don't run slideshow
      if (SlidesLength > 1) {
        $slides
          .on("beforeChange", productSlideshows.onBeforeChange)
          .slick(productSlideshowOptions);

          $(slideNav).slick({
            slidesToShow: SlidesLength,
            slidesToScroll: 1,
            asNavFor: $slides,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: false
          });


      } else {


        $(slideNav).addClass('visually-hidden')
      }


    },
    //look for every product slideshow selector and run that through the setup function
    init: function() {
      $(productSlideshowSelector).each(function() {
        productSlideshows.setup($(this));
      });
    }
  };

// run product page slideshow
productSlideshows.init();

// HOMEPAGE SLIDESHOW
//-------------------------
//
let sectionSlideshowSelector = ".js-section-slideshow",
  sectionSlideshows = {
    setup: function($element) {
      let $slides = $element.find(slidesSelector),
        shouldAutoplay = $element.attr("data-autoplay") === "true",
        // grab autoplay set in our section blocks on the backend
        autoplaySpeed = parseInt($element.attr("data-autoplay-speed")),
       $prevButton = $element.find(prevButtonSelector),
        $nextButton = $element.find(nextButtonSelector),
        sectionSlideshowOptions = {
          fade: true,
          nextArrow: $nextButton,
          prevArrow: $prevButton,
          autoplay: shouldAutoplay,
          autoplaySpeed: autoplaySpeed,
          dots: true
        };

      $slides.slick(sectionSlideshowOptions);

      // if ($slides.children().length > 1) {
      //   $slides.slick(sectionSlideshowOptions);
      // }
    },
    //look for every product slideshow selector and run that through the setup function
    init: function() {
      $(sectionSlideshowSelector).each(function() {
        sectionSlideshows.setup($(this));
      });
    }
  };

sectionSlideshows.init();

$(sectionSlideshowSelector).on('touchstart', e => {
  $(sectionSlideshowSelector).slick('slickPlay');
});


// CLUG PAGE

let $prevClugButton = this.find(prevButtonSelector),
$nextClugButton = this.find(nextButtonSelector)

$('.clug-category-slideshow').slick({
  infinite: true,
  dots: false,
  arrows: true,
  slidesToShow: 3.5,
  centerMode: false,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 3,
        waitForAnimate : false, pauseOnFocus : false, pauseOnHover : false
      }
    },
    {
      breakpoint: 560,
      settings: {
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 2,
        waitForAnimate : false, pauseOnFocus : false, pauseOnHover : false
      }
    },     {
      breakpoint: 480,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        centerPadding: '10px',
        waitForAnimate : false, pauseOnFocus : false, pauseOnHover : false
      }
    }
  ]
});
