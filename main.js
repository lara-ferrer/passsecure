window.onload = function() {
    // var xhttp = new XMLHttpRequest();

    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         processData(this.responseText);
    //     }
    // }
    // xhttp.open("GET", "https://localhost:5001/Site", true);
    // xhttp.send();
    fetch('https://localhost:5001/Site', {
    method: 'GET'
    }).then(response => {
        return response.json()
    }).then(data => 
        processData(data)
    );
}

function processData(response) {
    let tbody = document.getElementById('table-content');

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

        let actions = document.createElement('td');
        let deleteLink = document.createElement('a');
        deleteLink.innerText = 'Borrar usuario';
        deleteLink.href = `https://localhost:5001/Site?Id=${i.id}`;
        deleteLink.onclick = deleteSite;
        actions.appendChild(deleteLink);

        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(user);
        tr.appendChild(creationDate);
        tr.appendChild(actions);

        tbody.appendChild(tr);
    });
}

function deleteSite(e) {
    e.preventDefault();
    var e = e.target.href;

    fetch(e, {
    method: 'DELETE'
    }).then(() => {
        window.location.reload();
    });

    alert('El usuario ha sido eliminado con éxito');

}

// function activeElement() {
//     category.classList.add("active");
//     console.log("Element fired");
// }