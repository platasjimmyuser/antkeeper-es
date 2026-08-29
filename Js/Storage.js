const Storage = {

clave: "antkeeper_datos",

datos: {
    colonias: [],
    especiesPersonalizadas: []
},


// ==========================================
// INICIAR
// ==========================================

iniciar() {

    try {

        const guardado =
            localStorage.getItem(this.clave);

        if (guardado) {

            const datos =
                JSON.parse(guardado);

            if (
                datos &&
                Array.isArray(datos.colonias)
            ) {

                this.datos = datos;

            } else {

                this.datos = {
                    colonias: [],
                    especiesPersonalizadas: []
                };

            }

        } else {

            this.datos = {
                colonias: [],
                especiesPersonalizadas: []
            };

        }

    } catch (error) {

        console.error(
            "Error iniciando Storage:",
            error
        );

        this.datos = {
            colonias: [],
            especiesPersonalizadas: []
        };

    }


    if (!Array.isArray(this.datos.especiesPersonalizadas)) {

        this.datos.especiesPersonalizadas = [];

    }


    if (this.datos.colonias.length === 0) {

        this.crearDemo();

    }

},


// ==========================================
// GUARDAR
// ==========================================

guardar() {

    try {

        localStorage.setItem(
            this.clave,
            JSON.stringify(this.datos)
        );

    } catch (error) {

        console.error(
            "Error guardando los datos:",
            error
        );

    }

},


// ==========================================
// CREAR COLONIA DEMO
// ==========================================

crearDemo() {

    const demo = {

        id: "demo-001",

        nombre: "Messor barbarus DEMO",

        especie: "Messor barbarus",

        foto: {

            portada:
                "Assets/Images/messor-demo.jpg",

            galeria: []

        },

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

                texto:
                    "Reina Messor barbarus capturada. Inicio de colonia DEMO."

            },

            {

                fecha: "20/10/2025",

                titulo: "Primeros huevos",

                texto:
                    "La reina ha comenzado la puesta."

            },

            {

                fecha: "05/11/2025",

                titulo: "Primeras larvas",

                texto:
                    "Aparecen las primeras larvas de la colonia."

            },

            {

                fecha: "01/12/2025",

                titulo: "Primeras obreras",

                texto:
                    "Nacen las primeras obreras de la colonia."

            }

        ],

        revisiones: [],

        revision: {

            ultima: "05/08/2026",

            notas:
                "Revisión general de la colonia."

        },

        alimentacion: {

            ultima: "03/08/2026",

            alimento:
                "Semillas y proteína"

        },

        agua: {

            ultima: "20/08/2026"

        },

        parametros: {

            temperatura: "25,3 ºC",

            humedad: "62 %"

        },

        configuracion: {

            diasRevision: 15,

            diasAlimentacion: 7,

            diasAgua: 3

        },

        avisos: [],

        archivada: false

    };


    this.datos.colonias.push(demo);

    this.guardar();

},


// ==========================================
// OBTENER COLONIAS ACTIVAS
// ==========================================

obtenerColonias() {

    return this.datos.colonias.filter(
        colonia => !colonia.archivada
    );

},


// ==========================================
// OBTENER COLONIAS ARCHIVADAS
// ==========================================

obtenerColoniasArchivadas() {

    return this.datos.colonias.filter(
        colonia => colonia.archivada
    );

},


// ==========================================
// OBTENER COLONIA POR ID
// ==========================================

obtenerColoniaPorId(id) {

    return this.datos.colonias.find(
        colonia => colonia.id === id
    );

},


// ==========================================
// AÑADIR COLONIA
// ==========================================

agregarColonia(colonia) {

    this.datos.colonias.push(colonia);

    this.guardar();

    return colonia;

},


// ==========================================
// ARCHIVAR
// ==========================================

archivarColonia(id) {

    const colonia =
        this.obtenerColoniaPorId(id);

    if (!colonia) {

        return false;

    }

    colonia.archivada = true;

    this.guardar();

    return true;

},


// ==========================================
// RESTAURAR
// ==========================================

restaurarColonia(id) {

    const colonia =
        this.obtenerColoniaPorId(id);

    if (!colonia) {

        return false;

    }

    colonia.archivada = false;

    this.guardar();

    return true;

},


// ==========================================
// ELIMINAR
// ==========================================

eliminarColonia(id) {

    this.datos.colonias =
        this.datos.colonias.filter(
            colonia => colonia.id !== id
        );

    this.guardar();

    return true;

},


// ==========================================
// ESPECIES PERSONALIZADAS
// ==========================================

agregarEspeciePersonalizada(nombre) {

    const limpio = (nombre || "").trim();

    if (limpio === "") {
        return false;
    }

    if (!Array.isArray(this.datos.especiesPersonalizadas)) {
        this.datos.especiesPersonalizadas = [];
    }

    const yaExiste =
        this.datos.especiesPersonalizadas.includes(limpio) ||
        (typeof ESPECIES !== "undefined" && ESPECIES.includes(limpio));

    if (yaExiste) {
        return false;
    }

    this.datos.especiesPersonalizadas.push(limpio);

    this.guardar();

    return true;

},


eliminarEspeciePersonalizada(nombre) {

    if (!Array.isArray(this.datos.especiesPersonalizadas)) {
        return false;
    }

    this.datos.especiesPersonalizadas =
        this.datos.especiesPersonalizadas.filter(e => e !== nombre);

    this.guardar();

    return true;

},


obtenerTodasEspecies() {

    const base = (typeof ESPECIES !== "undefined") ? ESPECIES : [];

    const personalizadas =
        Array.isArray(this.datos.especiesPersonalizadas)
            ? this.datos.especiesPersonalizadas
            : [];

    return [...base, ...personalizadas].sort();

},


// ==========================================
// COPIA DE SEGURIDAD
// ==========================================

exportarDatos() {

    return JSON.stringify(this.datos, null, 2);

},


importarDatos(jsonTexto) {

    try {

        const datos = JSON.parse(jsonTexto);

        if (!datos || !Array.isArray(datos.colonias)) {
            return false;
        }

        if (!Array.isArray(datos.especiesPersonalizadas)) {
            datos.especiesPersonalizadas = [];
        }

        this.datos = datos;

        this.guardar();

        return true;

    } catch (error) {

        console.error("Error importando datos:", error);

        return false;

    }

},


// ==========================================
// BORRAR TODOS LOS DATOS
// ==========================================

borrarTodo() {

    localStorage.removeItem(this.clave);

    location.reload();

},

// ==========================================
// RECORDAR ÚLTIMA PANTALLA (sobrevive al refresco)
// ==========================================

guardarUltimaPantalla(tipo, id) {

    try {

        sessionStorage.setItem("antkeeper_ultima_pantalla", JSON.stringify({
            tipo: tipo,
            id: id || null
        }));

    } catch (error) {

        console.error("Error guardando última pantalla:", error);

    }

},


obtenerUltimaPantalla() {

    try {

        const guardado = sessionStorage.getItem("antkeeper_ultima_pantalla");

        if (!guardado) {
            return null;
        }

        return JSON.parse(guardado);

    } catch (error) {

        return null;

    }

},
// ==========================================
// CONVERSIÓN DE FECHAS (calendario nativo)
// ==========================================

convertirFechaaISO(fechaDDMMYYYY) {

    if (!fechaDDMMYYYY) {
        return "";
    }

    const partes = fechaDDMMYYYY.split("/");

    if (partes.length !== 3) {
        return "";
    }

    const dia = partes[0].padStart(2, "0");
    const mes = partes[1].padStart(2, "0");
    const anio = partes[2];

    return anio + "-" + mes + "-" + dia;

},


convertirISOaFecha(fechaISO) {

    if (!fechaISO) {
        return "";
    }

    const partes = fechaISO.split("-");

    if (partes.length !== 3) {
        return "";
    }

    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return dia + "/" + mes + "/" + anio;

},


// ==========================================
// CALCULAR DÍAS DESDE UNA FECHA
// ==========================================

diasDesde(fechaTexto) {

    if (!fechaTexto) {
        return null;
    }

    const partes = fechaTexto.split("/");

    if (partes.length !== 3) {
        return null;
    }

    const fecha = new Date(
        Number(partes[2]),
        Number(partes[1]) - 1,
        Number(partes[0])
    );

    const hoy = new Date();

    const diferencia = hoy - fecha;

    return Math.floor(diferencia / (1000 * 60 * 60 * 24));

},


// ==========================================
// AVISOS AUTOMÁTICOS DE MANTENIMIENTO
// ==========================================

calcularAvisosMantenimiento(colonia) {

    const avisos = [];

    const config = colonia.configuracion || {};

    const DIAS_MAX_REVISION = config.diasRevision ?? 15;
    const DIAS_MAX_ALIMENTACION = config.diasAlimentacion ?? 7;
    const DIAS_MAX_AGUA = config.diasAgua ?? 3;


    const diasRevision = this.diasDesde(colonia.revision?.ultima);

    if (diasRevision !== null && diasRevision > DIAS_MAX_REVISION) {

        avisos.push({
            id: colonia.id + "-auto-revision",
            coloniaId: colonia.id,
            colonia: colonia.nombre,
            nivel: "🔍",
            texto: "Llevan " + diasRevision + " días sin revisión."
        });

    }


    const diasAlimentacion = this.diasDesde(colonia.alimentacion?.ultima);

    if (diasAlimentacion !== null && diasAlimentacion > DIAS_MAX_ALIMENTACION) {

        avisos.push({
            id: colonia.id + "-auto-alimentacion",
            coloniaId: colonia.id,
            colonia: colonia.nombre,
            nivel: "🍽",
            texto: "Llevan " + diasAlimentacion + " días sin alimentar."
        });

    }


    const diasAgua = this.diasDesde(colonia.agua?.ultima);

    if (diasAgua !== null && diasAgua > DIAS_MAX_AGUA) {

        avisos.push({
            id: colonia.id + "-auto-agua",
            coloniaId: colonia.id,
            colonia: colonia.nombre,
            nivel: "💧",
            texto: "Llevan " + diasAgua + " días sin agua."
        });

    }


    return avisos;

},


// ==========================================
// OBTENER AVISOS
// ==========================================

obtenerAvisos() {

    const avisos = [];


    this.obtenerColonias()
    .forEach(colonia => {

        this.calcularAvisosMantenimiento(colonia)
        .forEach(aviso => avisos.push(aviso));


        if (!Array.isArray(colonia.avisos)) {

            return;

        }


        colonia.avisos
        .forEach((aviso, indice) => {

            if (
                typeof aviso === "string"
            ) {

                avisos.push({

                    id:
                        colonia.id +
                        "-aviso-" +
                        indice,

                    coloniaId:
                        colonia.id,

                    colonia:
                        colonia.nombre,

                    nivel: "🚨",

                    texto: aviso

                });

                return;

            }


            if (
                aviso &&
                aviso.activo !== false
            ) {

                avisos.push({

                    id:
                        aviso.id ||
                        colonia.id +
                        "-aviso-" +
                        indice,

                    coloniaId:
                        colonia.id,

                    colonia:
                        colonia.nombre,

                    nivel:
                        aviso.nivel ||
                        "🚨",

                    texto:
                        aviso.texto ||
                        ""

                });

            }

        });

    });


    return avisos;

},


// ==========================================
// ACTUALIZAR CONFIGURACIÓN DE AVISOS
// ==========================================

actualizarConfiguracion(id, configuracion) {

    const colonia =
        this.obtenerColoniaPorId(id);

    if (!colonia) {

        return false;

    }

    if (!colonia.configuracion) {

        colonia.configuracion = {};

    }

    colonia.configuracion.diasRevision =
        Number(configuracion.diasRevision) || 15;

    colonia.configuracion.diasAlimentacion =
        Number(configuracion.diasAlimentacion) || 7;

    colonia.configuracion.diasAgua =
        Number(configuracion.diasAgua) || 3;

    this.guardar();

    return true;

},


// ==========================================
// REGISTRAR ALIMENTACIÓN
// ==========================================

registrarAlimentacion(id, alimento) {

    const colonia = this.obtenerColoniaPorId(id);

    if (!colonia) {
        return false;
    }

    const hoy = new Date();

    const fecha =
        String(hoy.getDate()).padStart(2,"0") + "/" +
        String(hoy.getMonth()+1).padStart(2,"0") + "/" +
        hoy.getFullYear();

    if (!colonia.alimentacion) {
        colonia.alimentacion = { ultima: "", alimento: "" };
    }

    colonia.alimentacion.ultima = fecha;

    colonia.alimentacion.alimento =
        alimento || colonia.alimentacion.alimento || "";

    if (!Array.isArray(colonia.diario)) {
        colonia.diario = [];
    }

    colonia.diario.push({
        fecha: fecha,
        titulo: "🍽 Alimentación",
        texto: "Alimentación registrada" + (alimento ? ": " + alimento : ".")
    });

    this.guardar();

    return true;

},


// ==========================================
// REGISTRAR AGUA
// ==========================================

registrarAgua(id) {

    const colonia = this.obtenerColoniaPorId(id);

    if (!colonia) {
        return false;
    }

    const hoy = new Date();

    const fecha =
        String(hoy.getDate()).padStart(2,"0") + "/" +
        String(hoy.getMonth()+1).padStart(2,"0") + "/" +
        hoy.getFullYear();

    if (!colonia.agua) {
        colonia.agua = { ultima: "" };
    }

    colonia.agua.ultima = fecha;

    if (!Array.isArray(colonia.diario)) {
        colonia.diario = [];
    }

    colonia.diario.push({
        fecha: fecha,
        titulo: "💧 Agua",
        texto: "Agua añadida a la colonia."
    });

    this.guardar();

    return true;

},


// ==========================================
// AÑADIR FOTO A LA GALERÍA
// ==========================================

agregarFotoGaleria(id, imagenBase64) {

    const colonia = this.obtenerColoniaPorId(id);

    if (!colonia) {
        return false;
    }

    if (!colonia.foto) {
        colonia.foto = { portada: "", galeria: [] };
    }

    if (!Array.isArray(colonia.foto.galeria)) {
        colonia.foto.galeria = [];
    }

    const hoy = new Date();

    const fecha =
        String(hoy.getDate()).padStart(2,"0") + "/" +
        String(hoy.getMonth()+1).padStart(2,"0") + "/" +
        hoy.getFullYear();

    colonia.foto.galeria.push({
        fecha: fecha,
        imagen: imagenBase64
    });

    if (!colonia.foto.portada || colonia.foto.portada.startsWith("blob:")) {
        colonia.foto.portada = imagenBase64;
    }

    this.guardar();

    return true;

},


// ==========================================
// ESTABLECER FOTO DE PORTADA
// ==========================================

establecerPortada(id, imagenBase64) {

    const colonia = this.obtenerColoniaPorId(id);

    if (!colonia) {
        return false;
    }

    colonia.foto.portada = imagenBase64;

    this.guardar();

    return true;

},


// ==========================================
// AGREGAR ENTRADA DE DIARIO MANUAL
// ==========================================

agregarEntradaDiario(id, entrada) {

    const colonia = this.obtenerColoniaPorId(id);

    if (!colonia) {
        return false;
    }

    if (!Array.isArray(colonia.diario)) {
        colonia.diario = [];
    }

    colonia.diario.push({
        fecha: entrada.fecha,
        titulo: entrada.titulo || "📝 Anotación",
        texto: entrada.texto || ""
    });

    this.guardar();

    return true;

},


// ==========================================
// AGREGAR REVISIÓN
// ==========================================

agregarRevision(id, datos) {

    const colonia =
        this.obtenerColoniaPorId(id);


    if (!colonia) {

        console.error(
            "No se encontró la colonia:",
            id
        );

        return null;

    }


    if (!colonia.poblacion) {

        colonia.poblacion = {

            huevos: 0,

            larvas: 0,

            pupas: 0,

            obreras: 0

        };

    }


    if (!colonia.reina) {

        colonia.reina = {

            estado: "🟢 Reina viva",

            fechaCaptura: ""

        };

    }


    if (!colonia.parametros) {

        colonia.parametros = {

            temperatura: "",

            humedad: ""

        };

    }


    if (!Array.isArray(colonia.revisiones)) {

        colonia.revisiones = [];

    }


    if (!Array.isArray(colonia.diario)) {

        colonia.diario = [];

    }


    if (!colonia.revision) {

        colonia.revision = {

            ultima: "",

            notas: ""

        };

    }


    colonia.poblacion.huevos =
        Number(datos.huevos) || 0;

    colonia.poblacion.larvas =
        Number(datos.larvas) || 0;

    colonia.poblacion.pupas =
        Number(datos.pupas) || 0;

    colonia.poblacion.obreras =
        Number(datos.obreras) || 0;


    colonia.reina.estado =
        datos.estadoReina;


    colonia.parametros.temperatura =
        datos.temperatura || "";

    colonia.parametros.humedad =
        datos.humedad || "";


    colonia.revision.ultima =
        datos.fecha;

    colonia.revision.notas =
        datos.notas || "";


    const nuevaRevision = {

        fecha:
            datos.fecha,

        estadoReina:
            datos.estadoReina,

        huevos:
            colonia.poblacion.huevos,

        larvas:
            colonia.poblacion.larvas,

        pupas:
            colonia.poblacion.pupas,

        obreras:
            colonia.poblacion.obreras,

        temperatura:
            colonia.parametros.temperatura,

        humedad:
            colonia.parametros.humedad,

        notas:
            datos.notas || ""

    };


    colonia.revisiones.push(
        nuevaRevision
    );


    const nuevaEntrada = {

        fecha:
            datos.fecha,

        titulo:
            "🔍 Revisión de la colonia",

        texto:
            "Estado de la reina: " +
            datos.estadoReina +
            ". " +

            "Huevos: " +
            colonia.poblacion.huevos +
            ". " +

            "Larvas: " +
            colonia.poblacion.larvas +
            ". " +

            "Pupas: " +
            colonia.poblacion.pupas +
            ". " +

            "Obreras: " +
            colonia.poblacion.obreras +
            "." +

            (
                datos.temperatura
                ?
                " Temperatura: " +
                datos.temperatura +
                "."
                :
                ""
            ) +

            (
                datos.humedad
                ?
                " Humedad: " +
                datos.humedad +
                "."
                :
                ""
            ) +

            (
                datos.notas
                ?
                " Observaciones: " +
                datos.notas
                :
                ""
            )

    };


    colonia.diario.push(
        nuevaEntrada
    );


    this.guardar();


    return colonia;

}

};

// ==========================================
// INICIAR STORAGE
// ==========================================

Storage.iniciar();