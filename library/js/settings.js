const settings = require("../library/modules/settings.js");
const submitButton = document.getElementById("update_settings_button");

submitButton.addEventListener("click", (e) => {
    var fields = document.querySelectorAll(".field input");
    settings.Update(fields);
});
