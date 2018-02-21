// -------------------
const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json"
  makeRequest(url, requestComplete);

};
// -------------------

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

// return data
const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
}

// populate list
const populateList = function(beers){
  const ul = document.getElementById("beers-list");

  beers.forEach(function(beer){
    const li = document.createElement("li");
    li.innerText = beer.name;
    ul.appendChild(li);
  })
}


document.addEventListener('DOMContentLoaded', app);
