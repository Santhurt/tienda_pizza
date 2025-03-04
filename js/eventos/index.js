import { dom } from "../componentes.js";
import { data } from "../logica.js";

export function startIndex() {
    const carousel = document.querySelector("#carousel");
    const indicator = document.querySelector("#indicator");
    const imgContainer = document.querySelectorAll(".img-cont");
    const txtContainer = document.querySelectorAll(".txt-cont");

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

        const postres = products.postres;

        for (let i = 0; i < 2; i++) {
            const elements = dom.createComponent(postres[i].imagen, postres[i].nombre, postres[i].precio);

            txtContainer[i].prepend(elements.counter);
            txtContainer[i].prepend(elements.h3Nombre);
            txtContainer[i].prepend(elements.h2Precio);
            imgContainer[i].prepend(elements.image);

        }

    });


}
