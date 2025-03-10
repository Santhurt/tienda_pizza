import { dom } from "../componentes.js";
import { data } from "../logica.js";

export function startIndex() {
    const carousel = document.querySelector("#carousel");
    const indicator = document.querySelector("#indicator");
    const imgContainer = document.querySelectorAll(".img-cont");
    const orderContainer = document.querySelector("#product-list");
    const totalLabel = document.querySelector("#total-price");

    data.getProducts()
        .then((products) => {
            const pizzas = products.pizzas;

            //solamnte se necesitan 3 pizzas
            for (let i = 0; i < 3; i++) {
                const pizza = pizzas[i];

                const carouselElements = dom.createCarousel(
                    pizza.imagen,
                    pizza.nombre,
                    pizza.precio,
                    `pizza-${pizza.id}`
                );

                carousel.appendChild(carouselElements.carouselItem);
                indicator.appendChild(carouselElements.carouselIndicator);
            }

            const postres = products.postres;
            const txtContainer = document.querySelectorAll(".txt-cont");

            //bucle para los cards del index
            //se añade la imagen del primer postre al primer contenedor
            //se añade la imagen del segundo postre al segundo contenedor
            for (let i = 0; i < 2; i++) {
                const elements = dom.createComponent(
                    postres[i].imagen,
                    postres[i].nombre,
                    postres[i].precio
                );

                txtContainer[i].prepend(elements.counter);
                txtContainer[i].prepend(elements.h3Nombre);
                txtContainer[i].prepend(elements.h2Precio);
                imgContainer[i].prepend(elements.image);

                //añadimos la informacion de los postres a los botones
                const button = txtContainer[i].querySelector("#button");
                button.setAttribute("data-price", postres[i].precio);
                button.setAttribute("data-name", postres[i].nombre);
            }

            return true;
        })
        .then((isContentLoaded) => {
            console.log(isContentLoaded);

            const addButtons = document.querySelectorAll(".add-product");
            const orderButton = document.querySelector("#order-button");

            addButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    const parent = e.target.closest(".parent");
                    const input = parent.querySelector(
                        '[data-input="quantity-input"]'
                    );
                    const cantidad = input.value;
                    const precio = button.getAttribute("data-price");
                    const nombre = button.getAttribute("data-name");

                    const productOrder = {
                        id: e.target.id,
                        nombre: nombre,
                        precioTotal: cantidad * precio,
                        cantidad: cantidad,
                    };

                    data.setOrder(productOrder);
                });
            });

            orderButton.addEventListener("click", () => {
                const keys = Object.keys(localStorage);
                const listItems = [];
                let total = 0;

                keys.forEach((key) => {
                    const productOrder = JSON.parse(localStorage.getItem(key));
                    listItems.push(
                        dom.createListProduct(
                            productOrder.nombre,
                            productOrder.precioTotal,
                            productOrder.cantidad
                        )
                    );

                    total += productOrder.precioTotal;
                });

                orderContainer.replaceChildren(...listItems);
                totalLabel.textContent = total;
            });
        });
}
