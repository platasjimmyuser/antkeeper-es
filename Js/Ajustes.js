window.mostrarPantallaAjustes = function(){
Storage.guardarUltimaPantalla("ajustes");
    document.getElementById("app").innerHTML = `

    <section class="tarjeta">

        <h2>⚙️ Ajustes</h2>

        <p>Configuración de AntKeeper ES</p>

    </section>


    <section class="tarjeta">

        <h2>💾 Copia de seguridad</h2>

        <p style="font-size:12px;color:#777;">
        Tus datos se guardan solo en este dispositivo. Genera una copia de vez en cuando y guárdala en otro sitio (Notas, email...) por si acaso.
        </p>

        <button id="btnGenerarCopia">

        📤 Generar copia de seguridad

        </button>

        <br><br>

        <textarea id="textoCopia" rows="6" placeholder="Aquí aparecerá el texto de tu copia de seguridad..." readonly></textarea>

        <br><br>

        <button id="btnCopiarTexto">

        📋 Copiar al portapapeles

        </button>

        <hr>

        <p><strong>Restaurar una copia:</strong></p>

        <textarea id="textoRestaurar" rows="6" placeholder="Pega aquí el texto de una copia de seguridad..."></textarea>

        <br><br>

        <button id="btnRestaurar" style="background:#c62828;color:white">

        📥 Restaurar (sustituye tus datos actuales)

        </button>

    </section>


    <section class="tarjeta">

        <h2>🧬 Especies personalizadas</h2>

        <p style="font-size:12px;color:#777;">
        Añade especies que no estén en la lista para poder elegirlas al crear una colonia.
        </p>

        <input type="text" id="nuevaEspecie" placeholder="Ej: Aphaenogaster iberica">

        <button id="btnAnadirEspecie">

        ➕ Añadir

        </button>

        <br><br>

        <div id="listaEspeciesPersonalizadas">

        ${
            (!Storage.datos.especiesPersonalizadas || Storage.datos.especiesPersonalizadas.length === 0)

            ?

            "<p>No has añadido especies personalizadas.</p>"

            :

            Storage.datos.especiesPersonalizadas.map(especie => `

                <p>
                🧬 ${especie}
                <button class="btnEliminarEspecie" data-especie="${especie}" style="background:#c62828;color:white;">🗑️</button>
                </p>

            `).join("")

        }

        </div>

    </section>


    <section class="tarjeta">

        <h2>🗑️ Borrar todos los datos</h2>

        <p style="font-size:12px;color:#777;">
        Elimina todas las colonias y datos guardados en este dispositivo. No se puede deshacer.
        </p>

        <button id="btnBorrarTodo" style="background:#c62828;color:white">

        🗑️ Borrar todos los datos

        </button>

    </section>


    <section class="tarjeta">

        <h2>ℹ️ Información</h2>

        <p>🐜 AntKeeper ES</p>

        <p>Versión 1.0</p>

        <p><a href="https://github.com/platasjimmyuser/antkeeper-es" target="_blank">Ver repositorio en GitHub</a></p>

    </section>

    `;


    document.getElementById("btnGenerarCopia").onclick = ()=>{

        document.getElementById("textoCopia").value = Storage.exportarDatos();

    };


    document.getElementById("btnCopiarTexto").onclick = ()=>{

        const texto = document.getElementById("textoCopia").value;

        if(!texto){
            alert("Primero genera la copia de seguridad.");
            return;
        }

        navigator.clipboard.writeText(texto)
        .then(()=>{
            alert("Copiado al portapapeles.");
        })
        .catch(()=>{
            alert("No se pudo copiar automáticamente. Selecciona el texto manualmente.");
        });

    };


    document.getElementById("btnRestaurar").onclick = ()=>{

        const texto = document.getElementById("textoRestaurar").value.trim();

        if(texto === ""){
            alert("Pega primero el texto de una copia de seguridad.");
            return;
        }

        if(!confirm("Esto sustituirá TODOS tus datos actuales por los de la copia. ¿Continuar?")){
            return;
        }

        const exito = Storage.importarDatos(texto);

        if(exito){
            alert("Datos restaurados correctamente.");
            mostrarPantallaAjustes();
        }else{
            alert("El texto no es una copia de seguridad válida.");
        }

    };


    document.getElementById("btnAnadirEspecie").onclick = ()=>{

        const nombre = document.getElementById("nuevaEspecie").value.trim();

        if(nombre === ""){
            alert("Escribe un nombre de especie.");
            return;
        }

        const exito = Storage.agregarEspeciePersonalizada(nombre);

        if(exito){
            mostrarPantallaAjustes();
        }else{
            alert("Esa especie ya existe en la lista.");
        }

    };


    document

    .querySelectorAll(".btnEliminarEspecie")

    .forEach(boton => {

        boton.addEventListener("click", ()=>{

            const especie = boton.dataset.especie;

            if(confirm("¿Eliminar la especie \"" + especie + "\"?")){

                Storage.eliminarEspeciePersonalizada(especie);

                mostrarPantallaAjustes();

            }

        });

    });


    document.getElementById("btnBorrarTodo").onclick = ()=>{

        if(!confirm("Esto eliminará TODAS tus colonias y datos guardados. No se puede deshacer. ¿Seguro?")){
            return;
        }

        if(!confirm("Última confirmación: se borrará todo. ¿Continuar?")){
            return;
        }

        Storage.borrarTodo();

    };


};