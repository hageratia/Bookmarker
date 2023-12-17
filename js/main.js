var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var localStorageKey = "sites";
var tabError = document.getElementById("tabError");
var closeBtn = document.getElementById("closeBtn");
var overlaySec = document.querySelector("overlay")


function isNameValid() {
    var regex = /^([a-zA-Z_ ]){3,}$/;
    var valid = regex.test(bookmarkName.value);
    if (valid) {
        bookmarkName.classList.remove("notValid");
        bookmarkName.classList.add("valid");
    } else {
        bookmarkName.classList.add("notValid");
        bookmarkName.classList.remove("valid");
    }
    return valid;
}


function isUrlValid() {
    var regex = /^([hH]ttp[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/;
    var valid = regex.test(bookmarkURL.value);
    if (valid) {
        bookmarkURL.classList.remove("notValid");
        bookmarkURL.classList.add("valid");

    } else {
        bookmarkURL.classList.add("notValid");
        bookmarkURL.classList.remove("valid");
    }
    return valid;
}



var bookMarkList = [];

function addlocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(bookMarkList));
}
if (JSON.parse(localStorage.getItem(localStorageKey))) {
    bookMarkList = JSON.parse(localStorage.getItem(localStorageKey));
    displaySite();
}

function closeOverLay() {
    tabError.classList.replace("d-flex", "d-none");
}

function addSite() {
    if (isNameValid() && isUrlValid()) {
        var site = {
            name: bookmarkName.value,
            url: bookmarkURL.value,
        }
        bookMarkList.push(site);
        displaySite();
        addlocalStorage();
        clearDate();
    } else {
        tabError.classList.replace("d-none", "d-flex")
    }
}

tabError.addEventListener("click", closeOverLay);

closeBtn.addEventListener("click", closeOverLay);
overlaySec.addEventListener("click", function(e) {
    e.stopPropagation();
})


function displaySite() {
    var sites = "";
    for (i = 0; i < bookMarkList.length; i++) {
        sites += `<tr>
        <td>${i + 1}</td>
        <td>${bookMarkList[i].name}</td>
        <td>
            <button class="btn btn-success" onclick="visitSite(${i})" >
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </td>
        <td>
            <button class="btn btn-danger pe-2" onclick="deleteBtn(${i})">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
        </td>
    </tr>`
    }
    document.getElementById("tableContent").innerHTML = sites;
}

function clearDate() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function deleteBtn(index) {
    bookMarkList.splice(index, 1);
    addlocalStorage();
    displaySite();
}

function visitSite(index) {
    var protocol = /^([hH]ttp[s]?)/;
    if (protocol.test(bookMarkList[index].url)) {
        window.open(bookMarkList[index].url);
    } else {
        window.open(new URL(`https://${bookMarkList[index].url}`))
    }
}