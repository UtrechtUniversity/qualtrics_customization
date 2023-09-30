$(document).ready(function() {
    var data = {
        "name1": { email: "email1@domain.com" },
        "name2": { email: "email2@domain.com" }
        // Add more mappings as needed
    };

    function applyAutocomplete(inputField, sourceKey, embeddedDataField) {
        inputField.autocomplete({
            source: function(request, response) {
                var term = request.term.toLowerCase();
                var suggestions = [];
                $.each(data, function(key, value) {
                    if (sourceKey === "full_name" && key.toLowerCase().indexOf(term) !== -1) {
                        suggestions.push(key);
                    } else if (sourceKey === "email" && value.email.toLowerCase().indexOf(term) !== -1) {
                        suggestions.push(value.email);
                    }
                });
                response(suggestions);
            },
            select: function(event, ui) {
                var selectedValue = ui.item.value;
                inputField.val(selectedValue);

                // Update embedded data fields
                var entryNumber = inputField.attr("id") === "fullName" ? "1" : "2";
                if (inputField.attr("id") === "fullName") {
                    Qualtrics.SurveyEngine.setEmbeddedData('metadata_name', selectedValue);

                    // Autocomplete the Email field
                    $("#email").val(data[selectedValue].email);
                    Qualtrics.SurveyEngine.setEmbeddedData('metadata_email', data[selectedValue].email);
                } else if (inputField.attr("id") === "email") {
                    Qualtrics.SurveyEngine.setEmbeddedData('metadata_email', selectedValue);

                    // Autocomplete the Full Name field
                    $("#fullName").val(Object.keys(data).find(key => data[key].email === selectedValue));
                    Qualtrics.SurveyEngine.setEmbeddedData('metadata_name', Object.keys(data).find(key => data[key].email === selectedValue));
                }
            }
        });
    }

    applyAutocomplete($("#fullName"), "full_name", "metadata_name"); // Apply autocomplete for Full Name using keys from data
    applyAutocomplete($("#email"), "email", "metadata_email"); // Apply autocomplete for Email using Email data
});
