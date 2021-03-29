// 4 minutes before warning appears
const timeoutWarning = 240000;
// const timeoutWarning = 10000;
// 1 minute after warning appears, user is logged out.
const timeoutNow = 60000;
// const timeoutNow = 5000;
// Logout URL
var re = new RegExp(/^.*\//);
const baseURL = re.exec(window.location.href);
const logoutURL = `${baseURL}logout`;

let warningTimer;
let timeoutTimer;

// Start the idle timer
function startWarning() {
    warningTimer = setTimeout("idleTimer()", timeoutWarning);
}

// Reset the idle timer and start the warning timer after countdown ends
function idleTimer() {
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout("idleTimeout()", timeoutNow);
    $("#timeoutModal").addClass("is-active");
}

// Log the user out after warning countdown ends
function idleTimeout() {
    window.location = logoutURL;
}

// Reset/restart the timer(s). Removes the warning modal
function resetTimer() {
    $("#timeoutModal").removeClass("is-active");
    clearTimeout(warningTimer);
    clearTimeout(timeoutTimer);
    startWarning();
}

function setupTimers() {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("onscroll", resetTimer, false);
    startWarning();
}

$(document).ready(function () {
    setupTimers();
});