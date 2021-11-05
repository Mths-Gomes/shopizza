
let qtdCesta = 1;
let typPizza = 0;
let cart = [];
let newPrice = 0;
const gotcha = (e)=>document.querySelector(e);
const gotchas = (e)=>document.querySelectorAll(e);

//Listagem das Pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = gotcha('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        qtdCesta = 1;
        typPizza = key;

        gotcha('.pizzaBig img').setAttribute('src',pizzaJson[key].img);
        gotcha('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        gotcha('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        gotcha('.pizzaInfo--size.selected').classList.remove('selected');
        gotchas('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });
        newPrice = pizzaJson[key].price;
        gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${newPrice.toFixed(2).replace('.',',')}`;

        gotcha('.pizzaInfo--qt').innerHTML = qtdCesta;

        gotcha('.pizzaWindowArea').style.opacity = 0;
        gotcha('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>gotcha('.pizzaWindowArea').style.opacity = 1, 200);
    });

    gotcha('.pizza-area').append(pizzaItem);
});

//Eventos do Modal
function closeModal() {
    gotcha('.pizzaWindowArea').style.opacity = 0;
    gotcha('aside').style.left = '100vw';
    setTimeout(()=>gotcha('.pizzaWindowArea').style.display = 'none', 500);
}
    
gotchas('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>item.addEventListener('click', closeModal));

gotcha('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if(qtdCesta > 1) {
        qtdCesta--;
        let total = qtdCesta * newPrice;
        gotcha('.pizzaInfo--qt').innerHTML = qtdCesta;
        gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;
    }
});

gotcha('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    qtdCesta++;
    let total = qtdCesta * newPrice; 
    gotcha('.pizzaInfo--qt').innerHTML = qtdCesta;
    gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;
})

gotchas('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        gotcha('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        let varPrice = pizzaJson[typPizza].price;
        let newTotal = 0;
        if(sizeIndex == 0) {
            newPrice = (varPrice * 0.9);            
        }
        else if(sizeIndex == 1) {
            newPrice = (varPrice * 0.95);
        }
        newTotal = newPrice * qtdCesta;
        gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${newTotal.toFixed(2).replace('.',',')}`;
    });
});


gotcha('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let sizPizza = parseInt(gotcha('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[typPizza].id + '&' + sizPizza;

    let checkIden = cart.findIndex((item)=>item.identifier == identifier);
    
    if(checkIden >-1) {
        cart[checkIden].qtd += qtdCesta;
    }
    else {
        cart.push({
            identifier:identifier,
            id:pizzaJson[typPizza].id,
            pizza:pizzaJson[typPizza].name,
            size:sizPizza,
            qtd:qtdCesta,
            price:newPrice
        });
    }
    updateCart();
    closeModal();
    //addPizzaCart();
});  

gotcha('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        gotcha('aside').style.left = '0vw';
    }
});

gotcha('.menu-closer').addEventListener('click', ()=>{
    closeModal();
});

function updateCart() {
    gotcha('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        gotcha('aside').classList.add('show');
        gotcha('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        cart.forEach((item, index)=>{
            let pizza = pizzaJson.find((pizzaItem)=>pizzaItem.id == item.id);

            let cartItem = gotcha('.models .cart--item').cloneNode(true);
            
            let tam = 0;
            switch(item.size){
                case 0:
                    tam = 'P';
                    break;
                case 1:
                    tam = 'M';
                    break;
                case 2:
                    tam = 'G';
                    break;
            }            

            cartItem.setAttribute('data-key', item.identifier);
            cartItem.querySelector('.cart--item img').setAttribute('src', pizza.img);
            cartItem.querySelector('.cart--item-nome').innerHTML = `${item.pizza} (${tam})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qtd;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[index].qtd > 1) {
                    cart[index].qtd--;    
                    updateCart();
                }
                else {
                    cart.splice(index,1);
                    updateCart();
                    if(cart.length == 0) {
                        closeModal();
                    }
                }
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[index].qtd++;
                updateCart();
            });

            subtotal += (item.price * item.qtd);
            desconto = subtotal * 0.1;
            total = subtotal - desconto;
           
            gotcha('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2).replace('.',',')}`;
            gotcha('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2).replace('.',',')}`;
            gotcha('.total span:last-child').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;
                          
            gotcha('.cart').append(cartItem);
        })
        
    }
    else {
        gotcha('aside').classList.remove('show');
    }
    
}
