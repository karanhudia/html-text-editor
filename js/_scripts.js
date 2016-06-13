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
		if(e.keyCode==32) {
			e.preventDefault();
		}
		console.log(e.key);
		if(e.keyCode == 13) {
			$(currentElement).parent().after('<div class="new-line-relative"><span class="font-16"></span></div>');
			currentElement = $(currentElement).parent().next().children();
			cursorLastPosition = cursorLastPosition + 18;
			$('div.editor-cursor').remove();
			$('.editor-container').append('<div class="editor-cursor"></div>');
	     	$('.editor-cursor').css('left', 15);
	     	$('.editor-cursor').css('top', cursorLastPosition);
		}
		else if(e.keyCode == 8) {
			$(currentElement).text(function(i,v){
			   return v.slice(0,-1);
			});
			$('.editor-cursor').css('left', $(currentElement).width() + 15);
		}
		else {
			$(currentElement).append(e.key);
			$('.editor-cursor').css('left', $(currentElement).width() + 15);
		}
	});
});