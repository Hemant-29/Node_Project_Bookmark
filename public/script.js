const bookmarksContainer = document.querySelector(".bookmarksTable");
const addForm = document.querySelector('#addForm');
const editForm = document.querySelector('#editForm');
const editPopup = document.querySelector('.editPopup');
const editPopupClose = document.querySelector('#EditPopupClose');
const addWebsiteName = document.querySelector('#addWebsiteName');
const addWebsiteUrl = document.querySelector('#addWebsiteUrl');
const editWebsiteName = document.querySelector('#editWebsiteName');
const editWebsiteUrl = document.querySelector('#editWebsiteUrl');

var editID = null;


function closeEditPopup() {
    editPopup.style.visibility = 'hidden';
}

async function fetchBookmarks(params) {
    try {
        const response = await fetch('http://localhost:5000/api/v1/bmarks')
        const bookmarkData = await response.json();
        console.log(bookmarkData);
        addToList(bookmarkData);
    } catch (error) {
        console.log("Some Error occured while fetching data:", error)
    }
}


const addToList = (bookmarkData) => {
    bookmarkData.forEach((bookmark, index) => {
        console.log(bookmark.name);
        console.log(bookmark.link);

        const listElement = document.createElement('div');
        listElement.className = 'listElement';

        const listIndex = document.createElement('p');
        listIndex.textContent = (index + 1);
        listElement.appendChild(listIndex);
        listIndex.style.minWidth = '25px'

        const listName = document.createElement('p');
        listName.textContent = (bookmark.name);
        listElement.appendChild(listName);
        listName.style.minWidth = '100px'

        const listUrl = document.createElement('a');
        listUrl.textContent = (bookmark.link);
        listUrl.href = (`http://${bookmark.link}`);
        listUrl.style.width = '180px';
        listUrl.target = "_blank";
        listElement.appendChild(listUrl);

        const listEdit = document.createElement('button');
        listEdit.textContent = ("Edit");
        listElement.appendChild(listEdit);
        listEdit.addEventListener('click', (event) => {
            editPopup.style.visibility = 'visible';
            editWebsiteName.value = bookmark.name;
            editWebsiteUrl.value = bookmark.link;
            editID = bookmark._id;
        });

        const listDelete = document.createElement('button');
        listDelete.textContent = ("Delete");
        listDelete.style.marginLeft = "auto";
        listDelete.id = "listDeleteButton";
        listElement.appendChild(listDelete);
        listDelete.addEventListener('click', (event) => {
            makeApiCall(`api/v1/bmarks/${bookmark._id}`, 'DELETE');
        });
        bookmarksContainer.appendChild(listElement);
    });
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the values from the form inputs
    const name = addWebsiteName.value;
    const url = addWebsiteUrl.value;

    makeApiCall("api/v1/bmarks", 'POST', {
        "name": name,
        "link": url
    })
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the values from the form inputs
    const name = editWebsiteName.value;
    const url = editWebsiteUrl.value;
    makeApiCall(`api/v1/bmarks/${editID}`, 'PATCH', {
        "name": name,
        "link": url
    })
})

async function makeApiCall(address, methodParam, bodyParam) {
    try {

        const response = await fetch(address, {
            method: methodParam,
            body: JSON.stringify(bodyParam),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        window.location.reload();
    } catch (error) {
        console.log("Error fetching API:", error)
    }
}

fetchBookmarks();
