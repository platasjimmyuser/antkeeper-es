function mostrarInicio(){


    const avisos = Storage.obtenerAvisos();

    const colonias = Storage.obtenerColonias();



    document.getElementById("app").innerHTML = `


    <section class="tarjeta resumen">


        <h2>🏠 Escritorio</h2>



        <div class="resumen-datos">


            <div class="widget-resumen" id="widgetColonias">

                <strong>${colonias.length}</strong>

                <span>🐜 Colonias</span>

            </div>



            <div class="widget-resumen" id="widgetReinas">

                <strong>${colonias.length}</strong>

                <span>👑 Reinas</span>

            </div>



            <div class="widget-resumen" id="widgetAvisos">

                <strong>${avisos.length}</strong>

                <span>🚨 Avisos</span>

            </div>


        </div>


    </section>





    <section class="tarjeta">


        <h2>🚨 Atención necesaria</h2>



        ${
            avisos.length === 0

            ?

            "<p>🟢 No hay avisos pendientes.</p>"

            :

            avisos.map(aviso=>`


                <article

                class="aviso aviso-amarillo"

                data-aviso="${aviso.id}"

                data-colonia="${aviso.coloniaId}">


                    <h3>

                    ${aviso.nivel} ${aviso.colonia}

                    </h3>


                    <p>

                    ${aviso.texto}

                    </p>


                </article>


            `).join("")

        }


    </section>





    <section class="tarjeta">


        <h2>🐜 Mis colonias</h2>



        ${
            colonias.length === 0

            ?

            "<p>No hay colonias creadas.</p>"

            :

            colonias.map(colonia=>`


            <article

            class="colonia-card"

            data-id="${colonia.id}">


                <img

                src="${colonia.foto.portada}"

                class="mini-foto">


                <div>


                    <h3>

                    ${colonia.nombre}

                    </h3>


                    <p>

                    🧬 ${colonia.especie}

                    </p>


                    <p>

                    ${colonia.reina.estado}

                    </p>


                    <p>

                    🐜 Obreras:

                    ${colonia.poblacion.obreras}

                    </p>


                </div>


            </article>


            `).join("")

        }


    </section>



    `;





    document

    .querySelectorAll(".colonia-card")

    .forEach(card=>{


        card.addEventListener("click",()=>{


            const colonia = Storage.obtenerColoniaPorId(

                card.dataset.id

            );


            if(typeof mostrarColonia === "function"){


                mostrarColonia(colonia);


            }


        });


    });





    document

    .querySelectorAll(".aviso")

    .forEach(aviso=>{


        aviso.addEventListener("click",()=>{


            const colonia = Storage.obtenerColoniaPorId(

                aviso.dataset.colonia

            );


            if(typeof mostrarColonia === "function"){


                mostrarColonia(colonia);


            }


        });


    });





    document

    .getElementById("widgetColonias")

    ?.addEventListener("click",()=>{


        mostrarListaColonias();


    });





    document

    .getElementById("widgetAvisos")

    ?.addEventListener("click",()=>{


        document

        .querySelector(".aviso")

        ?.scrollIntoView({

            behavior:"smooth"

        });


    });



}