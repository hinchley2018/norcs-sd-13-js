function wellingtonEats(hamburger, price, timeToCook){
    //i'll pay you tuesday I promise :) 
    //promise starts as pending
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            // debugger
            console.log("its tuesday")
            if(price < 0){
                reject("Negative price not allowed")
            }
            console.log("Paid", price, "for a ", hamburger)
            //resolve only takes one param, so if you need more data pass an object

            //marks the promise as completed
            resolve({hamburger, price})
        }, timeToCook)

    })
}
//demo error-handling using async await
async function orderSandwichs(){
    //try this block
    try {
        await wellingtonEats("Arnold Hama Whopper",3.50, 3000)
        await wellingtonEats("Cowfish Whopper",3.75, 2000)
        await wellingtonEats("Neg Whopper",-700, 2000)
    } 
    //if error is thrown do this block
    catch (error) {
        console.error(error)
    }
    
}
orderSandwichs()
// let arnoldPromise = wellingtonEats("Arnold Hama Whopper",3.50, 3000)
// //guaranteed it is done processing, here is my result
// //then === success / finished
// arnoldPromise.then(function(promiseResult){
//     console.log("resolved", arnoldPromise, promiseResult)
// })
// let cowfishPromise = wellingtonEats("Cowfish Whopper",3.75, 2000)

// //.catch is rejected / failure
// let negativePromise = wellingtonEats("Neg Whopper",-700, 2000).catch(() => {
//     console.error("You tried to get us to pay you")
// })

//no args just pull the data from wherever it is
//default values for args
function getPizzaToppings(store = undefined) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (store !== undefined && store.location === "Dallas") {
                let toppings = ["blue cheese", "blue pineapples", "blue spinach", "blue mushrooms", "bacon"]
                resolve(toppings)
            }
            else {
                let toppings = ["cheese", "pineapples", "spinach", "mushrooms", "bacon"]
                resolve(toppings)
            }
        }, 1500)
    })
}
//make it able to call await, and clean up code
async function getMenuPage() {
    console.log("in async")
    //because i'm inside the async function I can wait for things without a promise
    //await gives us what the promise resolves as a value
    let toppings = await getPizzaToppings()
    console.log("what are we waiting for", toppings)

    let pizzaPrices = await getPizzaPrices()
    console.log("after await")
}
//use the async function
getMenuPage()
//out in the open not in async function
// await getPizzaToppings() //dangerous breaks whole application
function getPizzaPrices() {
    return new Promise(function (resolve, reject) {
        //we don't know how long to load prices
        setTimeout(() => {
            let prices = [
                {
                    price: 10,
                    size: 'large'
                },
                {
                    price: 6,
                    size: 'medium'
                },
                {
                    price: 4,
                    size: 'mini'
                }
            ]
            resolve(prices)
        }, 2000)
    })
}

function getStores() {
    return new Promise(function (resolve, reject) {
        //we don't know how long to load prices
        setTimeout(() => {
            let stores = [
                {
                    location: "Dallas",
                    hours: 'M-F 8-9pm'
                },
                {
                    location: "Houston",
                    hours: 'M-F 8-9pm'
                }
            ]
            resolve(stores)
        }, 2000)
    })
}

function getOrders() {
    return new Promise(function (resolve, reject) {
        //we don't know how long to load prices
        setTimeout(() => {
            let orders = [
                {
                    price: 10,
                    size: 'large',
                    toppings: ["pep", "spinach"]
                },
                {
                    price: 6,
                    size: 'medium',
                    toppings: []
                },
                {
                    price: 4,
                    size: 'mini',
                    toppings: ["pineapple"]
                }
            ]
            resolve(orders)
        }, 2000)
    })
}

// //look at the toppings we got toppings
// getPizzaToppings().then((toppings) => {
//     console.log("these are the toppings you can choose from", toppings)
// })
// //wait to resolve the prices
// getPizzaPrices().then((prices) => {
//     console.log("Your pizza sizes are", prices)
// })


// //chaining is good when data depends on other promises to resolve
// //can't get toppings without a valid store
// getStores().then(stores => {
//     console.log(stores)
//     //returning a function
//     return getPizzaToppings(stores[0])//dallas
// })
// .then(toppings => {
//     console.log(toppings)
// })


function searchProductList(searchTerm) {

    let products = [
        {
            name: "Pedigree Dog food",
            price: 8.94
        },
        {
            name: "Pedigree wet dog food",
            price: 8.94
        },
        {
            name: "Blue ribbon Dog food",
            price: 8.94
        },
        {
            name: "macbook pro",
            price: 2900
        },
        {
            name: "potatoes",
            price: 3.74
        }
    ]

    return new Promise(function (resolve, reject) {
        resolve(products.filter(p => p.name.toLowerCase() === searchTerm.toLowerCase()))
    })
}

function getAvailableFilters(){
    return new Promise((resolve, reject) => {
        let availableFilters = {
            brands: ["Blue ribbon", "Pedigree", "Amazon Basics"],
            types: ["wet", "dry"],
            minPrice: 0,
            maxPrice: 600
        }
        resolve(availableFilters)
    })
}
function displayFilters(){}
function displayProducts() {}
//build the page
async function buildSearchPage() {
    debugger
    let userSearchTerm = prompt("Enter the product you want to search")
    if (userSearchTerm === undefined) {
        console.log("go to homescreen")
    }
    //get filters
    let filters = await getAvailableFilters()
    displayFilters(filters)
    let userFilters = {
        brand: "Pedigree",
        type: "dry"
    }
    let products = await searchProductList(userSearchTerm,userFilters)
    //assume I can draw on screen, how to get the products?
    displayProducts(products)
}
// buildSearchPage()


function cookBacon(){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("cooked bacon")   
            resolve()
        },3000)
    })
}

function cookEggs(){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("cooked eggs")   
            resolve()
        },1200)
    })
}

function makeTea(){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("tea")   
            resolve()
        },1000)
    })
}

function serve(){
    console.log("Lets eat")
}

async function makeBreakfast(){
    //once all of these promies resolve do my .then
    await Promise.all([
        cookBacon(),
        cookEggs(),
        makeTea()
    ])
    serve()
    
    
}

makeBreakfast()