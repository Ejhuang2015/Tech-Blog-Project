// Navbar functionality
// Opens/Closes nav menu on click of hamburger menu
$(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});
// Closes all dropdown menus when a nav menu link is clicked
$(".navLink").click(function () {
    $(".navbar-burger").removeClass("is-active");
    $(".navbar-menu").removeClass("is-active");
    $(".has-dropdown").removeClass("is-active");
    $(".navbar-dropdown").addClass("hidden");
});
// Closes all nav menus when clicking...
$(document).click(function () {
    $(".navbar-burger").removeClass("is-active");
    $(".navbar-menu").removeClass("is-active");
    $(".has-dropdown").removeClass("is-active");
    $(".navbar-dropdown").addClass("hidden");
});
// ...except when clicking the mobile nav-bar or the dropdown menus
$(".navbar-brand").click(function (event) {
    event.stopPropagation();
});
$(".navbar-menu").click(function (event) {
    event.stopPropagation();
});