<h1 align="center"> Qualtrics Customizations </h1>
<div align="center">
    <a href="/LOGO">
        <img src="https://www.qualtrics.com/m/qualtrics-xm-long.svg" alt="qualtrics_logo" style="width: 300px; height: 100px;"  />
    </a>
</div>

<h4 align="center"> <ins> ❗ Note: This is not an official repository created either by Qualtrics XM or contributor(s) of the official platform ❗ </ins></h4>


## :page_with_curl: Description
This repository contains customized code (i.e. html, css and javascript) which extends the functionality of <a href = "https://www.qualtrics.com/core-xm/survey-software/" target ="_blank" >**Qualtrics**</a> as a platform/service for surveys and registration forms. 

Code snippets have been taken from websites such as <a href = "https://www.w3schools.com/howto/default.asp" target ="_blank" >**W3Schools**</a> and <a href = "https://stackoverflow.com/questions/tagged/html" target ="_blank" >**Stackoverflow**</a>, however they have been modified by the author to serve his purpose and match Utrecht University's Corporate Identity.

##  <img src="https://cdn-icons-png.flaticon.com/128/9751/9751797.png" alt="folder_structure" style="width: 32px; height: 32px; margin-right: 7px;"/>  Folder Structure
```bash
│   LICENSE
│   README.md
│   
├───Additional_entries
│       index.html
│       README.md
│       script.js
│       styles.css
│       
├───Autocompletion_feature
│       index.html
│       README.md
│       script.js
│       styles.css
│       
└───Collapsible_boxes
    ├───Collapsible_box
    │       index.html
    │       README.md
    │       script.js
    │       styles.css
    │       
    └───Set_of_collpsible_boxes
            index.html
            README.md
            script.js
            styles.css
```

##  <img src="https://cdn-icons-png.flaticon.com/128/610/610064.png" alt="target" style="width: 25px; height: 25px; margin-right: 7px;"/>  Purpose
In order to help other researchers/users of the platform from Utrecht University or any other interested party, the author created this repository which contains (frontend development) code to design customized questions for your surveys or registration forms. Snippets of code can be either used for the introduction section of a survey/form (e.g. collapsible box) or to enhance the participants' experience when filling it out (e.g. autocompletion feature).

##  <img src="https://cdn-icons-png.flaticon.com/128/3242/3242257.png" alt="code_use" style="width: 32px; height: 32px; margin-right: 7px;"/>  Use the Code
<h3> <em>Customized questions with no embedded data </em></h3>

- Add a new **_Text/Graphic_** question in your survey/form.
- Click on the **_Click to write the question text_** to enable text editing.
- Select **_HMTL View_**.
- Copy and paste the provided code (individual README file in each folder) in the HMTL View.
  - Demonstration for the <a href = "https://github.com/AristotleKandylas/qualtrics_customization/tree/main/Collapsible_boxes/Collapsible_box" target ="_blank" >**_Collapsible_box_**</a> code.
<br/><br/>
  ```html
  <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
      background-color:  #f1f1f1;
    }
    
    </style>
    </head>
    <body>
    
    <p>Collapsible box</p>
    <button class="collapsible"> Title </button>
    <div class="content">
      <p>Put the text of your preference here.</p>
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
- Then you can adjust the code according to your preference/need.

<h3> <em>Customized questions with embedded data </em></h3>
For customized questions such as the Additional_entries & Autocompletion_feature  you should follow all the previous steps. However, in order to save/store the information filled out by the participant in this question you should additionally:
<br/><br/>

- Set corresponding **_Embedded data_** fields in the **Survey Flow**, before the block where this question has been added.
- Include lines of code which store the filled out values in the corresponding Embedded data in your code (This lines have already been included in the provided codes).
<br/><br/>
    ```javascript
    // Update embedded data fields
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
    ```

<h6 align="center"> Code lines used to store the filled out values to the corresponding Embedded data fields for the <a href = "https://github.com/AristotleKandylas/qualtrics_customization/blob/main/Autocompletion_feature/script.js" target ="_blank" >Autocompletion_feature</a></h6>

## :envelope_with_arrow: Contact and contribution

For questions about this repository, please contact the author <a href = "https://github.com/AristotleKandylas" target = "_blank">Aristoteles Kandylas</a>, or open an Issue or Pull request in this repository.

## :balance_scale: License

This repository is licensed under a MIT License. You can view the <a href= "https://github.com/AristotleKandylas/qualtrics_customization/blob/main/LICENSE" target = "_blank"> LICENSE here</a>.

