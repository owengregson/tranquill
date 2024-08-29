const LOCAL_VERSION_URL = chrome.runtime.getURL("manifest.json");
const REMOTE_VERSION_URL =
	"https://owengregson.github.io/tranquill/manifest.json";

self.addEventListener("activate", (event) => {
	event.waitUntil(checkVersion());
});

async function checkVersion() {
	const isNewVersionAvailable = await versionCheck();

	if (!isNewVersionAvailable) {
		await chrome.action.setPopup({ popup: "../pages/popup.html" });
	}
}

async function versionCheck() {
	try {
		const localVersion = await fetchLocalVersion();
		const remoteVersion = await fetchRemoteVersion();

		if (localVersion.version !== remoteVersion.version) {
			await saveNewVersion(remoteVersion.version);
			return true; // New version is available
		}
	} catch (error) {
		console.log(error);
		return true; // Assume there's an update to prevent potential issues
	}
	return false; // No new version available
}

function fetchLocalVersion() {
	return fetch(LOCAL_VERSION_URL)
		.then((response) => response.json())
		.catch((error) => {
			console.log("Failed to load local version:", error);
			return null;
		});
}

function fetchRemoteVersion() {
	return fetch(REMOTE_VERSION_URL, { cache: "no-store" })
		.then((response) => response.json())
		.catch((error) => {
			console.log("Failed to load remote version:", error);
			return null;
		});
}

function saveNewVersion(version) {
	return new Promise((resolve) => {
		chrome.storage.local.set({ appVersion: version }, () => {
			resolve();
		});
	});
}
