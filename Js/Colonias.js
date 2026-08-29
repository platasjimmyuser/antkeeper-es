window.mostrarListaColonias = function(){

Storage.guardarUltimaPantalla("colonias");
    const activas = Storage.obtenerColonias();

    const archivadas = Storage.obtenerColoniasArchivadas();



    document.getElementById("app").innerHTML = `


<section class="tarjeta">


<h2>🟢 Colonias activas</h2>



${
    activas.length === 0

    ?

    "<p>No hay colonias activas.</p>"

    :

    activas.map(colonia=>`

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


        </div>


    </article>


    `).join("")

}



</section>





<section class="tarjeta">


<h2>📦 Colonias archivadas</h2>



${
    archivadas.length === 0

    ?

    "<p>No hay colonias archivadas.</p>"

    :

    archivadas.map(colonia=>`

    <article

    class="colonia-card archivada"

    data-id="${colonia.id}">


        <h3>

        ${colonia.nombre}

        </h3>


        <p>

        🧬 ${colonia.especie}

        </p>


        <p>

        📦 Archivada

        </p>


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


        mostrarColonia(colonia);


    });


});


};