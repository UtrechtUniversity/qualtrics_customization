# Autocompletion Feature

To implement the provided code of this folder on your Qualtrics survey/form:
- follow the steps described in the general <a href = "https://github.com/AristotleKandylas/qualtrics_customization/blob/main/README.md" target ="_blank" >**README**</a> of the repository --> section **Use the code** --> specifically for **_Customized questions with embedded data_**
- for the step where you have to **_"Copy and paste the provided code (individual README file in each folder) in the HMTL View"_** use the following code snippet:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form with Autocomplete</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <form>
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" placeholder="John Doe" required style="width: 250px;">
        <br><br>

        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="johndoe@domain.com" required style="width: 250px;">
        <br><br>
    </form>

    <script>
        $(document).ready(function() {
            var data = {
                "name1": { email: "email1@domain.com" },
                "name2": { email: "email2@domain.com" },
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
    </script>
</body>
</html>
```
