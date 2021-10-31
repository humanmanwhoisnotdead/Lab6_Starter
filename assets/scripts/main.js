// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  '/assets/recipes/recpies1.json',
  '/assets/recipes/recpies2.json',
  '/assets/recipes/recpies3.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
    var j = 0;
    var a = 0;    
    for (var j = 0; j < recipes.length; j++) {
      let i = j;
      fetch(recipes[i])
      .then(response => response.json())
      .then(async function(data) {
        recipeData[recipes[i]] = data;
        a++;
        let RDlength = 0;
        for (let item in recipeData) {
          RDlength++;
        }
        if (a == recipes.length && RDlength == recipes.length) {
          resolve(true);
        } else if (a == recipes.length) {
          reject(false);
        }
      });
    }
  



  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
    const firstRecipe = document.createElement('recipe-card');
    firstRecipe.data = (recipeData[recipes[0]]);
    var secondRecipe = document.createElement('recipe-card');
    secondRecipe.data = (recipeData[recipes[1]]);
    var thirdRecipe = document.createElement('recipe-card');
    thirdRecipe.data = (recipeData[recipes[2]]);
    document.querySelector('main').appendChild(firstRecipe);
    document.querySelector('main').appendChild(secondRecipe);
    document.querySelector('main').appendChild(thirdRecipe);
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/
  var fourthRecipe = document.createElement('recipe-card');
  fourthRecipe.data = (recipeData[recipes[3]]);
  var fifthRecipe = document.createElement('recipe-card');
  fifthRecipe.data = (recipeData[recipes[4]]);
  var sixthRecipe = document.createElement('recipe-card');
  sixthRecipe.data = (recipeData[recipes[5]]);

  // Part 2 Explore - TODO
  var button = document.querySelector('button');
  button.addEventListener('click', alternateShow);
  function alternateShow() {
    if (button.innerText == "Show more") {
      button.innerText = "Show less";
      document.querySelector('main').appendChild(fourthRecipe);
      document.querySelector('main').appendChild(fifthRecipe);
      document.querySelector('main').appendChild(sixthRecipe);
    } else {
      button.innerText = "Show more";
      document.querySelector('main').removeChild(fourthRecipe);
      document.querySelector('main').removeChild(fifthRecipe);
      document.querySelector('main').removeChild(sixthRecipe);
    }
  }
}