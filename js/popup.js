// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
	const guideButton = document.querySelector(".guide-link");
	const textInput = document.getElementById("text-input");
	const saveButton = document.querySelector(".save-button");
	const resetButton = document.querySelector(".reset-button");
	const startButton = document.querySelector(".start-button");
	const stopButton = document.querySelector(".stop-button");

	chrome.storage.local.get("savedText").then((result) => {
		if (result.savedText) {
			textInput.value = result.savedText;
		}
	});

	guideButton.addEventListener("click", function () {
		chrome.tabs.create({
			url: "https://github.com/owengregson/tranquill/",
		});
	});

	saveButton.addEventListener("click", function () {
		const textToSave = textInput.value;
		chrome.storage.local.set({ savedText: textToSave }).then(() => {
			console.log("Text saved:", textToSave);
		});
	});

	resetButton.addEventListener("click", function () {
		textInput.value = ""; // Clear the input field
		chrome.storage.local.remove("savedText").then(() => {
			console.log("Saved text removed");
		});
	});

	startButton.addEventListener("click", function () {
		chrome.storage.local.get("savedText").then((result) => {
			if (result.savedText) {
				chrome.runtime.sendMessage({
					action: "typeText",
					text: result.savedText,
				});
			}
		});
	});

	stopButton.addEventListener("click", function () {
		chrome.runtime.sendMessage({ action: "stopTyping" });
	});
});
