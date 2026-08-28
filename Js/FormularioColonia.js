function mostrarFormularioColonia(colonia = null){

const editando = colonia !== null;

let fotoSeleccionada = editando
? colonia.foto.portada
: "Assets/Images/default-ant.png";


document.getElementById("app").innerHTML = `

<section class="tarjeta">

<h2>

${editando ? "✏️ Modificar colonia" : "🐜 Nueva colonia"}

</h2>

<label>

📷 Foto de colonia

</label>

<br><br>

<button id="btnCamara">

📷 Cámara

</button>

<input
type="file"
id="inputCamara"
accept="image/*"
capture="environment"
hidden>

<button id="btnGaleria">

🖼️ Galería

</button>

<input
type="file"
id="inputGaleria"
accept="image/*"
hidden>

<br><br>

<img

id="vistaPreviaFoto"

src="${fotoSeleccionada}"

class="foto-colonia"

style="display:block;">

<br><br>

<label>

🐜 Nombre

</label>

<input

id="nombreNuevaColonia"

value="${editando ? colonia.nombre : ""}"

placeholder="Ej: Messor Barcelona">

<br><br>

<label>

🧬 Especie

</label>

<select id="especieNuevaColonia">

${ESPECIES.map(especie=>`

<option
value="${especie}"
${editando && colonia.especie===especie ? "selected" : ""}>

${especie}

</option>

`).join("")}

</select>

<br><br>

<label>

📅 Fecha captura

</label>

<input

type="text"

id="fechaNuevaColonia"

maxlength="10"

placeholder="dd/mm/aaaa"

value="${editando ? colonia.reina.fechaCaptura : ""}">

<br><br>

<button id="guardarNuevaColonia">

💾 Guardar

</button>

<button id="cancelarNuevaColonia">

❌ Cancelar

</button>

</section>

`;



function cargarFoto(evento){

const archivo = evento.target.files[0];

if(!archivo){

return;

}

fotoSeleccionada = URL.createObjectURL(archivo);

const preview = document.getElementById("vistaPreviaFoto");

preview.src = fotoSeleccionada;

preview.style.display = "block";

}



document
.getElementById("btnCamara")
.onclick = ()=>{

document
.getElementById("inputCamara")
.click();

};



document
.getElementById("btnGaleria")
.onclick = ()=>{

document
.getElementById("inputGaleria")
.click();

};



document
.getElementById("inputCamara")
.onchange = cargarFoto;

document
.getElementById("inputGaleria")
.onchange = cargarFoto;



document
.getElementById("cancelarNuevaColonia")
.onclick = ()=>{

if(editando){

mostrarColonia(colonia);

}else{

mostrarListaColonias();

}

};



document
.getElementById("guardarNuevaColonia")
.onclick = ()=>{

const nombre =
document
.getElementById("nombreNuevaColonia")
.value.trim();

const especie =
document
.getElementById("especieNuevaColonia")
.value;

const fecha =
document
.getElementById("fechaNuevaColonia")
.value.trim();

const formato =
/^\d{2}\/\d{2}\/\d{4}$/;

if(nombre===""){

alert("Introduce un nombre.");

return;

}

if(!formato.test(fecha)){

alert("La fecha debe tener formato dd/mm/aaaa");

return;

}
if(editando){

    colonia.nombre = nombre;

    colonia.especie = especie;

    colonia.foto.portada = fotoSeleccionada;

    colonia.reina.fechaCaptura = fecha;

    Storage.guardar();

    mostrarColonia(colonia);

    return;

}



const nuevaColonia = {

    id: "colonia-" + Date.now(),

    nombre: nombre,

    especie: especie,

    foto: {

        portada: fotoSeleccionada,

        galeria: []

    },

    reina: {

        estado: "🟢 Reina viva",

        fechaCaptura: fecha

    },

    poblacion: {

        huevos: 0,

        larvas: 0,

        pupas: 0,

        obreras: 0

    },

    diario: [],
    revisiones: [],
    revision: {

        ultima: fecha,

        notas: ""

    },

    alimentacion: {

        ultima: "",

        alimento: ""

    },

    agua: {

        ultima: ""

    },

    parametros: {

        temperatura: "",

        humedad: ""

    },

    configuracion: {

        diasRevision: 15,

        diasAlimentacion: 7,

        diasAgua: 3

    },

    avisos: [],

    archivada: false

};



Storage.agregarColonia(nuevaColonia);



mostrarColonia(nuevaColonia);



};



}