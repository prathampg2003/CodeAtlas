// details.js

document.addEventListener("DOMContentLoaded", function () {
    displayCodeDetails();
});

function displayCodeDetails() {
    const codeDetailsContent = document.getElementById("codeDetailsContent");
    const storedCodeDetails = sessionStorage.getItem("codeDetails");

    if (codeDetailsContent && storedCodeDetails) {
        const codeDetails = JSON.parse(storedCodeDetails);

        // Display code details
        codeDetailsContent.innerHTML = `
            <div class="useremail">
            <h3 style="font-size:20px;margin-bottom:6px;background: linear-gradient(to right bottom,#57C84D,#ABE098);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">User Email:</h3>
            <p class="email" style="width:450px;height:auto;overflow-x: auto; overflow-y: hidden;white-space: pre-wrap; font-size:23px;">${codeDetails.user_email}</p></div>
            <div class="useremail">
            <h3 style="font-size:20px;margin-bottom:6px;background: linear-gradient(to right bottom,#57C84D,#ABE098);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">Code Name:</h3> 
            <p style="width:450px;height:auto;overflow-x: auto; overflow-y: hidden;white-space: pre-wrap;font-size:23px;">${codeDetails.code_name}</p></div>
            <div class="useremail">
            <h3 style="font-size:20px;margin-bottom:6px;background: linear-gradient(to right bottom,#57C84D,#ABE098);-webkit-background-clip: text;-webkit-text-fill-color: transparent;margin-bottom:0;">Code Description:</h3>
            <p style="width:450px;height:auto;overflow-x: auto; overflow-y: hidden;white-space: pre-wrap;font-size:23px;"> ${codeDetails.code_description}</p></div>
            <div class="code">
            <p><br><textarea name="" id="" cols="30" rows="15" class="textbox" readonly> ${codeDetails.code_content}</textarea></p></div>
        `;
    } else {
        codeDetailsContent.innerHTML = "<p style='margin-left:15px;margin-top:10px;font-size:25px;color:white;'>No code details found.</p>";
    }
}
