$(document).ready(function(){

	//Celeberations
	console.log('I work');

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

	//Variable for cursor's current left position.
	var cursorCurrentLeftPosition = 0;

	//Variable to keep track of number of characters before the cursor.
	var numberOfCharactersBeforeCursor = 0;

	//Variable to keep track of number of characters after the cursor.
	var numberOfCharactersAfterCursor = 0;

	//Creating a div to show cursor.
	var editorCursor = '<div class="editor-cursor" style="left:15px;"></div>';

	//Appending a span into body to get the left position of the cursor.
	var substringSpanForLeftPosition = '<span class="cursorLeftPosition" style="display:none;"></span>';
	$('body').append(substringSpanForLeftPosition);



	// //Method to return the x co-ordinate on click 	--karanhudia		-top removed
	// var leftValue = function(e, offset) {
	// 	return (e.pageX - offset.left);
	// };
	// //Method to return the y co-ordinate on click
	// var topValue = function(e, offset) {
	// 	return (e.pageY - offset.top - 8);
	// };
	

	/**********METHODS**********/

	//Method to set cursors left position
	var cursorLeftPosition = function(ifNew) {
		if((ifNew === undefined) || ifNew == false) {
			var substringBeforeCursor = $(currentElement).text().substring(0, numberOfCharactersBeforeCursor);
			$('.cursorLeftPosition').html(substringBeforeCursor);
			$('.editor-cursor').css('left', $('.cursorLeftPosition').width());
		}
		else {
			$('.editor-cursor').css('left', 0);
		}
	}

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
		currentElementLength = currentElementText.length;
	}

	//Event listeners for handling keyboard and mouse events
	$(document).on('click', '.new-line-relative', function(event){
	    $('.editor-cursor').remove();

		if (event.target.className == 'new-line-relative') {
			//Setting the last span child of this parent div as current element on clicking on empty space of that line
			setCurrentElement($(this).children().filter(':last'));
			setTextAndLength();
	    	$(currentElement).append(editorCursor);

	     	//Setting value of numberOfCharactersBeforeCursor & numberOfCharactersAfterCursor
	     	numberOfCharactersBeforeCursor = currentElementLength;
			numberOfCharactersAfterCursor = 0;
		}
		else if(event.target.className == 'font-16') {
			//Setting the clicked span as current element
	     	setCurrentElement(event.target);
			setTextAndLength();
			$(currentElement).append(editorCursor);

	     	//Getting the current selected character to place the cursor accordingly
	     	var selection = window.getSelection();

	     	//Setting value of numberOfCharactersBeforeCursor
	     	numberOfCharactersBeforeCursor = selection.focusOffset;
			numberOfCharactersAfterCursor = currentElementLength - numberOfCharactersBeforeCursor;
	     }
	    //Calling methods to set left position of cursor
	    cursorLeftPosition();
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
	    	$('.editor-cursor').remove();
			$(currentElement).parent().after(fontSize16);

			if(numberOfCharactersAfterCursor) {
				var nextSpans = $(currentElement).nextAll();
				var substringBeforeCursor = currentElementText.substring(0, numberOfCharactersBeforeCursor);
				var substringAfterCursor = currentElementText.substring(numberOfCharactersBeforeCursor , currentElementLength);

				$(currentElement).html(substringBeforeCursor);
				setCurrentElement($(currentElement).parent().next().children());
				$(currentElement).html(substringAfterCursor);
				nextSpans.appendTo($(currentElement).parent());
			}
			else {
				var sameLineSpanExists = $(currentElement).next().is('span');			//Boolean variable to tell if a span exists in the same line, after the current span
				
				if(sameLineSpanExists) {
					var nextSpans = $(currentElement).nextAll();

					setCurrentElement($(currentElement).parent().next().children());
					nextSpans.appendTo($(currentElement).parent());
				}
				else {
					setCurrentElement($(currentElement).parent().next().children());
				}
			}
			setTextAndLength();
			$(currentElement).append(editorCursor);
			numberOfCharactersBeforeCursor = 0;
			numberOfCharactersAfterCursor = currentElementLength - numberOfCharactersBeforeCursor;
	     	cursorLeftPosition(true);
		}

		//Case for when BACKSPACE is pressed.
		else if(e.keyCode == 8) {
			e.preventDefault();
			$('.editor-cursor').remove();
		    if(numberOfCharactersBeforeCursor) {
		    	numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor - 1;
				var substringBeforeCursorAfterDeletion = currentElementText.substring(0, numberOfCharactersBeforeCursor);
				var substringAfterCursor = currentElementText.substring((numberOfCharactersBeforeCursor + 1) , currentElementLength);
				$(currentElement).html(substringBeforeCursorAfterDeletion + substringAfterCursor);
				setTextAndLength();
		    }
		    else {
				var sameLineSpanExists = $(currentElement).prev().is('span');			//Boolean variable to tell if a span exists in the same line, before the current span
		    	var prevLineSpanExists = $(currentElement).parent().prev().is('div');	//Boolean variable to tell if a line exists before the current span

		    	if(sameLineSpanExists) {
		    		setCurrentElement($(currentElement).prev());
		    		setTextAndLength();
		    		numberOfCharactersBeforeCursor = currentElementLength - 1;
		    		var substringBeforeCursorAfterDeletion = currentElementText.substring(0, numberOfCharactersBeforeCursor);
		    		$(currentElement).html(substringBeforeCursorAfterDeletion);
		    		setTextAndLength();
		    		numberOfCharactersAfterCursor = 0;
		    	}
		    	else if(prevLineSpanExists) {
		    		var allSpans = $(currentElement).parent().children();
		    		setCurrentElement($(currentElement).parent().prev().children().filter(':last'));
		    		setTextAndLength();
		    		numberOfCharactersBeforeCursor = currentElementLength;
		    		numberOfCharactersAfterCursor = 0;
		    		allSpans.appendTo($(currentElement).parent());
		    		$(currentElement).parent().next().remove();
		    	}
		    }
		    
			$(currentElement).append(editorCursor);
			cursorLeftPosition();
		}
		//Case for when entering pressed keyboard keys into the span
		else if(e.keyCode==32 || (e.keyCode>=48 && e.keyCode<=57) || (e.keyCode>=65 && e.keyCode<=90) || (e.keyCode>=96 && e.keyCode<=111) || (e.keyCode>=186 && e.keyCode<=192) || (e.keyCode>=219 && e.keyCode<=222)){

			var substringBeforeCursor = currentElementText.substring(0, numberOfCharactersBeforeCursor);
			var substringAfterCursor = currentElementText.substring(numberOfCharactersBeforeCursor, currentElementLength);
			$(currentElement).html(substringBeforeCursor+ e.key + substringAfterCursor);
			numberOfCharactersBeforeCursor = numberOfCharactersBeforeCursor + 1;
			setTextAndLength();
			$(currentElement).append(editorCursor);
			cursorLeftPosition();
		}
	});
});