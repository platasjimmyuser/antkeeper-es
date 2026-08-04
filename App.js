document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btnDemo");

    boton.addEventListener("click", () => {

        const colonia = Storage.obtenerDemo();
      const mostrarDiario = () => {

    document.querySelector("main").innerHTML = `

    <section class="tarjeta">

        <h2>📖 Diario - ${colonia.nombre}</h2>

        ${colonia.diario.map(entrada => `

            <article>
                <h3>${entrada.fecha} - ${entrada.titulo}</h3>
                <p>${entrada.texto}</p>
            </article>

            <hr>

        `).join("")}

        <button onclick="location.reload()">
            ⬅ Volver
        </button>

    </section>

    `;

};
      
        document.querySelector("main").innerHTML = `

        <section class="tarjeta">

            <h2>🐜 ${colonia.nombre}</h2>

            <p><strong>Estado:</strong> ${colonia.reina.estado}</p>

            <p><strong>Especie:</strong> ${colonia.especie}</p>

            <p><strong>Fecha de captura:</strong> ${colonia.reina.fechaCaptura}</p>

            <hr><br>

            <h3>Población</h3>

            <p>🥚 Huevos: ${colonia.poblacion.huevos}</p>

            <p>🐛 Larvas: ${colonia.poblacion.larvas}</p>

            <p>🟤 Pupas: ${colonia.poblacion.pupas}</p>

            <p>🐜 Obreras: ${colonia.poblacion.obreras}</p>

            <br>

            <button onclick="alert('Próximamente: Fotos')">
                📷 Fotos
            </button>

            <button id="btnDiario">
                 📖 Diario
            </button>

            <button onclick="alert('Próximamente: Evolución')">
                📊 Evolución
            </button>

            <button onclick="location.reload()">
                ⬅ Volver
            </button>

        </section>

                `;

        document
            .getElementById("btnDiario")
            .addEventListener("click", mostrarDiario);
    });

});