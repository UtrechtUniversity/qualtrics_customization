$(document).ready(function() {
    var data = {
        "name1": { email: "email1@domain.com", id: "ID001" },
        "name2": { email: "email2@domain.com", id: "ID002" },
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
                    } else if (sourceKey !== "full_name" && value[sourceKey].toLowerCase().indexOf(term) !== -1) {
                        suggestions.push(value[sourceKey]);
                    }
                });
                response(suggestions);
            },
            select: function(event, ui) {
                var selectedValue = ui.item.value;
                var selectedData;
                if (sourceKey === "full_name") {
                    selectedData = data[selectedValue];
                    $("#fullName").val(selectedValue);
                } else {
                    selectedData = Object.values(data).find(item => item[sourceKey] === selectedValue);
                    $("#fullName").val(Object.keys(data).find(key => data[key] === selectedData));
                }
                $("#email").val(selectedData.email);
                $("#id").val(selectedData.id);
                
                // Update embedded data fields only if sourceKey is not "full_name"
                if (inputField.attr("id") === "fullName") {
                    Qualtrics.SurveyEngine.setEmbeddedData('fullName', selectedValue);
                    Qualtrics.SurveyEngine.setEmbeddedData('email', selectedData.email);
                    Qualtrics.SurveyEngine.setEmbeddedData('id', selectedData.id);
                } else if (inputField.attr("id") === "email") {
                    Qualtrics.SurveyEngine.setEmbeddedData('fullName', Object.keys(data).find(key => data[key] === selectedData));
                    Qualtrics.SurveyEngine.setEmbeddedData('email', selectedValue);
                    Qualtrics.SurveyEngine.setEmbeddedData('id', selectedData.id);
                } else if (inputField.attr("id") === "id") {
                    Qualtrics.SurveyEngine.setEmbeddedData('fullName', Object.keys(data).find(key => data[key] === selectedData));
                    Qualtrics.SurveyEngine.setEmbeddedData('email', selectedData.email);
                    Qualtrics.SurveyEngine.setEmbeddedData('id', selectedValue);
                }
            }
        });
    }

    applyAutocomplete($("#fullName"), "full_name", "fullName"); // Apply autocomplete for Full Name using keys from data
    applyAutocomplete($("#email"), "email", "email"); // Apply autocomplete for Email using Email data
    applyAutocomplete($("#id"), "id", "id"); // Apply autocomplete for ID using ID data
});
