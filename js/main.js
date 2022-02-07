(function($) {

	"use strict";

	$( document ).ready(function() {
			$('#myModal').modal('toggle')
	});

	 setTimeout(function(){
		$("#myModal").modal('hide');//ocultamos el modal
		$('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
		$('.modal-backdrop').remove();//eliminamos el backdrop del modal
	 },5000);


	 var carousel = function(){
		 $('.galeria-bathroom-carousel').owlCarousel({
			 center:true,
			 loop: true,
			autoplay: true,
			autoplayTimeout: 5000,
			nav: false,
			responsive:{
				0:{items:1},
				412:{items: 1},
				768:{items: 2},
				810:{items:2},
				1000:{items:3}
			}
		 });
	 };
	 carousel();

  var carousel2 = function() {
		$('.image-carousel').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			autoplayTimeout: 10000,
			items:1,
			margin: 0,
			stagePadding: 0,
			nav: true,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

	};
	carousel2();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: false,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  var counter = function() {
		
	$('#section-counter').waypoint( function( direction ) {

		if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

			var decimal_places = 2;
			var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
			$('.number').each(function(){
				var $this = $(this),
				    num = $this.data('number') * decimal_factor;
					
					// console.log(num);
				$this.animateNumber(
				  {
					number: num,
					numberStep: function(now, tween) {
						var floored_number = Math.floor(now) / decimal_factor,
							target = $(tween.elem);
				
						if (decimal_places > 0) {
						  // force decimal places even if they are 0
						  floored_number = floored_number.toFixed(decimal_places);
				
						  // replace '.' separator with ','
						  floored_number = floored_number.toString().replace('.', ',');
						}
				
						target.text(floored_number + 'k');
					  }
				  }, 2000
				);
			});
			
			$(".counter").each(function () {
				var $this = $(this),
					countTo = $this.attr("data-number");
				$({
					countNum: $this.text()
				}).animate(
					{
						countNum: countTo
					},
	
					{
						duration: 2000,
						easing: "swing",
						step: function () {
							//$this.text(Math.ceil(this.countNum));
							$this.text(
								Math.ceil(this.countNum).toLocaleString("en")
							);
						},
						complete: function () {
							$this.text(
								Math.ceil(this.countNum).toLocaleString("en")
							);
							//alert('finished');
						}
					}
				);
			});
		}

	} , { offset: '95%' } );

}
counter();


	$('#reused_form').submit(function (e) {
		e.preventDefault();

		var $form = document.contact;
		$form = $(this);

		$.ajax({
			type: "POST",
			url: 'handler.php',
			data: $form.serialize(),
			//success: after_form_submitted,
			dataType: 'json'
		});
		limpiar();
	});

	$(document).ready(function(){

		$('.ir-arriba').click(function(){
			$('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});
	
		$(window).scroll(function(){
			if( $(this).scrollTop() > 0 ){
				$('.ir-arriba').slideDown(300);
			} else {
				$('.ir-arriba').slideUp(300);
			}
		});
	
	});

})(jQuery);

window.onscroll = function(){
	myFunction();
}

var topbar = document.getElementById('sobre-nosotros');
var sticky =  topbar.offsetTop;
var nav = document.getElementById('nav');
let bg = document.getElementById('cambio-color');

function myFunction(){
	if(window.pageYOffset > sticky){
		nav.classList.add("navega");
		nav.classList.remove("navegacion");
		bg.classList.remove('bg-light');
		bg.classList.add('bg-red');
	}
	else{
		nav.classList.remove("navega");
		nav.classList.add("navegacion");
		bg.classList.add('bg-light');
		bg.classList.remove('bg-red');
	}
}

function limpiar(){
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const subject = document.getElementById('subject');
	const message = document.getElementById('message');
	const enviar =  document.getElementById('submit');
	const mensaje = document.getElementById('enviados');

	name.value = "";
	email.value = "";
	subject.value = "";
	message.value = "";
	enviar.classList.add("enviado");
	mensaje.classList.remove("submitting");
}
