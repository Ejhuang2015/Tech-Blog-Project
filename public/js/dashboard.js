// Create a new post 
$("#createPost").on("click", function () {
    // Hide the Posts screen and display the edit screen
    $("#viewScreen").toggleClass("hidden")
    $("#editScreen").toggleClass("hidden")
    // Unhide the createSubmit button
    $("#postSubmit").toggleClass("hidden")
    // Clear the fields
    $("#postTitle").val("");
    $("#postBody").val("");
});

// Edit an existing post
$(".editPostButton").on("click", function () {
    const postID = $(this).attr("data-value");
    // Hide the Posts screen and display the edit screen
    $("#viewScreen").toggleClass("hidden")
    $("#editScreen").toggleClass("hidden")
    // Unhide the editSubmit button
    $("#postSubmitEdit").toggleClass("hidden")
    editPost(postID);
});

// Delete an existing post
$(".deletePostButton").on("click", function () {
    const postID = $(this).attr("data-value");
    confirmDelete(postID);
});

// Submit the post information to database
$("#postSubmit").on("click", function () {
    submitPost();
});
// Submit the edit to database
$("#postSubmitEdit").on("click", function () {
    submitEdit();
});

// Return to view screen
$("#backButton").on("click", function () {
    $("#editScreen").addClass("hidden")
    $("#viewScreen").removeClass("hidden")
    $("#postSubmit").addClass("hidden")
    $("#postSubmitEdit").addClass("hidden")
    // Clear ID value
    $("#editScreen").attr("data-value", "");
});

// Update an existing post
function editPost(id) {
    // Store the id value
    $("#editScreen").attr("data-value", id);
    // Populate the fields with the existing post information
    $.get(`/api/posts/${id}`, (data) => {
        $("#postTitle").val(data.title);
        $("#postBody").val(data.content);
    });
}

// Submit the new post
function submitPost() {
    const newPost = {
        title: $("#postTitle").val(),
        content: $("#postBody").val(),
    }
    $.post("/api/posts", newPost, () => {
        location.reload();
    });

}

// Submit the edit
async function submitEdit() {
    const id = $("#editScreen").attr("data-value");
    const newPost = {
        title: $("#postTitle").val(),
        content: $("#postBody").val(),
    }
    await $.ajax({
        type: "PUT",
        url:`/api/posts/${id}`,
        data: newPost,
    })
    reloadPage();
}

// Open the delete confirmation page
function confirmDelete(id) {
    $("#confirmationModal").addClass("is-active");
    $("#confirmDelete").on("click", function () {
        deletePost(id);
    });
    $("#goBack").on("click", function () {
        $("#confirmationModal").removeClass("is-active");
    });
}

// Delete the post
async function deletePost(id) {
    await $.ajax({
        type: "DELETE",
        url:`/api/posts/${id}`,
    })
    reloadPage();
}

// Reloads the page
function reloadPage() {
    location.reload();
}