// Generate HTML template

const generateHTML = function (teamCard) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Team Work</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
</style>
</head>
<body>
<div class="header">
<div class="jumbotron bg-danger rounded-0">
   <h1 class="display-4 text-white text-center">My Awesome Team</h1>
</div>
</div>
<div class="container-body container-fluid">
   <div class="row justify-content-center px-5">
        ${teamCard} 
    </div>
</div>
<script src="https://kit.fontawesome.com/257de25400.js" crossorigin="anonymous"></script>  
</body>
</html>`

}

// Generates cards for each class
const generateCard = function (member) {
    //Fontawesome Icons change based on role
    let positionIcon;
    //display info
    let roleInfo;

    if (member.title === "Manager") {
        positionIcon = `<i class="fas fa-mug-hot"></i>`
        roleInfo = `Office Number: ${member.officeNumber}`
    } else if (member.title === "Engineer") {
        positionIcon = `<i class="fas fa-glasses"></i>`
        roleInfo = `GitHub: <a href="https://github.com/${member.github}" target="_blank">${member.github}</a>`
    } else if (member.title === "Intern") {
        positionIcon = `<i class="fas fa-user-graduate"></i>`
        roleInfo = `School: ${member.school}`
    }

    return `
    
<div class="col-md-4 col-sm-6 col-12 col-lg-3">
    <div class="card shadow mb-5 bg-light rounded">
        <div class="card-header bg-primary">
            <h4 class="text-white text-center">${member.name}</h4>
            <h4 class="text-white text-center">${positionIcon} ${member.title}</h4>
        </div>
        <div class="card-body">
            <ul class="list-unstyled border border-secondary rounded bg-white my-3">
                <li class=" p-2 ">Employee ID: ${member.id}</li>
                <li class="border-top border-secondary p-2 ">Email: <a href="mailto:${member.email}">${member.email}</a></li>
                <li class="border-top border-secondary p-2 ">${roleInfo}</li>
            </u>
        </div>
    </div>
  </div>
`
}

exports.generateHTML = generateHTML;
exports.generateCard = generateCard;