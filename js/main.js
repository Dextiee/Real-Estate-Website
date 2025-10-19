 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 100000,
      values: [ 0, 15000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	siteSliderRange();


	
	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 30,
		    autoplay: true,
		    nav: false,
		    responsive:{
	        600:{
	        	margin: 30,
	        	
	          items: 2
	        },
	        1000:{
	        	margin: 30,
	        	stagePadding: 0,
	        	
	          items: 3
	        },
	        1200:{
	        	margin: 30,
	        	stagePadding: 0,
	        	
	          items: 4
	        }
		    }
			});
		}

		$('.slide-one-item, .with-dots').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    autoplay: true,
	    pauseOnHover: false,
	    nav: false,
	    dots: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });

	  $('.slide-one-item-alt').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
			smartSpeed: 700,
	    margin: 0,
	    autoplay: true,
	    pauseOnHover: false,

	  });

	  
	  
	  $('.custom-prev1').click(function(e) {
	  	e.preventDefault();
	  	$('.nonloop-block-13').trigger('prev.owl.carousel');
	  });
	  $('.custom-next1').click(function(e) {
	  	e.preventDefault();
	  	$('.nonloop-block-13').trigger('next.owl.carousel');
	  });


	  $('.custom-next').click(function(e) {
	  	e.preventDefault();
	  	$('.slide-one-item-alt').trigger('next.owl.carousel');
	  });
	  $('.custom-prev').click(function(e) {
	  	e.preventDefault();
	  	$('.slide-one-item-alt').trigger('prev.owl.carousel');
	  });
	  
	};
	siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	siteStellar();

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

  // navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
      e.preventDefault();

      // Handle disabled nav items with visual feedback
      if ($(this).hasClass('nav-disabled')) {
        var $this = $(this);
        
        // Add visual feedback
        $this.addClass('nav-clicked');
        
        // Create a temporary tooltip or message
        var originalText = $this.text();
        $this.text('Coming Soon!');
        
        // Remove feedback after 2 seconds
        setTimeout(function() {
          $this.removeClass('nav-clicked');
          $this.text(originalText);
        }, 2000);
        
        // Add a subtle shake animation
        $this.parent().addClass('nav-shake');
        setTimeout(function() {
          $this.parent().removeClass('nav-shake');
        }, 500);
        
        return false;
      }

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top
      }, 600, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

  // Office Hours Dropdown Functionality
  function initializeOfficeHours() {
    const dropdownBtn = document.getElementById('hoursDropdownBtn');
    const dropdownContent = document.getElementById('hoursDropdown');
    const weeklySchedule = document.getElementById('weeklySchedule');
    
    if (!dropdownBtn || !dropdownContent || !weeklySchedule) return;
    
    // Define weekly schedule (starting with Sunday since getDay() returns 0 for Sunday)
    const weekDays = [
      { name: 'Sun', hours: '08:00 am – 07:00 pm' },
      { name: 'Mon', hours: '08:00 am – 07:00 pm' },
      { name: 'Tue', hours: '08:00 am – 07:00 pm' },
      { name: 'Wed', hours: '08:00 am – 07:00 pm' },
      { name: 'Thu', hours: '08:00 am – 07:00 pm' },
      { name: 'Fri', hours: '08:00 am – 07:00 pm' },
      { name: 'Sat', hours: '08:00 am – 07:00 pm' }
    ];
    
    // Get today's day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const today = new Date().getDay();
    
    // Generate HTML for weekly schedule
    let scheduleHTML = '';
    weekDays.forEach((day, index) => {
      const isToday = index === today;
      const dayClass = isToday ? 'day-item today' : 'day-item';
      
      scheduleHTML += `
        <div class="${dayClass}">
          <div class="day-name">${day.name}</div>
          <div class="day-hours">${day.hours}</div>
        </div>
      `;
    });
    
    weeklySchedule.innerHTML = scheduleHTML;
    
    // Toggle dropdown
    dropdownBtn.addEventListener('click', function() {
      const isOpen = dropdownContent.classList.contains('show');
      
      if (isOpen) {
        dropdownContent.classList.remove('show');
        dropdownBtn.querySelector('.dropdown-arrow').textContent = '▼';
        dropdownBtn.querySelector('.dropdown-text').textContent = 'View Weekly Schedule';
      } else {
        dropdownContent.classList.add('show');
        dropdownBtn.querySelector('.dropdown-arrow').textContent = '▲';
        dropdownBtn.querySelector('.dropdown-text').textContent = 'Hide Weekly Schedule';
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove('show');
        dropdownBtn.querySelector('.dropdown-arrow').textContent = '▼';
        dropdownBtn.querySelector('.dropdown-text').textContent = 'View Weekly Schedule';
      }
    });
  }
  
  // Initialize office hours when DOM is ready
  initializeOfficeHours();

});