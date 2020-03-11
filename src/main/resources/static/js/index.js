
$(document).ready(() => {
    // Setup login request
    $.get("/api/user", function(data) {
        $("#user").html(data.name);
        $(".unauthenticated").hide();
        $(".authenticated").show()
    });
});

// logout function
const logout = function() {
    $.post("/logout", function() {
        $("#user").html('');
        $(".unauthenticated").show();
        $(".authenticated").hide();
    });
    return true;
};
