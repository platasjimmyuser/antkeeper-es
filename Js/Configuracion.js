window.mostrarConfiguracion = function(colonia){

    const config = colonia.configuracion || {};

    const diasRevision = config.diasRevision ?? 15;
    const diasAlimentacion = config.diasAlimentacion ?? 7;
    const diasAgua = config.diasAgua ?? 3;


    document.getElementById("app").innerHTML = `

    <section class="tarjeta">

        <button id="btnVolverConfiguracion">

        ⬅️ Volver

        </button>

    </section>

    <section class="tarjeta">

        <h2>⚙️ Configurar avisos</h2>

        <p><strong>${colonia.nombre}</strong></p>

        <hr>

        <p>Elige cada cuántos días quieres que la app te avise si no has registrado una acción.</p>

        <br>

        <label>🔍 Días sin revisión</label>
        <br>
        <input type="number" id="diasRevision" value="${diasRevision}" min="1">

        <br><br>

        <label>🍽 Días sin alimentar</label>
        <br>
        <input type="number" id="diasAlimentacion" value="${diasAlimentacion}" min="1">

        <br><br>

        <label>💧 Días sin agua</label>
        <br>
        <input type="number" id="diasAgua" value="${diasAgua}" min="1">

        <br><br>

        <button id="btnGuardarConfiguracion">

        💾 Guardar configuración

        </button>

    </section>

    `;


    document
    .getElementById("btnGuardarConfiguracion")
    .onclick = ()=>{

        Storage.actualizarConfiguracion(colonia.id, {

            diasRevision:
                document.getElementById("diasRevision").value,

            diasAlimentacion:
                document.getElementById("diasAlimentacion").value,

            diasAgua:
                document.getElementById("diasAgua").value

        });

        mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

    };


    document
    .getElementById("btnVolverConfiguracion")
    .onclick = ()=>{

        mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

    };


};