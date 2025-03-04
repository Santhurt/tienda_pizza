let itemCount = 0;

export const dom = {
    createCarousel: (imgSrc, precio, nombre) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("carousel-item");

        if (itemCount == 0) {
            itemContainer.classList.add("active");
        }

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row", "bg-secondary-s");

        const carouselImage = createImage(imgSrc);
        const carouselText = createText(precio, nombre);

        rowContainer.appendChild(carouselImage);
        rowContainer.appendChild(carouselText);

        itemContainer.appendChild(rowContainer);

        return {
            carouselItem: itemContainer,
            carouselIndicator: createIndicator(),
        };
    },

    createComponent: (imgSrc, nombre, precio) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("img-fluid");

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

    //Productos la seccion menu
    createCard: (imgSrc, nombre, precio, idProd) => {
        const colContainer = document.createElement("div");
        colContainer.classList.add("col-6", "mt-4");

        const container = document.createElement("div");
        container.classList.add("bg-secondary-s", "p-4", "rounded-4");

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");

        const img = createImageCard(imgSrc);
        const text = createTextCard(idProd,precio, nombre);

        rowContainer.appendChild(img);
        rowContainer.appendChild(text);

        container.appendChild(rowContainer);

        colContainer.appendChild(container);

        return colContainer;

    },

    createListProduct: (nombre, precio, cantidad) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        const container = document.createElement("div");

        const h6 = document.createElement("h6");
        h6.classList.add("mb-0");
        h6.textContent = nombre;

        const small = document.createElement("small");
        small.classList.add("text-muted");
        small.innerHTML = `Cantidad: <span>${cantidad}</span>`;

        const span = document.createElement("span");
        span.classList.add("text-end");
        span.textContent = `${precio}`;

        container.appendChild(h6);
        container.appendChild(small);

        li.appendChild(container);
        li.appendChild(span);

        return li;
    }

};

const createImage = (imgSrc) => {
    const colImgContainer = document.createElement("div");
    colImgContainer.classList.add("col-md-8", "p-5", "rounded");

    const img = document.createElement("img");
    img.classList.add("img-fluid", "images");
    img.src = imgSrc;

    colImgContainer.appendChild(img);

    return colImgContainer;
};

const createText = (precio, nombre) => {
    const colTxtContainer = document.createElement("div");
    colTxtContainer.classList.add("col-md-4", "d-flex", "align-items-center");

    const txtContainer = document.createElement("div");
    txtContainer.classList.add("text-white");

    const h1Element = document.createElement("h1");
    h1Element.classList.add("fw-bold");
    h1Element.textContent = precio;

    const h2Element = document.createElement("h2");
    h2Element.textContent = nombre;


    const counter = createCounter();

    const button = document.createElement("button");
    button.classList.add("btn", "bg-primary-s", "w-100", "mt-2");
    button.type = "button";
    button.textContent = "Añadir";

    const elements = [h1Element, h2Element, counter, button ];

    elements.forEach(element => {
        txtContainer.appendChild(element);
    });

    colTxtContainer.appendChild(txtContainer);

    return colTxtContainer;
};

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

const createImageCard = (imgSrc) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("col-8");
    //imgContainer.style.height = "400px";

    const img = document.createElement("img");
    img.classList.add("img-fluid", "image-product");
    img.src = imgSrc;

    imgContainer.appendChild(img);

    return imgContainer;
}

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
    button.classList.add("btn", "bg-primary-s", "w-100", "mt-2", "add-product");
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


const createCounter = () => {
    // Crear contenedor para el selector de cantidad
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("d-flex", "align-items-center", "my-2");

    // Botón para decrementar
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
    quantityInput.type = "number";
    quantityInput.classList.add("form-control", "mx-2", "text-center");
    quantityInput.style.width = "60px";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.setAttribute("data-input", "quantity-input")

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
