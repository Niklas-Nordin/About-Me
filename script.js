

// Importerar mina jobb via experience.json
async function experience() {
    
    const myExperience = document.getElementById("experience");

    if (myExperience === null) {
        console.log("Elementet 'experience' finns inte på denna sida. Scriptet avslutas.");
        return;
    }
    
    try { 
        const response = await fetch("../experience.json");

        if(!response.ok) {
            throw new Error("Kunde inte ladda data...");
        }
 
        const data = await response.json();
        const jobs = data.educations.jobs;


        for(i = 0; i < jobs.length; i++) {
            const workExperience = jobs[i];
            
            const newJob = document.createElement("div");
            newJob.classList.add("job");

            newJob.innerHTML = `
            <h3 class="job-title" id="job-title">${workExperience.title}</h3>
            <p class="full-time" id="full-time">${workExperience.formOfEmployment}</p>

            <div class="work">
                <img src="../img/About/mdi_office-building.svg" alt="office building">
                <p>${workExperience.company}</p>
            </div>

            <div class="time">
                <img src="../img/About/carbon_calendar.svg" alt="calendar">
                <p class="time">${workExperience.timeOfEmployment}</p>
            </div>

            <div class="location">
                <img src="../img/About/carbon_location.svg" alt="location">
                <p>${workExperience.location}</p>
            </div>
            `;

            myExperience.append(newJob);
        }

    } catch (error) {
        console.error("Error: Fel vid hämtning av data", error);
    }

}
experience();

// Importerar mina utbildningar via experience.json

async function educations() {

    const educations = document.getElementById("education");

    if (!educations) {
        console.log("Elementet 'education' finns inte på denna sida. Scriptet avslutas.");
        return;
    }

    try {
        const responseEducation = await fetch("../experience.json");

        if(!responseEducation.ok) {
            throw new Error("Kunde inte ladda data...");
        }

        const dataEducation = await responseEducation.json();
        const study = dataEducation.educations.studies;

        for(i = 0; i < study.length; i++) {
            myStudies = study[i];

            const newStudy = document.createElement("div");
            newStudy.classList.add("knowledge");


            newStudy.innerHTML = `
            <h3 class="education-title">${myStudies.title}</h3>
            <p class="full-time">${myStudies.formOfStudy}</p>

            <div class="fullstack study">
                <img src="../img/About/mdi_office-building.svg" alt="office building">
                <p>${myStudies.school}</p>
            </div>

            <div class="time">
                <img src="../img/About/carbon_calendar.svg" alt="calendar">
                <p>${myStudies.timeForStudies}</p>
            </div>

            <div class="location">
                <img src="../img/About/carbon_location.svg" alt="location">
                <p>${myStudies.location}</p>
            </div>
            `;

            educations.append(newStudy);
        }


    } catch(error) {
        console.error("Error: Fel vid hämtning av data", error);
    }

}
educations();


// Nav-list i hamburgermenyn i mobilversion...


const hamburgerMenu = document.getElementById("hamburger-menu1");
const slidebar = document.getElementById("slidebar");
const closeSidebar = document.getElementById("close");

hamburgerMenu.addEventListener("click", click);
closeSidebar.addEventListener("click", click);
function click() {
    hamburgerMenu.classList.toggle("active");
    slidebar.classList.toggle("active");
}

// Mina erfarenheter slidar in på sidan när den laddas.

function slide() {

    setTimeout(() => {
        const showUp = document.querySelectorAll(".about-me-title, .about-me-text, .my-experience");

        showUp.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = "1";
            }, index * 500);
            
        });
    }, 300);

    setTimeout(() => {
        const slideUp = document.querySelectorAll(".job");

        slideUp.forEach((element, index) => {
            setTimeout(() => {
                element.style.bottom = "0";
                element.style.opacity = "1";
            }, index * 300);
            
        });
    }, 1000);

    setTimeout(() => {
        const elements = document.querySelectorAll(".my-education");
        elements.forEach((element) => {
            element.style.opacity = "1";
        });
    }, 3000);

    setTimeout(() => {
        const slideUp = document.querySelectorAll(".knowledge");

        slideUp.forEach((element, index) => {
            setTimeout(() => {
                element.style.bottom = "0";
                element.style.opacity = "1";
            }, index * 300);
            
        });
    }, 2500);
        
};

document.addEventListener("DOMContentLoaded", slide);



// Projects, hämta data från min projekt på Github, m.h.a. en API.


async function githubProjects() {
    
    try {

        const response = await fetch("https://api.github.com/users/Niklas-Nordin/repos");
                

        if(!response.ok) {
            throw new Error("Error, kunde inte fetcha...");
        }

        const data = await response.json();
        // Här skappas elementen...
        
        

        // Skapa kort baserat på sorterad data
        createCards(data.sort(lastCreated));
        
        
        



    } catch (error) {
        console.error("Error, kunde inte ladda in data...", error);
    }

}
githubProjects()

const loadingIcon = document.getElementById("loading");
const allCards = document.querySelectorAll(".all-cards");
const projects = document.getElementById("projects");

function createCards(data) {
    
    // loading();


    for (let i = 0; i < data.length; i++) {


        if (!projects) {
            console.log("Elementet 'createCards' finns inte på denna sida. Scriptet avslutas.");
            return;
        }

        const newCard = document.createElement("article");
        const cardImg = document.createElement("img");
        const cardInfo = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");

        newCard.classList.add("all-cards");
        cardImg.classList.add("card-img");
        cardInfo.classList.add("card-info");
        h3.classList.add("card-title");
        p.classList.add("card-sum");

        projects.append(newCard);
        newCard.append(cardImg, cardInfo);
        cardInfo.append(h3, p);
        newCard.addEventListener('click', () => {
            let htmlUrl = data[i].html_url; // Hämta länken från JSON
            if (htmlUrl) {
                window.open(htmlUrl, "_blank")
            }
        });

        cardImg.src = "../img/Projects/ScriptCode.jpg"
        h3.textContent = data[i].name;
        p.textContent = data[i].description;

        // console.log(data);
        projects.style.display = "none";

        setTimeout(() => {
    
            loadingIcon.style.display = "none";
            projects.style.display = "";
        
        }, 1000);
        // 
    }


}

const lastCreated = function create(a, b) {
    return new Date(b.created_at) - new Date(a.created_at)
};