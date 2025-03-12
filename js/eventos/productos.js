import { dom } from "../componentes.js";
import { data } from "../logica.js";
import swal from "../../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

export function startProducts() {
    //representas las secciones de los productos
    const pizzasContainer = document.querySelector("#pizzas-container");
    const postresContainer = document.querySelector("#postres-container");
    const refrescosContainer = document.querySelector("#refrescos-container");
    //el contendor con las ordenes del usuario
    const orderContainer = document.querySelector("#product-list");
    const totalLabel = document.querySelector("#total-price");

    //se llama la funcion para obtener los productos de la api
    data.getProducts()
        .then((products) => {
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
        })
        .then((isContentLoaded) => {
            console.log(isContentLoaded);

            const addButtons = document.querySelectorAll(".add-product");
            const orderButton = document.querySelector("#order-button");

            const modal = document.querySelector("#modal-total");

            modal.addEventListener("show.bs.modal", (e)=> {
                if (Object.keys(localStorage).length == 0) {
                    e.preventDefault();
                }
            })

            addButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    const parent = e.target.closest(".parent");
                    //input es la cantidad seleccionada
                    const input = parent.querySelector(
                        '[data-input="quantity-input"]'
                    );

                    let cantidad = parseInt(input.value);
                    const precio = button.getAttribute("data-price");
                    const nombre = button.getAttribute("data-name");

                    const localKeys = Object.keys(localStorage);
                    const isProductAdded = localKeys.some(
                        (key) => key == e.target.id
                    );

                    if (isProductAdded) {
                        const product = JSON.parse(
                            localStorage.getItem(e.target.id)
                        );
                        cantidad = product.cantidad + cantidad;
                    }

                    const productOrder = {
                        id: e.target.id,
                        nombre: nombre,
                        precioTotal: precio * cantidad,
                        cantidad: cantidad,
                    };

                    //se guarda en el local storage
                    data.setOrder(e.target.id, productOrder);

                    swal.fire({
                        title: "El producto fue añadido al carrito",
                        icon: "success",
                        customClass: {
                            confirmButton: "modal-button"
                        }
                    });
                });
            });

            orderButton.addEventListener("click", () => {
                const keys = Object.keys(localStorage);
                //se crea un arreglo aue almacenara los items del localStorage
                const listItems = [];
                let total = 0;

                if (keys.length == 0) {
                    swal.fire({
                        text: "No hay productos añadidos al carrito",
                        icon: "error",
                        customClass: {
                            confirmButton: "modal-button"
                        }
                    })
                }

                keys.forEach((key) => {
                    const productOrder = JSON.parse(localStorage.getItem(key));
                    listItems.push(
                        dom.createListProduct(
                            key,
                            productOrder.nombre,
                            productOrder.precioTotal,
                            productOrder.cantidad
                        )
                    );

                    total += productOrder.precioTotal;
                });

                //se remplaza los elementos actuales de la orden por los nuevos
                orderContainer.replaceChildren(...listItems);

                totalLabel.textContent = `$${total}`;

                const deleteButtons =
                    document.querySelectorAll(".delete-product");

                deleteButtons.forEach((button) => {
                    button.addEventListener("click", (e) => {
                        const parentLi = e.target.closest("li");
                        parentLi.remove();

                        localStorage.removeItem(parentLi.getAttribute("key"));
                        let price = parseInt(
                            totalLabel.textContent.replace("$", "")
                        );

                        let newPrice = price - parentLi.getAttribute("price");
                        totalLabel.textContent = `$${newPrice}`;
                    });
                });

                const comprarButton = document.querySelector("#comprar");

                comprarButton.addEventListener("click", () => {
                    swal.fire({
                        title: "Compra exitosa",
                        icon: "success",
                        customClass: {
                            confirmButton: "modal-button"
                        }
                    });

                });
            });
        });
}
