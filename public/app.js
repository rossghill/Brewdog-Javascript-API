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

    li.innerText = beer.name;
    ul.appendChild(li);

    beer_img.className = "beer_img";
    beer_img.src = beer.image_url;
    li.appendChild(beer_img);

    // malts.className = "ingredients_text";
    // const maltNamesArray = [];
    // beers.forEach(function(malt){
    //   maltNamesArray.push(beer.ingredients.malt.name);
    // });
    // malts.innerText = maltNamesArray;
    // li.appendChild(malts);
    malts.className = "ingredients_text";
    maltNamesArray = [];
    maltsObject = beer.ingredients.malt;
    maltsObject.forEach(function(malt){
      maltNamesArray.push(malt.name);
    })


    console.log(maltNamesArray);
    // console.log(maltsObject[0]);
    // malts.innerText =

    li.appendChild(malts);

    yeast.className = "ingredients_text";
    yeast.innerText = `Yeast: ${beer.ingredients.yeast}`;
    li.appendChild(yeast);
    // console.log(yeast);

  })
}


document.addEventListener('DOMContentLoaded', app);
