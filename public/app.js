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
    const beer_img = document.createElement("img");
    const malts = document.createElement("p");
    const hops = document.createElement("p");
    const yeast = document.createElement("p");
    const horizontal_rule = document.createElement("hr");

    li.innerText = beer.name;
    ul.appendChild(li);

    beer_img.className = "beer_img";
    beer_img.src = beer.image_url;
    li.appendChild(beer_img);

    malts.className = "ingredients_text";
    maltNamesArray = [];
    maltsObject = beer.ingredients.malt;
    maltsObject.forEach(function(malt){
      maltNamesArray.push(malt.name);
    })
    malts.innerText = `Malts: ${maltNamesArray}`;
    li.appendChild(malts);

    hops.className = "ingredients_text";
    hopNamesArray = [];
    hopsObject = beer.ingredients.hops;
    hopsObject.forEach(function(hop){
      hopNamesArray.push(hop.name);
    })
    hops.innerText = `Hops: ${hopNamesArray}`;
    li.appendChild(hops);

    yeast.className = "ingredients_text";
    yeast.innerText = `Yeast: ${beer.ingredients.yeast}`;
    li.appendChild(yeast);

    li.appendChild(horizontal_rule);

  })
}


document.addEventListener('DOMContentLoaded', app);
