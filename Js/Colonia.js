window.mostrarColonia = function(colonia){


    if(!colonia){

        alert("No se encuentra la colonia");

        return;

    }



    document.getElementById("app").innerHTML = `

<section class="tarjeta">

<button id="btnVolverColonias">

⬅️ Volver a colonias

</button>

</section>
    <section class="tarjeta">


        <img

        src="${colonia.foto.portada}"

        class="foto-colonia">



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



        <button id="btnRevision">

        🔍 Revisión

        </button>



        <button id="btnAlimentacion">

        🍽 Alimentación

        </button>



        <button id="btnConfiguracion">

        ⚙️ Configurar avisos

        </button>



        <button id="btnFoto">

        📷 Fotos

        </button>

        <input
        type="file"
        id="inputFoto"
        accept="image/*"
        hidden>



        <button id="btnNuevoDiario">

        📝 Diario

        </button>



        <button id="btnModificar">

        ✏️ Modificar colonia

        </button>



        <button id="btnArchivar">

${colonia.archivada ? "♻️ Restaurar colonia" : "📦 Archivar colonia"}

</button>



        <button

        id="btnEliminar"

        style="background:#c62828;color:white">


        🗑️ Eliminar colonia


        </button>



    </section>






    <details class="tarjeta">

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






    <details class="tarjeta">

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






    <details class="tarjeta">

        <summary>🌡 Parámetros</summary>

        <br>


        <p>

        🌡 ${colonia.parametros.temperatura || "--"}

        </p>


        <p>

        💧 ${colonia.parametros.humedad || "--"}

        </p>


    </details>






    <details class="tarjeta">

        <summary>🚨 Avisos</summary>

        <br>


        ${
            colonia.avisos.filter(a=>a.activo).length === 0

            ?

            "<p>🟢 Sin avisos.</p>"

            :

            colonia.avisos

            .filter(a=>a.activo)

            .map(a=>`

                <p>${a.nivel} ${a.texto}</p>

            `).join("")

        }


    </details>






    <details class="tarjeta">

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






    <details class="tarjeta">

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



    `;

document
.getElementById("btnVolverColonias")
.onclick = ()=>{

    mostrarListaColonias();

};



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