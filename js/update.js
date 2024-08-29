document.addEventListener("DOMContentLoaded", function () {
	const updateButton = document.querySelector(".update-button");
	updateButton.addEventListener("click", function () {
		chrome.tabs.create({
			url: "https://github.com/owengregson/tranquill/",
		});
	});
});