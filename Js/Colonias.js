function mostrarColoniaDemo() {

    const colonia = Storage.obtenerDemo();

    document.getElementById("colonia").innerHTML = `

    <section class="tarjeta">

        <h2>🐜 ${colonia.nombre}</h2>

        <p><strong>${colonia.reina.estado}</strong></p>

        <p>🧬 Especie: ${colonia.especie}</p>

        <p>📅 Captura: ${colonia.reina.fechaCaptura}</p>


        <hr>

        <h3>📊 Población</h3>

        <p>🥚 Huevos: ${colonia.poblacion.huevos}</p>
        <p>🐛 Larvas: ${colonia.poblacion.larvas}</p>
        <p>🟤 Pupas: ${colonia.poblacion.pupas}</p>
        <p>🐜 Obreras: ${colonia.poblacion.obreras}</p>


        <hr>

        <h3>📝 Estado actual</h3>

        <p>
        📅 Última revisión:
        ${colonia.revision.ultima}
        </p>

        <p>
        🍽 Alimentación:
        ${colonia.alimentacion.alimento}
        </p>


        <hr>

        <h3>🌡 Parámetros</h3>

        <p>
        🌡 Temperatura:
        ${colonia.parametros.temperatura}
        </p>

        <p>
        💧 Humedad:
        ${colonia.parametros.humedad}
        </p>


        <hr>

        <h3>🔔 Avisos</h3>

        ${colonia.avisos.map(aviso => `

            <p>${aviso}</p>

        `).join("")}


        <hr>

        <h3>🛠 Módulos</h3>

        <button>
            📷 Fotos
        </button>

        <button id="btnDiario">
            📖 Diario
        </button>

        <button>
            📊 Evolución
        </button>

        <button>
            🍽 Alimentación
        </button>

        <button>
            🌡 Parámetros
        </button>


        <br><br>

        <button onclick="history.back()">
            ⬅ Volver
        </button>


    </section>

    `;


    document
        .getElementById("btnDiario")
        .addEventListener("click", () => {

            document.getElementById("colonia").innerHTML = `

            <section class="tarjeta">

                <h2>📖 Diario - ${colonia.nombre}</h2>


                ${colonia.diario.map(entrada => `

                    <article>

                        <h3>${entrada.fecha}</h3>

                        <strong>${entrada.titulo}</strong>

                        <p>${entrada.texto}</p>

                    </article>

                    <hr>

                `).join("")}


                <button onclick="mostrarColoniaDemo()">
                    ⬅ Volver a colonia
                </button>


            </section>

            `;

        });

}