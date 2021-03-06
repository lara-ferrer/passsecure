/**
Declare global APIs
**************************************/

var categoryAPI = 'https://passsecureapi.azurewebsites.net/Categories'
var siteAPI = 'https://passsecureapi.azurewebsites.net/Sites'
var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

/**
Edit sites
**************************************/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const siteId = urlParams.get('id');
const categoryId = urlParams.get('category');

if (siteId) {
    fetch(siteAPI + `/${siteId}`, {
    method: 'GET',
    headers: headers
    }).then(response => {
        return response.json()
    }).then(data => 
        getSingleSite(data)
    )
}

const form = document.getElementById("site-form");

function getSingleSite(response) {
    response.forEach((item) => {
        console.log(item)
        let mainTitle = document.getElementById('site__title');
        mainTitle.innerText = `Editar ${item.name}`;
    
        let id = item.id;
        let creationDate = item.creationDate;

        let name = document.getElementById('name');
        name.value = `${item.name}`;
    
        let url = document.getElementById('url');
        url.value = `${item.url}`;

        let user = document.getElementById('user');
        user.value = `${item.user}`;
    
        let pass = document.getElementById('pass');
        pass.value = `${item.password}`;
    
        let desc = document.getElementById('description');
        desc.innerText = `${item.description}`;

        editSite(id, creationDate);
    })
}

if (siteId != null) {
    function editSite(id, creationDate) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
        
            const formData = new FormData(form);
        
            formData.append('id', id);
            formData.append('creationDate', creationDate);
            
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJsonString = JSON.stringify(plainFormData);
            fetch(siteAPI, {
            method: 'PUT',
            body: formDataJsonString,
            headers: headers
            }).then(response => {
                return response.json()
            }).then(response => 
                window.location.href = "/"
            )
        });
    }
}

/**
Autogenerate secure password
**************************************/
function generatePass() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }

    document.getElementById("pass").value = password;
}


/**
Add sites
**************************************/

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    var id = Math.floor(Math.random() * 100);
    formData.append('id', id);

    var date = new Date();
    date = date.getDate() + "/" + date.getMonth()+ "/" + date.getFullYear();
    formData.append('creationDate', date);

    formData.append('categoryId', categoryId);
    
    const plainFormData = Object.fromEntries(formData.entries());
	   const formDataJsonString = JSON.stringify(plainFormData);
    
    fetch(siteAPI, {
    method: 'POST',
    body: formDataJsonString,
    headers: headers
    }).then(response => {
        return response.json()
    }).then(response => 
        window.location.href = "/"
    )
});
