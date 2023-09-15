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
        var entryBlock = $(".entry_block:first").clone();
        entryBlock.find("input").val("");
        entryBlock.find(".add-entry").hide();
        entryBlock.find(".remove-entry").show(); // Show the remove button
        $("#max-entries-message").before(entryBlock);
        updateButtonVisibility();
    });

    // Function to remove an entry block
    $(document).on("click", ".remove-entry", function() {
        if ($(".entry_block").length > 1) {
            $(this).closest(".entry_block").remove();
            updateButtonVisibility();
        }
    });

    updateButtonVisibility();
});
