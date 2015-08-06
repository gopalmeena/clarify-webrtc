# Clarify WebRTC Call Recording Demo
Simple NodeJS web app that allows users to call each other via webrtc and then index the recorded call for content searching.  This project is based on the work of Vladimir Kalinkin's [Simple RTC project](https://github.com/cylon-v/simple_rtc) and used with his permission.

## Purpose
The purpose of this project is to demonstrate how to integrate webrtc calling and recording with the [Clarify.io](http://clarify.io) media indexing API.

## How It Works
Users call each other in a webrtc browser session and each leg of the call is recorded and saved to disk. Upon completion of the call, the audio from each leg of the call is sent to Clarify to be indexed.  After the call has been indexed, users can search the contents of the audio from the Search menu

## Demo video
[Watch a demonstration of the application in action](https://www.youtube.com/watch?v=1DX_XG979kQ)

## Prerequisites
* Node 0.12
* Mongo DB

## Installation
1. `sudo npm install -g grunt-cli`
2. `git clone https://github.com/scottbarstow/clarify-webrtc.git`
2. `npm install`
3. `bower install`

## Configuration
1. `cp config.js.example config.js`
2. Configure the settings in config.js. You can find the Clarify API keys in the Clarify Developer Portal.
3. The BASE_URL setting must be addressable from outside your network in order for Clarify to send callbacks to the application.  For example, http://localhost:3000 will not work, but http://<yourexternalip> will work

## Running
`grunt seed`
`grunt`

## Usage
1. Open http://localhost:3000 in your browser.
2. Sign in as 'admin' with password 'admin'.
3. Open http://localhost:3000 in private window.
4. Sign up with a new user using the 'Sign Up' link in the upper right.
5. Make calls between the two users, ensuring that you grant access to the microphone when requested by the browser
7. After you hang up, the audio will be saved and sent to Clarify for indexing. When indexing is complete, the duration and cost will be updated on the Calls tab of the application. You can play the audio from your calls on that page.
8. Click on 'Search' to search the contents of your calls and play back the results.

## License
MIT
