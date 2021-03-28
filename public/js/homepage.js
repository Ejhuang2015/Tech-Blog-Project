// Send user to post's page
$(".linkDiv").on("click", function() {
    const postID = this.getAttribute('value');
    const postURL = `${window.location.href}post/${postID}`;
    window.location = postURL;
});