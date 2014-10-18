;(function() {

	// Let be strict! - It will help flag up bad practices.
	'use strict';

	// Set a version for future tracking/releases.
	var version = '0.1';

	var snowFall = function() {

		var self = this;
		
		// Global variables for this app.
		var canvas, context, limit = 10;



		// An initialisation object, lets put all our 'set-up' functions in here.
		var initialisation = {

			// Initialisation handler, this is where it all starts.
			handler: function() {

				// Create the canvas tag and fire setCanvas as a callback.
				initialisation.createCanvas(initialisation.setCanvas);

				// Call the draw method in the canvasMethods object.
				canvasMethods.handler();

			},

			// Canvas tag creation.
			createCanvas: function(callback) {

				// Set all the canvas stuff.
				var canvas = document.createElement('canvas');
					canvas.id = 'snowFall';
					canvas.height = document.documentElement.clientHeight;
					canvas.width = document.documentElement.clientWidth;
					canvas.style.position = 'absolute';
					canvas.style.top = 0;
					canvas.style.left = 0;
					canvas.style.zIndex = -1;

				// Append to the body
				document.body.appendChild(canvas);

				//Adding in a callback for this function, check to see if it's a function and call it if it is after all the above code has fired.
				if(typeof callback == 'function') callback.call();

			},

			// Setting the global canvas and context variables so we can use them throughout.
			setCanvas: function() {

				canvas = document.getElementById('snowFall');
				context = canvas.getContext('2d');

			}

		}

		// Creating a canvasMethod object that will keep all our canvas drawing away from the rest of the app.
		var canvasMethods = {

			flakes: {},

			handler: function() {

				for(var i = 0; i < limit; i++){

					var index = i;

					var x = Math.round(Math.random() * canvas.width);

					var radius = Math.random() * 10;

					canvasMethods.drawFlake(x, radius, index);

				}

				console.log(canvasMethods.flakes);

			},

			drawFlake: function(x, radius, index) {

				context.clearRect(0, 0, canvas.width, canvas.height);

				context.arc(
					x,
					0,
					radius,
					0,
					Math.PI * 2,
					true
				);

				context.fillstyle = 'black';
				context.fill();

				canvasMethods.flakes[index] = {

					x: x, 
					radius: radius,
					y: 0

				};

			}

		}

		// When the object is created on window.load it runs everything inside, you need to make sure you fire the initialisation handler.
		initialisation.handler();

	}

	// Wait for window load so it doesn't throw a hissy fit.
	window.onload = function() {

		// Make an global object called snowFall, accessible throughout the site via the console/script files.
		window.snowFall = new snowFall();

	};

})();