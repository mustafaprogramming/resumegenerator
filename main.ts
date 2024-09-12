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
function remove(id:string) {
 (document.getElementById(id) as HTMLDivElement).remove()
}
(document.getElementById('resumeForm') as HTMLFormElement).addEventListener('submit', function(event) {
 event.preventDefault(); // Prevent form submission
 
 // Get values from the form
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
 // Display values in the resume section
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
  console.log(eduactionBoxName,eduactionBoxPlace,eduactionBoxValue)

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
 for(let i=0;i<experienceBox.children.length;i++){
  let workStartDate=(experienceBox.children[i].children[1].children[0] as HTMLInputElement).value;
  let workEndDate=(experienceBox.children[i].children[1].children[1] as HTMLInputElement).value;
  let experienceBoxName=(experienceBox.children[i].children[3] as HTMLInputElement).value;
  let experienceBoxPlace=(experienceBox.children[i].children[5] as HTMLInputElement).value;
  let experienceBoxValue=(experienceBox.children[i].children[7] as HTMLTextAreaElement).value;
  console.log(experienceBoxName,experienceBoxPlace,experienceBoxValue)
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
 displayEducationBox.innerHTML=displayEducationDataArray.join('');
 displayExperienceBox.innerHTML=displayExperienceDataArray.join('');


 // Show the resume
 (document.getElementById('resumeDisplay') as HTMLDivElement).style.display = 'block';
 (document.getElementById('resume-links')as HTMLDivElement).style.display = 'flex';
 (document.getElementById('resumeForm') as HTMLDivElement).style.display = 'none';
});
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
