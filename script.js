
let qtdCesta = 1;
let typPizza = 0;
let cart = [];
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
        gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`;

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
    setTimeout(()=>gotcha('.pizzaWindowArea').style.display = 'none', 500);
}
    
gotchas('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>item.addEventListener('click', closeModal));

gotcha('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if(qtdCesta > 1) {
        qtdCesta--;
        let total = qtdCesta * pizzaJson[typPizza].price;
        gotcha('.pizzaInfo--qt').innerHTML = qtdCesta;
        gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;
    }
});

gotcha('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    qtdCesta++;
    let total = qtdCesta * pizzaJson[typPizza].price; 
    gotcha('.pizzaInfo--qt').innerHTML = qtdCesta;
    gotcha('.pizzaInfo--actualPrice').innerHTML = `R$ ${total.toFixed(2).replace('.',',')}`;
})

gotchas('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        gotcha('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

gotcha('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let sizPizza = parseInt(gotcha('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    cart.push({
        id:pizzaJson[typPizza].id,
        pizza:pizzaJson[typPizza].name,
        size:sizPizza,
        qtd:qtdCesta
    });

    closeModal();
}); 