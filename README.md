# Simple RTC phone with recording
Simple NodeJS web app that allows users to call each other via webrtc by name and store conversation
record at the server side for further listening.

## Installation
1. `git clone https://github.com/cylon-v/simple_rtc.git`
2. `npm install`
3. `bower install`

## Running
`grunt`

## Usage
1. Open http://localhost:3000 in your browser.
2. Sign in as 'user1' with password 'user'.
3. Open http://localhost:3000 in private window.
4. Sign in as 'user2' with password 'user'.
5. As user1 make a call to user2 using 'call' button.
6. user1 and user2 will see call page with browser notification that requires
an approval to use your microphone. Approve this. After that the call will be started.
7. When you click hang-up button the conversation will be stopped, automatically recorded and
 sent to the server.
8. You can see calls history at 'History' page. Also you can play recorded calls.

## Limitations
Current implementation of the application uses MediaRecorder object that is implementation
of MediaStream Recording API (http://w3c.github.io/mediacapture-record/MediaRecorder.html).
Currently MediaRecorder implemented only in Mozilla Firefox (https://developer.mozilla.org/ru/docs/Web/API/MediaRecorder).
Therefore client side of the application can work only in Mozilla Firefox version > 29.0.

The application doesn't use real database. All data is stored in memory and will be lost after restart.
