let itemCount = 0;

export const dom = {
    /**
    * Crea un item del carousel (index).
    * @param {string} imgSrc - ruta de la imagen.
    * @param {string} nombre - nombre del producto.
    * @param {number} precio - precio del producto.
    * @param {string} idProd - id del producto.
    * @returns {object} objeto con el item del carousel y su respectivo contenedor.
    */
    createCarousel: (imgSrc, nombre, precio, idProd) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("carousel-item");

        //Al primer item del carousel se le añade la clase active
        if (itemCount == 0) {
            itemContainer.classList.add("active");
        }

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row", "bg-secondary-s");

        const carouselImage = createImage(imgSrc);
        const carouselText = createText(nombre, precio, idProd);

        rowContainer.appendChild(carouselImage);
        rowContainer.appendChild(carouselText);

        itemContainer.appendChild(rowContainer);

        return {
            carouselItem: itemContainer,
            carouselIndicator: createIndicator(),
        };
    },

    /**
    * Crea la imagen y el texto para el resto de las cards en el index.
    * @param {string} imgSrc - ruta de la imagen.
    * @param {string} nombre - nombre del producto.
    * @param {string} precio - precio del producto.
    * @returns {object} objeto con los elementos de la card.
    */

    createComponent: (imgSrc, nombre, precio) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("img-fluid", "image-hover");

        const h2 = document.createElement("h2");
        h2.classList.add("text-white", "fw-bold");
        h2.textContent = precio;

        const h3 = document.createElement("h3");
        h3.classList.add("text-white");
        h3.textContent = nombre;

        const counter = createCounter();

        return {
            image: img,
            h2Precio: h2,
            h3Nombre: h3,
            counter: counter
        }

    },

    //Productos de la seccion menu

    /**
    * @returns {object} columna con la card creada para ser añadida en su respectiva seccion.
    */
    createCard: (imgSrc, nombre, precio, idProd) => {
        const colContainer = document.createElement("div");
        colContainer.classList.add("col-6", "mt-4");

        const container = document.createElement("div");
        container.classList.add("bg-secondary-s", "p-4", "rounded-4");

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");

        const img = createImageCard(imgSrc);
        const text = createTextCard(idProd, precio, nombre);

        rowContainer.appendChild(img);
        rowContainer.appendChild(text);

        container.appendChild(rowContainer);

        colContainer.appendChild(container);

        return colContainer;

    },


    /**
    * @returns {object} elemento li para ser añadido al ul padre.
    */
    createListProduct: (key, nombre, precio, cantidad) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.setAttribute("key", key);

        const container = document.createElement("div");

        const h6 = document.createElement("h6");
        h6.classList.add("mb-0");
        h6.textContent = nombre;

        const small = document.createElement("small");
        small.classList.add("text-muted");
        small.innerHTML = `Cantidad: <span>${cantidad}</span>`;

        const span = document.createElement("span");
        span.classList.add("text-end");
        span.textContent = `$${precio}`;

        const anotherContainer = document.createElement("div");
        anotherContainer.classList.add("d-flex", "align-items-center", "justify-content-evenly")

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("btn", "bg-danger", "text-white", "ms-3", "delete-product");
        deleteButton.id = "hola";

        const icon = document.createElement("i");
        icon.classList.add("bi", "bi-trash");


        deleteButton.appendChild(icon);

        container.appendChild(h6);
        container.appendChild(small);

        anotherContainer.appendChild(span);
        anotherContainer.appendChild(deleteButton);

        li.appendChild(container);
        li.appendChild(anotherContainer);

        return li;
    }

};

/**
    * Funcion que se encarga de crear la imagen del carousel.
    * @returns {object} columna con la imagen para ser añadida al carousel.
    */
const createImage = (imgSrc) => {
    const colImgContainer = document.createElement("div");
    colImgContainer.classList.add("col-md-8", "p-5", "rounded");

    const img = document.createElement("img");
    img.classList.add("img-fluid", "images", "image-hover");
    img.src = imgSrc;

    colImgContainer.appendChild(img);

    return colImgContainer;
};

/**
    *
    * Funcion que se encargar de crear la informacion del producto, 
    * junto con otros elementos como el boton para añadir 
    * a la orden o el input para la cantidad del producto.
    *
    * @returns {object} columna con la informacion del producto creada.
    */
const createText = (nombre, precio, idProd) => {
    const colTxtContainer = document.createElement("div");
    colTxtContainer.classList.add("col-md-4", "d-flex", "align-items-center");

    const txtContainer = document.createElement("div");
    txtContainer.classList.add("text-white", "parent"); //no se si funcionara

    const h1Element = document.createElement("h1");
    h1Element.classList.add("fw-bold");
    h1Element.textContent = precio;

    const h2Element = document.createElement("h2");
    h2Element.textContent = nombre;


    const counter = createCounter();

    const button = document.createElement("button");
    button.classList.add("btn", "bg-primary-s", "mt-2", "add-product");
    button.type = "button";
    button.textContent = "Añadir";
    button.id = idProd;
    //se añaden estos atributos para luego acceder a ellos al pedir una orden
    button.setAttribute("data-price", precio);
    button.setAttribute("data-name", nombre);

    const elements = [h1Element, h2Element, counter, button];

    elements.forEach(element => {
        txtContainer.appendChild(element);
    });

    colTxtContainer.appendChild(txtContainer);

    return colTxtContainer;
};

/**
    * @returns {object} indicador para el carousel.
    */
const createIndicator = () => {
    const btnIndicator = document.createElement("button");
    btnIndicator.type = "button";
    btnIndicator.setAttribute("data-bs-target", "#main-carousel");
    btnIndicator.setAttribute("data-bs-slide-to", `${itemCount}`);

    if (itemCount == 0) {
        btnIndicator.classList.add("active");
    }

    itemCount++;
    return btnIndicator;
};

// SECCCION DE PRODUCTOS

/**
    * @returns {object} columna con la imagen creada.
    */
const createImageCard = (imgSrc) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("col-8");
    //imgContainer.style.height = "400px";

    const img = document.createElement("img");
    img.classList.add("img-fluid", "image-product", "image-hover");
    img.src = imgSrc;

    imgContainer.appendChild(img);

    return imgContainer;
}

/**
    * @returns {object} columa con la informacion del producto creada
    * y otros elementos.
    */
const createTextCard = (idProd, precio, nombre) => {
    const colTxtContainer = document.createElement("div");
    colTxtContainer.classList.add("col-md-4", "d-flex", "align-items-center");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-white", "parent");

    const h1 = document.createElement("h1");
    h1.classList.add("fw-bold");
    h1.textContent = "$" + precio;

    const h3 = document.createElement("h3");
    h3.textContent = nombre;

    const quantityContainer = createCounter();

    // Mejorar el botón Añadir
    const button = document.createElement("button");
    button.classList.add("btn", "bg-primary-s", "mt-2", "add-product");
    button.type = "button";
    button.textContent = "Añadir";
    button.id = idProd;

    button.setAttribute("data-price", precio);
    button.setAttribute("data-name", nombre);

    // Añadir todos los elementos al contenedor principal
    const elements = [h1, h3, quantityContainer, button];

    elements.forEach(element => {
        textContainer.appendChild(element);
    });

    colTxtContainer.appendChild(textContainer);
    return colTxtContainer;

}

/**
    * @returns {object} contenedor con el contador para la cantidad del producto.
    */
const createCounter = () => {
    // Crear contenedor para el selector de cantidad
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("d-flex", "align-items-center", "my-2");

    // Botón para disminuir
    const decrementBtn = document.createElement("button");
    decrementBtn.classList.add("btn", "btn-sm", "btn-outline-light");
    decrementBtn.type = "button";
    decrementBtn.textContent = "-";

    decrementBtn.onclick = function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    };

    // Input para la cantidad
    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.classList.add("form-control", "mx-2", "text-center");
    quantityInput.style.width = "60px";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.setAttribute("data-input", "quantity-input")
    quantityInput.readOnly = true;

    // Botón para incrementar
    const incrementBtn = document.createElement("button");
    incrementBtn.classList.add("btn", "btn-sm", "btn-outline-light");
    incrementBtn.type = "button";
    incrementBtn.textContent = "+";

    incrementBtn.onclick = function() {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    };

    quantityContainer.appendChild(decrementBtn);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(incrementBtn);

    return quantityContainer;
}
