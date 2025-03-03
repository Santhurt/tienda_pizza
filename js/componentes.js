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

        return {
            image: img,
            h2Precio: h2,
            h3Nombre: h3
        }

    },

    createCard: (imgSrc, nombre, precio) => {
        const colContainer = document.createElement("div");
        colContainer.classList.add("col-6", "mt-4");

        const container = document.createElement("div");
        container.classList.add("bg-secondary-s", "p-4", "rounded-4");

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row");

        const img = createImageCard(imgSrc);
        const text = createTextCard(precio, nombre);

        rowContainer.appendChild(img);
        rowContainer.appendChild(text);

        container.appendChild(rowContainer);

        colContainer.appendChild(container);

        return colContainer;

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

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "bg-primary-s");
    button.textContent = "Solicitar";

    txtContainer.appendChild(h1Element);
    txtContainer.appendChild(h2Element);
    txtContainer.appendChild(button);

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

const createTextCard = (precio, nombre) => {
    const textContainer = document.createElement("div");
    textContainer.classList.add("col-4", "text-white");

    const h1 = document.createElement("h1");
    h1.classList.add("fw-bold");
    h1.textContent = precio;


    const h3 = document.createElement("h3");
    h3.textContent = nombre;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "bg-primary-s");
    button.textContent = "Añadir";

    textContainer.appendChild(h1);
    textContainer.appendChild(h3);
    textContainer.appendChild(button);

    return textContainer;
}
