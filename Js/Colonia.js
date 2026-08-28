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



        <button id="btnNuevaFoto">

        📷 Añadir foto

        </button>



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

        <summary>📷 Galería</summary>

        <br>


        <img

        src="${colonia.foto.portada}"

        class="foto-colonia">


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





    document.getElementById("btnNuevaFoto")

    .onclick = ()=>{

        alert("Módulo Fotos próximamente");

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



};