const input = document.getElementById("input-box-id");
const save = document.getElementById("save-btn-id");
const clear = document.getElementById("clear-all-btn-id");
const ulist = document.getElementById("ulist");
const savetab = document.getElementById("savetab-btn-id");
let myUrls = [];
let urlsFromLocalStorage = JSON.parse(localStorage.getItem("urls"));


if (urlsFromLocalStorage) {
    myUrls = urlsFromLocalStorage;
    let str = "";
    for (let i1 = 0; i1 < myUrls.length; i1++) {
        str += `<li>
                  <a target='_blank' href='${myUrls[i1]}'>
                    ${myUrls[i1]}
                    </a>
                 </li>
                 <br>
                 `; 
    }
    ulist.innerHTML = str;
}

save.addEventListener("click", appendFn);

input.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        appendFn();
    }
});

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

savetab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currurl = tabs[0].url;
    ulist.innerHTML += "<li><a target = &#34_blank&#34 href=" + (tabs[0].url) + " &#34>" + currurl + "</a></li><br>";
    myUrls.push(tabs[0].url);
    localStorage.setItem("urls", JSON.stringify(myUrls)); 
    });
});

function appendFn(){
    ulist.innerHTML += "<li><a target = &#34_blank&#34 href=" + input.value + " &#34>" + input.value + "</a></li><br>";
    myUrls.push(input.value);
    input.value = "";
    localStorage.setItem("urls", JSON.stringify(myUrls)); 
}