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

        diario: [],
        fotos: [],
        alimentacion: [],
        parametros: {},
        camposPersonalizados: {}
    },

    obtenerDemo() {
        return this.coloniaDemo;
    }

};