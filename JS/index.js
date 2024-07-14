let meals = $("#meals-section")
let categories = $("#categories-section")
let area = $("#area-section")
let ingredients = $("#ingredients-section")
let searchedItems = $("#searched-items-section")

// Search input
let mealFLInput = $("#meal-fl-input")
let mealNameInput = $("#meal-name-input")



// console.log(mealFLInput);

let navListItems = $(".nav-list li")



//navigating using the navigation list
navListItems.on("click", (eventInfo) => {
    //get the id of each one
    //add # and -section to it

    let sectionId = "#" + $(eventInfo.target).attr("id") + "-section";

    switch (sectionId) {
        case '#categories-section': getCategories();
            break;
        case '#area-section': getArea();
            break;
        case '#ingredients-section': getIngredients();
            break;
    }


    //removeClass d-none from the result section
    $(sectionId).removeClass("d-none");
    $("#meals-section").addClass("d-none");

    //addClass d-none to the rest sections
    for (let i = 0; i < navListItems.length; i++) {
        if (`#${navListItems.eq(i).attr("id")}-section` !== sectionId) {
            $(`#${navListItems.eq(i).attr("id")}-section`).addClass("d-none")
        }
    }

    ToggleSideBar();
})

//search input by name listener
mealNameInput.on("input", () => {
    getSearchedMealByName(mealNameInput.val());
})

mealFLInput.on("input", () => {
    let value = ``;

    //forcing user to type only one character
    if (mealFLInput.val().length > 1) {
        value = mealFLInput.val()[0];
        mealFLInput.val(value)
        value = mealFLInput.val()
    }

    getSearchedMealByFL(mealFLInput.val());
})


//side bar toggle
$("#burger-icon").on("click", () => {
    ToggleSideBar()
})

function ToggleSideBar() {
    if ($("aside").css("left") == '-259.2px') {
        $("aside").animate({ "left": "0rem" }, () => {
            $("#search").animate({ "top": "0px" }, 500)
            $("#categories").animate({ "top": "0px" }, 600)
            $("#area").animate({ "top": "0px" }, 700)
            $("#ingredients").animate({ "top": "0px" }, 800)
            $("#contact-us").animate({ "top": "0px" }, 900)
        })
        $("#burger-icon").removeClass("fa-align-justify")
        $("#burger-icon").addClass("fa-x")
    }
    else {
        $("aside").animate({ "left": "-16.2rem" })
        $("#search").animate({ "top": "208px" }, 400)
        $("#categories").animate({ "top": "208px" }, 400)
        $("#area").animate({ "top": "208px" }, 400)
        $("#ingredients").animate({ "top": "208px" }, 400)
        $("#contact-us").animate({ "top": "208px" }, 400)

        $("#burger-icon").addClass("fa-align-justify")
        $("#burger-icon").removeClass("fa-x")
    }
}

//The main API
async function getAllMeals() {
    let fetchedMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let response = await fetchedMeals.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card position-relative border-0 overflow-hidden">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`

    }
    meals.html(blackBox)
}
async function getSearchedMealByFL(char = '') {
    char == '' ? char = 'a' : char;

    let fetchedMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    console.log(fetchedMeals);
    let response = await fetchedMeals.json();
    let blackBox = ``;
    let length;

    if (fetchedMeals.ok) {
        if (response.meals != null && response.meals.hasOwnProperty('length')) {

            length = response.meals.length <= 20 ? response.meals.length : 20;

            for (let i = 0; i < length; i++) {
                blackBox += `<div class="col-md-3">
                <div class="card position-relative border-0 overflow-hidden">
                    <img src="${response.meals[i].strMealThumb
                    }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`

            }

            searchedItems.html(blackBox)
        }
        else {
            searchedItems.html("")
        }

    }

}
async function getSearchedMealByName(term = '') {
    let fetchedMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let response = await fetchedMeals.json();
    let blackBox = ``;
    let length;

    if (fetchedMeals.ok) {
        if (response.meals != null && response.meals.hasOwnProperty('length')) {

            length = response.meals.length <= 20 ? response.meals.length : 20;

            for (let i = 0; i < length; i++) {
                blackBox += `<div class="col-md-3">
                <div class="card position-relative border-0 overflow-hidden">
                    <img src="${response.meals[i].strMealThumb
                    }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`

            }

            searchedItems.html(blackBox)
        }
        else {
            searchedItems.html("")
        }

    }

}
async function getAreaMeals(areaName) {
    let fetchedCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let response = await fetchedCategories.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card position-relative border-0 overflow-hidden">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;

    }
    area.html(blackBox)
}
async function getArea() {
    let fetchedCategories = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let response = await fetchedCategories.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card area-card bg-transparent border-0 d-flex justify-content-center align-items-center text-white" data-name="${response.meals[i].strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${response.meals[i].strArea}</h3>
                </div>
            </div>`;

    }
    area.html(blackBox)

    
    $(".area-card").on("click", (eventInfo) => {
        getAreaMeals($(eventInfo.currentTarget).attr("data-name"));
    })
}
async function getIngredients() {
    let fetchedIngredients = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let response = await fetchedIngredients.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div
                    class="card bg-transparent border-0 d-flex justify-content-center align-items-center text-white text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${response.meals[i].strIngredient}</h3>
                    <p>${response.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>`;

    }
    ingredients.html(blackBox)
}
async function getCategoryMeal(category) {
    let fetchedCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let response = await fetchedCategories.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card position-relative border-0 overflow-hidden">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;

    }
    categories.html(blackBox)




}
async function getCategories() {
    let fetchedCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let response = await fetchedCategories.json();

    console.log(response);


    let length = response.categories.length <= 20 ? response.categories.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card category-card position-relative border-0 overflow-hidden bg-transparent" data-name="${response.categories[i].strCategory}">
                    <img src="${response.categories[i].strCategoryThumb}" class="h-100" alt="">
                    <div
                        class="layer position-absolute d-flex flex-wrap  justify-content-center align-content-start text-center ">
                        <h3 class="text-black mb-3 mt-2 ">${response.categories[i].strCategory}</h3>
                        <p>${response.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`;

    }
    categories.html(blackBox)

    $(".category-card").on("click", (eventInfo) => {
        getCategoryMeal($(eventInfo.currentTarget).attr("data-name"));
    })


}


getAllMeals();
getCategories();
getArea();
getIngredients()
