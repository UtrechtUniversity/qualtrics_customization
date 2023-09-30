# Set of Collapsible boxes

To implement the provided code of this folder on your Qualtrics survey/form:
- follow the steps described in the general <a href = "https://github.com/AristotleKandylas/qualtrics_customization/blob/main/README.md" target ="_blank" >**README**</a> of the repository --> section **Use the code** --> specifically for **_Customized questions with no embedded data_**
- for the step where you have to **_"Copy and paste the provided code (individual README file in each folder) in the HMTL View"_** use the following code snippet:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Collapsible Boxes Set</title>
    <style>
        .collapsible {
            background-color: #FFCD00;
            color: white;
            cursor: pointer;
            padding: 18px;
            width: 100%;
            border: none;
            text-align: left;
            outline: none;
            font-size: 15px;
            position: relative;
            padding-left: 40px;
            transition: background-color 0.2s ease;
        }

        .active, .collapsible:hover {
            background-color: #b6b4ab;
        }

        .collapsible:before {
            content: '\25B6'; /* Initially pointing to the right */
            color: white;
            font-weight: bold;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%) rotate(0deg);
            transition: transform 0.2s ease;
        }

        .active:before {
            content: "\25B6"; /* Pointing right when active */
            transform: translateY(-50%) rotate(90deg); /* Rotate the arrow when active */
        }

        .content {
            padding: 0 18px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <p>Collapsible boxes Set:</p>
    <button class="collapsible">Title 1</button>
    <div class="content">
        <p>Put the text of your preference here</p>
    </div>
    <button class="collapsible">Title 2</button>
    <div class="content">
        <p>Put the text of your preference here</p>
    </div>
    <button class="collapsible">Title 3</button>
    <div class="content">
        <p>Put the text of your preference here</p>
    </div>
    
    <script>
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight){
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                } 
            });
        }
    </script>
</body>
</html>
```
