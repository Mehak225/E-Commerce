const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}
  //-----------------------------------//
//   document.getElementById("form-detail").onsubmit = function (event) {
//         event.preventDefault();
      
//         var nam = document.getElementById("name").value;
//         var email = document.getElementById("email").value;
//         var course = document.getElementById("course").value;
//         var comment = document.getElementById("com").value;
      
      
//         console.log("Name:", nam);
//         console.log("E-mail:", email);
//         console.log("subject", course);
//         console.log("Comment:", comment);
//       };
    // --------------------------------//
// -------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.fas.fa-shopping-cart');
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    let totalAmount = 0;
    let cartItems=[];
        

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productBox = event.target.closest('.pro');
        const productName = productBox.querySelector('.des span').textContent;
        const productPrice = parseFloat(productBox.querySelector('.des h4').textContent.replace('RS.', ''));
    

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-box');
        cartItem.innerHTML = `
            <img src="${productBox.querySelector('img').src}" class="cart-img" height="280px">
            <div class="detail-box">
                <div class="cart-product-title">${productName}</div>
                <div class="cart-price">RS.${productPrice.toFixed(2)}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-xmark cart-remove"></i>
        `;
        cartContent.appendChild(cartItem);
        totalAmount += productPrice;
        updateTotalPrice();

        const removeButton = cartItem.querySelector('.cart-remove');
        removeButton.addEventListener('click', removeFromCart);

        const quantityInput = cartItem.querySelector('.cart-quantity');
        quantityInput.addEventListener('input', updateCartItemTotal);


    }

    function removeFromCart(event) {
        const cartItem = event.target.closest('.cart-box');
        const cartPrice = parseFloat(cartItem.querySelector('.cart-price').textContent.replace('RS.', ''));
        totalAmount -= cartPrice;
        updateTotalPrice();
        cartItem.remove();
        const productName = cartItem.querySelector('.cart-product-title').textContent;
        const itemIndex = cartItems.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
        }
    }

    function updateCartItemTotal(event) {
            const quantity = parseInt(event.target.value);
            const cartItem = event.target.closest('.cart-box');
            const cartPrice = parseFloat(cartItem.querySelector('.cart-price').textContent.replace('RS.', ''));
    
            const newCartPrice = quantity * cartPrice;
            totalAmount += newCartPrice - cartPrice;
            cartItem.querySelector('.cart-price').textContent = `RS.${newCartPrice.toFixed(3)}`;
            updateTotalPrice();
    }

    function updateTotalPrice() {
        totalPriceElement.textContent = `RS.${totalAmount.toFixed(2)}`;
    }

    const cartIcon = document.querySelector('#cart-icon');
    const closeCartIcon = document.querySelector('#close-cart');
    const buyNowButton = document.querySelector('.btn-buy');
    const cart= document.querySelector('.cart')

    cartIcon.addEventListener('click', openCart);
    closeCartIcon.addEventListener('click', closeCart);
    buyNowButton.addEventListener('click', buyNow);

    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
    });

function openCart() {
    cart.style.display = 'block';
}

function closeCart() {
    cart.style.display = 'none';
}

function buyNow() {
    if (totalAmount === 0) {
        alert('Your Cart is Empty!');
    } 
    else {
        alert('Your order has been successful! Thank you for shopping with us.');
        closeCart();
    }
}
})
