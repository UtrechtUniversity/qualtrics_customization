<script>
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
            var entryCount = $(".entry_block").length + 1;
            entryBlock.attr("data-entry-id", entryCount); // Set a unique identifier
            entryBlock.find("input").val("");
            entryBlock.find(".add-entry").hide();
            entryBlock.find(".remove-entry").show(); // Show the remove button
            entryBlock.find("input").attr("id", "fullName_" + entryCount); // Update input ID
            entryBlock.find("input").attr("name", "fullName_" + entryCount); // Update input name
            entryBlock.find("input[type='email']").attr("id", "email_" + entryCount); // Update email input ID
            entryBlock.find("input[type='email']").attr("name", "email_" + entryCount); // Update email input name
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

        // Function to update embedded data fields
        $(document).on("input", "input[type='text'], input[type='email']", function() {
            var inputField = $(this);
            var entryId = inputField.closest(".entry_block").data("entry-id");
            var selectedValue = inputField.val();

            var metadataNameField = "metadata_name_" + entryId;
            var metadataEmailField = "metadata_email_" + entryId;

            if (inputField.attr("id") === "fullName_" + entryId) {
                Qualtrics.SurveyEngine.setEmbeddedData(metadataNameField, selectedValue);
            } else if (inputField.attr("id") === "email_" + entryId) {
                Qualtrics.SurveyEngine.setEmbeddedData(metadataEmailField, selectedValue);
            }
        });

        updateButtonVisibility();
    });
</script>
