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

	//Variable for current span element and its properties the cursor is pointed to.
	var currentElement = document;
	var currentElementText = '';
	var currentElementLength = 0;

	//Variable for cursor's current left and top position.
	var cursorCurrentLeftPosition = 0;
	var cursorCurrentTopPosition = 0;

	//Variable to keep track of number of characters before the cursor.
	var numberOfCharactersBeforeCursor = 0;

	//Variable to keep track of number of characters after the cursor.
	var numberOfCharactersAfterCursor = 0;

	//Appending a div into body to show cursor.
	var editorCursor = '<div class="editor-cursor" style="top:16px; left:15px;"></div>';
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
		if((ifNew === undefined) || ifNew == false) {
			var substringBeforeCursor = $(currentElement).text().substring(0, numberOfCharactersBeforeCursor);
			$('.cursorLeftPosition').html(substringBeforeCursor);
			$('.editor-cursor').css('left', $('.cursorLeftPosition').width() + editorContainerLeftPadding);
		}
		else {
			$('.editor-cursor').css('left', editorContainerLeftPadding);
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

	//Method to set new currentElement span
	var setCurrentElement = function(newSpan) {
		currentElement = newSpan;
	}

	//Method to set currentElement span's properties
	var setTextAndLength = function() {
		currentElementText = $(currentElement).text();
		currentElementLength = currentElementText.length;  //TODO -karanhudia -alternative method to get length from selection
	}

	//Event listeners for handling keyboard and mouse events

	// $(document).on('click', '.font-16', function(event){
		
	// });
	$(document).on('click', '.new-line-relative', function(event){
		var offset = $('.editor-container').offset();
	    setCurrentElement($(this).children());
	    setTextAndLength();

		if (event.target.className == 'new-line-relative') {	
	     	//Setting value of numberOfCharactersBeforeCursor & numberOfCharactersAfterCursor
	     	numberOfCharactersBeforeCursor = currentElementLength;
			numberOfCharactersAfterCursor = 0;
		}
		else if(event.target.className == 'font-16') {
	     	//Getting the current selected character to place the cursor accordingly
	     	var selection = window.getSelection();
	     	//Setting value of numberOfCharactersBeforeCursor
	     	numberOfCharactersBeforeCursor = selection.focusOffset;
			numberOfCharactersAfterCursor = currentElementLength - numberOfCharactersBeforeCursor;
	     }
	    //Calling methods to set top and left position of cursor
	    cursorLeftPosition();
	    cursorTopPosition(event, offset);
     	event.stopPropagation();
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
				numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor - 1;
				numberOfCharactersAfterCursor = numberOfCharactersAfterCursor + 1;
				cursorLeftPosition();
			}
			//UP arrow
			else if (e.keyCode == 38) {
				// TODO function to move the cursor to UP direction.
			}
			//RIGHT arrow
			else if (e.keyCode == 39) {
			    numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor + 1;
				numberOfCharactersAfterCursor = numberOfCharactersAfterCursor - 1;
				cursorLeftPosition();
			}
			//DOWN arrow
			else {
				// TODO function to move the cursor to DOWN direction.
			}
		}

		//Case for when ENTER is pressed.
		else if(e.keyCode == 13) {
			$(currentElement).parent().after(fontSize16);

			if(numberOfCharactersAfterCursor) {
				var substringBeforeCursor = currentElementText.substring(0, numberOfCharactersBeforeCursor);
				var substringAfterCursor = currentElementText.substring(numberOfCharactersBeforeCursor , currentElementLength);
				$(currentElement).html(substringBeforeCursor);
				setCurrentElement($(currentElement).parent().next().children());
				$(currentElement).html(substringAfterCursor);
			}
			else {
				setCurrentElement($(currentElement).parent().next().children());
			}
			setTextAndLength();
			numberOfCharactersBeforeCursor = 0;
			numberOfCharactersAfterCursor = currentElementLength - numberOfCharactersBeforeCursor;
			cursorCurrentTopPosition = cursorCurrentTopPosition + 18;
	     	cursorLeftPosition(true);
	     	$('.editor-cursor').css('top', cursorCurrentTopPosition);
		}

		//Case for when BACKSPACE is pressed.
		else if(e.keyCode == 8) {
			e.preventDefault();
		    numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor - 1;

			var substringBeforeCursorAfterDeletion = currentElementText.substring(0, numberOfCharactersBeforeCursor);
			var substringAfterCursor = currentElementText.substring((numberOfCharactersBeforeCursor + 1) , currentElementLength);
			$(currentElement).html(substringBeforeCursorAfterDeletion + substringAfterCursor);
			setTextAndLength();
			cursorLeftPosition();
		}
		//Case for when entering pressed keyboard keys into the span
		else if(e.keyCode==32 || (e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=65 && e.keyCode<=90) || (e.keyCode>=96 && e.keyCode<=105)){

			var substringBeforeCursor = currentElementText.substring(0, numberOfCharactersBeforeCursor);
			var substringAfterCursor = currentElementText.substring(numberOfCharactersBeforeCursor, currentElementLength);
			$(currentElement).html(substringBeforeCursor+ e.key + substringAfterCursor);
			numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor + 1;
			setTextAndLength();
			cursorLeftPosition();
		}
	});
});