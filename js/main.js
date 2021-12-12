/**
Get sites
**************************************/

window.onload = function () {
    fetch('https://localhost:5001/Site', {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).then(data =>
        processSites(data)
    );

    fetch('https://localhost:5001/Category', {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).then(data =>
        processCategories(data)
    );
}

function processSites(response) {
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

        let deleteLink = document.createElement('img');
        Object.assign(deleteLink, {
            className: 'controls-icon',
            src: 'assets/delete.svg',
        })
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

/**
Remove sites
**************************************/

function deleteSite(e) {
    e.preventDefault();
    var e = e.target.href;

    fetch(e, {
        method: 'DELETE'
    }).then(() => {
        window.location.reload();
    });
}

/**
Add more categories
**************************************/
function addCategory() {
    var name = prompt("Escribe el nombre de la categoría");
    var id = Math.floor(Math.random() * 100);
    var data = {"id": id, "name": name};

    fetch('https://localhost:5001/Category', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).then(response => 
        console.log(response)
    )
}

/**
Render categories
**************************************/
function processCategories(response) {
    let sidebarCategoryList = document.getElementById('sidebar-list');
    let categoryList = document.getElementById('list-group');

    response.forEach(i => {
        // Add categories in primary sidebar
        let sidebarCategoryItem = document.createElement('li');
        Object.assign(sidebarCategoryItem, {
            className: 'link-dark rounded text-white',
        })
        sidebarCategoryItem.innerText = i.name;

        sidebarCategoryList.appendChild(sidebarCategoryItem);

        // Add categories in category list
        let categoryItem = document.createElement('div');
        Object.assign(categoryItem, {
            className: 'list-group-item list-group-item-action py-3 lh-tight category',
        })

        let categoryTitle = document.createElement('strong');
        Object.assign(categoryTitle, {
            className: 'mb-1',
        })
        categoryTitle.innerText = i.name;

        let deleteCategory = document.createElement('img');
        Object.assign(deleteCategory, {
            className: 'delete-category controls-icon',
            src: 'assets/delete.svg',
        })
        deleteCategory.href = `https://localhost:5001/Category?Id=${i.id}`;
        deleteCategory.onclick = deleteSelectedCategory;

        categoryItem.appendChild(categoryTitle);
        categoryItem.appendChild(deleteCategory);
        categoryList.appendChild(categoryItem);

        activateCategories();
    });
}

/**
Set active category
**************************************/
function activateCategories() {
    var categories = Array.from(document.getElementsByClassName('category'));
    const setActive = (e) => {
        e.preventDefault();
        categories.forEach(category => {
            category.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
    }

    categories.forEach(category => {
        category.addEventListener('click', setActive);
    });
}

/**
Remove categories
**************************************/

function deleteSelectedCategory(e) {
    e.preventDefault();
    var e = e.target.href;

    fetch(e, {
        method: 'DELETE'
    }).then(() => {
        window.location.reload();
    });
}