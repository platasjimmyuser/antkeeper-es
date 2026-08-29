function mostrarRevision(colonia){

    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2,"0");
    const dia = String(hoy.getDate()).padStart(2,"0");

    const fechaHoyISO = anio + "-" + mes + "-" + dia;


    document.getElementById("app").innerHTML = `

    <section class="tarjeta">

        <h2>🔍 Nueva revisión</h2>

        <p><strong>${colonia.nombre}</strong></p>

        <label>📅 Fecha</label>
        <br>
        <input type="date" id="fechaRevision" value="${fechaHoyISO}">

        <hr>

        <label>Estado de la reina</label>

        <select id="estadoReina">

            <option>🟢 Reina viva</option>

            <option>🟡 Reina débil</option>

            <option>🔴 Reina muerta</option>

        </select>

        <br><br>

        <label>🥚 Huevos</label>
        <input type="number" id="huevos" value="${colonia.poblacion.huevos}">

        <br><br>

        <label>🐛 Larvas</label>
        <input type="number" id="larvas" value="${colonia.poblacion.larvas}">

        <br><br>

        <label>🟤 Pupas</label>
        <input type="number" id="pupas" value="${colonia.poblacion.pupas}">

        <br><br>

        <label>🐜 Obreras</label>
        <input type="number" id="obreras" value="${colonia.poblacion.obreras}">

        <br><br>

        <label>🌡 Temperatura</label>
        <input type="text" id="temperatura"
        value="${colonia.parametros.temperatura}">

        <br><br>

        <label>💧 Humedad</label>
        <input type="text" id="humedad"
        value="${colonia.parametros.humedad}">

        <br><br>

        <label>📝 Observaciones</label>

        <textarea
        id="notas"
        rows="5"></textarea>

        <br><br>

        <button id="guardarRevision">

        💾 Guardar revisión

        </button>

        <button id="cancelarRevision">

        ❌ Cancelar

        </button>

    </section>

    `;



    document
    .getElementById("cancelarRevision")
    .onclick = ()=>{

        mostrarColonia(colonia);

    };



    document
    .getElementById("guardarRevision")
.onclick = ()=>{


    const fechaISO =
        document.getElementById("fechaRevision").value;

    if(fechaISO === ""){

        alert("Selecciona una fecha.");

        return;

    }

    const fecha = Storage.convertirISOaFecha(fechaISO);


    const revision = {

        fecha: fecha,

        estadoReina:
        document.getElementById("estadoReina").value,


        huevos:
        Number(document.getElementById("huevos").value),


        larvas:
        Number(document.getElementById("larvas").value),


        pupas:
        Number(document.getElementById("pupas").value),


        obreras:
        Number(document.getElementById("obreras").value),


        temperatura:
        document.getElementById("temperatura").value,


        humedad:
        document.getElementById("humedad").value,


        notas:
        document.getElementById("notas").value

    };



    Storage.agregarRevision(

        colonia.id,

        revision

    );



        mostrarColonia(

        Storage.obtenerColoniaPorId(colonia.id)

    );


};

}