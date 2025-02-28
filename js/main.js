// import { startIndex } from "./eventos/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split("/").pop();
    console.log(page);

    if (page == "index.html") {
        import("./eventos/index.js").then(module => {
            module.startIndex();
        })
    } else if (page == "productos.html") {
        import("./eventos/productos.js").then(module => {
            module.startProducts();
        })
    }

});
