
let container=document.getElementById('images-div');
let leftImageElement = document.getElementById('left-image');
let centerImageElement = document.getElementById('center-image');
let rightImageElement = document.getElementById('right-image');

let maxRounds = 25;
let userRounds = 0;

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;

let namesArr = []
let votesArr = []
let shownArr = []

let temp = [100,100,100]


function Product(name, source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;

    Product.allProducts.push(this);

    namesArr.push(this.name);

    
    
}


Product.allProducts = [];

function updateStorage() {
    let arrayString = JSON.stringify(Product.allProducts);
    localStorage.setItem('votes and shown data',arrayString);
}


function getData(){
   let data = localStorage.getItem('votes and shown data');
   let dataObj = JSON.parse(data);

   if(dataObj !== null){
     Product.allProducts = dataObj
   }
}

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

    while (temp.includes(leftImageIndex) || temp.includes(centerImageIndex) || temp.includes(rightImageIndex)){
        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();
        leftImageIndex = generateRandomIndex();
    }

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
    
    temp = [leftImageIndex,centerImageIndex,rightImageIndex]
}

renderImages();


let divElement = document.getElementById('buttonkey')
let buttonElement = document.createElement('button')

container.addEventListener('click',handleUserClick)

function handleUserClick(event){
    
    userRounds++;

    if (userRounds <= maxRounds){
    
        if (event.target.id === 'left-image'){
            Product.allProducts[leftImageIndex].votes++
        }
        else if (event.target.id === 'center-image'){
            Product.allProducts[centerImageIndex].votes++
        } 
        else if (event.target.id === 'right-image'){
            Product.allProducts[rightImageIndex].votes++
        }
        else{
            alert('please click on the images');
            userRounds--; 
        }
    
        renderImages();
       
    }else{
        divElement.appendChild(buttonElement)
        buttonElement.textContent = 'Show results in text'
        container.removeEventListener('Click',handleUserClick);

        for (let i = 0; i < Product.allProducts.length; i++) {
            votesArr.push(Product.allProducts[i].votes);
            shownArr.push(Product.allProducts[i].shown);
          }
        updateStorage();
        chart();
    }
}


buttonElement.addEventListener('click',handleResultsClick)

function handleResultsClick() {

    let list = document.getElementById('result-list');
    console.log(list);
    for (let i = 0; i < Product.allProducts.length; i++) {
        let productResult = document.createElement('li')
        list.appendChild(productResult)
        productResult.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times`
    }
    buttonElement.removeEventListener('click',handleResultsClick)
}

function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let chart = new Chart(ctx,{
      // what type is the chart
     type: 'bar',
  
    //  the data for showing
     data:{
      //  for the names
        labels: namesArr,
        
        datasets: [
          {
          label: 'Product votes',
          data: votesArr,
          backgroundColor: [
            'rgb(138, 44, 226)',
          ],
    
          borderWidth: 1
        },
  
        {
          label: 'Product shown',
          data: shownArr,
          backgroundColor: [
            'black',
          ],
    
          borderWidth: 1
        }
        
      ]
      },
      options: {}
    });
    
  }

 getData();