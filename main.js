// EFI - to control the security of all Global Variable
/* 
    (function(){
        //all other functions
    })()
*/
(function(){    
const formElm = document.querySelector('form')
const nameInputElm = document.querySelector('.product-name')
const priceInputElm = document.querySelector('.product-price')
const ulListGroupElm = document.querySelector('.list-group')
const searchFilterElm = document.querySelector('#filter')
//Tracking ITems
// A Data Store where items will be stored
let productsArray= [
    // {
    //    id: 1,
    //    name: '',
    //    price:''
    // },
]

function showAllItemsToUI(filteredArray){
    ulListGroupElm.innerHTML = ''
    filteredArray.forEach(item => {
        const listElm = `<li class="item-${item.id} list-group-item collection-item">
        <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
        <i class="fa fa-trash float-right del-item-icon"></i>
      </li>`
    
        ulListGroupElm.insertAdjacentHTML('afterbegin', listElm)
    })
}

function resetInput(){
    nameInputElm.value= ''
    priceInputElm.value= ''
}

function addItemToUl(id, name, price){
    //Generating Unique ID
    const listElm = `<li class="item-${id} list-group-item collection-item">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash float-right del-item-icon"></i>
  </li>`

  ulListGroupElm.insertAdjacentHTML('afterbegin', listElm)
}

function receiveInputs(){
    const nameInput = nameInputElm.value
    const priceInput = Number(priceInputElm.value)

    //Return an Object with multiple value
    return{
        nameInput,
        priceInput
    }
}

function validateInputs(name, price){
    let isError = false;
    if(!name || name.length <= 0){
        isError = true
        alert('Invalid Prod Name Inputs')
    }
    if(!price || price <= 0){
        isError = true
        alert('Invalid Price Inputs')
    }

    return isError
}

//Single responsibility principle
function removeItemFromUI(id){
    document.querySelector(`.item-${id}`).remove()
}

function removeitemFromProductArray(id){
    //Filtering and removing 
    // console.log(productsArray)
    const prodsAfterDel =  productsArray.filter(item =>item.id !== id)
    productsArray = prodsAfterDel;
    // console.log(prodsAfterDel)
}

function getItemID(elm){
    const liElm = elm.parentElement;
    //Splitting the ID number from FIRST class Name
    //Split the string by - and get an array
    //getting id from index[1]
    return(Number(liElm.classList[0].split('-')[1]))
}




//initialize all event at a glance
function init(){
    /********Form Submission *** */
    //Form Submission Event Listening
    formElm.addEventListener('submit', (evt)=>{
        //prevent default form action browser reload 
        evt.preventDefault();
        // console.log(evt)
        //Receiving objects from function return
        //    const inputValues = receiveInputs()
        // or we can Destructuring Object Values
        const {nameInput, priceInput} = receiveInputs()
        // Validation Inputs
        const isError = validateInputs(nameInput, priceInput)
        console.log(isError)
        // console.log(nameInput)
        if(isError){
            alert('please provide valid input')
        }
        //if there no Error (isError = false) then go for the submission
        if(!isError){
            //Push New Item to the ProductArray (database)
            const id = productsArray.length + 1
            productsArray.push({
                //Id will generate based on ProductArray.Length
                id: id,
                name:nameInput,
                price:priceInput
            })
    
            // Add Items to the UI
            addItemToUl(id, nameInput, priceInput)
            console.log(productsArray)
            //Reset Inputs
            resetInput()
        }
    })
    
    /***Search Event */
    //Search Item by Filter Element
    searchFilterElm.addEventListener('keyup', (evt)=>{
        // console.log(evt.target.value)
        //Filter Depend on this value
        const filterValue = evt.target.value;
        const filteredArray = productsArray.filter(product =>  product.name.includes(filterValue))
        showAllItemsToUI(filteredArray)
        // console.log(result)
    
    })

    /*****Deleting an Item ****/
    //Event Delegation (parent to child)
    ulListGroupElm.addEventListener('click', (evt)=>{
        // console.log(evt)
        if(evt.target.classList.contains('del-item-icon')){
            const id = getItemID(evt.target)
            //Reovome from UI
            removeItemFromUI(id)
            removeitemFromProductArray(id)
        }
    })
}
//Calling Init Function 
init()
})()