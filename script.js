var form = document.getElementById("passForm");
var passList = document.getElementById('passList');

var passes = JSON.parse(localStorage.getItem("passes")) || [];

function showpasses() {
    passList.innerHTML = "";
    if(passes === 0){
        passList.innerHTML = "<p>No passes added yet.</p>";
        return;
    }

    for( var i=0; i < passes.length; i++){
        var p = passes[i];
        var div = document.createElement("div");
        div.className = "pass-card";
        div.innerHTML = "<p><strong>Name:</strong> " + p.name + "</p>" +
                        "<p><strong>ID:</strong> " + p.id + "</p>" +
                        "<p><strong>Route:</strong> " + p.route + "</p>" +
                        "<p><strong>Distance:</strong> " + p.distance + "km</p>" +
                        "<p><strong>Duration:</strong> " + p.duration + "</p>" +
                        "<p><strong>Fee:</strong> ₹" + p.fee + "</p>" +
                        "<p><strong>Expiry:</strong> " + p.expiry + "</p>" +
                        "<button onclick='renewPass(" + i + ")'>Renew</button>" +
                        "<button onclick='deletePass(" + i + ")'>Delete</button>";
        passList.appendChild(div);
    }
}

function calculateFee(distance,duration) {
    var monthlyFee =  Math.max(50, Math.round(distance * 1.5));
    if(duration == "yearly") return monthlyFee * 10;
    return monthlyFee;
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    var name = document.getElementById("name").value;
    var id = document.getElementById("studentId").value;
    var route = document.getElementById("route").value;
    var distance = parseFloat(document.getElementById("distance").value);
    var duration = document.getElementById("duration").value;

    var fee = calculateFee(distance,duration);

    var expiry = new Date();
    if(duration == "monthly") expiry.setMonth(expiry.getMonth() + 1);
    else expiry.setMonth(expiry.getMonth() + 12);

    var newPass = {
        name: name,
        id: id,
        route: route,
        distance: distance,
        duration: duration,
        fee: fee,
        expiry: expiry.toLocaleDateString()
    };

    passes.push(newPass);
    localStorage.setItem("passes",JSON.stringify(passes));
    showpasses();
    form.reset();
});

function renewPass(index) {
    var pass = passes[index];
    var expiry = new Date();
    if(pass.duration == "monthly") expiry.setMonth(getMonth() + 1);
    else expiry.setMonth(expiry.getMonth() + 12);
    passes[index].expiry = expiry.toLocaleDateString();
    localStorage("passes",JSON.stringify("passes"));
    showpasses();
}

function deletePass(index) {
    passes.splice(index,1);
    localStorage.setItem("passes",JSON.stringify("passes"));
    showpasses();
}

showpasses();