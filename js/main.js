jQuery(document).ready(function($){

	//top page button
	$(function() {
		smoothScroll(300);
	});

	//smoothScroll function is applied from the document ready function
	function smoothScroll (duration) {
		$('.arrow-top').on('click', function(event) {

			var target = $( $(this).attr('href') );

			if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
				}, duration);
			}
		});
	} //end top page button

	//image view
$('li img').on('click',function(){

	var src = $(this).attr('src');
	var cng = src.replace("thumbnails", "original"); 
	var img = '<img src="' + cng + '" class="img-responsive"/>';

	//arrow buttons
	var index = $(this).parent('li').index();
	var html = '';

	html += '<div class="close-button">';
		html += '<a class="controls close" data-dismiss="modal" href=""></a>';
	html += '</div>';
	html += '<div class="control-arrows">';
	html += '<a class="controls previous" href="' + (index) + '"></a>';
	html += '</div>';
	html += '<div class="control-arrows">'                
	html += '<a class="controls next" href="'+ (index+2) + '"></a>';
	html += '</div>';
	html += img;

	$('#myModal .modal-body').html(html);
	$('#myModal').modal('show');
	
	$('#myModal').on('hidden.bs.modal', function(){
	$('#myModal .modal-body').html('');
	});

		//removing buttons in first/last img
	var previousHref = parseInt(index);
	var nextHref = $('ul.row li').length;
	var NextIndex = parseInt(index) + 1;

	if (previousHref === 0){
			$('.modal-body .previous').css({"opacity": "0", "display": "none"});
	}else{
			$('.modal-body .previous').css({"opacity": "1", "display": "inline-block"});
	}

	if (nextHref === NextIndex){
			 $('.modal-body .next').css({"opacity": "0", "display": "none"});
	}else{
			$('.modal-body .next').css({"opacity": "1", "display": "inline-block"});
	}

	});  //end image view
});

 $(document).on('click', 'a.controls', function(){
				
		var index = $(this).attr('href');
		var src = $('ul.row li:nth-child('+ index +') img').attr('src');
		var cng = src.replace("thumbnails", "original"); 

		$('.modal-body img').attr('src', cng);

		var newPrevIndex = parseInt(index) - 1; 
		var newNextIndex = parseInt(newPrevIndex) + 2; 
		 
		if($(this).hasClass('previous')){
				$(this).attr('href', newPrevIndex); 
				$('a.next').attr('href', newNextIndex);
		}
		else{
				$(this).attr('href', newNextIndex); 
				$('a.previous').attr('href', newPrevIndex);
		}

		var total = $('ul.row li').length + 1; 
		//hide next button
		if(total === newNextIndex){
				$('a.next').css({"opacity": "0", "pointer-events": "none"});
				setTimeout(function() {
					$('a.next').css("display", "none");
				}, 600);

		}else{
				$('a.next').css({"display": "inline-block", "pointer-events": "auto"});
				setTimeout(function() {
					$('a.next').css("opacity", "1");
				}, 10);
		}
		//hide previous button
		if(newPrevIndex === 0){
			$('a.previous').css({"opacity": "0", "pointer-events": "none"});
			setTimeout(function() {
					$('a.previous').css("display", "none");
				}, 600);
		}else{
			$('a.previous').css({"display": "inline-block", "pointer-events": "auto"});
			setTimeout(function() {
					$('a.previous').css("opacity", "1");
				}, 10);
		}

		return false;
});

//keyboard controls
jQuery(function($){
	$(document).keydown(function(e){
		switch(e.keyCode){
		case 37: {//left arrow
		$('a.previous').trigger('click');
		break;
			}
		case 39: {//right arrow
		$('a.next').trigger('click');
		break;
			}
		}
		if(Math.abs(e.keyCode - 38) === 1){
			e.preventDefault();
		}
	});
});
