document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btnDemo");

    boton.addEventListener("click", () => {

        document.querySelector("main").innerHTML = `

        <section class="tarjeta">

            <h2>🐜 Messor barbarus DEMO</h2>

            <p><strong>Estado:</strong> 🟢 Reina viva</p>

            <p><strong>Especie:</strong> Messor barbarus</p>

            <p><strong>Fecha de captura:</strong> 15/10/2025</p>

            <hr><br>

            <h3>Población</h3>

            <p>🥚 Huevos: 120</p>

            <p>🐛 Larvas: 45</p>

            <p>🟤 Pupas: 30</p>

            <p>🐜 Obreras: 86</p>

            <br>

            <button onclick="alert('Próximamente: Fotos')">
                📷 Fotos
            </button>

            <button onclick="alert('Próximamente: Diario')">
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

    });

});