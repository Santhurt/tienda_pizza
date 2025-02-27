import { dom } from "../componentes.js";
import { data } from "../logica.js";

export function startIndex() {
    const carousel = document.querySelector("#carousel");
    const indicator = document.querySelector("#indicator");

    data.getProducts().then((products) => {
        const pizzas = products.pizzas;

        for (let i = 0; i < 3; i++) {
            const pizza = pizzas[i];

            const carouselElements = dom.createCarousel(
                pizza.imagen,
                pizza.precio,
                pizza.nombre
            );

            carousel.appendChild(carouselElements.carouselItem);
            indicator.appendChild(carouselElements.carouselIndicator);
        }
    });

}
