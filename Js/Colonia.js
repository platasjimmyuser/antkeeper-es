window.mostrarColonia = function(colonia){


    if(!colonia){

        alert("No se encuentra la colonia");

        return;

    }


    Storage.guardarUltimaPantalla("colonia", colonia.id);


    const avisosColonia = Storage.obtenerAvisosColonia(colonia.id);



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


        <details>

            <summary>📝 Diario</summary>

            <br>


            ${
        colonia.diario.length === 0

        ?

        "<p>No hay anotaciones.</p>"

        :

        [...colonia.diario]

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


                `).join("")

            }


        </details>



        <details>

            <summary>🍽 Alimentación</summary>

            <br>


            <p>

            Última:

            ${colonia.alimentacion.ultima || "--"}

            </p>


            <p>

            ${colonia.alimentacion.alimento || "Sin datos"}

            </p>


        </details>



        <details>

            <summary>🌡 Parámetros</summary>

            <br>


            <p>

            🌡 ${colonia.parametros.temperatura || "--"}

            </p>


            <p>

            💧 ${colonia.parametros.humedad || "--"}

            </p>


        </details>



        <details>

            <summary>🚨 Avisos (${avisosColonia.length})</summary>

            <br>


            ${
                avisosColonia.length === 0

                ?

                "<p>🟢 Sin avisos.</p>"

                :

                avisosColonia.map(aviso => `

                    <p
                    class="aviso-colonia-item"
                    data-tipo="${aviso.tipo}"
                    data-indice="${aviso.indice !== undefined ? aviso.indice : ""}"
                    style="cursor:pointer;text-decoration:underline;">

                    ${aviso.nivel} ${aviso.texto}

                    </p>

                `).join("")

            }

            ${
                avisosColonia.length > 0
                ?
                "<p style='font-size:12px;color:#777;'>Toca un aviso para resolverlo.</p>"
                :
                ""
            }


        </details>



        <details>

            <summary>📷 Galería (${colonia.foto.galeria ? colonia.foto.galeria.length : 0})</summary>

            <br>

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

        </details>



        <details>

            <summary>📈 Evolución</summary>

            <br>


            ${
                typeof generarGraficaEvolucion === "function"

                ?

                generarGraficaEvolucion(colonia.revisiones)

                :

                "<p>Gráfica no disponible.</p>"

            }


        </details>


    </section>



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



    document

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



    document

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



};