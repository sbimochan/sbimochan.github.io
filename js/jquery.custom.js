$(document).ready(function(){

	// Smooth scrolling to internal anchors
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	             	// Offset the scroll position by -60 pixels to account for the fixed top bar
	                 scrollTop: target.offset().top - 60
	            }, 600);
	            return false;
	        }
	    }
	});


	// ScrollSpy automatically updates nav targets based on scroll position
	// http://twitter.github.com/bootstrap/javascript.html#scrollspy
	$('#nav').scrollspy();


	// Wrap text in h3 with a span element to underline
	$('h3, h4').wrapInner('<span class="underline" />');

	
	$('.box-skill:even').addClass('even');


    if ( $(window).width() > 767 ) {

    	// Set the initial opacity of skill boxes to 0.2
		$('.box-skill p').fadeTo(0, 0.5);

		// Add / remove class on skill boxes on hover in/out
		$('.box-skill').hover(function() {
			$(this).addClass('hoverClass');
			$(this).children().find('p').stop().fadeTo(200, 1);
		}, function () {
			$(this).removeClass('hoverClass');
			$(this).children().find('p').stop().fadeTo(200, 0.5);
		});

    } else {

    }


	// Wrap images in #section-works to remove spacing at the bottom
	// the wrapper div needs to have line-height: 0
	$('#section-works img').wrap('<div class="img-wrap" />');



	/* ===================================================================
		
		Works Grid - jQuery isotope

	=================================================================== */

		
	var $isotopeContainer = $('#section-worksgrid');
	var $isotopeItem = $('#section-worksgrid .item'); 
	var $isotopeItemImage = $('#section-worksgrid .item img'); 

	// jQuery Isotope on worksgrid
	$isotopeContainer.isotope({
		itemSelector : '.item',
		layoutMode : 'fitRows'
	});
	
	// Calculate number of columns for Isotope 
	function calculateNumColumns() {

		var numColumns; 

		// Retrieve window width
		var windowWidth = $(window).width(); 

		// Each image is 371 px wide
		if( windowWidth > 1484 ) {
			numColumns = 5;
		} else if ( windowWidth > 1113 ) {
			numColumns = 4; 
		} else if ( windowWidth > 742 ) {
			numColumns = 3;
		} else if ( windowWidth > 371 ) {
			numColumns = 2;
		} else {
			numColumns = 1;
		}
		return numColumns; 
	}


	// Calculate item width with given number of columns
	function calculateItemWidth( numColumns ) {

		// Retrieve window width
		var windowWidth = $(window).width(); 

		var numColumns = calculateNumColumns(); 

		// Calculate new width 
		var newWidth = Math.floor( windowWidth / numColumns );

		return newWidth; 
	}
	
	
	
	function markUnfitItems() {
		
		clearUnfitMark(); 
		
		var itemCount = $isotopeItem.length;
		var unfitCount = itemCount % calculateNumColumns();
		
		if( unfitCount > 0 ) {
			var $unfitItems = $isotopeItem.slice( -unfitCount ); 
			
			$unfitItems.addClass('unfit'); 
		} 
		
	}
	
	
	function clearUnfitMark() {
		$('#section-worksgrid .item.unfit').removeClass('unfit'); 
	}


	// Set item width
	function setItemWidth() {

		var itemWidth = calculateItemWidth();

		$isotopeItem.css({
			width: itemWidth + 'px'
		});

	}


	// Reset item width and reinitialize Isotope
	function reinitializeIsotope() {
	
		// Set item width
		setItemWidth(); 
		
		// Add .unfit to items that don't complete a row
		markUnfitItems(); 
		
		// Adjust the layout
		$isotopeContainer.isotope({ filter: '.item:not(.unfit)' }).isotope('reLayout');	
	}


	// debulked onresize handler
	// https://github.com/louisremi/jquery-smartresize
	function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

	on_resize(function () {
		reinitializeIsotope()
	});



	/* = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		
		Initialize and hover transparency effect

	= = = = = = = = = = = = = = = = = = = = = = = = = = = = */

	$(window).load(function() {
		// Adjust Isotope layout
		reinitializeIsotope();
	});

	// Fade to alpha opacity of 80%
	$isotopeItemImage.fadeTo(0, 0.8); 

	$isotopeItemImage.each(function() {
		$(this).hover(function() {
			$(this).stop().fadeTo(300, 1);
		}, function() {
			$(this).stop().fadeTo(300, 0.8); 
		});
	}); 




	// Initialize jQuery UI tooltip
	$('ul#nav').tooltip({
	    position: {
	        my: "left+1 bottom-0",
	        at: "left top"
	    },
	    show: false,
	    hide: false
	});
	

	// Print option link
	$('a.link-print').click(function() {
		window.print();
		return false;
	});




});




$(window).load(function () {

	// Retrieve the height of the #section-topbar
	// To avoid a white line when using background-size: cover; in the profile image, reduce the calculation by 1px
	var topbarHeight = $('#section-topbar').height() - 1;

	$('body').css('padding-top', topbarHeight);


});




$(window).resize(function () {

	// Vertically center the name box on windows resize
	// There are some other ways to do this, but I'm going to keep a cross-browser jQuery solution
	var $nameBox = $('#box-name');
	var nameBoxHeight = $nameBox.height();
	var profileImageHeight = $('#section-profileImage').height();

	var nameBoxMargin = ( profileImageHeight - nameBoxHeight ) / 2;

	$nameBox.css('margin-top', nameBoxMargin);

	var windowWidth = $(window).width();

	// Skill boxes
    if ( windowWidth > 767 ) {
		$('.box-skill p').fadeTo(0, 0.5);

		// Add / remove class on skill boxes on hover in/out
		$('.box-skill').hover(function() {
			$(this).addClass('hoverClass');
			$(this).children().find('p').stop().fadeTo(200, 1);
		}, function () {
			$(this).removeClass('hoverClass');
			$(this).children().find('p').stop().fadeTo(200, 0.5);
		});

    } else {
    	$('.box-skill p').fadeTo(0, 1);

		// Unbind hover effect
		$('.box-skill').unbind('mouseenter mouseleave');
    }


    if ( windowWidth < 640 ) {
    	modalMobileWidth = windowWidth - 40;
    	modalMobileLeftMargin = -(modalMobileWidth / 2);

    	$('.reveal-modal').css({
    		'width' : modalMobileWidth,
    		'max-width' : '600px',
    		'margin-left' : modalMobileLeftMargin
    	});
    } else {
    	$('.reveal-modal').css({
    		'width' : '600px',
    		'margin-left' : '-300px'
    	});
    }

});
