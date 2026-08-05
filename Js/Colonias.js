function mostrarColoniaDemo() {

    const colonia = Storage.obtenerDemo();

    document.getElementById("colonia").innerHTML = `

    <section class="tarjeta">

        <h2>🐜 ${colonia.nombre}</h2>

        <p><strong>Estado:</strong> ${colonia.reina.estado}</p>

        <p><strong>Especie:</strong> ${colonia.especie}</p>

        <p><strong>Fecha de captura:</strong> ${colonia.reina.fechaCaptura}</p>

        <hr>

        <h3>Población</h3>

        <p>🥚 Huevos: ${colonia.poblacion.huevos}</p>
        <p>🐛 Larvas: ${colonia.poblacion.larvas}</p>
        <p>🟤 Pupas: ${colonia.poblacion.pupas}</p>
        <p>🐜 Obreras: ${colonia.poblacion.obreras}</p>

        <br>

        <button>📷 Fotos</button>

        <button id="btnDiario">
            📖 Diario
        </button>

        <button>📊 Evolución</button>

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

                <h2>📖 Diario</h2>

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