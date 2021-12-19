/**
Edit sites
**************************************/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const siteId = urlParams.get('id');
const categoryId = urlParams.get('category');

if (siteId) {
    fetch(`https://passsecureapi.azurewebsites.net/Site/GetBySiteID/${siteId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    }).then(response => {
        return response.json()
    }).then(data => 
        getSingleSite(data)
    )
}

const form = document.getElementById("site-form");

function getSingleSite(response) {
    response.forEach((item) => {
        let mainTitle = document.getElementById('site__title');
        mainTitle.innerText = `Editar ${item.name}`;
    
        let id = item.id;
        let name = document.getElementById('name');
        name.value = `${item.name}`;
    
        let url = document.getElementById('url');
        url.value = `${item.url}`;

        let user = document.getElementById('user');
        user.value = `${item.user}`;
    
        let pass = document.getElementById('pass');
        pass.value = `${item.password}`;
    
        let desc = document.getElementById('desc');
        desc.innerText = `${item.description}`;

        console.log(item)
        editSite(id, creationDate);
    })
}

function editSite(id, creationDate) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
    
        const formData = new FormData(form);
    
        formData.append('id', id);
        formData.append('creationDate', creationDate);
        
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log(formDataJsonString)
        fetch('https://passsecureapi.azurewebsites.net/Site', {
        method: 'PUT',
        body: formDataJsonString,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        }).then(response => {
            return response.json()
        }).then(response => 
            window.location.href = "/"
        )
    });
}

/**
Add sites
**************************************/

// form.addEventListener("submit", function(e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     var id = Math.floor(Math.random() * 100);
//     formData.append('id', id);

//     var date = new Date();
//     date = date.getDate() + "/" + date.getMonth()+ "/" + date.getFullYear();
//     formData.append('creationDate', date);

//     formData.append('categoryId', categoryId);
    
//     const plainFormData = Object.fromEntries(formData.entries());
// 	   const formDataJsonString = JSON.stringify(plainFormData);
    
//     fetch('https://passsecureapi.azurewebsites.net/Site', {
//     method: 'POST',
//     body: formDataJsonString,
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//     },
//     }).then(response => {
//         return response.json()
//     }).then(response => 
//         window.location.href = "/"
//     )
// });