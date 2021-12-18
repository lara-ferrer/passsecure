/**
Edit sites
**************************************/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const siteId = urlParams.get('id');
const categoryId = urlParams.get('category');

if (siteId) {
    fetch(`https://passsecureapi.azurewebsites.net/Site/${siteId}`, {
    method: 'GET'
    }).then(response => {
        return response.json()
    }).then(data => 
        editSite(data)
    )
}

function editSite(response) {
    let mainTitle = document.getElementsByClassName('site__title');
    mainTitle.innerText = `Editar ${response.name}`;

    let name = document.getElementById('name');
    name.value = `${response.name}`;

    let url = document.getElementById('url');
    url.value = `${response.url}`;

    let pass = document.getElementById('pass');
    pass.value = `${response.password}`;

    let desc = document.getElementById('desc');
    desc.innerText = `${response.description}`;
}


/**
Add sites
**************************************/
const form = document.getElementById("site-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

    const formData = new FormData(form);

    var id = Math.floor(Math.random() * 100);
    formData.append('id', id);

    var date = new Date();
    date.toLocaleDateString();
    formData.append('creationDate', date);

    formData.append('categoryId', categoryId);
    
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    
    fetch('https://passsecureapi.azurewebsites.net/Site', {
    method: 'POST',
    body: formDataJsonString,
    headers: {
        'Content-Type': 'application/json'
    },
    }).then(response => {
        return response.json()
    }).then(response => 
        window.location.href = "https://wonderful-dune-0903caf03.azurestaticapps.net/"
    )
});