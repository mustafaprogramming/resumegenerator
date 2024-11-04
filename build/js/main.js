"use strict";
//Storagefor Resume Objects
let storedResume = [];
////////////////////////// ALL CONST DELARATION END ////////////////////////////////////////
//sidebar
const sidebar = document.getElementById('sidebar');
const resumeContainer = document.getElementById('userResumes');
//Form in which we get the iput to generate Resume
const resumeForm = document.getElementById('resumeForm');
//Const for all the display form seaction
const resumeDisplay = document.getElementById('resumeDisplay');
const displayFisrtName = document.getElementById('displayfisrtName');
const displayLastName = document.getElementById('displaylastName');
const displayEmail = document.getElementById('displayEmail');
const displayPhone = document.getElementById('displayPhone');
const displayLocation = document.getElementById('displayLocation');
const displayLinkedin = document.getElementById('displayLinkedin');
const displayStatus = document.getElementById('displayStatus');
const displaySkills = document.getElementById('displaySkillsBox');
const summary = document.getElementById('displaySummary');
const displayEducationBox = document.getElementById('displayEducationBox');
const displayExperienceBox = document.getElementById('displayExperienceBox');
const formHeading = document.getElementById('formHeading');
const mainColorInput = document.getElementById('mainColor');
const mainColorValue = document.getElementById('mainColorValue');
const secondryColorInput = document.getElementById('secondaryColor');
const secondryColorValue = document.getElementById('secondaryColorValue');
const accentColorInput = document.getElementById('accentColor');
const accentColorValue = document.getElementById('accentColorValue');
//buttons of all kinds
const sharelink = document.getElementById('shareLink');
const saveBtn = document.getElementById('saveResume');
const shareBtn = document.getElementById('sharePDF');
const editBtn = document.getElementById('editResume');
const pdfBtn = document.getElementById('downloadPDF');
const copyBtn = document.getElementById('copyBtn');
const createResumeBtnHome = document.getElementById('createNewResumeHome');
const createResumeBtn = document.getElementById('createNewResume');
const resetBtn = document.getElementById('resetBtn');
////////////////////////// ALL CONST DELARATION END ////////////////////////////////////////
////////////////////////////// ALL FUNCTIONS START ////////////////////////////////////////
//Pushing Storage into storedResume
function setStorage() {
    storedResume = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key) {
            let savedResumeData = localStorage.getItem(key);
            if (savedResumeData) {
                storedResume.push(JSON.parse(savedResumeData));
            }
        }
    }
}
//get storage
function getStorage() {
    console.log(storedResume);
}
//clearStorage Function
function clearStorage(id) {
    if (id) {
        localStorage.removeItem(id);
        setStorage();
        populate();
        resetBtn.click();
    }
    else {
        let answer = confirm(`Are you sure you want to delete All Resumes?`);
        if (answer) {
            localStorage.clear();
            setStorage();
            populate();
            resetBtn.click();
        }
    }
}
//Function for removing element from DOM
function remove(id) {
    let answer = confirm(`Are you sure you want to delete ${id}?`);
    if (answer) {
        document.getElementById(id).remove();
    }
    return answer;
}
//checking if resumename is valid
const validateName = (name) => {
    return /[$&+,:;=?@#|'<>.^*()%!]/.test(name);
};
//function for copping link text
function copyText(id) {
    // Get the text field
    let copyText = document.getElementById(id);
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    document.getElementById('copiedLink').innerHTML = 'copied!';
}
//function for sliding the bar
function slideSidebar() {
    if (sidebar.style.translate === '0% 0%') {
        sidebar.style.translate = '-100% 0%';
    }
    else {
        sidebar.style.translate = '0% 0%';
    }
}
//make selected resume highlited
function highlited() {
    let id = formHeading.innerHTML;
    for (let i = 0; i < resumeContainer.children.length; i++) {
        let div = resumeContainer.children[i];
        if (resumeContainer.children[i].id === id) {
            div.style.borderColor = '#B9D6F2';
            div.style.borderRadius = '20px';
            div.onmouseover = () => { };
            div.onmouseout = () => { };
        }
        else {
            div.style.borderColor = '#fff';
            div.style.borderRadius = '5px';
            div.onmouseover = () => div.style.borderColor = '#A9FDAC';
            div.onmouseout = () => div.style.borderColor = '#fff';
        }
    }
    ;
}
;
//resetting input values in the input form
function setInputForm() {
    resetEdit();
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('resmue-location').value = '';
    document.getElementById('resume-linkedin').value = '';
    document.getElementById('current-status').value = '';
    document.getElementById('resume-summary').value = '';
    document.getElementById('education-box').innerHTML = `<div class="definedInput">
                    <span>Enter Starting and ending date of your Education</span>
                    <div class="date"><input type="text" required>&nbsp;<input type="text" required></div>
                    <span>Enter your Education</span>
                    <input type="text" required>
                    <span>Enter place of Education</span>
                    <input type="text" required>
                </div>`;
    document.getElementById('experience-box').innerHTML = `<div class="definedInput">
                    <span>Enter Starting and ending date of your Work</span>
                    <div class="date"><input type="text" required>&nbsp;<input type="text" required></div>
                    <span>Enter your Work</span>
                    <input type="text" required>
                    <span>Enter place of Work</span>
                    <input type="text" required>
                    <span>Enter your Work discription</span>
                    <div>
                        <h5>Work Points<button class="addBtn Btn" id="addWorkPointBtn"
                        onclick="(()=>makeWorkPoint('workPointBox'))()"  
                        type="button">+</button></h5>
                    </div>
                    <section id="workPointBox">
                        <div class="definedInput">
                            <input placeholder="Enter WorkPoint" type="text" required>
                        </div>
                    </section>
                </div>`;
    document.getElementById('skillBox').innerHTML = `<div class="definedInput">
                    <input placeholder="Enter Skill" type="text" required>
                </div>`;
}
//Getting new form layout for the selected form
function getResumeForm(resumeName) {
    formHeading.innerHTML = resumeName,
        formHeading.style.display = 'block',
        resumeForm.setAttribute('Username', resumeName);
    setInputForm();
    resumeForm.style.display = 'block';
    resumeDisplay.style.display = 'none';
    createResumeBtnHome.style.display = 'none';
    resetBtn.style.display = 'block';
    document.getElementById('resume-links').style.display = 'none';
    document.getElementById('shareLinkBox').style.display = 'none';
    highlited();
    if (window.innerWidth <= 920) {
        slideSidebar();
    }
}
//Setting display form according to the storage data
function settingForm(resumeData) {
    displayFisrtName.innerHTML = resumeData.firstname;
    displayLastName.innerHTML = resumeData.lastname;
    displayEmail.innerHTML = resumeData.email;
    displayPhone.innerHTML = resumeData.phone;
    displayLocation.innerHTML = resumeData.location;
    displayLinkedin.innerHTML = resumeData.linkedin;
    displayStatus.innerHTML = resumeData.status;
    displaySkills.innerHTML = resumeData.skills;
    summary.innerHTML = resumeData.summary;
    displayEducationBox.innerHTML = resumeData.education;
    displayExperienceBox.innerHTML = resumeData.experience;
    setColors(resumeData.mainColor, resumeData.secondaryColor, resumeData.accentColor);
    resetEdit();
}
//making user and saving it to local storage when clicking generate form
function makeUser(id) {
    let userResume = {
        id: id,
        firstname: displayFisrtName.innerHTML,
        lastname: displayLastName.innerHTML,
        email: displayEmail.innerHTML,
        phone: displayPhone.innerHTML,
        location: displayLocation.innerHTML,
        linkedin: displayLinkedin.innerHTML,
        status: displayStatus.innerHTML,
        skills: displaySkills.innerHTML,
        summary: summary.innerHTML,
        education: displayEducationBox.innerHTML,
        experience: displayExperienceBox.innerHTML,
        mainColor: mainColorInput.value,
        secondaryColor: secondryColorInput.value,
        accentColor: accentColorInput.value,
    };
    localStorage.setItem(userResume.id, JSON.stringify(userResume));
}
//resetting display
function displayReset() {
    document.getElementById('resume-links').style.display = 'none';
    document.getElementById('shareLinkBox').style.display = 'none';
    resetEdit();
    resumeDisplay.style.display = 'none';
    resumeForm.style.display = 'none';
    formHeading.style.display = 'none';
}
;
//reset function 
function reset(resumeName) {
    let done = remove(resumeName);
    if (!done)
        return;
    setTimeout(() => {
        resetBtn.click();
    }, 10);
}
//function for populating side bar with storage resumes
function populate() {
    resumeContainer.innerHTML = ' ';
    for (let i = 0; i < storedResume.length; i++) {
        let resumeName = storedResume[i].id;
        let div = document.createElement('div');
        div.id = resumeName;
        div.onclick = () => {
            const savedResumeData = localStorage.getItem(resumeName);
            if (savedResumeData) {
                const resumeData = JSON.parse(savedResumeData);
                resetBtn.style.display = 'block';
                resumeDisplay.setAttribute('resumeFor', `${resumeData.id}`);
                settingForm(resumeData);
                createResumeBtnHome.style.display = 'none';
                formHeading.innerHTML = resumeName,
                    formHeading.style.display = 'block',
                    resumeDisplay.style.display = 'block';
                document.getElementById('resume-links').style.display = 'flex';
                document.getElementById('shareLinkBox').style.display = 'none';
                resumeForm.style.display = 'none';
                highlited();
                if (window.innerWidth <= 920) {
                    slideSidebar();
                }
            }
        };
        div.className = "listItems";
        div.innerHTML = `<p>${resumeName}</p>
                        <button onclick="(()=>{
                        let done=remove('${resumeName}');
                        console.log(done)
                        if(!done)return;
                        clearStorage('${resumeName}');
                        })()"><i class="fa-solid fa-trash"></i></button>`;
        resumeContainer.appendChild(div);
    }
}
function makeWorkPoint(pointsBox) {
    const workPointsBox = document.getElementById(pointsBox);
    let div = document.createElement('div');
    div.id = 'removeWP' + pointsBox + workPointsBox.children.length;
    div.className = "definedInput";
    div.innerHTML = `<input placeholder="Enter Work Point" type="text">
                        <button class="removeBtn Btn" type="button" onclick="(() => remove('removeWP${pointsBox + workPointsBox.children.length}'))()">-</button>`;
    workPointsBox.appendChild(div);
}
//resetting edit 
function resetEdit() {
    document.getElementById('colorSetter').style.display = 'none';
    saveBtn.style.display = 'none';
    editBtn.style.display = 'block';
    pdfBtn.style.opacity = '1';
    shareBtn.style.opacity = '1';
    resetBtn.style.opacity = '1';
    resetBtn.removeAttribute('disabled');
    pdfBtn.removeAttribute('disabled');
    shareBtn.removeAttribute('disabled');
}
//color functions
//main color function 
function mainColor() {
    let color = mainColorInput.value;
    mainColorValue.value = color;
    mainColorValue.style.color = color;
    document.getElementById('display-credentials').style.backgroundColor = color;
    displayFisrtName.style.color = color;
}
;
function secondaryColor() {
    let color = secondryColorInput.value;
    secondryColorValue.value = color;
    secondryColorValue.style.color = color;
    document.querySelectorAll('#resumeDisplay li>span').forEach((ele) => {
        ele.style.color = color;
    });
    document.querySelectorAll('.defiendInputNameAndPlace > span').forEach((ele) => {
        ele.style.color = color;
    });
    displayStatus.style.color = color;
    summary.style.color = color;
}
function accentColor() {
    let color = accentColorInput.value;
    accentColorValue.value = color;
    accentColorValue.style.color = color;
    document.querySelectorAll('.date>span').forEach((ele) => {
        ele.style.color = color;
    });
    document.querySelectorAll('#resumeDisplay h4').forEach((ele) => {
        ele.style.color = color;
    });
    document.querySelectorAll('#resumeDisplay li').forEach((ele) => {
        ele.style.color = color;
    });
    document.querySelectorAll('#resumeDisplay>hr').forEach((ele) => {
        ele.style.borderTop = `1px solid ${color}`;
    });
    displayLastName.style.color = color;
}
function setColors(main, sec, acc) {
    accentColorInput.value = acc;
    mainColorInput.value = main;
    secondryColorInput.value = sec;
    accentColorValue.value = acc;
    mainColorValue.value = main;
    secondryColorValue.value = sec;
    accentColor();
    mainColor();
    secondaryColor();
}
////////////////////////////// ALL FUNCTIONS END ///////////////////////////////////////////////
////////////////////////////// ALL EVENTLISTENERS START ////////////////////////////////////////
//reset 
resetBtn.addEventListener('click', () => {
    createResumeBtnHome.style.display = 'block';
    displayReset();
    resetBtn.style.display = 'none';
});
//show sidebar
document.getElementById('showSideBar').addEventListener('click', () => {
    slideSidebar();
});
//Home resume button for generating resume layout
createResumeBtnHome.addEventListener('click', () => {
    createResumeBtn.click();
    if (window.innerWidth >= 920) {
        sidebar.style.translate = '0% 0%';
    }
    else {
        sidebar.style.translate = '-100% 0%';
    }
});
//Making a new resume layout when clicking on new resume
createResumeBtn.addEventListener('click', () => {
    for (let i = 0; i < resumeContainer.children.length; i++) {
        if (resumeContainer.children[i].getAttribute('type')) {
            alert('Can not make a new Resume while you have an unsaved one.');
            return;
        }
    }
    let resumeName = prompt('Enter the Resume Name.\nNo Special Charcters or spaces allowed.\nShould be between 5-15 Characters')?.trim();
    if (!resumeName)
        return;
    resumeName = resumeName.split(' ').join('-');
    if (resumeName.length < 5 || resumeName.length > 15) {
        alert('Resume Name Should be between 5-15 Characters');
        return;
    }
    if (validateName(resumeName)) {
        alert('No Special Charcters or Spaces allowed');
        return;
    }
    ;
    for (let i = 0; i < resumeContainer.children.length; i++) {
        if (resumeContainer.children[i].id === resumeName) {
            alert('Resume with this name already exits');
            return;
        }
        ;
    }
    ;
    let div = document.createElement('div');
    div.setAttribute('type', 'unsaved');
    div.id = resumeName;
    div.onclick = () => {
        getResumeForm(resumeName);
    };
    div.className = "listItems";
    div.innerHTML = `<p>${resumeName}</p>
                    <button onclick="(()=>{
                        reset('${resumeName}');
                    })()"><i class="fa-solid fa-trash"></i></button>`;
    resumeContainer.appendChild(div);
    div.click();
});
//submittting the form and making a new user based on the form input and saving it to storage
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Get values from the form
    const username = resumeForm.getAttribute('Username');
    const inputFisrtName = document.getElementById('firstName').value;
    const inputLastName = document.getElementById('lastName').value;
    const inputEmail = document.getElementById('email').value;
    const inputPhone = document.getElementById('phone').value;
    const inputLocation = document.getElementById('resmue-location').value;
    const inputLinkedin = document.getElementById('resume-linkedin').value;
    const inputStatus = document.getElementById('current-status').value;
    const inputsummary = document.getElementById('resume-summary').value;
    const inputSkillsbox = document.getElementById('skillBox');
    const educationBox = document.getElementById('education-box');
    const experienceBox = document.getElementById('experience-box');
    displayFisrtName.innerHTML = inputFisrtName;
    displayLastName.innerHTML = inputLastName;
    displayEmail.innerHTML = inputEmail;
    displayPhone.innerHTML = inputPhone;
    displayLocation.innerHTML = inputLocation;
    displayLinkedin.innerHTML = inputLinkedin;
    displayStatus.innerHTML = inputStatus;
    summary.innerHTML = inputsummary;
    let displayEducationDataArray = [];
    let displayExperienceDataArray = [];
    let skillArray = [];
    for (let i = 0; i < inputSkillsbox.children.length; i++) {
        let skill = inputSkillsbox.children[i].children[0].value;
        skillArray.push(`<li contenteditable="false"><span style="color:#000;">${skill}</span></li>`);
    }
    for (let i = 0; i < educationBox.children.length; i++) {
        let eduactionStartDate = educationBox.children[i].children[1].children[0].value;
        let eduactionEndDate = educationBox.children[i].children[1].children[1].value;
        let educationBoxName = educationBox.children[i].children[3].value;
        let educationBoxPlace = educationBox.children[i].children[5].value;
        displayEducationDataArray.push(`<div class="displaydefinedInput">
                                    <div class="date" >
                                        <span contenteditable="false">${eduactionStartDate}</span>
                                         &nbsp;-&nbsp;
                                        <span contenteditable="false">${eduactionEndDate}</span>
                                    </div>
                                    <div class="defiendInputNameAndPlace">
                                        <span contenteditable="false">${educationBoxName}</span>
                                        <span contenteditable="false">${educationBoxPlace}</span>
                                    </div>
                                   </div>`);
    }
    for (let i = 0; i < experienceBox.children.length; i++) {
        let workStartDate = experienceBox.children[i].children[1].children[0].value;
        let workEndDate = experienceBox.children[i].children[1].children[1].value;
        let experienceBoxName = experienceBox.children[i].children[3].value;
        let experienceBoxPlace = experienceBox.children[i].children[5].value;
        let inputWorkPointbox = experienceBox.children[i].children[8];
        let workPointArray = [];
        for (let i = 0; i < inputWorkPointbox.children.length; i++) {
            let point = inputWorkPointbox.children[i].children[0].value;
            workPointArray.push(`<li contenteditable="false"><span style="color:#000;">${point}</span></li>`);
        }
        displayExperienceDataArray.push(`<div class="displaydefinedInput">
                                    <div class="date" >
                                        <span contenteditable="false">${workStartDate}</span>
                                         &nbsp;-&nbsp;
                                        <span contenteditable="false">${workEndDate}</span>
                                    </div>
                                    <div class="defiendInputNameAndPlace">
                                        <span contenteditable="false">${experienceBoxName}</span>
                                        <span contenteditable="false">${experienceBoxPlace}</span>
                                    </div>
                                    <ul>${workPointArray.join('')}<ul>
                                   </div>`);
    }
    displayEducationBox.innerHTML = displayEducationDataArray.join('');
    displayExperienceBox.innerHTML = displayExperienceDataArray.join('');
    displaySkills.innerHTML = skillArray.join('');
    // make colors
    setColors('#000000', '#000000', '#0085DD');
    //make userResume
    resumeDisplay.setAttribute('resumeFor', `${username}`);
    let id = resumeDisplay.getAttribute('resumeFor');
    if (!id)
        return;
    makeUser(id);
    // Show the resume
    resetEdit();
    resumeDisplay.style.display = 'block';
    document.getElementById('resume-links').style.display = 'flex';
    document.getElementById('resumeForm').style.display = 'none';
    //reseeting data in sidebar without reloading
    setStorage();
    populate();
});
//making more Education feilds in input form dynamically
document.getElementById('addEducationBtn').addEventListener('click', () => {
    const educationBox = document.getElementById('education-box');
    let div = document.createElement('div');
    div.id = 'removeEdu' + educationBox.children.length;
    div.className = "definedInput";
    div.innerHTML =
        `<span>Enter Starting and ending date of your Education</span>
                    <div class="date"><input type="text" required>&nbsp;<input type="text" required></div>
                    <span>Enter your Education</span>
                    <input type="text" required>
                    <span>Enter place of Education</span>
                    <input type="text" required>
        <button class="removeBtn Btn" type="button" onclick="(() => remove('removeEdu'+${educationBox.children.length}))()">-</button>
                `;
    educationBox.appendChild(div);
});
//making more Experience feilds in input form dynamically addEntriesBtn
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
                    <div>
                        <h5>Work Points<button class="addBtn Btn" onclick="(()=>makeWorkPoint('workPointBox${experienceBox.children.length}'))()" type="button">+</button></h5>
                    </div>
                    <section id="workPointBox${experienceBox.children.length}">
                        <div class="definedInput">
                            <input placeholder="Enter WorkPoint" type="text" required>
                        </div>
                    </section>
                  <button class="removeBtn Btn" type="button" onclick="(() => remove('removeExp'+${experienceBox.children.length}))()">-</button>
                </div>`;
    experienceBox.appendChild(div);
});
//making skill on click
document.getElementById('addSkillsBtn').addEventListener('click', () => {
    const skillBox = document.getElementById('skillBox');
    let div = document.createElement('div');
    div.id = 'removeSkl' + skillBox.children.length;
    div.className = "definedInput";
    div.innerHTML = `<input placeholder="Enter Skill" type="text">
                    <button class="removeBtn Btn" type="button" onclick="(() => remove('removeSkl'+${skillBox.children.length}))()">-</button>`;
    skillBox.appendChild(div);
});
//Making a sharable link on get link button click
shareBtn.addEventListener('click', () => {
    let username = resumeDisplay.getAttribute('resumeFor');
    if (!username)
        return;
    const shareableURL = `${window.location.origin}/resumes/userResume.html?resume=${encodeURIComponent(username)}`;
    document.getElementById('copyText').value = shareableURL;
    sharelink.href = shareableURL;
    sharelink.innerHTML = shareableURL;
    document.getElementById('shareLinkBox').style.display = 'flex';
    document.getElementById('shareLinkBoxlink').click();
});
//making form editable when clicking edit button
editBtn.addEventListener('click', () => {
    let editableContent = resumeDisplay.querySelectorAll('[contenteditable="false"]');
    editableContent.forEach((element) => {
        element.setAttribute('contenteditable', 'true');
    });
    document.getElementById('colorSetter').style.display = 'flex';
    saveBtn.style.display = 'block';
    editBtn.style.display = 'none';
    pdfBtn.style.opacity = '0.5';
    shareBtn.style.opacity = '0.5';
    resetBtn.style.opacity = '0.5';
    resetBtn.setAttribute('disabled', 'true');
    pdfBtn.setAttribute('disabled', 'true');
    shareBtn.setAttribute('disabled', 'true');
    document.getElementById('shareLinkBox').style.display = 'none';
});
//saving the edited form when clicking save button
saveBtn.addEventListener('click', () => {
    let editableContent = resumeDisplay.querySelectorAll('[contenteditable="true"]');
    editableContent.forEach((element) => {
        element.setAttribute('contenteditable', 'false');
    });
    let id = resumeDisplay.getAttribute('resumeFor');
    if (!id)
        return;
    makeUser(id);
    resetEdit();
});
//copping text to clip board
copyBtn.addEventListener('click', () => {
    copyText('copyText');
});
//change toottip value
copyBtn.addEventListener('mouseover', () => {
    document.getElementById('copiedLink').innerHTML = 'copy link';
});
//accent color changing for display resume
accentColorInput.addEventListener('change', () => {
    accentColor();
});
//Secondary color changing for display resume
secondryColorInput.addEventListener('change', () => {
    secondaryColor();
});
//secondary color changing for display resume
mainColorInput.addEventListener('change', () => {
    mainColor();
});
////////////////////////////// ALL EVENTLISTENERS END ////////////////////////////////////////
// setting values on first load
setStorage();
populate();
