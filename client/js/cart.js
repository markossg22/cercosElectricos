const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");  

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {

    //header 

    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";

    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❎";  
    modalClose.className = "modal-close";  
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Cart"; 
    modalTitle.className = "modal-title";  
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //body

    if (cart.length > 0 ) {

        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
            <div class="product">
                <img class="product-img" src="${product.img}" />

                <div class="product-info">
                    <h4>${product.productName}</h4>
                </div>

                <div class="quantity">
                    <span class="quantity-btn-decrese">-</span>
                    <span class="quantity-input">${product.quanty}</span>
                    <span class="quantity-btn-increse">+</span>
                </div>

                <div class="price">${product.price * product.quanty} $</div>
                    <div class="delete-product">X</div>
                </div>
                
            </div>
            `;

            //sumarRestar Productos
            modalContainer.append(modalBody)

            const decrese = modalBody.querySelector(".quantity-btn-decrese")
            decrese.addEventListener("click", ()=> {
                if (product.quanty !==1){
                    product.quanty--
                    displayCart();
                }
            });

            const increse = modalBody.querySelector(".quantity-btn-increse")
            increse.addEventListener("click", ()=> {
                product.quanty++
                displayCart();
            });

            //delete Productos

            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", ()=> {
                deleteCartProduct(product.id);
            })

        });

        //modal footer

        const total = cart.reduce((acumulador, elemento) => acumulador + elemento.price * elemento.quanty, 0) 

        const modalFooter = document.createElement("div");
        modalFooter.className="modal-footer";
        modalFooter.innerHTML=`
        <div class ="total-price">Total : $${total}</div> `;

        modalContainer.append(modalFooter);
    }
    else{
        const modalText = document.createElement("h2")
        modalText.className = "modal-body";
        modalText.innerText = "tu carrito está vacío!"
        modalContainer.append(modalText);
    }

};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId,1);
    displayCart();
};

const displayCartCounter = () => {

    const cartLength = cart.reduce((acumulador, elemento) => acumulador + elemento.quanty, 0);

    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    }
    else{
        cartCounter.style.display = "none";
    }
} 

