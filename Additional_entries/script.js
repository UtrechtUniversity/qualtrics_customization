$(document).ready(function() {
    var maxEntries = 2; // Maximum 2 additional entries

    function updateButtonVisibility() {
        var entryBlocks = $(".entry_block");
        var $addEntryButtons = $(".add-entry");

        // Initially hide all "Remove Entry" buttons
        $(".remove-entry").hide();

        if (entryBlocks.length < maxEntries + 1) {
            $addEntryButtons.show();
        } else {
            $addEntryButtons.hide();
        }

        // Show "Remove Entry" button in additional blocks
        entryBlocks.slice(1).find(".remove-entry").show();
    }

    // Function to add an entry block
    $(document).on("click", ".add-entry", function() {
        // JavaScript code to add an entry block
    });

    // Function to remove an entry block
    $(document).on("click", ".remove-entry", function() {
        // JavaScript code to remove an entry block
    });

    // Function to update embedded data fields
    $(document).on("input", "input[type='text'], input[type='email']", function() {
        // JavaScript code to update embedded data fields
    });

    updateButtonVisibility();
});
