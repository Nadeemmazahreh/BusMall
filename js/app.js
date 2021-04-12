
let leftImageElement = document.getElementById('left-image');
let centerImageElement = document.getElementById('center-image');
let rightImageElement = document.getElementById('right-image');

let maxRounds = 25;
let userRounds = 0;

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

function Product(name, source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;

    Product.allProducts.push(this);
    
}

Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tautaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

function generateRandomIndex(){
    return Math.floor(Math.random()*Product.allProducts.length);
}

function renderImages() {
    
    leftImageIndex = generateRandomIndex();
    centerImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex ();

    while (leftImageIndex == centerImageIndex || leftImageIndex == rightImageIndex || rightImageIndex == centerImageIndex){
        rightImageIndex = generateRandomIndex();
        leftImageIndex = generateRandomIndex();
    }
    
    leftImageElement.src = Product.allProducts[leftImageIndex].source;
    centerImageElement.src = Product.allProducts[centerImageIndex].source;
    rightImageElement.src = Product.allProducts[rightImageIndex].source;

    Product.allProducts[leftImageIndex].shown++
    Product.allProducts[centerImageIndex].shown++
    Product.allProducts[rightImageIndex].shown++

    
}

renderImages();

leftImageElement.addEventListener('click',handleUserClick)
centerImageElement.addEventListener('click',handleUserClick)
rightImageElement.addEventListener('click',handleUserClick)

let divElement = document.getElementById('buttonkey')
let buttonElement = document.createElement('button')

function handleUserClick(event){

    userRounds++;

    if (userRounds < maxRounds){

        if (event.target.id === 'left-image'){
            Product.allProducts[leftImageIndex].votes++
        }
        else if (event.target.id === 'center-image'){
            Product.allProducts[centerImageIndex].votes++
        } 
        else if (event.target.id === 'right-image'){
            Product.allProducts[rightImageIndex].votes++
        }
        else {
        }

        renderImages();

    }else{
        divElement.appendChild(buttonElement)
        buttonElement.textContent = 'Show results'
        leftImageElement.removeEventListener('click',handleUserClick);
        rightImageElement.removeEventListener('click',handleUserClick)
    }
}

buttonElement.addEventListener('click',handleResultsClick)

function handleResultsClick() {

    let list = document.getElementById('result-list');
    console.log(list);
    for (let i = 0; i < Product.allProducts.length; i++) {
        let productResult = document.createElement('li')
        list.appendChild(productResult)
        productResult.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes}, and was seen ${Product.allProducts[i].shown} times`
    }
    buttonElement.removeEventListener('click',handleResultsClick)
}