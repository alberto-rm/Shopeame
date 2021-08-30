const url$$ = 'http://localhost:3000/products';
fetch(url$$)
        .then((res) => res.json())
        .then((products) => {
                console.log(products);
                printProducts(products);
        });

// ------ body-------
const mainDiv$$ = document.querySelector('[class="data-function"]');
console.log(mainDiv$$)

const myDiv$$ = document.createElement('div');
myDiv$$.classList.add('row')

const divSearchTitle$$ = document.createElement('div')
divSearchTitle$$.classList.add('b-search__title')

const divSearch$$ = document.createElement('div')
divSearch$$.classList.add('b-search')

function printProducts(products) {
        for (const product of products) {
                // ---------pintar la imagen--------
                const img$$ = document.createElement('img');
                img$$.src = product.image;
                img$$.classList.add('b-img')
                // ---------contenedor--------
                const containerMain$$ = document.createElement('div');
                containerMain$$.classList.add('b-products__container', 'col-12', 'col-md-6', 'col-sm-3')
                mainDiv$$.appendChild(divSearchTitle$$)
                myDiv$$.appendChild(divSearch$$)
                containerMain$$.append(img$$);
                myDiv$$.appendChild(containerMain$$);
                mainDiv$$.appendChild(myDiv$$);

                divSearchTitle$$.textContent = 'Lista de productos (9)';
                // ---------titulo--------
                const h1$$ = document.createElement('h1')
                h1$$.textContent = product.name
                h1$$.classList.add('b-products__h1')
                containerMain$$.appendChild(h1$$)

                // ---------precios--------
                const price$$ = document.createElement('p');
                price$$.textContent = '€ ' + product.price;
                price$$.classList.add('b-products__p')
                containerMain$$.appendChild(price$$)

                // ---------descripcion --------
                const description$$ = document.createElement('h3');
                description$$.classList.add('b-products__description')
                description$$.textContent = product.description
                containerMain$$.appendChild(description$$)

                // ---------valoracion--------
                const divValor$$ = document.createElement('div');
                divValor$$.classList.add('b-products__rating');
                divValor$$.textContent = product.stars;
                containerMain$$.appendChild(divValor$$);

                // ---------estrellas--------
                for (let i = 0; i < 5; i++) {
                        const span$$ = document.createElement('span');
                        span$$.classList.add('icon-guitar-pick');
                        divValor$$.appendChild(span$$);
                };

                //----------button editar-------------
                const btn$$ = document.createElement('button');
                divValor$$.textContent = product.id

                btn$$.textContent = 'Editar';
                btn$$.classList.add('b-btn')
                btn$$.addEventListener('click', ()=>{
                        // printProducts(product.id)
                        console.log(btn$$)
                });
                containerMain$$.appendChild(btn$$)

                //----------boton delete-------------
                const delete$$ = document.createElement('button')
                delete$$.className = ('b-delete');
                delete$$.textContent = 'Quitar';
                delete$$.addEventListener('click', () => {
                        removeProduct(product.id);
                });
                containerMain$$.appendChild(delete$$);

                const removeProduct = (id) => {
                        fetch('http://localhost:3000/products/' + id, {
                                method: 'DELETE',
                                headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                },
                        });
                        console.log('Hola');
                }
        }
}
// ----------Añadir productos -------
const form$$ = document.querySelector('form');
console.log(form$$)

form$$ && form$$.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form$$.querySelector('#name').value;
        const price = form$$.querySelector('#price').value;
        const description = form$$.querySelector('#description').value;
        const image = form$$.querySelector('#image').value;
        const rating = form$$.querySelector('#rating').value;
        const newProduct = {
                name,
                price,
                description,
                image,
                rating
        }
        console.log(newProduct)
        addProduct(newProduct);
});
// ----------Preview products -------
const imgPreview$$ = document.querySelector('.b-preview__img');
const namePreview$$ = document.querySelector('.b-preview__name');
const descriptionPreview$$ = document.querySelector('.b-preview__description');
const pricePreview$$ = document.querySelector('.b-preview__price');
const startPreview$$ = document.querySelector('.b-preview__stars');

form$$.addEventListener('input', (event) => {
        console.log('texto', event.target.value)
        console.log('id', event.target.id)
        if (event.target.id === 'image') {
                imgPreview$$.src = event.target.value;
        }
        if (event.target.id === 'name') {
                namePreview$$.textContent = event.target.value;
        }
        if (event.target.id === 'description') {
                descriptionPreview$$.textContent = event.target.value;
        }
        if (event.target.id === 'price') {
                pricePreview$$.textContent = event.target.value + '€';
        }
        if (event.target.id === 'rating') {
                startPreview$$.textContent = event.target.value;
        }
})

function addProduct(newProduct) {
        fetch(url$$, {
                method: 'POST',
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(newProduct)
        }).then(res => res.json()).then(resData => {
                console.log(resData);
        });
};