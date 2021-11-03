jQuery(function(jQuery){

var BOOLIAN = window.BOOLIAN || {};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = jQuery('#menu').clone().attr('id', 'navigation-mobile');

BOOLIAN.mobileNav = function(){
	var windowWidth = jQuery(window).width();
	
	if( windowWidth <= 979 ) {
		if( jQuery('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			jQuery('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		jQuery('#navigation-mobile').css('display', 'none');
		if (jQuery('#mobile-nav').hasClass('open')) {
			jQuery('#mobile-nav').removeClass('open');	
		}
	}
}

BOOLIAN.listenerMenu = function(){
	jQuery('#mobile-nav').on('click', function(e){
		jQuery(this).toggleClass('open');
		
		if (jQuery('#mobile-nav').hasClass('open')) {
			jQuery('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			jQuery('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	jQuery('#menu-nav-mobile a').on('click', function(){
		jQuery('#mobile-nav').removeClass('open');
		//alert('clicked');
		jQuery('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
}


/* ==================================================
   Slider Options
================================================== */

BOOLIAN.slider = function(){
	jQuery.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   5000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	300,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
									{image : 'img/slider-images/image04.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
									{image : 'img/slider-images/image01.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
									{image : 'img/slider-images/image02.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
									{image : 'img/slider-images/image03.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''}
									  
									],
									
		// Theme Options			   
		progress_bar			:	1,			// Timer for each slide							
		mouse_scrub				:	1
		
	});

}


/* ==================================================
   Navigation Fix
================================================== */

BOOLIAN.nav = function(){
	jQuery('.sticky-nav').waypoint('sticky');
}


/* ==================================================
   Filter Works
================================================== */

BOOLIAN.filter = function (){
	if(jQuery('#projects').length > 0){		
		var jQuerycontainer = jQuery('#projects');
		
		jQuerycontainer.imagesLoaded(function() {
			jQuerycontainer.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var jQueryoptionSets = jQuery('#options .option-set'),
			jQueryoptionLinks = jQueryoptionSets.find('a');
	
		  jQueryoptionLinks.click(function(){
			var jQuerythis = jQuery(this);
			// don't proceed if already selected
			if ( jQuerythis.hasClass('selected') ) {
			  return false;
			}
			var jQueryoptionSet = jQuerythis.parents('.option-set');
			jQueryoptionSet.find('.selected').removeClass('selected');
			jQuerythis.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = jQueryoptionSet.attr('data-option-key'),
				value = jQuerythis.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( jQuerythis, options )
			} else {
			  // otherwise, apply new options
			  jQuerycontainer.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   FancyBox
================================================== */

BOOLIAN.fancyBox = function(){
	if(jQuery('.fancybox').length > 0 || jQuery('.fancybox-media').length > 0 || jQuery('.fancybox-various').length > 0){
		
		jQuery(".fancybox").fancybox({				
				padding : 0,
				beforeShow: function () {
					this.title = jQuery(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + jQuery(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});
			
		jQuery('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
}


/* ==================================================
   Contact Form
================================================== */

BOOLIAN.contactForm = function(){
	jQuery("#contact-submit").on('click',function() {
		jQuerycontact_form = jQuery('#contact-form');
		
		var fields = jQuerycontact_form.serialize();
		
		jQuery.ajax({
			type: "POST",
			url: "php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					jQuery('#contact-form input').val('');
					jQuery('#contact-form textarea').val('');
				}
				
				jQuery('#response').empty().html(response.html);
			}
		});
		return false;
	});
}


/* ==================================================
   Twitter Feed
================================================== */

BOOLIAN.tweetFeed = function(){
	
	var valueTop = -64; // Margin Top Value
	
    jQuery("#ticker").tweet({
          modpath: 'js/twitter/',
          username: "ur id", // Change this with YOUR ID
          page: 1,
          avatar_size: 0,
          count: 10,
		  template: "{text}{time}",
		  filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
          loading_text: "loading ..."
	}).bind("loaded", function() {
	  var ul = jQuery(this).find(".tweet_list");
	  var ticker = function() {
		setTimeout(function() {
			ul.find('li:first').animate( {marginTop: valueTop + 'px'}, 500, 'linear', function() {
				jQuery(this).detach().appendTo(ul).removeAttr('style');
			});	
		  ticker();
		}, 5000);
	  };
	  ticker();
	});
	
}


/* ==================================================
   Menu Highlight
================================================== */

BOOLIAN.menu = function(){
	
	
	jQuery('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
	
	
}

jQuery("#menu-nav .blog, #menu-nav-mobile .blog").click(function(){
		//alert("i m here");
        window.open('http://blog.booleanbites.com/', '_blank');   
	});

/* ==================================================
   Next Section
================================================== */

BOOLIAN.goSection = function(){
	jQuery('#nextsection').on('click', function(){
		jQuerytarget = jQuery(jQuery(this).attr('href')).offset().top-30;
		
		jQuery('body, html').animate({scrollTop : jQuerytarget}, 750, 'easeOutExpo');
		return false;
	});
}

/* ==================================================
   GoUp
================================================== */

BOOLIAN.goUp = function(){
	jQuery('#goUp').on('click', function(){
		jQuerytarget = jQuery(jQuery(this).attr('href')).offset().top-30;
		
		jQuery('body, html').animate({scrollTop : jQuerytarget}, 750, 'easeOutExpo');
		return false;
	});
}


/* ==================================================
	Scroll to Top
================================================== */

BOOLIAN.scrollToTop = function(){
	var windowWidth = jQuery(window).width(),
		didScroll = false;

	var jQueryarrow = jQuery('#back-to-top');

	jQueryarrow.click(function(e) {
		jQuery('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	jQuery(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( jQuery(window).scrollTop() > 600 ) {
				jQueryarrow.css('display', 'block');
			} else {
				jQueryarrow.css('display', 'none');
			}
		}
	}, 250);
}

/* ==================================================
   Thumbs / Social Effects
================================================== */

BOOLIAN.utils = function(){
	
	jQuery('.item-thumbs').bind('touchstart', function(){
		jQuery(".active").removeClass("active");
      	jQuery(this).addClass('active');
    });
	
	jQuery('.image-wrap').bind('touchstart', function(){
		jQuery(".active").removeClass("active");
      	jQuery(this).addClass('active');
    });
	
	jQuery('#social ul li').bind('touchstart', function(){
		jQuery(".active").removeClass("active");
      	jQuery(this).addClass('active');
    });
	
}

/* ==================================================
   Accordion
================================================== */

BOOLIAN.accordion = function(){
	var accordion_trigger = jQuery('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if(jQuery(this).hasClass('active')){
			jQuery(this).removeClass('active');
		   	jQuery(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	jQuery(this).removeClass('inactive');
		  	jQuery(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

BOOLIAN.toggle = function(){
	var accordion_trigger_toggle = jQuery('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if(jQuery(this).hasClass('active')){
			jQuery(this).removeClass('active');
		   	jQuery(this).addClass('inactive');
		}
		else{
		  	jQuery(this).removeClass('inactive');
		  	jQuery(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Tooltip
================================================== */

BOOLIAN.toolTip = function(){ 
    jQuery('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	Init
================================================== */

BOOLIAN.slider();

jQuery(document).ready(function(){
	/*Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'js/placeholder.js', 
		complete : function() {
				if (!Modernizr.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]);*/
	
	// Preload the page with jPreLoader
	/*jQuery('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: false,
		autoClose: true,
		splashFunction: function() {
			jQuery('#circle').animate({'opacity' : 1}, 50, 'linear');
		}
	});*/
	
	BOOLIAN.nav();
	BOOLIAN.mobileNav();
	BOOLIAN.listenerMenu();
	BOOLIAN.menu();
	BOOLIAN.goSection();
	BOOLIAN.goUp();
	BOOLIAN.filter();
	BOOLIAN.fancyBox();
	BOOLIAN.contactForm();
	BOOLIAN.tweetFeed();
	BOOLIAN.scrollToTop();
	BOOLIAN.utils();
	BOOLIAN.accordion();
	BOOLIAN.toggle();
	BOOLIAN.toolTip();
});

jQuery(window).resize(function(){
	BOOLIAN.mobileNav();
});

});

