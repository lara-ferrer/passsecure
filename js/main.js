window.onload = function() {
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
        let externalLink = document.createElement('a');
        externalLink.innerHTML = '<img src="assets/external-link.svg" class="controls-icon" />';
        externalLink.href = `${i.url}`;
        externalLink.setAttribute('target', '_blank');

        let deleteLink = document.createElement('a');
        // deleteLink.innerHTML = 'X';
        deleteLink.innerHTML = '<img src="assets/delete.svg" class="controls-icon" />';
        deleteLink.href = `https://localhost:5001/Site?Id=${i.id}`;
        deleteLink.onclick = deleteSite;

        let editLink = document.createElement('a');
        editLink.innerHTML = '<img src="assets/edit.svg" class="controls-icon" />';
        editLink.href = `http://127.0.0.1:5500/web/site.html?id=${i.id}`;
        
        actions.appendChild(externalLink);
        actions.appendChild(deleteLink);
        actions.appendChild(editLink);

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

}

function addCategory() {
    var name = prompt("Escribe el nombre de la categoría");
}

function setActive() {
    var category = document.querySelector(".category");
    category.classList.toggle('active');
    console.log("Element fired");
}