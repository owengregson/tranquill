try {
	importScripts("version-check.js");
} catch (e) {
	console.error(e);
}

const qwertyLayout = {
	q: [0, 0],
	w: [1, 0],
	e: [2, 0],
	r: [3, 0],
	t: [4, 0],
	y: [5, 0],
	u: [6, 0],
	i: [7, 0],
	o: [8, 0],
	p: [9, 0],
	a: [0, 1],
	s: [1, 1],
	d: [2, 1],
	f: [3, 1],
	g: [4, 1],
	h: [5, 1],
	j: [6, 1],
	k: [7, 1],
	l: [8, 1],
	z: [0, 2],
	x: [1, 2],
	c: [2, 2],
	v: [3, 2],
	b: [4, 2],
	n: [5, 2],
	m: [6, 2],
	" ": [9, 2], // space mapped to far right
};

function calculateDistance(char1, char2) {
	const pos1 = qwertyLayout[char1.toLowerCase()] || [0, 0];
	const pos2 = qwertyLayout[char2.toLowerCase()] || [0, 0];
	return Math.sqrt(
		Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2)
	);
}

function getHumanLikeDelay(char, prevChar) {
	const baseSpeed = 60000 / 100 / 5; // Base delay per character at 100 WPM
	let delay = baseSpeed;

	if (char === " ") {
		delay *= 0.5; // Space is typed faster
	}

	// Increase delay based on the distance between keys
	if (prevChar) {
		const distance = calculateDistance(prevChar, char);
		delay += distance * 10;
	}

	if (char === prevChar) {
		delay *= 0.7; // Typing repeated characters is faster
	}

	const commonPairs = ["th", "he", "in", "er", "an"];
	if (prevChar && commonPairs.includes(prevChar + char)) {
		delay *= 0.85; // Common pairs are typed faster
	}

	delay += Math.random() * 50 - 25; // Randomness between -25ms to +25ms

	delay = Math.max(50, delay); // Minimum delay of 50ms

	return delay;
}

function typeTextWithHumanLikeDelays(text, callback) {
	let prevChar = null;
	text.split("").forEach((char, index) => {
		const delay = getHumanLikeDelay(char, prevChar);
		setTimeout(() => {
			callback(char); // Send character to be typed
		}, delay * index);
		prevChar = char;
	});
}

let isTyping = false; // Track if typing is ongoing
let isDebuggerInjected = false; // Track if the debugger is currently injected
let currentTimeouts = []; // Track all timeouts to clear them when needed

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "typeText") {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tabId = tabs[0].id;

			// Attach the debugger to the active tab if not already attached
			if (!isDebuggerInjected) {
				chrome.debugger.attach({ tabId: tabId }, "1.3", () => {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError.message);
						return;
					}
					isDebuggerInjected = true;
				});
			}

			// Start typing process
			isTyping = true;

			const delays = [];
			let cumulativeDelay = 0;

			// Pre-calculate the delays for each character
			for (let i = 0; i < message.text.length; i++) {
				const char = message.text[i];
				const prevChar = i > 0 ? message.text[i - 1] : null;
				const delay = getHumanLikeDelay(char, prevChar);
				cumulativeDelay += delay;
				delays.push(cumulativeDelay);
			}

			// Function to type each character using the pre-calculated delays
			for (let i = 0; i < message.text.length; i++) {
				const timeoutId = setTimeout(() => {
					if (!isTyping) return; // Exit if typing is stopped

					const char = message.text[i];
					const isUpperCase =
						char === char.toUpperCase() && char.match(/[A-Z]/);
					const needsShift = char.match(/[!@#$%^&*()_+{}:"<>?|~]/);

					if (isUpperCase || needsShift) {
						// Press Shift
						chrome.debugger.sendCommand(
							{ tabId: tabId },
							"Input.dispatchKeyEvent",
							{
								type: "keyDown",
								key: "Shift",
								windowsVirtualKeyCode: 16,
								nativeVirtualKeyCode: 16,
								macCharCode: 0,
							}
						);
					}

					// Type the character
					chrome.debugger.sendCommand(
						{ tabId: tabId },
						"Input.dispatchKeyEvent",
						{
							type: "keyDown",
							text: char,
							unmodifiedText: char,
							key: char,
							windowsVirtualKeyCode: char.charCodeAt(0),
							nativeVirtualKeyCode: char.charCodeAt(0),
							macCharCode: char.charCodeAt(0),
						}
					);

					if (isUpperCase || needsShift) {
						// Release Shift
						chrome.debugger.sendCommand(
							{ tabId: tabId },
							"Input.dispatchKeyEvent",
							{
								type: "keyUp",
								key: "Shift",
								windowsVirtualKeyCode: 16,
								nativeVirtualKeyCode: 16,
								macCharCode: 0,
							}
						);
					}
				}, delays[i]);

				currentTimeouts.push(timeoutId); // Keep track of all timeouts
			}

			// Detach the debugger after typing is complete
			setTimeout(() => {
				if (isTyping) {
					detachDebugger(tabId);
				}
			}, cumulativeDelay + 100); // Extra time buffer after the last keypress
		});
	} else if (message.action === "stopTyping") {
		stopTyping();
	}
});

function stopTyping() {
	isTyping = false; // Set typing state to false to stop typing

	// Clear all scheduled timeouts to stop further typing
	currentTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
	currentTimeouts = []; // Reset the timeout array

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tabId = tabs[0].id;
		if (isDebuggerInjected) {
			detachDebugger(tabId);
		}
	});
}

function detachDebugger(tabId) {
	chrome.debugger.detach({ tabId: tabId }, () => {
		if (!chrome.runtime.lastError) {
			isDebuggerInjected = false; // Reset debugger state
		}
	});
}
