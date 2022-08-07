const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let teamMember = [];

function questions(){ inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is employee's name?",
        
    },
    {
        type: "input",
        name: "id",
        message: "Enter employee's ID: ",
       
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email address: ",
      
       
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
        message: "What is the employee's github username?: ",
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
        message: "What is the employee's office number?: ",
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
        message: "What school is employee attending: ",
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
            questions()
        } else {

            console.log(teamMember);

            console.log("Your team profile is generated.")
        }
    })
    
})
};

questions();


