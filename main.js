window.onload = function() {
    console.log('document loaded');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            processData(this.responseText);
        }
    }
    xhttp.open("GET", "https://localhost:5001/Site", true);
    xhttp.send();
}

function processData(jsonResponse) {
    let response = JSON.parse(jsonResponse);
    
    let tbody = document.getElementById('data');

    response.forEach(i => {
        let tr = document.createElement('tr');

        let id = document.createElement('td');
        id.innerText = i.id;
        let name = document.createElement('td');
        name.innerText = i.name;
        let user = document.createElement('td');
        user.innerText = i.user;
        let creationDate = document.createElement('td');
        creationDate.innerText = i.creationDate;

        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(user);
        tr.appendChild(creationDate);

        tbody.appendChild(tr);
    });
}


// function activeElement() {
//     var e = document.getElementById("category");
//     e.classList.add("active");
//     console.log("Element fired");
// }