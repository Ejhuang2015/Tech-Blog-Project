// Show the comment panel
$("#commentButton").on("click", function() {
    $("#commentButton").addClass("hidden")
    $("#commentScreen").removeClass("hidden")
});

// Submit the comment
$("#submitComment").on("click", function() {
    submitComment();
});

function submitComment() {
    const newComment = {
        content:$("#commentBody").val(),
        post_id:$("#postID").attr("value"),
    }
    $.post("/api/comments", newComment, () => {
        location.reload();
    });
};