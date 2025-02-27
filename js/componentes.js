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

    createImageContainer: (imgSrc, precio, nombre) => {
        const colContainer = document.createElement("div");
        colContainer.classList.add("col-md-6", "mb-3");

        const container = document.createElement("div");
        container.classList.add("bg-secondary-s", "p-4", "rounded-4", "h-100");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("text-center", "mb-4");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("img-fluid");
    },
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
