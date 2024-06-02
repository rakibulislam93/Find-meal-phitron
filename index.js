
// data gulake load korlam....
const loadData = ()=>{
    let inputValue = document.getElementById("inputName").value; 
    let details = document.getElementById("details")
    details.innerHTML=""

    if (inputValue == "") {
        document.getElementById("items").innerHTML = "<h2>Please enter a meal name to search</h2>";
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(res => res.json())
    .then(data =>{
        
        
        if(data.meals){
            getAllMeal(data.meals);
            

        }else{
            document.getElementById("items").innerHTML = "<h2>Sorry! Meal not found..Search for another meal</h2>";
            
            document.getElementById("inputName").value = "";
        }
    });
          
};



const getAllMeal = (meal) => {
    let items = document.getElementById("items");
    items.innerHTML = "";

    meal.forEach(element => {

        let ItemDiv = document.createElement("div");
        ItemDiv.className = "singleItem"

        ItemDiv.setAttribute("onclick",`details(${element.idMeal})`);
        
        let itemInfo = `
            <div class="card" style="width: 18rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body text-center">
                        <h5 class="card-text">${element.strMeal}</h5>
                        
                </div>
            </div>
        `;
        ItemDiv.innerHTML = itemInfo;
        items.appendChild(ItemDiv);
        

    });
    
    document.getElementById("inputName").value = "";  
}


// meal a click korle details show koranor function....
const details = (id)=>{
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data =>{
        let meal = data.meals[0]
        console.log(meal);
        let details = document.getElementById("details")
        details.innerHTML=""

        let detailsDiv = document.createElement("div")
        let detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h3 class="card-text">${meal.strMeal}</h3>
                <h6>Ingredients</h6>
                <ul>
                    <li>${meal.strArea}</li>
                    <li>${meal.strCategory}</li>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                </ul>
            </div>
        </div>
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
}

document.getElementById("button").addEventListener("click", loadData);

