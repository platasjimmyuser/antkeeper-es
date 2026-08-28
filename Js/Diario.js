window.mostrarFormularioDiario = function(colonia){

    const hoy = new Date();

    const fechaHoy =
        String(hoy.getDate()).padStart(2,"0") + "/" +
        String(hoy.getMonth()+1).padStart(2,"0") + "/" +
        hoy.getFullYear();


    document.getElementById("app").innerHTML = `

    <section class="tarjeta">

        <button id="btnVolverDiario">

        ⬅️ Volver

        </button>

    </section>

    <section class="tarjeta">

        <h2>📝 Nueva anotación</h2>

        <p><strong>${colonia.nombre}</strong></p>

        <hr>

        <label>📅 Fecha</label>
        <br>
        <input type="text" id="fechaDiario" maxlength="10" value="${fechaHoy}">

        <br><br>

        <label>Título</label>
        <br>
        <input type="text" id="tituloDiario" placeholder="Ej: Cambio de hormiguero">

        <br><br>

        <label>Texto</label>
        <br>
        <textarea id="textoDiario" rows="5" placeholder="Escribe aquí lo que quieras anotar..."></textarea>

        <br><br>

        <button id="guardarDiario">

        💾 Guardar anotación

        </button>

        <button id="cancelarDiario">

        ❌ Cancelar

        </button>

    </section>

    `;


    document
    .getElementById("cancelarDiario")
    .onclick = ()=>{

        mostrarColonia(colonia);

    };


    document
    .getElementById("guardarDiario")
    .onclick = ()=>{

        const fecha =
            document.getElementById("fechaDiario").value.trim();

        const titulo =
            document.getElementById("tituloDiario").value.trim();

        const texto =
            document.getElementById("textoDiario").value.trim();

        const formato = /^\d{2}\/\d{2}\/\d{4}$/;

        if(!formato.test(fecha)){

            alert("La fecha debe tener formato dd/mm/aaaa");

            return;

        }

        if(titulo === "" && texto === ""){

            alert("Escribe al menos un título o un texto.");

            return;

        }

        Storage.agregarEntradaDiario(colonia.id, {

            fecha: fecha,

            titulo: titulo || "📝 Anotación",

            texto: texto

        });

        mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

    };


};