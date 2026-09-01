window.mostrarColonia = function(colonia){


    if(!colonia){

        alert("No se encuentra la colonia");

        return;

    }


    Storage.guardarUltimaPantalla("colonia", colonia.id);


    const avisosColonia = Storage.obtenerAvisosColonia(colonia.id);


    function contenidoDiario(){

        if(colonia.diario.length === 0){
            return "<p>No hay anotaciones.</p>";
        }

        return [...colonia.diario]
        .map((entrada, indice) => ({ entrada, indice }))
        .sort((a, b) => {

            const [diaA, mesA, anioA] = a.entrada.fecha.split("/");
            const [diaB, mesB, anioB] = b.entrada.fecha.split("/");

            const fechaA = new Date(anioA, mesA - 1, diaA);
            const fechaB = new Date(anioB, mesB - 1, diaB);

            if (fechaB - fechaA !== 0) {
                return fechaB - fechaA;
            }

            return b.indice - a.indice;

        })
        .map(({entrada})=>`

            <article>
                <strong>${entrada.fecha}</strong>
                <h4>${entrada.titulo}</h4>
                <p>${entrada.texto}</p>
            </article>
            <hr>

        `).join("");

    }


    function contenidoAlimentacion(){

        return `
            <p>Última: ${colonia.alimentacion.ultima || "--"}</p>
            <p>${colonia.alimentacion.alimento || "Sin datos"}</p>
        `;

    }


    function contenidoParametros(){

        return `
            <p>🌡 ${colonia.parametros.temperatura || "--"}</p>
            <p>💧 ${colonia.parametros.humedad || "--"}</p>
        `;

    }


    function contenidoAvisos(){

        if(avisosColonia.length === 0){
            return "<p>🟢 Sin avisos.</p>";
        }

        const items = avisosColonia.map(aviso => `

            <p
            class="aviso-colonia-item"
            data-tipo="${aviso.tipo}"
            data-indice="${aviso.indice !== undefined ? aviso.indice : ""}"
            style="cursor:pointer;text-decoration:underline;">

            ${aviso.nivel} ${aviso.texto}

            </p>

        `).join("");

        return items + "<p style='font-size:12px;color:#777;'>Toca un aviso para resolverlo.</p>";

    }


    function contenidoGaleria(){

        return `
            <p style="font-size:12px;color:#777;">Toca una foto para ponerla como portada.</p>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
            ${
                (!colonia.foto.galeria || colonia.foto.galeria.length === 0)
                ?
                `<img src="${colonia.foto.portada}" style="grid-column:1/-1;width:100%;border-radius:8px;">`
                :
                colonia.foto.galeria
                .map((foto, indice) => `
                    <img
                    src="${foto.imagen}"
                    data-indice="${indice}"
                    class="foto-galeria"
                    style="width:100%;border-radius:8px;cursor:pointer;">
                `).join("")
            }
            </div>
        `;

    }


    function contenidoEvolucion(){

        return typeof generarGraficaEvolucion === "function"
            ? generarGraficaEvolucion(colonia.revisiones)
            : "<p>Gráfica no disponible.</p>";

    }


    function contenidoContador(){

        if(typeof generarPanelContador === "function"){

            return generarPanelContador(colonia);

        }

        return "<p>🔢 Próximamente: contar hormigas en una foto con IA.</p>";

    }


    const secciones = {
        diario: { icono:"📝", etiqueta:"Diario", generar: contenidoDiario, ancho:1 },
        alimentacion: { icono:"🍽", etiqueta:"Alimentación", generar: contenidoAlimentacion, ancho:1 },
        parametros: { icono:"🌡", etiqueta:"Parámetros", generar: contenidoParametros, ancho:1 },
        avisos: { icono:"🚨", etiqueta:"Avisos (" + avisosColonia.length + ")", generar: contenidoAvisos, ancho:1 },
        galeria: { icono:"📷", etiqueta:"Galería (" + (colonia.foto.galeria ? colonia.foto.galeria.length : 0) + ")", generar: contenidoGaleria, ancho:1 },
        evolucion: { icono:"📈", etiqueta:"Evolución", generar: contenidoEvolucion, ancho:1 },
        contador: { icono:"🔢", etiqueta:"Contador de hormigas", generar: contenidoContador, ancho:2 }
    };



    document.getElementById("app").innerHTML = `

    <section class="tarjeta cabecera-colonia">


        <img

        src="${colonia.foto.portada}"

        class="foto-colonia">


        <div class="info-colonia">

            <h2>🐜 ${colonia.nombre}</h2>

            <p>
            <strong>
            ${colonia.archivada ? "📦 Colonia archivada" : "🟢 Colonia activa"}
            </strong>
            </p>

            <p>

            <strong>${colonia.reina.estado}</strong>

            </p>



            <p>

            🧬 ${colonia.especie}

            </p>



            <p>

            📅 Captura:

            ${colonia.reina.fechaCaptura}

            </p>

        </div>


    </section>





    <section class="tarjeta">


        <h2>📊 Estado actual</h2>



        <div class="resumen-datos">


            <div class="widget-resumen">

                <strong>${colonia.poblacion.huevos}</strong>

                🥚 Huevos

            </div>



            <div class="widget-resumen">

                <strong>${colonia.poblacion.larvas}</strong>

                🐛 Larvas

            </div>



            <div class="widget-resumen">

                <strong>${colonia.poblacion.pupas}</strong>

                🟤 Pupas

            </div>



            <div class="widget-resumen">

                <strong>${colonia.poblacion.obreras}</strong>

                🐜 Obreras

            </div>


        </div>


    </section>





    <section class="tarjeta">


        <h2>⚡ Acciones</h2>


        <div class="acciones-grid">


            <button id="btnRevision" class="boton-accion">
                <span class="icono-accion">🔍</span>
                <span class="etiqueta-accion">Revisión</span>
            </button>


            <button id="btnAlimentacion" class="boton-accion">
                <span class="icono-accion">🍽</span>
                <span class="etiqueta-accion">Alimentación</span>
            </button>


            <button id="btnConfiguracion" class="boton-accion">
                <span class="icono-accion">⚙️</span>
                <span class="etiqueta-accion">Configurar avisos</span>
            </button>


            <button id="btnFoto" class="boton-accion">
                <span class="icono-accion">📷</span>
                <span class="etiqueta-accion">Fotos</span>
            </button>

            <input type="file" id="inputFoto" accept="image/*" hidden>


            <button id="btnNuevoDiario" class="boton-accion">
                <span class="icono-accion">📝</span>
                <span class="etiqueta-accion">Diario</span>
            </button>


            <button id="btnModificar" class="boton-accion">
                <span class="icono-accion">✏️</span>
                <span class="etiqueta-accion">Modificar</span>
            </button>


            <button id="btnArchivar" class="boton-accion" style="background:#E8791E;color:white">
                <span class="icono-accion">${colonia.archivada ? "♻️" : "📦"}</span>
                <span class="etiqueta-accion">${colonia.archivada ? "Restaurar" : "Archivar"}</span>
            </button>


            <button id="btnEliminar" class="boton-accion" style="background:#c62828;color:white">
                <span class="icono-accion">🗑️</span>
                <span class="etiqueta-accion">Eliminar</span>
            </button>


        </div>


    </section>




    <section class="grupo-desplegables">

        ${
            Object.keys(secciones).map(clave => `

                <button
                class="fila-desplegable"
                data-seccion="${clave}"
                ${secciones[clave].ancho === 2 ? 'style="grid-column:1/-1;"' : ''}>
                    <span class="flecha-desplegable">▶</span>
                    <span>${secciones[clave].icono} ${secciones[clave].etiqueta}</span>
                </button>

            `).join("")
        }

    </section>


    <div id="contenidoDesplegableWrap"></div>



    `;



    document.getElementById("btnRevision")
.onclick = ()=>{

    mostrarRevision(colonia);

};





    document.getElementById("btnAlimentacion")

    .onclick = ()=>{

        if(typeof mostrarCuidados === "function"){

            mostrarCuidados(colonia);

        }else{

            alert("Módulo Cuidados no disponible");

        }

    };





    document.getElementById("btnConfiguracion")

    .onclick = ()=>{

        if(typeof mostrarConfiguracion === "function"){

            mostrarConfiguracion(colonia);

        }else{

            alert("Módulo Configuración no disponible");

        }

    };



    document.getElementById("btnFoto")

    .onclick = ()=>{

        document.getElementById("inputFoto").click();

    };



    document.getElementById("inputFoto")

    .onchange = (evento)=>{

        const archivo = evento.target.files[0];

        if(!archivo){
            return;
        }

        comprimirImagen(archivo, 800, 0.7, (base64)=>{

            Storage.agregarFotoGaleria(colonia.id, base64);

            mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

        });

    };





    document.getElementById("btnNuevoDiario")

    .onclick = ()=>{

        if(typeof mostrarFormularioDiario === "function"){

            mostrarFormularioDiario(colonia);

        }else{

            alert("Módulo Diario no disponible");

        }

    };





    document.getElementById("btnModificar")

    .onclick = ()=>{


        if(typeof mostrarFormularioColonia === "function"){

            mostrarFormularioColonia(colonia);

        }

        else{

            alert("Formulario de modificación no disponible");

        }


    };





    document
.getElementById("btnArchivar")
.onclick = ()=>{


    if(colonia.archivada){


        if(confirm("¿Restaurar esta colonia?")){


            Storage.restaurarColonia(colonia.id);


            mostrarListaColonias();


        }


    }else{


        if(confirm("¿Archivar esta colonia?")){


            Storage.archivarColonia(colonia.id);


            mostrarListaColonias();


        }


    }


};





    document.getElementById("btnEliminar")

    .onclick = ()=>{


        if(confirm("¿Eliminar esta colonia definitivamente?")){


            Storage.eliminarColonia(colonia.id);


            mostrarListaColonias();


        }


    };



    let seccionAbierta = null;


    function activarListenersContenido(clave){

        const contenedor = document.getElementById("contenidoDesplegableWrap");


        if(clave === "galeria"){

            contenedor

            .querySelectorAll(".foto-galeria")

            .forEach(img=>{

                img.addEventListener("click", ()=>{

                    const indice = img.dataset.indice;

                    const foto = colonia.foto.galeria[indice];

                    if(confirm("¿Poner esta foto como portada de la colonia?")){

                        Storage.establecerPortada(colonia.id, foto.imagen);

                        mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

                    }

                });

            });

        }


        if(clave === "avisos"){

            contenedor

            .querySelectorAll(".aviso-colonia-item")

            .forEach(el => {

                el.addEventListener("click", () => {

                    const tipo = el.dataset.tipo;

                    if(tipo === "revision"){

                        mostrarRevision(colonia);

                        return;

                    }

                    if(tipo === "alimentacion" || tipo === "agua"){

                        if(typeof mostrarCuidados === "function"){

                            mostrarCuidados(colonia);

                        }

                        return;

                    }

                    if(tipo === "manual"){

                        const indice = Number(el.dataset.indice);

                        if(confirm("¿Marcar este aviso como resuelto?")){

                            Storage.eliminarAvisoManual(colonia.id, indice);

                            mostrarColonia(Storage.obtenerColoniaPorId(colonia.id));

                        }

                        return;

                    }

                });

            });

        }


        if(clave === "contador" && typeof activarListenersContador === "function"){

            activarListenersContador(colonia);

        }

    }



    document

    .querySelectorAll(".fila-desplegable")

    .forEach(boton => {

        boton.addEventListener("click", () => {

            const clave = boton.dataset.seccion;

            const wrap = document.getElementById("contenidoDesplegableWrap");


            if(seccionAbierta === clave){

                wrap.innerHTML = "";

                boton.classList.remove("activo");

                boton.querySelector(".flecha-desplegable").textContent = "▶";

                seccionAbierta = null;

                return;

            }


            document

            .querySelectorAll(".fila-desplegable")

            .forEach(b => {

                b.classList.remove("activo");

                b.querySelector(".flecha-desplegable").textContent = "▶";

            });


            boton.classList.add("activo");

            boton.querySelector(".flecha-desplegable").textContent = "▼";


            wrap.innerHTML = `<section class="tarjeta">${secciones[clave].generar()}</section>`;

            seccionAbierta = clave;


            activarListenersContenido(clave);


            wrap.scrollIntoView({ behavior:"smooth", block:"nearest" });

        });

    });



};