
const API = "https://YOUR_BACKEND_URL";

function login(){
window.location.href =
"https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR_FRONTEND_URL&response_type=token&scope=identify";
}

window.onload = async function(){
loadPlayers();
};

document.getElementById("joinForm").onsubmit = async function(e){
e.preventDefault();
const nickname = document.getElementById("nickname").value;
const rolePref = document.getElementById("rolePref").value;

await fetch(API + "/join",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({nickname, rolePref})
});

loadPlayers();
};

async function loadPlayers(){
const res = await fetch(API + "/players");
const data = await res.json();
const list = document.getElementById("players");
list.innerHTML="";
data.forEach(p=>{
const li=document.createElement("li");
li.textContent=p.nickname+" — "+p.role;
list.appendChild(li);
});
}

async function resetGame(){
await fetch(API + "/reset",{method:"POST"});
loadPlayers();
}

function loadAdmin(){
if(document.getElementById("adminPass").value==="admin123"){
document.getElementById("adminPanel").style.display="block";
}
}
