var profile = {
    name: "Bimochan Shrestha",
    img: "https://avatars3.githubusercontent.com/u/11685953?s=400&u=327ce2ce4cce6ed6fc3c7368ee1be781916b04f0&v=4",
    dob: "1994-09-12",
    college: "Himalaya College of Engineering",
    location: "Shantinagar",
    github: "https://github.com/sbimochan",
    work:"Leapfrog Technology"
}
//Age Calculation
var dob = profile.dob;
var splits = dob.split('-');
var today = new Date();
var year = today.getFullYear();
var age = year - splits[0];
//writing into span
document.getElementById('name').innerHTML = profile.name;
document.getElementById('dob').innerHTML = profile.dob;
document.getElementById('age').innerHTML = age;
document.getElementById('college').innerHTML = profile.college;
document.getElementById('location').innerHTML = profile.location;
document.getElementById('work').innerHTML = profile.work;

//creating link
var a = document.createElement('a');
var portfolio = document.getElementsByClassName("portfolio");
var linkText = document.createTextNode("Github");
a.appendChild(linkText);
a.href = profile.github;
portfolio[0].appendChild(a);
//for profile pic
document.getElementById("profPic").src = profile.img;