import { dom } from "../componentes.js";
import { data } from "../logica.js";

export function startProducts() {
    const pizzasContainer = document.querySelector("#pizzas-container");
    const postresContainer = document.querySelector("#postres-container");
    const refrescosContainer = document.querySelector("#refrescos-container");
    const orderContainer = document.querySelector("#product-list");
    const totalLabel = document.querySelector("#total-price");
    let total = 0;

    data.getProducts().then((products) => {
        const pizzas = products.pizzas;
        const postres = products.postres;
        const refrescos = products.refrescos; 

        pizzas.forEach((pizza) => {
            const productCard = dom.createCard(
                pizza.imagen,
                pizza.nombre,
                pizza.precio,
                `pizza-${pizza.id}`
            );

            pizzasContainer.appendChild(productCard);
        });

        postres.forEach((postre) => {
            const postreCard = dom.createCard(
                postre.imagen,
                postre.nombre,
                postre.precio,
                `postre-${postre.id}`
            );

            postresContainer.appendChild(postreCard);
        });

        refrescos.forEach((refresco) => {
            const productCard = dom.createCard(
                refresco.imagen,
                refresco.nombre,
                refresco.precio,
                `refresco-${refresco.id}`
            );

            refrescosContainer.appendChild(productCard);
        });

        return true;

    }).then(isContentLoaded => {
        console.log(isContentLoaded);

        const addButtons = document.querySelectorAll(".add-product");
        const orderButton = document.querySelector("#order-button");


        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const parent = e.target.closest(".parent");
                const input = parent.querySelector('[data-input="quantity-input"]');
                const cantidad = input.value;
                const precio = button.getAttribute("data-price");
                const nombre = button.getAttribute("data-name");

                const productOrder = {
                    id: e.target.id,
                    nombre: nombre,
                    precioTotal: precio * cantidad,
                    cantidad: cantidad
                }

                data.setOrder(productOrder);

            })
        });

        orderButton.addEventListener('click', () => {
            const keys = Object.keys(localStorage);

            keys.forEach(key => {
                const productOrder = JSON.parse(localStorage.getItem(key));

                const li = dom.createListProduct(productOrder.nombre, productOrder.precioTotal, productOrder.cantidad);
                orderContainer.appendChild(li);

                total += productOrder.precioTotal;
            });

            totalLabel.textContent = total;
        });
    });

}
