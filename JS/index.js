//Sections
let meals = $("#meals-section")
let categories = $("#categories-section")
let area = $("#area-section")
let ingredients = $("#ingredients-section")
let search = $("#search-section")
let searchedItems = $("#searched-items-section")
let mealRecipe = $("#meal-recipe-section")

//Contact-us elements
let userName = $("#userName")
let userEmail = $("#userEmail")
let userPhone = $("#userPhone")
let userAge = $("#userAge")
let userPassword = $("#userPassword")
let userRepassword = $("#userRepassword")
let contactBtn = $(".contact-btn")


// Search input
let mealFLInput = $("#meal-fl-input")
let mealNameInput = $("#meal-name-input")

//Navigation items
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

//search inputs listeners
mealNameInput.on("input", () => {
    getSearchedMealByName(mealNameInput.val());
})
mealFLInput.on("input", () => {
    let value = ``;

    //forcing user to type only one character
    if (mealFLInput.val().length > 1) {
        value = mealFLInput.val()[0];
        mealFLInput.val(value)
    }

    getSearchedMealByFL(mealFLInput.val());
})

//Contact-Us-Listeners
$(".contact-us-input").on("input", (eventInfo) => {
    validateInput(eventInfo.currentTarget)
})

userRepassword.on("input", () => {
    if (userPassword.val() != userRepassword.val()) {
        userRepassword.next().removeClass("d-none")
        contactBtn.addClass("disabled")
    }
    else {
        userRepassword.next().addClass("d-none")
        contactBtn.removeClass("disabled")
    }
})



//side bar toggle
$("#burger-icon").on("click", () => {
    ToggleSideBar()
})

//regex
function validateInput(element) {
    var regex = {
        userName: /^[A-Za-z]+$/,
        userEmail: /^[\w]+@[a-zA-Z]+\.com$/i,
        userPhone: /^(\+20|0020)?[ -]?01[0125][ -]?\d{8}$/,
        userAge: /^(1[01][0-9]|120|[1-9][0-9]?)$/,
        userPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }

    //validating the input
    if (regex[element.id].test(element.value)) {

        $(element).next().addClass("d-none")
        if (userName.val() == "" || userEmail.val() == "" || userPhone.val() == "" || userAge.val() == "" || userPassword.val() == "" || userRepassword.val() == "") {
            contactBtn.addClass("disabled")
        }
        else {
            contactBtn.removeClass("disabled")
        }
        return true;
    }
    else {
        $(element).next().removeClass("d-none")
        contactBtn.addClass("disabled")
        return false;
    }
}

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

    console.log(response);

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card meals-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`

    }
    meals.html(blackBox)

    $(".meals-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        meals.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })
}
async function getMealDetails(id) {
    let fetchedMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response = await fetchedMeals.json();

    // let length = response.meals.length <= 20 ? response.meals.length : 20;

    console.log(response);

    let blackBox = ``;
    let blackBox1 = ``;
    let blackBox2 = ``;

    for (let i = 1; i <= 20; i++) {
        let measure = `strMeasure${i}`;
        let ingredient = `strIngredient${i}`;
        if (response.meals[0][measure] == "" || response.meals[0][measure] == " " || response.meals[0][measure] == null) {
            break;
        }
        else {
            blackBox1 += `<li class="alert alert-info m-2 p-1 my-fs-lg">${response.meals[0][measure]} ${response.meals[0][ingredient]}
            </li>`
        }
    }


    let tagsArr = response.meals[0].strTags == null ? null : response.meals[0].strTags.split(",");

    if (tagsArr) {
        for (let i = 0; i < tagsArr.length; i++) {
            blackBox2 += `<li class="alert alert-danger m-2 p-1 my-fs-lg fw-medium">${tagsArr[i]}</li>`
        }
    }


    blackBox += `<div class="row py-5">
                <div class="col-md-4">
                    <div class="overflow-hidden rounded-3">
                        <img src="${response.meals[0].strMealThumb}" class="img-fluid" alt="">
                    </div>

                    <h1 class="h2">${response.meals[0].strMeal}</h1>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p class="mb-2">${response.meals[0].strInstructions}</p>
                    <ul class="list-unstyled fs-3 fw-bolder">
                        <li>Area : <span>${response.meals[0].strArea}</span></li>
                        <li>Category : <span>${response.meals[0].strCategory}</span></li>
                        <li>Recipes :</li>
                        <ul class="list-unstyled d-flex flex-wrap fw-normal py-2">
                            ${blackBox1}
                        </ul>
                        <li>Tags:</li>
                        <ul class="list-unstyled d-flex pt-3">
                            ${blackBox2}
                        </ul>
                        <ul class="list-unstyled d-flex pt-3">
                            <li><a href="${response.meals[0].strSource == null ? "#" : response.meals[0].strSource}"><button class="btn btn-success me-1">Source</button></a></li>
                            <li><a href="${response.meals[0].strYoutube}"><button class="btn btn-danger">Youtube</button></a></li>
                        </ul>
                    </ul>
                </div>
            </div>`

    mealRecipe.html(blackBox)
}
async function getSearchedMealByFL(char = '') {
    char == '' ? char = 'a' : char;

    let fetchedMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    let response = await fetchedMeals.json();
    let blackBox = ``;
    let length;

    if (fetchedMeals.ok) {
        if (response.meals != null && response.meals.hasOwnProperty('length')) {

            length = response.meals.length <= 20 ? response.meals.length : 20;

            for (let i = 0; i < length; i++) {
                blackBox += `<div class="col-md-3">
                <div class="card searched-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
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

    $(".searched-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        search.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })

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
                <div class="card searched-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
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

    $(".searched-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        search.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })

}
async function getAreaMeals(areaName) {
    let fetchedCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let response = await fetchedCategories.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card meal-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;

    }
    area.html(blackBox)

    $(".meal-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        area.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })
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
                    class="card ingredient-card bg-transparent border-0 d-flex justify-content-center align-items-center text-white text-center" data-name="${response.meals[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${response.meals[i].strIngredient}</h3>
                    <p>${response.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>`;

    }
    ingredients.html(blackBox)

    $(".ingredient-card").on("click", (eventInfo) => {
        getIngredientsMeals($(eventInfo.currentTarget).attr("data-name").toLowerCase().replaceAll(" ", "-"));
    })
}
async function getIngredientsMeals(ingredientName) {
    let fetchedIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    let response = await fetchedIngredients.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card ingredient-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;

    }
    ingredients.html(blackBox)

    $(".ingredient-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        ingredients.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })
}
async function getCategoryMeal(category) {
    let fetchedCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let response = await fetchedCategories.json();

    let length = response.meals.length <= 20 ? response.meals.length : 20;

    let blackBox = ``;
    for (let i = 0; i < length; i++) {
        blackBox += `<div class="col-md-3">
                <div class="card category-meal-card position-relative border-0 overflow-hidden" data-id="${response.meals[i].idMeal}">
                    <img src="${response.meals[i].strMealThumb
            }" class="h-100" alt="">
                    <div class="layer position-absolute d-flex align-items-center">
                        <h3 class="text-black m-0">${response.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;

    }
    categories.html(blackBox)


    $(".category-meal-card").on("click", (eventInfo) => {
        getMealDetails($(eventInfo.currentTarget).attr("data-id"));
        console.log($(eventInfo.currentTarget).attr("data-id"));

        categories.addClass("d-none");
        mealRecipe.removeClass("d-none");
    })

}
async function getCategories() {
    let fetchedCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let response = await fetchedCategories.json();

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



