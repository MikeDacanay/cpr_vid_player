/**
 * Created by CPR Interactive.
*/

var context='large';
var $window = $(window);
var isTouchDevice = 'ontouchstart' in document.documentElement;
var chapter1=2;
var chapter2=5;
var chapter3=10;
var chapter4=13;
var chapter5=14;
var chapter6=16;
// run this right away to set context
if ( $window.width() <= 1024) {
    context = 'medium';
    var chapter2=3;
    var chapter3=4;
    var chapter4=5;
    var chapter5=6;
    var chapter6=7;

    if ($window.width() <= 767) {
        context = 'small';
    }
}

//fix the textarea layout
[].forEach.call(document.querySelectorAll('textarea'), function($pre) {
    var lines = $pre.textContent.split('\n');
    var matches;
    var indentation = (matches = /^\s+/.exec(lines[0])) != null ? matches[0] : null;
    if (!!indentation) {
        lines = lines.map(function(line) {
            return line.replace(indentation, '');
        });
        return $pre.textContent = lines.join('\n').trim();
    }
});

var toggle_icon = false

$(document).ready(function() {    

    $('.test1').openVidOverlay({
        id: 'DtHnZNE4gVY',
        player: 'youtube',
    });

    $('.test2').openVidOverlay({
        id: 'xxxyyy',
        player: 'brightcove',
    });

    var slider = $('.book-slider').slick({
        infinite: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    speed: 300,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    accessibility:false,
                    appendArrows: $(".footer-phone")
                }
            }
        ]
    });



    $('.hamburger_icon').click(function(){
        $('.icon-wrap').toggleClass('hoverish');
        if(toggle_icon === false){
            toggle_icon = true;
        }else{
            toggle_icon = false;
        }
    });

    $('.page, .nav-left, .footer, .slick-next, .slick-prev').click(function(){
        if(toggle_icon === true){
            $('.icon-wrap').toggleClass('hoverish');
            $('.footer-phone').removeClass('up'); 
            toggle_icon = false;
        }
    });

    if ($('body').width() < 1025 ) {
        var st = $(this).scrollTop();
        var lastScrollTop = 0;
        var delta = 5;
        var didScroll;
        var navbarHeight=$('.footer-phone').outerHeight();
        $( window ).on( "swipe", function( event ) {
            $('.page').animate({ scrollTop: 0 }, 'fast');
            $(".footer-phone").removeClass('up');
        } );

        setInterval(function() {
            if (didScroll) {
                didScroll = false;
            }
        }, 250);

        $('.page').scroll(function() {
            didScroll = true;
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                $(".footer-phone").addClass('up');
            } else {
                // Scroll Up
                if(st <150) {
                    $(".footer-phone").removeClass('up');
                }
            }

            lastScrollTop = st;

        });

        $('body').css('height', window.innerHeight);
        $('.book-slider').slick('unslick');

        $("#mobile-page-4").detach().appendTo('#p3 .content-holder');
        $("#mobile-page-5").detach().appendTo('#p3 .content-holder');
        $("#mobile-page-5b").detach().appendTo('#p3 .content-holder');
        $("#mobile-page-7").detach().appendTo('#p6 .content-holder');
        $("#mobile-page-8").detach().appendTo('#p6 .content-holder');
        $("#mobile-page-9").detach().appendTo('#p6 .content-holder');
        $("#mobile-page-10").detach().appendTo('#p6 .content-holder');
        $("#mobile-page-10a").detach().appendTo('#mobile-page-10 .inset-image ');
        $("#mobile-page-12").detach().appendTo('#p11 .content-holder');
        $("#mobile-page-13").detach().appendTo('#p11 .content-holder');
        $("#mobile-page-16").detach().appendTo('#p15 .content-holder');
        $("#mobile-page-18").detach().appendTo('#p17 .content-holder');
        $("#p4").remove();
        $("#p5").remove();

        $("#p7").remove();
        $("#p8").remove();
        $("#p9").remove();
        $("#p10").remove();
        $("#p12").remove();
        $("#p13").remove();
        $("#p16").remove();
        $("#p18").remove();

        $('.book-slider').slick({
            infinite: false,
            responsive: [
                {
                    breakpoint: 750,
                    settings: {
                        speed: 300,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                        mobileFirst: true,
                        accessibility:false,
                        infinite:false,
                        swipeToSlide:true
                    }
                }
            ]
        });

    }

    $('.scrollbar-inner').scrollbar();

    $('h2, h3, h4, h5, h6, li,.quote, .cover-title').widowFix();
    var hash = window.location.hash.split('/');
    var hashVal = hash[2];
    $('.book-slider').slick('slickGoTo', hashVal);

	    $('#preloader').fadeOut('fast');
        if(window.location.hash) {
            var hash = window.location.hash.split('/');
            var hashVal = hash[2];
            $('.book-slider').slick('slickGoTo', hashVal);
            // hash found
        } else {
            // No hash found
            $('.book-slider').slick('slickGoTo', 0);
        }


    $('.toc h1').find('a').on('click', function(e){
        e.preventDefault();
        var $slide = $(this).data('slide');
        $('.book-slider').slick('slickGoTo', $slide);
    }); 
    
    //stop video when closing     
    $('.modal__close').on('click',function(){		
    	var iframe = $(this).next().find('iframe');
    	iframe.attr('src', iframe.attr('src'));
    });

    
   $('.slick-arrow').on('click',function(){
      var curSlide = $('.slick-current').prev();
      if($(this).hasClass('slick-prev')) {
          $carousel.slick('slickPrev');
          $('.page').animate({ scrollTop: 0 }, 'fast');
      }
       else{
          $carousel.slick('slickNext');
          $('.page').animate({ scrollTop: 0 }, 'fast');
      }
      curSlide.find('.modal-state:checked').each(function(){
	      $('.modal__close[for="' + $(this).attr('id') + '"]').trigger('click');
       });
    });

});


$('.to-top').on('click', function(e){
    $('.page').animate({ scrollTop: 0 }, 'fast');
    e.preventDefault();

});

//fix keyboard controls
var $carousel = $('.book-slider');
$(document).on('keydown', function(e) {
    if(e.keyCode == 37) {
        $carousel.slick('slickPrev');
        e.preventDefault();
    }
    if(e.keyCode == 39) {

        $carousel.slick('slickNext');
        e.preventDefault();
    }
});



var flag=false;


$('.book-slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {

    $('html, body').animate({ scrollTop: 0}, 200);
    var lastSlide = $('section.slick-slide:not(.slick-cloned)').length - 1;
    $('.slide-page').removeClass('active')

	//set URL bar
    if(flag==false){
    	flag=true;
    }else{
        window.location.hash = '/page/' + currentSlide;
    }
    $('.nav-bar').fadeIn();
    $('.footer').fadeIn();
    $('.slick-next').removeClass('hide');

	//controls nav display
    switch(currentSlide) {
        case 0:
            $('.footer').hide();
            $('.footer-phone').hide();
            $('.nav-bar').hide();
            $('.slick-next').addClass('hide');
            break;
        case lastSlide:
            $('.nav-bar').hide();
            $('.footer').hide();
            $('.footer-phone').hide();
            break;
        default:

    }

	//arrow display
	$('.slick-arrow').show();
    if (currentSlide === 0 ) { $('.slick-prev.slick-arrow').hide(); }  
    if (currentSlide === lastSlide ) { $('.slick-next.slick-arrow').hide(); }  
     
    //display footer text & visibility

    var footerText = [
    	[ [0] , ""],
    	[ [1] , "Table of Contents"],
    	[ [2,3,4] , "Chapter 1: The World’s Most Intelligent Database Just Got Smarter"],
    	[ [5,6,7,8,9] , "Chapter 2: Building on a Rich History of Automation"],
    	[ [10,11,12] , "Chapter 3: Database Security: How to Automatically Protect Against Cybersecurity Threats"],
        [ [13] , "Chapter 4: New Opportunities for Database Administrators"],
        [ [14,15] , "Chapter 5: The Right Stuff for Analytics and OLTP"],
        [ [16,17] , "Chapter 6: Bring Your Own License"],

    ];


    var footer = $('.footer');
    var slideNum=('0' + currentSlide).slice(-2);
    var pageNum =(slideNum/1)+1;
    $('#footNum').text(pageNum);


if(context=='large'){
        $.each(footerText, function( i, arr2 ){
            $.each( arr2[0], function( i, v ){
                if(currentSlide == v ) {
                    $('.footer-chap-title').text(arr2[1]);
                }
            });
        });
    }
});

//mobile page height fix for ios/chrome/ff madness
$(window).on('resize orientationchange', function() {
    var curr_context;
    if ( $window.width() <= 1024) {
        curr_context = 'medium';
    }
    else{
        curr_context = 'large';
    }

    if(curr_context != context){
        location.reload();
    }
    if (isTouchDevice == true) {
        setTimeout(function(){
            var fix = window.innerHeight;
            $('body').css('height', fix);
            $(".footer-phone").removeClass('up');
        },500)
    }
});

//add the ScrollTo animation
jQuery.fn.extend(
    {
        scrollTo : function(speed, easing)
        {
            return this.each(function()
            {
                var targetOffset = $(this).offset().top - 68;
                $('.page').animate({scrollTop: targetOffset}, speed, easing);
            });
        }
    });

/**event listeners**/

 $('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('.book-slider').slick('slickGoTo', slideno - 1);
 });
