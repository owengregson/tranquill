<div align="center">
    <img src="./assets/images/icon_128x.png" alt="tranquill logo" width="48px" height="48px"/>
    <h1>tranquill</h1>
    <h3>Real-time automated typing bot for Google Chrome.</h3>
</div>

<h2>Overview</h2>
<p>
    <strong>tranquill</strong> is a real-time automated typing bot designed to work seamlessly with Google Chrome. This extension allows you to automate typing tasks on websites such as Google Docs, simulating human-like typing while doing so.


	Using tranquill, you can create realistic edit history
	on your documents, rather than pasting
	and having everything appear at once.

</p>

<h3>⚠️ This code is provided for educational purposes only. I am not liable for any misuse of this script such as using it to secretly violate academic integrity policies. Use at your own risk.</h3>

<h2>Features</h2>
<ul>
	<li><strong>Completely Undetectable:</strong> Simulates keypresses in a way that appears to like native keypresses, undetectable to any website.</li>
    <li><strong>Human-like Typing Simulation:</strong> Simulates realistic typing behavior, including variable typing speed, pauses, and delays based on key distances and human typing habits.</li>
    <li><strong>Version Control:</strong> Automatically checks for updates to ensure you always have the latest features and improvements.</li>
    <li><strong>User-Friendly Interface:</strong> Simple and intuitive UI to control and customize your typing tasks.</li>
</ul>

<h2>Installation</h2>
<p>
    <strong>tranquill</strong> is currently not available in the Chrome Web Store. To install the extension, you will need to load it locally in Developer Mode. Follow the steps below:
</p>

<h3>Step 1: Download the Extension Files</h3>
<ol>
    <li>Clone or download the <strong>tranquill</strong> repository from this GitHub by clicking the <strong>green Code button</strong>, then clicking <strong>Download ZIP</strong>.</li>
    <li>Once downloaded, extract the ZIP file to a folder on your computer.</li>
</ol>
<img src="./assets/images/install_step_1.png" alt="web page showing green code button"/>
<br><br>
<img src="./assets/images/install_step_2.png" alt="web page showing gray download ZIP button"/>
<br><br>
<img src="./assets/images/install_step_3.png" alt="mac os interface showing hovering open button"/>

<h3>Step 2: Enable Developer Mode in Chrome</h3>
<ol>
    <li>Open Google Chrome.</li>
    <li>Navigate to <code>chrome://extensions/</code>.</li>
    <li>In the top right corner, toggle the switch to enable <strong>Developer mode</strong>.</li>
</ol>

<img src="./assets/images/install_step_4.png" alt="url bar showing chrome extensions url"/>
<br><br>
<img src="./assets/images/install_step_5.png" alt="toggle slider showing enabling developer mode"/>

<h3>Step 3: Load the Extension</h3>
<ol>
    <li>Click on the <strong>Load unpacked</strong> button in the top left corner.</li>
    <li>In the file dialog, navigate to the folder where you extracted the <strong>tranquill</strong> files.</li>
    <li>Select the folder and click <strong>Open</strong>.</li>
    <li>The <strong>tranquill</strong> extension should now appear in your list of extensions.</li>
</ol>

<img src="./assets/images/install_step_6.png" alt="button labeled load unpacked"/>
<br><br>
<img src="./assets/images/install_step_7.png" alt="file dialog with tranquill folder selected"/>

<h3>Step 4: Select and Pin Extension</h3>
<ol>
    <li>Click the extension button and select the <strong>tranquill extension</strong>.</li>
    <li></strong>Pin</strong> the extension to the taskbar, and click it to open the GUI.</li>
</ol>

<img src="./assets/images/install_step_8.png" alt="extensions icon"/>
<br><br>
<img src="./assets/images/install_step_9.png" alt="extension in list showing the pin icon"/>
<br><br>
<img src="./assets/images/install_step_10.png" alt="clicking tranquill icon"/>

<h2>Usage</h2>
<p>
    <strong>tranquill</strong> is designed to be intuitive and easy to use, with a focus on automating typing tasks in real-time. Here’s a step-by-step guide on how to use it:
</p>

<h3>Step 1: Open the Extension Popup</h3>
<p>
    Click on the <strong>tranquill</strong> icon in the Chrome toolbar to open the extension's popup interface.
</p>

<img src="./assets/images/gui.png" alt="tranquill gui"/>

<h3>Step 2: Enter Text</h3>
<p>
    In the popup, you will see a text input field labeled "Text Queue". Enter or paste the text that you want <strong>tranquill</strong> to type. Then, press the blue <strong>Save</strong> button.
</p>

<h3>Step 3: Start Typing</h3>
<p>
    Click the green <strong>Start</strong> button. <strong>tranquill</strong> will begin typing the text into the active element on the webpage. The typing speed and behavior will mimic human typing, including natural delays between keystrokes.
</p>

<h3>Step 4: Stop Typing</h3>
<p>
    If you need to stop the typing process, simply click the red <strong>Stop</strong> button in the popup.
</p>

<h3>Step 5: Resetting the Input</h3>
<p>
    If you want to clear the text queue, click the gray <strong>Reset</strong> button. This will clear the input field and stop any ongoing typing tasks.
</p>

<h2>Update Notifications</h2>
<p>
    <strong>tranquill</strong> includes a built-in update notification system that checks for new versions each time the service worker is activated. If a new version is detected, the default popup is set to an update notification page, prompting you to update.
</p>

<h3>How to Update</h3>
<ol>
    <li>When an update is available, the extension will automatically show an <strong>Update Required</strong> page.</li>
    <li>Click the <strong>Update Now</strong> button to visit this repository, and follow the installation instructions found above.</li>
</ol>

<h2>Troubleshooting</h2>
<ul>
    <li><strong>Extension Not Loading:</strong> Make sure Developer Mode is enabled and the folder you selected is correct.</li>
    <li><strong>Version Check Failing:</strong> Ensure you have an active internet connection and that github.com is accessible on your WiFi network.</li>
    <li><strong>Typing Issues:</strong> Verify that the active element on the webpage is an input field or editable area where typing is possible.</li>
</ul>
<p>
    For more detailed troubleshooting, please visit the <a href="https://github.com/owengregson/tranquill/issues">issues section</a> of this repository.
</p>

<h2>License</h2>
<p>
    <strong>tranquill</strong> is licensed under the MIT License. See the <a href="./LICENSE">LICENSE</a> file for more details.
</p>

<h2>Contributing</h2>
<p>
    We welcome contributions from the community! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request with your changes.
</p>
<br>
<div align="center">
    <p>Happy Typing with tranquill!</p>
    <img src="./assets/images/icon_128x.png" alt="tranquill logo" width="64"/>
</div>
