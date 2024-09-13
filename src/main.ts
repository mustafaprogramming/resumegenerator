//Setting Type for Resume Objects
type resumeObj ={
    id:string,
    name:string,
    email:string,
    phone:string,
    location:string,
    linkedin:string,
    status:string,
    skills:string,
    activity:string,
    summary:string,
    education:string,
    experience:string
}
//Storagefor Resume Objects
let storedResume:resumeObj[]=[];
////////////////////////// ALL CONST DELARATION END ////////////////////////////////////////
//sidebar
const sidebar=(document.getElementById('sidebar') as HTMLDivElement);
const resumeContainer=(document.getElementById('userResumes') as HTMLDivElement);

//Form in which we get the iput to generate Resume
const resumeForm=(document.getElementById('resumeForm') as HTMLFormElement);
//Const for all the display form seaction
 const resumeDisplay=(document.getElementById('resumeDisplay') as HTMLDivElement);
const displayName=(document.getElementById('displayName') as HTMLParagraphElement);
const displayEmail=(document.getElementById('displayEmail') as HTMLParagraphElement);
const displayPhone=(document.getElementById('displayPhone') as HTMLParagraphElement);
const displayLocation=(document.getElementById('displayLocation') as HTMLParagraphElement);
const displayLinkedin=(document.getElementById('displayLinkedin') as HTMLParagraphElement);
const displayStatus=(document.getElementById('displayStatus') as HTMLParagraphElement);
const displaySkills=(document.getElementById('displaySkills') as HTMLParagraphElement);
const summary=(document.getElementById('displaySummary') as HTMLParagraphElement);
const displayActiviy=(document.getElementById('displayActivities') as HTMLParagraphElement);
const displayEducationBox=(document.getElementById('displayEducationBox') as HTMLDivElement);
const displayExperienceBox=(document.getElementById('displayExperienceBox') as HTMLDivElement);
const formHeading=(document.getElementById('formHeading') as HTMLHeadingElement)

//buttons of all kinds
const sharelink=(document.getElementById('shareLink') as HTMLLinkElement)
const saveBtn=(document.getElementById('saveResume') as HTMLButtonElement);
const shareBtn=(document.getElementById('sharePDF') as HTMLButtonElement);
const editBtn=(document.getElementById('editResume') as HTMLButtonElement);
const pdfBtn=(document.getElementById('downloadPDF') as HTMLButtonElement);
const copyBtn=(document.getElementById('copyBtn') as HTMLButtonElement);
const createResumeBtnHome=(document.getElementById('createNewResumeHome') as HTMLButtonElement);
const createResumeBtn=(document.getElementById('createNewResume') as HTMLButtonElement);
const resetBtn=(document.getElementById('resetBtn') as HTMLButtonElement);
////////////////////////// ALL CONST DELARATION END ////////////////////////////////////////
////////////////////////////// ALL FUNCTIONS START ////////////////////////////////////////
//Pushing Storage into storedResume
function setStorage(){
    storedResume=[]
    for(let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        if(key){
            let savedResumeData=localStorage.getItem(key)
            if(savedResumeData){
                storedResume.push(JSON.parse(savedResumeData))
            }
        }
    }
}
//get storage
function getStorage(){
    console.log(storedResume)
}
//clearStorage Function
function clearStorage(id?:string){
    if(id){
        localStorage.removeItem(id)
        setStorage()
        populate()
        resetBtn.click()
    }else{
        localStorage.clear()
        setStorage()
        populate()
        resetBtn.click()
    }
}
//Function for removing element from DOM
function remove(id:string) {
    (document.getElementById(id) as HTMLDivElement).remove()
}
//checking if resumename is valid
const validateName = (name:string) => {
    return /[$&+,:;=?@#|'<>.^*()%!]/.test(
      name
    );
};
//function for copping link text
function copyText(id:string) {
    // Get the text field
    let copyText = (document.getElementById(id) as HTMLInputElement);
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    (document.getElementById('copiedLink')as HTMLSpanElement).innerHTML='copied!';
    
}
//resetting display
function displayReset(){
    formHeading.style.display='none',
    (document.getElementById('resume-links')as HTMLDivElement).style.display = 'none';
    (document.getElementById('shareLinkBox') as HTMLDivElement).style.display='none';
    resumeDisplay.style.display = 'none';
    resumeForm.style.display='none';
}
//function for sliding the bar
function slideSidebar(){
    if(sidebar.style.translate==='0% 0%'){
        sidebar.style.translate='-100% 0%'
    }else{
        sidebar.style.translate='0% 0%'
    }
    
}
//make selected resume highlited
function highlited(){
    let id=formHeading.innerHTML;
    
    for(let i=0;i<resumeContainer.children.length;i++){
        let div=(resumeContainer.children[i] as HTMLDivElement)
        if(resumeContainer.children[i].id===id){
            
            div.style.borderColor='#B9D6F2'
            div.style.borderRadius='20px'
            div.onmouseover=()=>{}
            div.onmouseout=()=>{}
        }else{
            div.style.borderColor='#fff';
            div.style.borderRadius='5px';
            div.onmouseover=()=>div.style.borderColor='#A9FDAC';
            div.onmouseout=()=>div.style.borderColor='#fff';
        }
    };
};
//resetting input values in the input form
function setInputForm(){
    (document.getElementById('name') as HTMLInputElement).value='';
    (document.getElementById('email') as HTMLInputElement).value='';
    (document.getElementById('phone') as HTMLInputElement).value='';
    (document.getElementById('resmue-location') as HTMLInputElement).value='';
    (document.getElementById('resume-linkedin') as HTMLInputElement).value='';
    (document.getElementById('current-status') as HTMLInputElement).value='';
    (document.getElementById('skills') as HTMLInputElement).value='';
    (document.getElementById('activities') as HTMLInputElement).value='';
    (document.getElementById('resume-summary') as HTMLTextAreaElement).value='';
    (document.getElementById('education-box') as HTMLDivElement).innerHTML=`<div class="definedInput">
                   <span>Enter your Education</span>
                   <input type="text" required>
                   <span>Enter place of Education</span>
                   <input type="text" required>
                   <span>Enter your Education discription</span>
                   <textarea rows="4"  placeholder="List your education discription" required></textarea>
               </div>`;
    (document.getElementById('experience-box') as HTMLDivElement).innerHTML=`<div class="definedInput">
                   <span>Enter Starting and ending date of your Work</span>
                   <div class="date"><input type="text" required>&nbsp;<input type="text" required></div>
                   <span>Enter your Work</span>
                   <input type="text" required>
                   <span>Enter place of Work</span>
                   <input type="text" required>
                   <span>Enter your Work discription</span>
                   <textarea rows="4" placeholder="List your work experience" required></textarea>
               </div>`;
}
//Getting new form layout for the selected form
function getResumeForm(resumeName:string){
   formHeading.innerHTML=resumeName,
   formHeading.style.display='block',
   resumeForm.setAttribute('Username',resumeName)
   setInputForm()
   resumeForm.style.display='block';
   resumeDisplay.style.display = 'none';
   createResumeBtnHome.style.display='none';
   resetBtn.style.display='block';
   (document.getElementById('resume-links')as HTMLDivElement).style.display = 'none';
   (document.getElementById('shareLinkBox') as HTMLDivElement).style.display='none';
   highlited();
   if(window.innerWidth<=920){
    slideSidebar();
   }
}
//Setting display form according to the storage data
function settingForm(resumeData:resumeObj){
   displayName.innerHTML=resumeData.name;
   displayEmail.innerHTML=resumeData.email;
   displayPhone.innerHTML=resumeData.phone;
   displayLocation.innerHTML=resumeData.location;
   displayLinkedin.innerHTML=resumeData.linkedin;
   displayStatus.innerHTML=resumeData.status;
   displaySkills.innerHTML=resumeData.skills;
   displayActiviy.innerHTML=resumeData.activity;
   summary.innerHTML=resumeData.summary;
   displayEducationBox.innerHTML=resumeData.education;
   displayExperienceBox.innerHTML=resumeData.experience;
}
//making user and saving it to local storage when clicking generate form
function makeUser(id:string){
   let userResume={
       id:id,
       name:displayName.innerHTML,
       email:displayEmail.innerHTML,
       phone:displayPhone.innerHTML,
       location:displayLocation.innerHTML,
       linkedin:displayLinkedin.innerHTML,
       status:displayStatus.innerHTML,
       skills:displaySkills.innerHTML,
       activity:displayActiviy.innerHTML,
       summary:summary.innerHTML,
       education:displayEducationBox.innerHTML,
       experience:displayExperienceBox.innerHTML
   }
   localStorage.setItem(userResume.id, JSON.stringify(userResume));
}
//function for populating side bar with storage resumes
function populate(){
    resumeContainer.innerHTML=' ';
    for(let i=0;i<storedResume.length;i++){
        let resumeName=storedResume[i].id
        let div=document.createElement('div');
        div.id=resumeName;
        div.onclick=()=>{
            const savedResumeData = localStorage.getItem(resumeName);
                if (savedResumeData) {
                    const resumeData = JSON.parse(savedResumeData);
                    resetBtn.style.display='block';
                    resumeDisplay.setAttribute('resumeFor',`${resumeData.id}`);
                    settingForm(resumeData);
                    createResumeBtnHome.style.display='none';
                    formHeading.innerHTML=resumeName,
                    formHeading.style.display='block',
                    resumeDisplay.style.display = 'block';
                    (document.getElementById('resume-links')as HTMLDivElement).style.display = 'flex';
                    (document.getElementById('shareLinkBox') as HTMLDivElement).style.display='none';
                    resumeForm.style.display='none';
                    highlited()
                    if(window.innerWidth<=920){
                        slideSidebar();
                    }
                }
        }
        div.className="listItems";
        div.innerHTML=`<p>${resumeName}</p>
                        <button onclick="(()=>{
                        remove('${resumeName}');
                        clearStorage('${resumeName}');
                        })()"><i class="fa-solid fa-trash"></i></button>`;
        resumeContainer.appendChild(div);
    }
}
////////////////////////////// ALL FUNCTIONS END ///////////////////////////////////////////////

////////////////////////////// ALL EVENTLISTENERS START ////////////////////////////////////////
//reset 
resetBtn.addEventListener('click',()=>{
    createResumeBtnHome.style.display='block';
    displayReset();
    resetBtn.style.display='none';
});
//show sidebar
(document.getElementById('showSideBar') as HTMLButtonElement).addEventListener('click',()=>{
    slideSidebar()
});
//Home resume button for generating resume layout
createResumeBtnHome.addEventListener('click',()=>{
    createResumeBtn.click();
    if(window.innerWidth>=920){
        sidebar.style.translate='0% 0%'
    }else{
        sidebar.style.translate='-100% 0%'
    }
})
//Making a new resume layout when clicking on new resume
createResumeBtn.addEventListener('click',()=>{
    let resumeName=prompt('Enter the Resume Name.\nNo Special Charcters or spaces allowed.\nShould be between 5-15 Characters')?.trim()
    if(!resumeName)return;
    resumeName=resumeName.split(' ').join('-')
    if(resumeName.length<5 || resumeName.length>15){
        alert('Resume Name Should be between 5-15 Characters')
        return
    }
    if(validateName(resumeName)){
        alert('No Special Charcters or Spaces allowed')
        return
    };
    for(let i=0;i<resumeContainer.children.length;i++){
        if(resumeContainer.children[i].id===resumeName){
            alert('Resume with this name already exits')
            return;
        };
    };
    let div=document.createElement('div');
    div.id=resumeName;
    div.onclick=()=>{
        getResumeForm(resumeName);
    }
    div.className="listItems";
    div.innerHTML=`<p>${resumeName}</p>
                    <button onclick="(()=>remove('${resumeName}'))()"><i class="fa-solid fa-trash"></i></button>`;
    resumeContainer.appendChild(div);
    div.click()
})
//submittting the form and making a new user based on the form input and saving it to storage
resumeForm.addEventListener('submit', function(event) {
 event.preventDefault(); // Prevent form submission
 // Get values from the form
 const username=resumeForm.getAttribute('Username')
 const inputName = (document.getElementById('name') as HTMLInputElement).value;
 const inputEmail = (document.getElementById('email') as HTMLInputElement).value;
 const inputPhone = (document.getElementById('phone') as HTMLInputElement).value;
 const inputLocation = (document.getElementById('resmue-location') as HTMLInputElement).value;
 const inputLinkedin = (document.getElementById('resume-linkedin') as HTMLInputElement).value;
 const inputStatus = (document.getElementById('current-status') as HTMLInputElement).value;
 const inputSkills = (document.getElementById('skills') as HTMLInputElement).value;
 const inputActivities = (document.getElementById('activities') as HTMLInputElement).value;
 const inputsummary = (document.getElementById('resume-summary') as HTMLTextAreaElement).value;
 const educationBox = (document.getElementById('education-box') as HTMLDivElement);
 const experienceBox = (document.getElementById('experience-box') as HTMLDivElement);
 displayName.innerHTML=inputName;
 displayEmail.innerHTML=inputEmail;
 displayPhone.innerHTML=inputPhone;
 displayLocation.innerHTML=inputLocation;
 displayLinkedin.innerHTML=inputLinkedin;
 displayStatus.innerHTML=inputStatus.split(',').join(', ');
 displaySkills.innerHTML=inputSkills.split(',').join(', ');
 displayActiviy.innerHTML=inputActivities.split(',').join(', ');
 summary.innerHTML=inputsummary;
 let displayEducationDataArray:string[]=[]
 let displayExperienceDataArray:string[]=[]
 for(let i=0;i<educationBox.children.length;i++){
  let eduactionBoxName=(educationBox.children[i].children[1] as HTMLInputElement).value;
  let eduactionBoxPlace=(educationBox.children[i].children[3] as HTMLInputElement).value;
  let eduactionBoxValue=(educationBox.children[i].children[5] as HTMLTextAreaElement).value;

  displayEducationDataArray.push(`<div class="displaydefinedInput">
        <div class="defiendInputNameAndPlace">
            <span contenteditable="false">${eduactionBoxName}</span>
            &nbsp;
            <span contenteditable="false">${eduactionBoxPlace}</span>
        </div>
        <hr>
        <p contenteditable="false">${eduactionBoxValue}</p>
        </div>`);
 }
 for(let i=0;i<experienceBox.children.length;i++){
  let workStartDate=(experienceBox.children[i].children[1].children[0] as HTMLInputElement).value;
  let workEndDate=(experienceBox.children[i].children[1].children[1] as HTMLInputElement).value;
  let experienceBoxName=(experienceBox.children[i].children[3] as HTMLInputElement).value;
  let experienceBoxPlace=(experienceBox.children[i].children[5] as HTMLInputElement).value;
  let experienceBoxValue=(experienceBox.children[i].children[7] as HTMLTextAreaElement).value;
  displayExperienceDataArray.push(`<div class="displaydefinedInput">
                                    <div class="date" >
                                        <span contenteditable="false">${workStartDate}</span>
                                         &nbsp;-&nbsp;
                                        <span contenteditable="false">${workEndDate}</span>
                                    </div>
                                    <div class="defiendInputNameAndPlace">
                                        <span contenteditable="false">${experienceBoxName}</span>
                                        &nbsp;
                                        <span contenteditable="false">${experienceBoxPlace}</span>
                                    </div>
                                    <hr>
                                    <p contenteditable="false">${experienceBoxValue}</p>
                                   </div>`);
 }
 displayEducationBox.innerHTML=displayEducationDataArray.join('');
 displayExperienceBox.innerHTML=displayExperienceDataArray.join('');

 //make userResume
    resumeDisplay.setAttribute('resumeFor',`${username}`);
    let id=resumeDisplay.getAttribute('resumeFor');
    if(!id)return;
    makeUser(id);

 // Show the resume
 resumeDisplay.style.display = 'block';
 (document.getElementById('resume-links')as HTMLDivElement).style.display = 'flex';
 (document.getElementById('resumeForm') as HTMLDivElement).style.display = 'none';
 //reseeting data in sidebar without reloading
 setStorage()
 populate()
});
//making more Education feilds in input form dynamically
(document.getElementById('addEducationBtn') as HTMLButtonElement).addEventListener('click',()=>{
 const educationBox = (document.getElementById('education-box') as HTMLDivElement);
  let div=document.createElement('div');
  div.id='removeEdu' + educationBox.children.length;
  div.className="definedInput";
  div.innerHTML= 
        `<span>Enter your Education</span>
        <input type="text" required>
        <span>Enter place of Education</span>
        <input type="text" required>
        <span>Enter your Education discription</span>
        <textarea rows="4" placeholder="List your education discription" required></textarea>
        <button class="removeBtn Btn" type="button" onclick="(() => remove('removeEdu'+${educationBox.children.length}))()">-</button>
                `;
  educationBox.appendChild(div)
});
//making more Experience feilds in input form dynamically
(document.getElementById('addExperienceBtn') as HTMLButtonElement).addEventListener('click',()=>{
 const experienceBox = (document.getElementById('experience-box') as HTMLDivElement);
  let div=document.createElement('div');
  div.id='removeExp' + experienceBox.children.length;
  div.className="definedInput";
  div.innerHTML= `
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
   experienceBox.appendChild(div)
});
//Making a sharable link on get link button click
shareBtn.addEventListener('click',()=>{
    let username=resumeDisplay.getAttribute('resumeFor');
    if(!username)return;
    const shareableURL = `${window.location.origin}/resumes/userResume.html?resume=${encodeURIComponent(username)}`;
    (document.getElementById('copyText') as HTMLInputElement).value=shareableURL;
    sharelink.href=shareableURL;
    sharelink.innerHTML=shareableURL;
    (document.getElementById('shareLinkBox') as HTMLDivElement).style.display='flex';
    (document.getElementById('shareLinkBoxlink') as HTMLLinkElement).click()
});
//making form editable when clicking edit button
editBtn.addEventListener('click',()=>{
    let editableContent=resumeDisplay.querySelectorAll('[contenteditable="false"]');
    editableContent.forEach((element:Element)=>{
        element.setAttribute('contenteditable','true')
    })
    saveBtn.style.display='block';
    editBtn.style.display='none';
    pdfBtn.style.opacity='0.5';
    shareBtn.style.opacity='0.5';
    resetBtn.style.opacity='0.5';
    resetBtn.setAttribute('disabled','true');
    pdfBtn.setAttribute('disabled','true');
    shareBtn.setAttribute('disabled','true');
    (document.getElementById('shareLinkBox') as HTMLDivElement).style.display='none';
});
//saving the edited form when clicking save button
saveBtn.addEventListener('click',()=>{
    let editableContent=resumeDisplay.querySelectorAll('[contenteditable="true"]');
    editableContent.forEach((element:Element)=>{
        element.setAttribute('contenteditable','false')
    })
    let id=resumeDisplay.getAttribute('resumeFor');
    if(!id)return;
    makeUser(id);
    saveBtn.style.display='none';
    editBtn.style.display='block';
    pdfBtn.style.opacity='1';
    shareBtn.style.opacity='1';
    resetBtn.style.opacity='1';
    resetBtn.removeAttribute('disabled')
    pdfBtn.removeAttribute('disabled')
    shareBtn.removeAttribute('disabled')
});
//copping text to clip board
copyBtn.addEventListener('click',()=>{
    copyText('copyText')
});
//change toottip value
copyBtn.addEventListener('mouseover',()=>{
    (document.getElementById('copiedLink')as HTMLSpanElement).innerHTML='copy link';
})
////////////////////////////// ALL EVENTLISTENERS END ////////////////////////////////////////
// setting values on first load
setStorage();
populate();