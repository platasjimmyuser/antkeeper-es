document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btnDemo");

    if (boton) {
        boton.addEventListener("click", () => {
            location.href = "Pages/Colonia.html";
        });
    }

    const contenedorColonia = document.getElementById("colonia");

    if (contenedorColonia) {
        mostrarColoniaDemo();
    }

});