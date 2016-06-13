$(document).ready(function(){
	//Celeberations
	console.log('I work');
	//Real Code
	var topSizes = [];
	for(total=16; total<=1056; total=total+18) {
		topSizes.push(total);
	}
	var currentElement = document;
	var cursorLastPosition = 0;
	var leftValue = function(e, offset) {
		return (e.pageX - offset.left);
	};
	var topValue = function(e, offset) {
		return (e.pageY - offset.top - 8);
	};
	var cursorPosition = function(topPixel) {
		topPixel = Math.round(((topPixel - 16)/18));
		cursorLastPosition = topSizes[topPixel];
		return cursorLastPosition;
	};
	$('.font-16').click(function(event){
		var offset = $('.editor-container').offset();
		console.log('x- '+ leftValue(event, offset));
		console.log('y- '+ topValue(event, offset));
		console.log(event.target);
		$('div.editor-cursor').remove();
     	$('.editor-container').append('<div class="editor-cursor"></div>');
     	$('.editor-cursor').css('left', leftValue(event, offset));
     	$('.editor-cursor').css('top', cursorPosition(topValue(event, offset)));
     	currentElement = this;
	});
	$(document).keydown(function(e){
		console.log(e.key);
		if(e.key == 'Enter') {
			$(currentElement).parent().after('<div class="new-line-relative"><span></span><span class="font-16">I am awesome.</span></div>');
			$('.editor-container').append('<div class="editor-cursor"></div>');
	     	$('.editor-cursor').css('left', 15);
	     	$('.editor-cursor').css('top', (cursorLastPosition + 18));
		}
	});
});