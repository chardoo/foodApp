const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const backdropItemdetails = document.querySelector(".backdrop1");
const modalItemdetails = document.querySelector(".modal1");
const modalNoButton = document.querySelector(".modal__action--negative");
const selectPlanButtons = document.querySelectorAll(".plan button");
const toggleButton = document.querySelector(".toggle-button");
const mobileNav = document.querySelector(".mobile-nav");
const mycart  = document.getElementById("mycart")


//array of cart
const cartObject = [] 



// creating cart page
function createcartpage(url, name, desc, price){
  let html = ''
  html += `
  <div class="itemspage">
  <div>  
  <img src="${url}">
  </div>
  <h2 class="itemspage-title">${name} </h2>
  <h3 class="itemspage-price"> ${price} </h3> 
  <h4> 1    </h4>
  <h5 class="itemspage-totalprice"> ${price}   </h5>
 </div>
`
return html
}

//creating details page of my value
function createProductDetailspage(url, name, desc, price, id){
  let myitem = ''
  myitem +=
  `

  <main class="contain">
  <div class="left-column">
  <img data-image="black" src="images/black.png" alt="">
  <img data-image="blue" src="images/blue.png" alt="">
  <img id="url" data-image="red" class="active" src="${url}" alt="">

  </div>
  <div class="right-column">
  <div class="product-description">
    <h1 id="name" >${name}</h1>
    <p id="descript">  ${desc}  </p>
  </div>

    
  <div class="product-price">
    <span id="price">${price}</span>
    <form action="/addcart/${id}" method="POST">
    <input type="number" value=1 name="qty" placeholder ="quantity"  >
    <button class="cart-btn" > add food  </button>
    </form>
  </div>
</div>
</div>
  `
  return myitem
  }


  
  $('.products').on('click', '.product-card', function()
 {
  let price = $(this).children().find('#price').text();
  let name = $(this).children().find('#name').text();
  let url =$(this).children().find('#imageurl').attr('src');
  let des = $(this).children().find('#desc').text();  
  let itemid = $(this).children().find('#itemid').text(); 
  console.log(itemid) 
  $('#container98').append(createProductDetailspage(url,name,des,price,itemid));
})
$(document).ready(function(){

  //showing detailed modal of items 
 
$('.product-price').on('click','#cart-btn1', function(){
 
  console.log("hello sup what dey happen to you")
 })




//cahnge colors
$('.color-choose input').on('click', function() {
  var headphonesColor = $(this).attr('data-image');

  $('.active').removeClass('active');
  $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
  $(this).addClass('active');
});

})



for (var i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener("click", function() {
    opencart()
  });
}
 // modal open and close for cart items 
backdrop.addEventListener("click", function() {
  // mobileNav.style.display = 'none';
  mobileNav.classList.remove("open");
  closeModal();
});

if (modalNoButton) {
  modalNoButton.addEventListener("click", closeModal);
}
// opening and closing modal
function closeModal() {
  if (modal) {
    modal.classList.remove("open");
  }
  backdrop.classList.remove("open");
}
function opencart(){
  modal.classList.add("open");
  backdrop.classList.add("open");
}
// modal open and close for item details page
const productCartItem = document.querySelectorAll('.product-card');
function closeItemModal() {
  if (modalItemdetails) {
    modalItemdetails.classList.remove("open");
  }
  backdropItemdetails.classList.remove("open");
}
function openitemcart(){
  modalItemdetails.classList.add("open");
  backdropItemdetails.classList.add("open");
}

for(let i = 0; i< productCartItem.length; i++){
  productCartItem[i].addEventListener('click',openitemcart)
}

backdropItemdetails.addEventListener('click',closeItemModal)


mycart.addEventListener("click", opencart)

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2500);    
}
