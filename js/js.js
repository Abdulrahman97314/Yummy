$(document).ready(function () {
    $(".loading").fadeOut(1000, function () {
        $("body").css("overflow", "visible")
    })
});
/************************ Nav-Open-Close ************************/
$(".open-close")[0].addEventListener("click", Nav)
function Nav() {
    if ($("nav").css("left") != "-250px") {
        closeNav()
    }
    else {
        $("nav").animate({ "left": "0px" }, 500)
        $(".navBtn").animate({ "left": "250px" }, 500)
        $("Header ul li").animate({ "opacity": "1", "padding-top": "25px" }, 1500);
        $(".open-close-icon").html('<i class="fa fa-align-justify fa-times"></i>')
    }
}
function closeNav() {
    {
        $(".open-close-icon").html('<i class="fa fa-align-justify"></i>')
        $("nav").animate({ "left": "-250px" }, 500)
        $(".navBtn").animate({ "left": "0px" }, 500)
        $("Header ul li").animate({ "opacity": "0", "padding-top": "500" }, 500);
    }
}
/************************ End Nav-Open-Close ************************/


/************************ MainPage ************************/
async function fatchApi() {
    var api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${""}`
    let response = await fetch(api)
    response = await response.json()
    return response.meals
}
async function showMeals(e) {
    var males = await fatchApi()
    var showMeals = ""
    for (let i = 0; i < males.length; i++) {
        showMeals += `<div class="col-md-3 my-3 shadow">
     <div class="item">
         <img class="w-100 rounded" src="${males[i].strMealThumb}" alt="${males[i].idMeal}">
         <div class="layer">
             <h2 class="p-2">${males[i].strMeal}</h2>
         </div>
     </div>
 </div>`
    }
    $(".items").html(showMeals)
    getinging()
}
showMeals()
$("#search")[0].addEventListener("click", openSerch)
function openSerch() {
    $("#search-row").css("visibility", "visible")
    $(".items").css("display", "none")
    $("#contact").css("display", "none")
    closeNav()
}
/************************ End MainPage ************************/
/************************ search ************************/
var searchWithName = document.getElementById("searchName")
searchWithName.addEventListener("keyup", searchName)
searchWithName.value = ""
async function searchName() {
    $(".loading").fadeIn(100)
    var api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWithName.value}`
    let response = await fetch(api)
    response = await response.json()
    response = response.meals
    $(".loading").fadeOut(100)
    $(".items").css("display", "flex")
    var showMeals = ""
    for (let i = 0; i < response.length; i++) {
        showMeals += `<div class="col-md-3 my-3 shadow">
     <div class="item">
         <img class="w-100 rounded" src="${response[i].strMealThumb}" alt="${response[i].idMeal}">
         <div class="layer">
             <h2 class="p-2">${response[i].strMeal}</h2>
         </div>
     </div>
 </div>`
    }
    $(".items").html(showMeals)
    var index = $('.item').index(this);
    getinging()
}
var searchWithLetter = document.getElementById("searchLetter")
searchWithLetter.addEventListener("keyup", SearchWithLetter)
async function SearchWithLetter() {
    $(".loading").fadeIn(100)
    $(".loading").fadeOut(100)
    var api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchWithLetter.value}`
    let response = await fetch(api)
    response = await response.json()
    response = response.meals

    $(".items").css("display", "flex")
    var showMeals = ""
    for (let i = 0; i < response.length; i++) {
        showMeals += `<div class="col-md-3 my-3 shadow">
     <div class="item">
         <img class="w-100 rounded" src="${response[i].strMealThumb}" alt="${response[i].idMeal}">
         <div class="layer">
             <h2 class="p-2">${response[i].strMeal}</h2>
         </div>
     </div>
 </div>`
    }
    $(".items").html(showMeals)
    getinging()
}
function getinging() {
    $(".item").click(async function () {
        var that = $(this).find("img").attr("alt")
        var api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${that}`
        let catResponse = await fetch(api)
        catResponse = await catResponse.json()
        catResponse = catResponse.meals[0]
        var ing = ""
        ing += `<div class="col-md-4 ">
        <div>
        <img class="w-100" src="${catResponse.strMealThumb}" alt=""><br>
            <h1 class="text-white text-center ">${catResponse.strMeal}</h1>
        </div>
    </div>
    <div class="col-md-8">
        <div class="text-white">
            <h2>Instructions</h2>
            <p>${catResponse.strInstructions}</p>
            <p><b class="fw-bolder">Area :</b> ${catResponse.strArea}</p>
            <p><b class="fw-bolder">Category :</b> ${catResponse.strCategory}</p>
            <h3>Recipes :</h3>
            <div id="recipes">
            </div>
            <h3 class="my-2 mx-1 p-1">Tags :</h3>
            <div id="tags-color"></div>
            <a class="btn btn-success my-5 text-white" target="_blank"
                href="${catResponse.strSource}">Source</a>
            <a class="btn btn-danger text-white" target="_blank"
                href="${catResponse.strYoutube}">Youtub</a>
        </div>
    </div>
        `
        $(".items").html(ing)
        var recipes=""
        for(let i=1; i<20; i++)
        {
            if(catResponse[`strIngredient${i}`])
            {
                recipes +=`<p class="my-3 recipes-color rounded">${catResponse[`strMeasure${i}`]}${catResponse[`strIngredient${i}`]}</p>`
            }
        }
        $("#recipes").html(recipes);
        var tags=""
        if(catResponse.strTags!=null){
            tags= catResponse.strTags.split(",")
    }
    var Tags=""
    for(let i=0; i <tags.length; i++)
    {
        Tags +=`<p class="tags-color">${tags[i]}</p>`
    }
    $("#tags-color").html(Tags)
        
        $(".items").css("display", "flex")
        $("#contact").css("display", "none")
    }
    )
}

/************************ End search ************************/
/************************ cat ************************/
async function fatchApiCat() {
    var api = `https://www.themealdb.com/api/json/v1/1/categories.php`
    let catResponse = await fetch(api)
    catResponse = await catResponse.json()
    return catResponse.categories
}
fatchApiCat()
async function cat() {
    $(".loading").fadeIn(100)
    var cat = await fatchApiCat()
    $(".loading").fadeOut(100)
    var showCat = ""
    for (let i = 0; i < cat.length; i++) {
        showCat += `<div class="col-md-3 my-3 shadow">
     <div class="cat">
         <img class="w-100 rounded" src="${cat[i].strCategoryThumb}" alt="">
         <div class="layer">
             <h2 class="p-2">${cat[i].strCategory}</h2>
             <p>${cat[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
         </div>
     </div>
 </div>`
    }
    $(".items").html(showCat)
    $(".items").css("display", "flex")
    $("#search-row").css("visibility", "hidden")
    $("#contact").css("display", "none")
    getstrCategory()
    closeNav()
}
document.getElementById("Categories").addEventListener("click", cat)

function getstrCategory() {
    $(".cat").click(async function () {
        var that = this
        var strCategory = $(that).find("h2").text()
        $(".loading").fadeIn(100)
        var api = `https://themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
        let catResponse = await fetch(api)
        catResponse = await catResponse.json()
        catResponse = catResponse.meals
        $(".loading").fadeOut(100)
        var showCat = ""
        for (let i = 0; i < catResponse.length; i++) {
            showCat += `<div class="col-md-3 my-3 shadow">
     <div class="catstr">
         <img class="w-100 rounded" src="${catResponse[i].strMealThumb}" alt="${catResponse[i].idMeal}">
         <div class="layer d-flex align-items-center">
             <h2 class="p-2 text-center">${catResponse[i].strMeal}</h2>
         </div>
     </div>
 </div>`
        }
        $(".items").html(showCat)
        $(".items").css("display", "flex")
        $("#search-row").css("visibility", "hidden")
        $("#contact").css("display", "none")
        geting()
    })
}
function geting() {
    $(".catstr").click(async function () {
        var that = $(this).find("img").attr("alt")
        $(".loading").fadeIn(100)
        var api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${that}`
        let catResponse = await fetch(api)
        catResponse = await catResponse.json()
        catResponse = catResponse.meals[0]
        $(".loading").fadeOut(100)
        var ing = ""
        ing += `<div class="col-md-4">
        <div>
        <img class="w-100" src="${catResponse.strMealThumb}" alt=""><br>
            <h1 class="text-white text-center ">${catResponse.strMeal}</h1>
        </div>
    </div>
    <div class="col-md-8">
        <div class="text-white">
            <h2>Instructions</h2>
            <p>${catResponse.strInstructions}</p>
            <p><b class="fw-bolder">Area :</b> ${catResponse.strArea}</p>
            <p><b class="fw-bolder">Category :</b> ${catResponse.strCategory}</p>
            <h3>Recipes :</h3>
            <div id="recipes">
            </div>
            <h3 class="my-2 mx-1 p-1">Tags :</h3>
            <div id="tags-color"></div>
            <a class="btn btn-success my-5 text-white" target="_blank"
                href="${catResponse.strSource}">Source</a>
            <a class="btn btn-danger text-white" target="_blank"
                href="${catResponse.strYoutube}">Youtub</a>
        </div>
    </div>
        `
        $(".items").html(ing)
        var recipes=""
        for(let i=1; i<20; i++)
        {
            if(catResponse[`strIngredient${i}`])
            {
                recipes +=`<p class="my-3 recipes-color rounded">${catResponse[`strMeasure${i}`]}${catResponse[`strIngredient${i}`]}</p>`
            }
        }
        $("#recipes").html(recipes);
        var tags=""
        if(catResponse.strTags!=null){
            tags= catResponse.strTags.split(",")
    }
    var Tags=""
    for(let i=0; i <tags.length; i++)
    {
        Tags +=`<p class="tags-color">${tags[i]}</p>`
    }
    $("#tags-color").html(Tags)
        $(".items").css("display", "flex")
        $("#search-row").css("visibility", "hidden")
        $("#contact").css("display", "none")
    })
}
/************************ end cat ************************/
/************************ area ************************/
async function fatchApiArea() {
    var api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    let areaResponse = await fetch(api)
    areaResponse = await areaResponse.json()
    return areaResponse.meals
}
fatchApiArea()
async function areas() {
    closeNav()
    $(".loading").fadeIn(100)
    var area = await fatchApiArea()
    $(".loading").fadeOut(100)
    var areas = ""
    for (let i = 0; i < 20; i++) {
        areas += `<div class="col-md-3 my-3 shadow area text-center">
        <i class="fa-solid fa-city fa-3x"></i>
     <div">
         <h2 class="text-white" >${area[i].strArea}</h2>
     </div>
 </div>`
    }
    $(".items").html(areas)
    $(".items").css("display", "flex")
    $("#search-row").css("visibility", "hidden")
    $("#contact").css("display", "none")
    getarea()
}
document.getElementById("Area").addEventListener("click", areas)

function getarea() {
    $(".area").click(async function () {
        var that = $(this).find("h2").text()
        $(".loading").fadeIn(100)
        var api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${that}`
        let catResponse = await fetch(api)
        catResponse = await catResponse.json()
        catResponse = catResponse.meals
        $(".loading").fadeOut(100)
        var showCat = ""
        for (let i = 0; i < catResponse.length; i++) {
            showCat += `<div class="col-md-3 my-3 shadow">
     <div class="catstr">
         <img class="w-100 rounded" src="${catResponse[i].strMealThumb}" alt="${catResponse[i].idMeal}">
         <div class="layer d-flex align-items-center">
             <h2 class="p-2 text-center">${catResponse[i].strMeal}</h2>
         </div>
     </div>
 </div>`
        }
        $(".items").html(showCat)
        $(".items").css("display", "flex")
        $("#search-row").css("visibility", "hidden")
        $("#contact").css("display", "none")
        geting()
    }
    )
}
/************************ end area ************************/
/************************ ing ************************/
async function fatchApiIng() {
    var api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    let ingResponse = await fetch(api)
    ingResponse = await ingResponse.json()
    return ingResponse.meals
}
fatchApiIng()
async function Ingredients() {
    closeNav()
    $(".loading").fadeIn(100)
    var Ingredient = await fatchApiIng()
    $(".loading").fadeOut(100)
    var Ingredients = ""
    for (let i = 0; i < 20; i++) {
        Ingredients += ` <div class="col-md-3 shadow text-center ing">
        <div class="ingre">
        <i class="fa-solid fa-bowl-food fa-3x"></i>
        <h2>${Ingredient[i].strIngredient}</h2>
        <p>${Ingredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>`
    }
    $(".items").html(Ingredients)
    $(".items").css("display", "flex")
    $("#search-row").css("visibility", "hidden")
    $("#contact").css("display", "none")
    getfood()
}
document.getElementById("Ingredients").addEventListener("click", Ingredients)
function getfood() {
    $(".ingre").click(async function () {
        var that = $(this).find("h2").text()
        $(".loading").fadeIn(100)
        var api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${that}`
        let catResponse = await fetch(api)
        catResponse = await catResponse.json()
        catResponse = catResponse.meals
        $(".loading").fadeOut(100)
        var showCat = ""
        for (let i = 0; i < catResponse.length; i++) {
            showCat += `<div class="col-md-3 my-3 shadow">
         <div class="catstr">
             <img class="w-100 rounded" src="${catResponse[i].strMealThumb}" alt="${catResponse[i].idMeal}">
             <div class="layer d-flex align-items-center">
                 <h2 class="p-2 text-center">${catResponse[i].strMeal}</h2>
             </div>
         </div>
     </div>`
        }
        $(".items").html(showCat)
        $(".items").css("display", "flex")
        $("#search-row").css("visibility", "hidden")
        $("#contact").css("display", "none")
        geting()
    }
    )
}
/************************ end ing ************************/
/********************** contact ****************************/
document.getElementById("ContactUs").addEventListener("click", contact)
function contact() {
   closeNav() 
    $("#contact").css("display", "flex")
    $(".items").css("display", "none")
    $("#search-row").css("visibility", "hidden")
}
var namaRegex = /^[a-zA-Z ]+$/
var userName = document.getElementById("Name")
userName.onkeyup = function () {
    if (namaRegex.test(userName.value) == true) {
        $("#name").css("display", "none");
        $("#Name").addClass("is-valid")
        $("#Name").removeClass("is-invalid")
    }
    else {
        $("#name").css("display", "block");
        $("#Name").addClass("is-invalid")
        $("#Name").removeClass("is-valid")
    }

}

var emailRegex = /@[a-z0-9]{1,10}(\.)[a-z]{1,10}$/
var email = document.getElementById("Email")
email.onkeyup = function () {
    if (emailRegex.test(email.value) == true) {
        $("#email").css("display", "none");
        $("#Email").addClass("is-valid")
        $("#Email").removeClass("is-invalid")
    }
    else {
        $("#email").css("display", "block");
        $("#Email").addClass("is-invalid")
        $("#Email").removeClass("is-valid")
    }
}
var phoneRegex = /^01[0125][0-9]{8}$/
var phone = document.getElementById("Phone")
phone.onkeyup = function () {
    if (phoneRegex.test(phone.value) == true) {
        $("#phone").css("display", "none");
        $("#Phone").addClass("is-valid")
        $("#Phone").removeClass("is-invalid")
    }
    else {
        $("#phone").css("display", "block");
        $("#Phone").addClass("is-invalid")
        $("#Phone").removeClass("is-valid")
    }
}

var ageRegex = /^[1-9][0-9]?$|^100$/
var age = document.getElementById("Age")
age.onkeyup = function () {
    if (ageRegex.test(age.value) == true) {
        $("#age").css("display", "none");
        $("#Age").addClass("is-valid")
        $("#Age").removeClass("is-invalid")
    }
    else {
        $("#age").css("display", "block");
        $("#Age").addClass("is-invalid")
        $("#Age").removeClass("is-valid")
    }
}

var PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var Password = document.getElementById("Password")
Password.onkeyup = function () {
    if (PasswordRegex.test(Password.value) == true) {
        $("#password").css("display", "none");
        $("#Password").addClass("is-valid")
        $("#Password").removeClass("is-invalid")
    }
    else {
        $("#password").css("display", "block");
        $("#Password").addClass("is-invalid")
        $("#Password").removeClass("is-valid")
    }
}

var Repassword = document.getElementById("Repassword")
Repassword.onkeyup = function () {
    if (Password.value == Repassword.value) {
        $("#repassword").css("display", "none");
        $("#Repassword").addClass("is-valid")
        $("#Repassword").removeClass("is-invalid")
    }
    else {
        $("#repassword").css("display", "block");
        $("#Repassword").addClass("is-invalid")
        $("#Repassword").removeClass("is-valid")
    }
}
function btn() {
    if (namaRegex.test(userName.value) == true && emailRegex.test(email.value) == true && phoneRegex.test(phone.value) == true && ageRegex.test(age.value) == true && PasswordRegex.test(Password.value) == true && Password.value == Repassword.value) {
        document.getElementById("submitBtn").disabled = false;
    }
    else {
        document.getElementById("submitBtn").disabled = true;
    }
    setTimeout(btn, 100);
}
btn()
/********************** End contact ****************************/

