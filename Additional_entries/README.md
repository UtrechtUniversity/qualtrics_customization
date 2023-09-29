# Additional Entries

To implement the provided code of this folder on your Qualtrics survey/form:
- follow the steps described in the general README of the repository --> section **Use the code** --> specifically for **_Customized questions with embedded data_**
- for the step where you have to **_"Copy and paste the provided code (individual README file in each folder) in the HMTL View"_** use the following code snippet:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Additional Entries</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <style>
        /* Style for the "Remove" button */
        .remove-entry {
            background-color: #FF4646; /* Red background color */
            border-radius: 5px; /* Add curved edges */
            color: white; /* Set text color to white */
        }

        /* Style for the "Add" button */
        .add-entry {
            background-color: #FFCD00;
            border-radius: 5px; /* Add curved edges */
        }
    </style>
</head>
<body>
    <form id="add_entries_form">
        <div class="entry_block" data-entry-id="1">
            <label for="fullName">Full Name:</label>
            <input type="text" name="fullName" id="fullName_1" placeholder="John Doe" style="width: 250px;">
            <br><br>

            <label for="email">Email:</label>
            <input type="email" name="email" id="email_1" placeholder="johndoe@example.com" style="width: 250px;">
            <br><br>
            
            <button type="button" class="add-entry">Add Entry</button>
            <button type="button" class="remove-entry" style="display: none;">Remove Entry</button> <!-- Initially hidden -->
            <hr>
        </div>
    </form>

    <div id="max-entries-message" style="display: none; color: red;">
        Maximum 2 additional entries allowed.
    </div>

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
</body>
</html>
```
