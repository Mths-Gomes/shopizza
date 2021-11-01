
const gotcha = (e)=>document.querySelector(e);
const gotchas = (e)=>document.querySelectorAll(e);


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

        gotcha('.pizzaWindowArea').style.opacity = 0;
        gotcha('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>gotcha('.pizzaWindowArea').style.opacity = 1, 200);
    });
    
    /*pizzaItem.querySelector('.apizzaInfo--cancelButton').addEventListener('click',(e)=> {
        e.preventDefault();
        gotcha('.pizzaWindowArea').style.display = 'flex';
    });*/

    gotcha('.pizza-area').append(pizzaItem);
})

function canCompra() {
    document.querySelector('pizzaWindowArea').style.display = 'none';
}
