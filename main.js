"use strict";
const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const displayPhone = document.getElementById('displayPhone');
const displayLocation = document.getElementById('displayLocation');
const displayLinkedin = document.getElementById('displayLinkedin');
const displayStatus = document.getElementById('displayStatus');
const displaySkills = document.getElementById('displaySkills');
const summary = document.getElementById('displaySummary');
const displayActiviy = document.getElementById('displayActivities');
const displayEducationBox = document.getElementById('displayEducationBox');
const displayExperienceBox = document.getElementById('displayExperienceBox');
function remove(id) {
    document.getElementById(id).remove();
}
document.getElementById('resumeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Get values from the form
    const inputName = document.getElementById('name').value;
    const inputEmail = document.getElementById('email').value;
    const inputPhone = document.getElementById('phone').value;
    const inputLocation = document.getElementById('resmue-location').value;
    const inputLinkedin = document.getElementById('resume-linkedin').value;
    const inputStatus = document.getElementById('current-status').value;
    const inputSkills = document.getElementById('skills').value;
    const inputActivities = document.getElementById('activities').value;
    const inputsummary = document.getElementById('resume-summary').value;
    const educationBox = document.getElementById('education-box');
    const experienceBox = document.getElementById('experience-box');
    // Display values in the resume section
    displayName.innerHTML = inputName;
    displayEmail.innerHTML = inputEmail;
    displayPhone.innerHTML = inputPhone;
    displayLocation.innerHTML = inputLocation;
    displayLinkedin.innerHTML = inputLinkedin;
    displayStatus.innerHTML = inputStatus.split(',').join(', ');
    displaySkills.innerHTML = inputSkills.split(',').join(', ');
    displayActiviy.innerHTML = inputActivities.split(',').join(', ');
    summary.innerHTML = inputsummary;
    let displayEducationDataArray = [];
    let displayExperienceDataArray = [];
    for (let i = 0; i < educationBox.children.length; i++) {
        let eduactionBoxName = educationBox.children[i].children[1].value;
        let eduactionBoxPlace = educationBox.children[i].children[3].value;
        let eduactionBoxValue = educationBox.children[i].children[5].value;
        console.log(eduactionBoxName, eduactionBoxPlace, eduactionBoxValue);
        displayEducationDataArray.push(`<div class="displaydefinedInput">
                                   <div class="defiendInputNameAndPlace">
                                       <span contenteditable="true">${eduactionBoxName}</span>
                                        &nbsp;
                                        <span contenteditable="true">${eduactionBoxPlace}</span>
                                   </div>
                                   <hr>
                                   <p contenteditable="true">${eduactionBoxValue}</p>
                                  </div>`);
    }
    for (let i = 0; i < experienceBox.children.length; i++) {
        let workStartDate = experienceBox.children[i].children[1].children[0].value;
        let workEndDate = experienceBox.children[i].children[1].children[1].value;
        let experienceBoxName = experienceBox.children[i].children[3].value;
        let experienceBoxPlace = experienceBox.children[i].children[5].value;
        let experienceBoxValue = experienceBox.children[i].children[7].value;
        console.log(experienceBoxName, experienceBoxPlace, experienceBoxValue);
        displayExperienceDataArray.push(`<div class="displaydefinedInput">
                                    <div class="date">
                                        <span contenteditable="true">${workStartDate}</span>
                                         &nbsp;-&nbsp;
                                        <span contenteditable="true">${workEndDate}</span>
                                    </div>
                                    <div class="defiendInputNameAndPlace">
                                        <span contenteditable="true">${experienceBoxName}</span>
                                        &nbsp;
                                        <span contenteditable="true">${experienceBoxPlace}</span>
                                    </div>
                                    <hr>
                                    <p contenteditable="true">${experienceBoxValue}</p>
                                   </div>`);
    }
    displayEducationBox.innerHTML = displayEducationDataArray.join('');
    displayExperienceBox.innerHTML = displayExperienceDataArray.join('');
    // Show the resume
    document.getElementById('resumeDisplay').style.display = 'block';
    document.getElementById('resume-links').style.display = 'flex';
    document.getElementById('resumeForm').style.display = 'none';
});
document.getElementById('addEducationBtn').addEventListener('click', () => {
    const educationBox = document.getElementById('education-box');
    let div = document.createElement('div');
    div.id = 'removeEdu' + educationBox.children.length;
    div.className = "definedInput";
    div.innerHTML =
        `<span>Enter your Education</span>
        <input type="text" required>
        <span>Enter place of Education</span>
        <input type="text" required>
        <span>Enter your Education discription</span>
        <textarea rows="4" placeholder="List your education discription" required></textarea>
        <button class="removeBtn Btn" type="button" onclick="(() => remove('removeEdu'+${educationBox.children.length}))()">-</button>
                `;
    educationBox.appendChild(div);
});
document.getElementById('addExperienceBtn').addEventListener('click', () => {
    const experienceBox = document.getElementById('experience-box');
    let div = document.createElement('div');
    div.id = 'removeExp' + experienceBox.children.length;
    div.className = "definedInput";
    div.innerHTML = `
                  <span>Enter Starting and ending date of your Work</span>
                  <div class="date"><input type="text" required>&nbsp;<input type="text" required></div>
                  <span>Enter your Work</span>
                  <input type="text" required>
                  <span>Enter place of Work</span>
                  <input type="text" required>
                  <span>Enter your Work discription</span>
                  <textarea rows="4" placeholder="List your work experience" required></textarea>
                  <button class="removeBtn Btn" type="button" onclick="(() => remove('removeExp'+${experienceBox.children.length}))()">-</button>
                </div>`;
    experienceBox.appendChild(div);
});
