const Storage = {

    coloniaDemo: {
        id: "demo-001",
        nombre: "Messor barbarus DEMO",
        especie: "Messor barbarus",

        reina: {
            estado: "🟢 Reina viva",
            fechaCaptura: "15/10/2025"
        },

        poblacion: {
            huevos: 120,
            larvas: 45,
            pupas: 30,
            obreras: 86
        },

        diario: [
    {
        fecha: "15/10/2025",
        titulo: "Captura de la reina",
        texto: "Reina Messor barbarus capturada. Inicio de colonia DEMO."
    },
    {
        fecha: "20/10/2025",
        titulo: "Primeros huevos",
        texto: "La reina ha comenzado la puesta."
    },
    {
        fecha: "05/11/2025",
        titulo: "Primeras larvas",
        texto: "Aparecen las primeras larvas de la colonia."
    },
    {
        fecha: "01/12/2025",
        titulo: "Primeras obreras",
        texto: "Nacen las primeras obreras de la colonia."
    }
],
        fotos: [],
        alimentacion: [],
        parametros: {},
        camposPersonalizados: {}
    },

    obtenerDemo() {
        return this.coloniaDemo;
    }

};