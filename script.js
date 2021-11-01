
const gotcha = (e)=>document.querySelector(e);
const gotchas = (e)=>document.querySelectorAll(e);


pizzaJson.map((item, index)=>{
    let pizzaItem = gotcha('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  

    gotcha('.pizza-area').append(pizzaItem);
})

function canCompra() {
    document.querySelector('pizzaWindowArea').style.display = 'none';
}
