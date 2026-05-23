window.onload = function(){

const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const densitySlider = document.getElementById("density");
const densityValue = document.getElementById("densityValue");
const result = document.getElementById("result");
const statusIcon = document.getElementById("statusIcon");

let emergencyActive = false;

// Update slider
densitySlider.oninput = function () {
    densityValue.textContent = this.value;
    optimizeSignal(); // auto update
};

// Turn off lights
function turnOffLights() {
    red.style.opacity = 0.3;
    yellow.style.opacity = 0.3;
    green.style.opacity = 0.3;
}

// MAIN LOGIC
window.optimizeSignal = function () {

    if (emergencyActive) return;

    let density = parseInt(densitySlider.value);
    turnOffLights();

    // VERY LOW
    if (density <= 20) {
        green.style.opacity = 1;
        statusIcon.innerHTML = "🟢 Very Low Traffic";
        result.innerHTML = "Road is almost clear → Maximum green signal";
    }

    // LOW
    else if (density <= 40) {
        green.style.opacity = 1;
        statusIcon.innerHTML = "🟢 Low Traffic";
        result.innerHTML = "Smooth traffic → Longer green time";
    }

    // MEDIUM
    else if (density <= 60) {
        yellow.style.opacity = 1;
        statusIcon.innerHTML = "🟡 Medium Traffic";
        result.innerHTML = "Moderate traffic → Balanced signal timing";
    }

    // HIGH
    else if (density <= 80) {
        red.style.opacity = 1;
        statusIcon.innerHTML = "🔴 High Traffic";
        result.innerHTML = "Heavy traffic → Controlled signal switching";
    }

    // VERY HIGH
    else {
        red.style.opacity = 1;
        statusIcon.innerHTML = "🚨 Very High Traffic";
        result.innerHTML = "Severe congestion → Maximum control & delay";
    }
};

// EMERGENCY MODE
window.activateEmergency = function(type){

    emergencyActive = true;
    turnOffLights();

    green.style.opacity = 1;

    let vehicle = {
        ambulance: "🚑 Ambulance",
        fire: "🚒 Fire Brigade",
        police: "🚓 Police"
    };

    statusIcon.innerHTML = "🚨 EMERGENCY MODE";
    result.innerHTML = vehicle[type] + " detected → Immediate GREEN corridor";

    // Auto reset
    setTimeout(() => {
        emergencyActive = false;
        optimizeSignal();
    }, 5000);
}

// Run once at start
optimizeSignal();

}