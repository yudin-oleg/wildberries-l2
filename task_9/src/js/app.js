const productInput = document.getElementById('product-name');
const caloriesInput = document.getElementById('calories');
const productList = document.getElementById('product-list');
const dailyGoalInput = document.getElementById('daily-goal');
const chartContainer = document.getElementById('chart-container');
const consumedCalories = document.getElementById('consumed-calories');
const dayCalories = document.getElementById('day-calories');

productList.addEventListener('click', deleteProduct, false);

let products = JSON.parse(localStorage.getItem('products')) || [];
let dailyGoal = parseInt(localStorage.getItem('dailyGoal')) || 0;

let totalCalories;

renderProductList();
renderChart();
showSetCalories();
showConsumedCalories();

function showSetCalories(){
    dayCalories.innerHTML = `Установлено на день ${dailyGoal} ккал`;
}

function showConsumedCalories(){
    let caloriesEaten = 0;
    products.forEach((item) => {
        caloriesEaten += item.calories;
    });

    consumedCalories.innerHTML = `Съедено за день: ${caloriesEaten} ккал`;
}

function addProduct() {
    const productName = productInput.value.trim();
    const calories = parseInt(caloriesInput.value);

    if (productName && !isNaN(calories)) {
        const product = { name: productName, calories};
        products.push(product);

        localStorage.setItem('products', JSON.stringify(products));

        let caloriesEaten = 0;
        products.forEach((item) => {
            caloriesEaten += item.calories;
        });

        consumedCalories.innerHTML = `Съедено за день: ${caloriesEaten} ккал`;

        productInput.value = '';
        caloriesInput.value = '';

        renderProductList();
        renderChart();
        checkIfCaloriesSurpassed();
    }
}

function setDailyGoal() {
    const goal = parseInt(dailyGoalInput.value);

    if (!isNaN(goal)) {
        dailyGoal = goal;

        localStorage.setItem('dailyGoal', dailyGoal);

        dailyGoalInput.value = '';

        dayCalories.innerHTML = `Установено на день ${dailyGoal} ккал`;

        renderChart();
    }
}

function clearAllData() {

    localStorage.removeItem('products');
    localStorage.removeItem('dailyGoal');

    products = [];
    dailyGoal = 0;

    dayCalories.innerHTML = `Установено на день ${dailyGoal} ккал`;

    let caloriesEaten = 0;
    products.forEach((item) => {
        caloriesEaten += item.calories;
    });

    consumedCalories.innerHTML = `Съедено за день: ${caloriesEaten} ккал`;

    renderProductList();
    renderChart();
}

function renderProductList() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('li');
        productElement.className = 'product';
        productElement.innerHTML = `<div><span id="product-name">${product.name}</span>: <span id="product-calories">${product.calories}</span> cal</div><span class="delete-product">\u00d7</span>`;
        productList.appendChild(productElement);
    });
}

function renderChart() {
    chartContainer.innerHTML = '';

    totalCalories = products.reduce((total, product) => total + product.calories, 0);

    const chartElement = document.createElement('div');
    chartElement.style.width = `${Math.min(totalCalories, dailyGoal) / dailyGoal * 100}%`;
    chartElement.style.height = '80px';
    chartElement.style.backgroundColor = totalCalories > dailyGoal ? 'red' : 'green'

    chartContainer.appendChild(chartElement);
}

function checkIfCaloriesSurpassed(){
    if(totalCalories > dailyGoal){
        setTimeout(() => {alert("Количество съеденных калорий за день больше установленного значения")}, 200);
    }
}

function sortProducts(key, order) {
    products.sort((a, b) => {
        const aValue = key === 'name' ? a.name : a.calories;
        const bValue = key === 'name' ? b.name : b.calories;

        if (order === 'asc'){
            if (aValue < bValue){
                return -1;
            }
            else if (aValue > bValue){
                return 1;
            }
            return 0;
        }else if (order === 'desc'){
            if (aValue < bValue){
                return 1;
            }
            else if (aValue > bValue){
                return -1;
            }
            return 0;
        }
    });

    localStorage.setItem('products', JSON.stringify(products));

    renderProductList();
}

function deleteProduct(e) {
    if (e.target.classList.contains("delete-product")) {
        const productName = e.target.parentElement.querySelector("#product-name").textContent;
        const productCalories = e.target.parentElement.querySelector("#product-calories").textContent;

        let removedItems = 0;
        let newProductsArray = [];
        products.forEach((product) => {
            if(product.name != productName && product.calories!=productCalories){
                newProductsArray.push(product);
            }else{
                if(removedItems > 0){
                    newProductsArray.push(product);
                }
                removedItems++;
            }
        });
        products = newProductsArray;
        localStorage.setItem('products', JSON.stringify(products));

        let caloriesEaten = 0;
        products.forEach((item) => {
            caloriesEaten += item.calories;
        });
        consumedCalories.innerHTML = `Съедено за день: ${caloriesEaten} ккал`;
    }

    renderProductList();
    renderChart();
    checkIfCaloriesSurpassed();
}