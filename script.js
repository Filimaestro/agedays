document.addEventListener("DOMContentLoaded", function() {
    // Set up download button
document.getElementById("downloadButton").addEventListener("click", downloadImage);

// Set up share button
document.getElementById("shareButton").addEventListener("click", shareImage);

document.getElementById("birthdate").addEventListener("input", function(event) {
let input = event.target.value.replace(/\D/g, ""); // Alleen cijfers toelaten
let formatted = "";

if (input.length > 0) {
formatted += input.substring(0, 2);
}
if (input.length > 2) {
formatted += "-" + input.substring(2, 4);
}
if (input.length > 4) {
formatted += "-" + input.substring(4, 8);
}

event.target.value = formatted;
});


document.getElementById("calculateButton").addEventListener("click", function() {
let dateString = document.getElementById("birthdate").value;

// Check if format is correct
if (!/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
document.getElementById("easter").innerText = "Vul een geldige datum in (DD-MM-JJJJ).";
return;
}

// Check for Easter egg
if (dateString === "02-05-1986") {
document.getElementById("easter").innerText = "Hey, ben jij Jörn?";
} else {
document.getElementById("easter").innerText = "";
}

// Parse the date
let parts = dateString.split("-");
let day = parseInt(parts[0], 10);
let month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
let year = parseInt(parts[2], 10);

let birthDate = new Date(year, month, day);

// Check if date is valid (e.g., not 31-02-2023)
if (birthDate.getDate() !== day || 
birthDate.getMonth() !== month || 
birthDate.getFullYear() !== year ||
birthDate > new Date()) {
document.getElementById("result").innerText = "Vul een geldige geboortedatum in.";
return;
}

let today = new Date();
let diffDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
document.getElementById("result").innerText = `Je bent ${diffDays} dagen oud.`;
calculateMilestone(diffDays);
calculateHendrikjeMilestone(diffDays);
generateImage(diffDays);
document.getElementById("shareButtons").style.display = "block";
});

function calculateMilestone(diffDays) {
const milestones = Array.from({length: 200}, (_, i) => (i + 1) * 500).concat(12345);
let nextMilestone = milestones.find(m => m > diffDays);
if (nextMilestone) {
let daysUntil = nextMilestone - diffDays;
document.getElementById("milestone").innerText = `Nog ${daysUntil} dagen tot je ${nextMilestone} dagen oud bent!`;
}
}

function calculateHendrikjeMilestone(diffDays) {
const hendrikjeAge = 42065;
let daysUntil = hendrikjeAge - diffDays;
if (daysUntil > 0) {
document.getElementById("hendrikje").innerText = `Nog ${daysUntil} dagen tot je net zo oud bent als oudste Nederlander (en Drentse) Hendrikje van Andel-Schipper was.`;
}
}

function generateImage(days) {
let canvas = document.getElementById("ageCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();
img.src = "https://filimaestro.github.io/agedays/background.png";
img.onload = function() {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
ctx.textAlign = "center";
const centerX = canvas.width / 2;

document.fonts.ready.then(() => {
setTimeout(() => {
console.log("Fonts zijn geladen, tekst wordt correct weergegeven.");

// Hoera! Vandaag ben ik...
ctx.font = "72px 'New Rubrik Edge', Arial";
ctx.fillStyle = "White";
ctx.fillText("Hoera! Vandaag ben ik", centerX, canvas.height * 0.4);

// Aantal dagen oud
ctx.font = "100px 'Skippy Sharpie', Arial";
ctx.fillStyle = "Black";
ctx.fillText(`${days} dagen oud!`, centerX, canvas.height * 0.65);

// Make canvas visible after drawing
canvas.style.display = "block";
}, 000);
});
};
}
// Download the generated image
function downloadImage() {
const canvas = document.getElementById("ageCanvas");
const imageUrl = canvas.toDataURL("image/png");

const link = document.createElement("a");
link.href = imageUrl;
link.download = "mijn-leeftijd-in-dagen.png";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

// Share the generated image
function shareImage() {
const canvas = document.getElementById("ageCanvas");
canvas.toBlob(function(blob) {
// Check if Web Share API is supported
if (navigator.share && navigator.canShare({ files: [new File([blob], 'mijn-leeftijd.png', { type: 'image/png' })] })) {
    navigator.share({
        title: 'Mijn leeftijd in dagen',
        text: document.getElementById("result").innerText,
        files: [new File([blob], 'mijn-leeftijd.png', { type: 'image/png' })]
    }).catch(error => {
        console.error('Delen mislukt:', error);
        fallbackShare();
    });
} else {
    fallbackShare();
}
}, 'image/png');
}

// Fallback sharing method
function fallbackShare() {
const resultText = document.getElementById("result").innerText;
alert("Deel dit resultaat: " + resultText + "\n\nJe kunt ook de afbeelding downloaden en handmatig delen.");
}
});document.addEventListener("DOMContentLoaded", function() {
    // Set up download button
document.getElementById("downloadButton").addEventListener("click", downloadImage);

// Set up share button
document.getElementById("shareButton").addEventListener("click", shareImage);

document.getElementById("birthdate").addEventListener("input", function(event) {
let input = event.target.value.replace(/\D/g, ""); // Alleen cijfers toelaten
let formatted = "";

if (input.length > 0) {
formatted += input.substring(0, 2);
}
if (input.length > 2) {
formatted += "-" + input.substring(2, 4);
}
if (input.length > 4) {
formatted += "-" + input.substring(4, 8);
}

event.target.value = formatted;
});


document.getElementById("calculateButton").addEventListener("click", function() {
let dateString = document.getElementById("birthdate").value;

// Check if format is correct
if (!/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
document.getElementById("easter").innerText = "Vul een geldige datum in (DD-MM-JJJJ).";
return;
}

// Check for Easter egg
if (dateString === "02-05-1986") {
document.getElementById("easter").innerText = "Hey, ben jij Jörn?";
} else {
document.getElementById("easter").innerText = "";
}

// Parse the date
let parts = dateString.split("-");
let day = parseInt(parts[0], 10);
let month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
let year = parseInt(parts[2], 10);

let birthDate = new Date(year, month, day);

// Check if date is valid (e.g., not 31-02-2023)
if (birthDate.getDate() !== day || 
birthDate.getMonth() !== month || 
birthDate.getFullYear() !== year ||
birthDate > new Date()) {
document.getElementById("result").innerText = "Vul een geldige geboortedatum in.";
return;
}

let today = new Date();
let diffDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
document.getElementById("result").innerText = `Je bent ${diffDays} dagen oud.`;
calculateMilestone(diffDays);
calculateHendrikjeMilestone(diffDays);
generateImage(diffDays);
document.getElementById("shareButtons").style.display = "block";
});

function calculateMilestone(diffDays) {
const milestones = Array.from({length: 200}, (_, i) => (i + 1) * 500).concat(12345);
let nextMilestone = milestones.find(m => m > diffDays);
if (nextMilestone) {
let daysUntil = nextMilestone - diffDays;
document.getElementById("milestone").innerText = `Nog ${daysUntil} dagen tot je ${nextMilestone} dagen oud bent!`;
}
}

function calculateHendrikjeMilestone(diffDays) {
const hendrikjeAge = 42065;
let daysUntil = hendrikjeAge - diffDays;
if (daysUntil > 0) {
document.getElementById("hendrikje").innerText = `Nog ${daysUntil} dagen tot je net zo oud bent als oudste Nederlander (en Drentse) Hendrikje van Andel-Schipper was.`;
}
}

function generateImage(days) {
let canvas = document.getElementById("ageCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();
img.src = "https://filimaestro.github.io/agedays/background.png";
img.onload = function() {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
ctx.textAlign = "center";
const centerX = canvas.width / 2;

document.fonts.ready.then(() => {
setTimeout(() => {
console.log("Fonts zijn geladen, tekst wordt correct weergegeven.");

// Hoera! Vandaag ben ik...
ctx.font = "72px 'New Rubrik Edge', Arial";
ctx.fillStyle = "White";
ctx.fillText("Hoera! Vandaag ben ik", centerX, canvas.height * 0.4);

// Aantal dagen oud
ctx.font = "100px 'Skippy Sharpie', Arial";
ctx.fillStyle = "Black";
ctx.fillText(`${days} dagen oud!`, centerX, canvas.height * 0.65);

// Make canvas visible after drawing
canvas.style.display = "block";
}, 000);
});
};
}
// Download the generated image
function downloadImage() {
const canvas = document.getElementById("ageCanvas");
const imageUrl = canvas.toDataURL("image/png");

const link = document.createElement("a");
link.href = imageUrl;
link.download = "mijn-leeftijd-in-dagen.png";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

// Share the generated image
function shareImage() {
const canvas = document.getElementById("ageCanvas");
canvas.toBlob(function(blob) {
// Check if Web Share API is supported
if (navigator.share && navigator.canShare({ files: [new File([blob], 'mijn-leeftijd.png', { type: 'image/png' })] })) {
    navigator.share({
        title: 'Mijn leeftijd in dagen',
        text: document.getElementById("result").innerText,
        files: [new File([blob], 'mijn-leeftijd.png', { type: 'image/png' })]
    }).catch(error => {
        console.error('Delen mislukt:', error);
        fallbackShare();
    });
} else {
    fallbackShare();
}
}, 'image/png');
}

// Fallback sharing method
function fallbackShare() {
const resultText = document.getElementById("result").innerText;
alert("Deel dit resultaat: " + resultText + "\n\nJe kunt ook de afbeelding downloaden en handmatig delen.");
}
});
