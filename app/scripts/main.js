/* eslint-env browser */
(function() {
	'use strict';

	// Check to make sure service workers are supported in the current browser,
	// and that the current page is accessed from a secure origin. Using a
	// service worker from an insecure origin will trigger JS console errors. See
	// http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
	var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
	);

	if ('serviceWorker' in navigator &&
		(window.location.protocol === 'https:' || isLocalhost)) {
		navigator.serviceWorker.register('service-worker.js')
			.then(function(registration) {
				// updatefound is fired if service-worker.js changes.
				registration.onupdatefound = function() {
					// updatefound is also fired the very first time the SW is installed,
					// and there's no need to prompt for a reload at that point.
					// So check here to see if the page is already controlled,
					// i.e. whether there's an existing service worker.
					if (navigator.serviceWorker.controller) {
						// The updatefound event implies that registration.installing is set:
						// https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
						var installingWorker = registration.installing;

						installingWorker.onstatechange = function() {
							switch (installingWorker.state) {
								case 'installed':
									// At this point, the old content will have been purged and the
									// fresh content will have been added to the cache.
									// It's the perfect time to display a "New content is
									// available; please refresh." message in the page's interface.
									break;

								case 'redundant':
									throw new Error('The installing ' +
										'service worker became redundant.');

								default:
									// Ignore
							}
						};
					}
				};
			}).catch(function(e) {
				console.error('Error during service worker registration:', e);
			});
	}

	// Your custom JavaScript goes here

	//typing effect code below
	function autoType(elementClass, typingSpeed) {
		var thhis = $(elementClass);
		thhis.css({
			"position": "relative",
			"display": "inline-block"
		});
		thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
		thhis = thhis.find(".text-js");
		var text = thhis.text().trim().split('');
		var amntOfChars = text.length;
		var newString = "";
		thhis.text("|");
		setTimeout(function() {
			thhis.css("opacity", 1);
			thhis.prev().removeAttr("style");
			thhis.text("");
			for (var i = 0; i < amntOfChars; i++) {
				(function(i, char) {
					setTimeout(function() {
						newString += char;
						thhis.text(newString);
					}, i * typingSpeed);
				})(i + 1, text[i]);
			}
		}, 1500);
	}

	$(document).ready(function() {
		// Now to start autoTyping just call the autoType function with the 
		// class of outer div
		// The second paramter is the speed between each letter is typed.   
		autoType(".type-js", 200);


	});

	//typing effect code ends


	//Api Related
	var eventsApi = "http://suparna.pythonanywhere.com/events/";
	var speakersApi = "http://suparna.pythonanywhere.com/speakers/";

	// dojo code below

	var preEvents = [];
	var speakers = [];
	require(
		[
			'dojo/dom',
			'dojo/dom-construct',
			'dojo/request'
		],
		function(dom, domConstruct, request) {

			//api integration and dynamic binding 
			// events api call starts
			request.get(eventsApi).then(
				function(response) {
					// console response
					preEvents = JSON.parse(response)
					// console.log("preEvents :",preEvents);

					// events dom building and binding starts
					request("./templates/prevEvents.html").then(
						function(prevEventsTemplate) {

							var prevEventsBuild = '';
							for (var prevEventIndex in preEvents) {
								var event = preEvents[prevEventIndex];
								var tempEventBuild = prevEventsTemplate;
								tempEventBuild = tempEventBuild.replace('$title', event.name);
								tempEventBuild = tempEventBuild.replace('$description', event.description);
								prevEventsBuild += tempEventBuild;
							}
							var prevEventsNode = dom.byId('prevEvents');
							domConstruct.place(prevEventsBuild, prevEventsNode);
						},
						function(error) {
							console.log("An error occurred: " + error);
						}
					);
					// events dom building and binding ends


				},
				function(error) {
					// console error
					console.log(error);
				}
			);
			// events api call ends


			// speakers api call starts
			request.get(speakersApi).then(
				function(response) {
					// console response
					speakers = JSON.parse(response)
					// console.log("speakers :",speakers);

					// speakers dom building and binding starts
					request("./templates/speakers.html").then(
						function(speakerTemplate) {

							var speakersBuild = '';
							for (var speakerIndex in speakers) {
								var speaker = speakers[speakerIndex];
								var tempspeakerBuild = speakerTemplate;
								tempspeakerBuild = tempspeakerBuild.replace('$name', speaker.name);
								if (speaker.designation == null)
									speaker.designation = ' ';
								tempspeakerBuild = tempspeakerBuild.replace('$designation', speaker.designation);
								speakersBuild += tempspeakerBuild;
							}
							var speakersNode = dom.byId('speakersData');
							domConstruct.place(speakersBuild, speakersNode);
						},
						function(error) {
							console.log("An error occurred: " + error);
						}
					);
					// events dom building and binding ends

				},
				function(error) {
					// console error
					console.log(error);
				}
			);
			// speakers api call ends

			//api integration and dynamic binding ends



		});





})();
