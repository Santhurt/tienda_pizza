export const data = {
    getProducts: () => fetch("../api/alimentos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar los productos");
            }

            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        }),
};
