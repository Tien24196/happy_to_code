const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const makeHTML = require("./src/template");

let teamMember = [];
let teamCard='';

function questions(){ 
    
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is employee's name?",
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter your employee's name!");
              return false;
            }
          }

        
    },
    {
        type: "input",
        name: "id",
        message: "Enter employee's ID: ",
        validate: idInput => {
            if (idInput) {
              return true;
            } else {
              console.log("Please enter your employee's id!");
              return false;
            }
          }
       
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email address: ",
        validate: emailInput => {
            if (emailInput.includes('@')) {
              return true;
            } else {
              console.log('  Please enter a valid email address!');
              return false;
            }
          }
      
       
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role: ",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ]
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?: ",
        validate: gitInput => {
            if (gitInput) {
              return true;
            } else {
              console.log("Please enter the engineer's GitHub username!");
              return false;
            }
          },
        when: ({role}) => {
            if (role === "Engineer") {
                return true;
            } else {
                return false
            }
        }
    },
    {
        type: "input",
        name: "office",
        message: "What is the manager's office number?: ",
        validate: officeInput => {
            if (officeInput) {
              return true;
            } else {
              console.log("Please enter the manager's office number!");
              return false;
            }
          },
        when: ({role}) => {
            if (role === "Manager") {
                return true;
            } else {
                return false
            }
        }
    },
    {
        type: "input",
        name: "school",
        message: "What school is the intern attending: ",
        validate: idInput => {
            if (idInput) {
              return true;
            } else {
              console.log("Please enter the intern's school!");
              return false;
            }
          },
        when: ({role}) => {
            if (role === "Intern") {
                return true;
            } else {
                return false
            }
        }
    }
])
.then( answers => {
    if (answers.role === "Intern") {
        let intern = new Intern (answers.name, answers.id, answers.email, answers.school);
        teamMember.push(intern);
    } 

    else if (answers.role === "Engineer") {
        let engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);
        teamMember.push(engineer);
    }

    else if (answers.role === "Manager") {
        let manager = new Manager (answers.name, answers.id, answers.email, answers.office);
        teamMember.push(manager);
    }

    inquirer.prompt({
        type: "list",
        name: "finish",
        message: "Do you want to add another employee?: ",
        choices: [
            "Yes",
            "No"
        ]
    })
    .then(response => {
        if(response.finish ==="Yes") {
            console.log("---------------------------------------------");

            questions()
        } else {

            for (let i = 0; i < teamMember.length; i++) {

                teamCard = teamCard + makeHTML.generateCard(teamMember[i]);
               
            }

            fs.writeFile("./dist/index.html", makeHTML.generateHTML(teamCard), err => {
                if (err) throw err;})


            console.log("-------------------------------------");

            console.log("Your team profile is generated.");
            
            console.log("-------------------------------------");
        }
    })
    
})
};

questions();


