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

        revisiones: [],

        fotos: [],

        foto: {
            portada: "../Assets/Images/messor-demo.jpg",
            galeria: []
        },

        alimentacion: {
            ultima: "03/08/2026",
            alimento: "Semillas y proteína"
        },

        parametros: {
            temperatura: "25,3 ºC",
            humedad: "62 %"
        },

        camposPersonalizados: {},

        avisos: [
            "🟢 Colonia estable",
            "🍽 Revisar alimentación próximamente"
        ],

        revision: {
            ultima: "05/08/2026",
            notas: "Revisión general de la colonia."
        }
    },


    obtenerDemo() {
        return this.coloniaDemo;
    },


    guardarRevision(colonia, datos) {

        const fecha = datos.fecha;

        // 1. Actualizar población
        colonia.poblacion.huevos = datos.huevos;
        colonia.poblacion.larvas = datos.larvas;
        colonia.poblacion.pupas = datos.pupas;
        colonia.poblacion.obreras = datos.obreras;


        // 2. Actualizar estado de la reina
        colonia.reina.estado = datos.estadoReina;


        // 3. Actualizar fecha de última revisión
        colonia.revision.ultima = fecha;


        // 4. Actualizar notas de la revisión
        colonia.revision.notas = datos.notas;


        // 5. Crear objeto de revisión
        const nuevaRevision = {
            fecha: fecha,
            estadoReina: datos.estadoReina,
            huevos: datos.huevos,
            larvas: datos.larvas,
            pupas: datos.pupas,
            obreras: datos.obreras,
            notas: datos.notas
        };


        // 6. Añadir al historial
        if (!Array.isArray(colonia.revisiones)) {
            colonia.revisiones = [];
        }

        colonia.revisiones.push(nuevaRevision);


        // 7. Crear entrada automática en el diario
        const nuevaEntrada = {
            fecha: fecha,
            titulo: "Revisión de la colonia",
            texto:
                `Revisión realizada. ` +
                `Huevos: ${datos.huevos}. ` +
                `Larvas: ${datos.larvas}. ` +
                `Pupas: ${datos.pupas}. ` +
                `Obreras: ${datos.obreras}. ` +
                `Estado de la reina: ${datos.estadoReina}.` +
                (datos.notas
                    ? ` Notas: ${datos.notas}`
                    : "")
        };


        colonia.diario.push(nuevaEntrada);


        // 8. Guardar datos en localStorage
        try {

            localStorage.setItem(
                "antkeeper_colonia_demo",
                JSON.stringify(colonia)
            );

        } catch (error) {

            console.error(
                "No se pudieron guardar los datos:",
                error
            );

        }


        // 9. Devolver la colonia actualizada
        return colonia;
    },


    cargarDemoGuardada() {

        try {

            const datosGuardados =
                localStorage.getItem("antkeeper_colonia_demo");

            if (datosGuardados) {

                return JSON.parse(datosGuardados);

            }

        } catch (error) {

            console.error(
                "Error cargando la colonia guardada:",
                error
            );

        }

        return null;
    }

};