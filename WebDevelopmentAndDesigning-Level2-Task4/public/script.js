

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const username=document.getElementById("username").value;

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const response=await fetch("/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
email,
password
})

});

const data=await response.json();

document.getElementById("message").innerText=data.message;

if(response.ok){

setTimeout(()=>{

window.location="login.html";

},1000);

}

});

}



const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const username=document.getElementById("loginUsername").value;

const password=document.getElementById("loginPassword").value;

const response=await fetch("/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})

});

const data=await response.json();

document.getElementById("loginMessage").innerText=data.message;

if(response.ok){

window.location="/dashboard";

}

});

}



const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

await fetch("/auth/logout");

window.location="login.html";

});

}