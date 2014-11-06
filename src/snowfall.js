;(function() {

	'use strict';

	var version = '0.1';

	var snowFall = function() {

		var self = this;
		
		var canvas, context, limit = 50;

		var initialisation = {

			handler: function() {

				initialisation.createCanvas(initialisation.setCanvas);

				canvasMethods.handler();

			},

			createCanvas: function(callback) {

				var canvas = document.createElement('canvas');
					canvas.id = 'snowFall';
					canvas.height = document.documentElement.clientHeight;
					canvas.width = document.documentElement.clientWidth;
					canvas.style.position = 'absolute';
					canvas.style.top = 0;
					canvas.style.left = 0;
					canvas.style.zIndex = -1;

				document.body.appendChild(canvas);

				if(typeof callback == 'function') callback.call();

			},

			setCanvas: function() {

				canvas = document.getElementById('snowFall');
				context = canvas.getContext('2d');

			}

		}

		var canvasMethods = {

			flakes: {},

			handler: function() {

				var i = 0;

				setInterval(function() {

					i++;

					if(i >= limit) return;

					var index = i,
						x = Math.round(Math.random() * canvas.width),
						radius = Math.round(Math.random() * 6);

					canvasMethods.drawFlake(x, -10, radius, index);
					
				}, 300);
				

				window.fall = requestAnimationFrame(function(){

					context.clearRect(0, 0, canvas.width, canvas.height);

					canvasMethods.flakeDrop();

				})

			},

			drawFlake: function(x, y, radius, index) {

				context.beginPath();
				context.arc(
					x,
					y,
					radius,
					0,
					Math.PI * 2,
					true
				);

				var gradient = context.createRadialGradient(10, 0, 0, 850, 50, 1000);
					gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
					gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

				context.fillStyle = gradient;
				context.fill();

				canvasMethods.flakes[index] = {

					x: x, 
					y: y,
					radius: radius,

				};

			},

			flakeDrop: function() {

				for(var entry in canvasMethods.flakes) {

					var flake = canvasMethods.flakes[entry];

					canvasMethods.drawFlake(

						canvasMethods.calcXPos(flake),
						canvasMethods.calcYPos(flake),
						flake.radius,
						entry

					);

				}

				window.fall = requestAnimationFrame(function(){

					context.clearRect(0, 0, canvas.width, canvas.height);

					canvasMethods.flakeDrop();

				})

			}, 

			calcXPos: function(flake) {


				if(flake.x > (canvas.width + flake.radius)) {

					return flake.radius;

				} else if(flake.x < (-flake.radius)) {


					return (canvas.width + flake.radius);

				} else {


					return flake.x +0.5;

				}

			}, 

			calcYPos: function(flake) {

				if(flake.y > (canvas.height + flake.radius)) {

					return -flake.radius;

				} else {

					return flake.y +=(flake.radius / 8);
					
				}
				
			}

		}

		initialisation.handler();

	}

	window.onload = function() {

		window.snowFall = new snowFall();

	};

})();