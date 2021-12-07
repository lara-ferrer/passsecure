const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id) {
    fetch(`https://localhost:5001/Site/${id}`, {
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

const form = document.getElementById("site-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);
    fetch('https://localhost:5001/Site', {
    method: 'POST',
    body: formData
    }).then(response => {
        return response.json()
    }).then(response => 
        console.log(response)
    )
});