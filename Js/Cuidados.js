window.mostrarCuidados = function(colonia){

    document.getElementById("app").innerHTML = `

    <section class="tarjeta">

        <button id="btnVolverCuidados">

        ⬅️ Volver

        </button>

    </section>

    <section class="tarjeta">

        <h2>🍽💧 Cuidados</h2>

        <p><strong>${colonia.nombre}</strong></p>

        <hr>

        <p>🍽 Última alimentación: ${colonia.alimentacion?.ultima || "--"}</p>

        <label>Alimento (opcional)</label>
        <br>
        <input
        type="text"
        id="alimentoTexto"
        placeholder="Ej: Semillas y proteína"
        value="${colonia.alimentacion?.alimento || ""}">

        <br><br>

        <button id="btnMarcarAlimentado">

        ✅ Marcar alimentado hoy

        </button>

        <hr>

        <p>💧 Última agua: ${colonia.agua?.ultima || "--"}</p>

        <button id="btnMarcarAgua">

        ✅ Marcar agua añadida hoy

        </button>

    </section>

    `;


    document
    .getElementById("btnMarcarAlimentado")
    .onclick = ()=>{

        const alimento =
            document.getElementById("alimentoTexto").value.trim();

        Storage.registrarAlimentacion(colonia.id, alimento);

        mostrarCuidados(Storage.obtenerColoniaPorId(colonia.id));

    };


    document
    .getElementById("btnMarcarAgua")
    .onclick = ()=>{

        Storage.registrarAgua(colonia.id);

        mostrarCuidados(Storage.obtenerColoniaPorId(colonia.id));

    };


    document
    .getElementById("btnVolverCuidados")
    .onclick = ()=>{

        mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

    };


};