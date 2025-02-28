import { dom } from "../componentes.js";
import { data } from "../logica.js";

export function startProducts() {
    const pizzasContainer = document.querySelector("#pizzas-container");
    const postresContainer = document.querySelector("#postres-container");

    data.getProducts().then(products => {
        const pizzas = products.pizzas;
        const postres = products.postres;

        pizzas.forEach(pizza => {
            const productCard = dom.createCard(pizza.imagen, pizza.nombre, pizza.precio);

            pizzasContainer.appendChild(productCard);
        });

        postres.forEach(postre => {
            const postreCard = dom.createCard(postre.imagen, postre.nombre, postre.precio);

            postresContainer.appendChild(postreCard);
        });
    })

}
