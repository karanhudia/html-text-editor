$(document).ready(function(){

	//Celeberations
	console.log('I work');

	//Real Code
	var topSizes = [];
	for(total=16; total<=1056; total=total+18) {
		topSizes.push(total);
	}
	/**********All font variables**********/
	
	//Font size 16px
	var fontSize16 = '<div class="new-line-relative"><span class="font-16"></span></div>';

	/**********ENDS**********/

	//Variable containing left padding of editor container
	editorContainerLeftPadding = 15;

	//Variable for current span element the cursor is pointed to.
	var currentElement = document;

	//Variable for cursor's current left and top position.
	var cursorCurrentLeftPosition = 0;
	var cursorCurrentTopPosition = 0;

	//Variable to keep track of number of characters before the cursor.
	var numberOfCharactersBeforeCursor = 0;

	//Appending a div into body to show cursor.
	var editorCursor = '<div class="editor-cursor"></div>';
	$('.editor-container').append(editorCursor);

	//Appending a span into body to get the left position of the cursor.
	var substringSpanForLeftPosition = '<span class="cursorLeftPosition" style="display:none;"></span>';
	$('body').append(substringSpanForLeftPosition);



	//Method to return the x co-ordinate on click
	var leftValue = function(e, offset) {
		return (e.pageX - offset.left);
	};
	//Method to return the y co-ordinate on click
	var topValue = function(e, offset) {
		return (e.pageY - offset.top - 8);
	};
	

	/**********METHODS**********/

	//Method to set cursors left position
	var cursorLeftPosition = function(ifNew) {
		if(ifNew === undefined) {
			ifNew = false;
		}
		if(ifNew) {
			$('.editor-cursor').css('left', editorContainerLeftPadding);
		}
		else {
			var substringBeforeCursor = $(currentElement).text().substring(0, numberOfCharactersBeforeCursor);
			$('.cursorLeftPosition').html(substringBeforeCursor);
			$('.editor-cursor').css('left', $('.cursorLeftPosition').width() + editorContainerLeftPadding);
		}
	    
	}

	//Method to set cursors left position
	var cursorTopPosition = function(event, offset) {
		var topPixel = topValue(event, offset);
		topPixel = Math.round(((topPixel - 16)/18));
		cursorCurrentTopPosition = topSizes[topPixel];
		$('.editor-cursor').css('top', cursorCurrentTopPosition);
	};

	//Method to get substring upto the given position
	var substringUpto = function(end) {
		//TODO - If code requires multiple uses of it.
	}

	//Method to get substring from the given position upto the end of span length
	var substringFrom = function(start) {
		//TODO - If code requires multiple uses of it.
	}
	//Event listeners for handling keyboard and mouse events

	$(document).on('click', '.font-16', function(event){
     	currentElement = this;
		var offset = $('.editor-container').offset();
     	
     	//Getting the current selected character to place the cursor accordingly
     	var selection = window.getSelection();
     	//Setting value of numberOfCharactersBeforeCursor
     	numberOfCharactersBeforeCursor = selection.focusOffset;
     	//Calling methods to set top and left position of cursor
     	cursorLeftPosition();
     	cursorTopPosition(event, offset);
	});
	$(document).keydown(function(e){
		//If case for if key pressed is 'space'.
		if(e.keyCode==32) {
			e.preventDefault();
			e.key = "&nbsp;";
		}
		
		/**********If-else loops**********/

		//Case for LEFT, UP, RIGHT AND DOWN arrow.
		if(e.keyCode>=37 && e.keyCode<=40) {
			e.preventDefault();
			//LEFT arrow
			if (e.keyCode == 37) {
				numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor -1;
				cursorLeftPosition();
			}
			//UP arrow
			else if (e.keyCode == 38) {
				// TODO function to move the cursor to UP direction.
			}
			//RIGHT arrow
			else if (e.keyCode == 39) {
			    numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor + 1;
				cursorLeftPosition();
			}
			//DOWN arrow
			else {
				// TODO function to move the cursor to DOWN direction.
			}
		}

		//Case for when ENTER is pressed.
		else if(e.keyCode == 13) {
			numberOfCharactersBeforeCursor = 0;
			$(currentElement).parent().after(fontSize16);
			currentElement = $(currentElement).parent().next().children();
			cursorCurrentTopPosition = cursorCurrentTopPosition + 18;
	     	cursorLeftPosition(true);
	     	$('.editor-cursor').css('top', cursorCurrentTopPosition);
		}

		//Case for when BACKSPACE is pressed.
		else if(e.keyCode == 8) {
		    numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor - 1;
		    var textOfCurrentSpan = $(currentElement).text();
			var lengthOfString = textOfCurrentSpan.length;  //TODO - alternative method to get length from selection

			var substringBeforeCursorAfterDeletion = textOfCurrentSpan.substring(0, numberOfCharactersBeforeCursor);
			var substringAfterCursor = textOfCurrentSpan.substring((numberOfCharactersBeforeCursor + 1) , lengthOfString);
			$(currentElement).html(substringBeforeCursorAfterDeletion + substringAfterCursor);
			cursorLeftPosition();
		}
		//Case for when entering pressed keyboard keys into the span
		else {
			var textOfCurrentSpan = $(currentElement).text();
			var lengthOfString = textOfCurrentSpan.length;  //TODO - alternative method to get length from selection

			var substringBeforeCursor = $(currentElement).text().substring(0, numberOfCharactersBeforeCursor);
			var substringAfterCursor = $(currentElement).text().substring(numberOfCharactersBeforeCursor, lengthOfString);
			$(currentElement).html(substringBeforeCursor+ e.key + substringAfterCursor);
			numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor + 1;
			cursorLeftPosition();
		}
	});
});