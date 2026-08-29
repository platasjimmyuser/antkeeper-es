const App = {


    iniciar(){


        this.configurarNavegacion();


        const ultima = (typeof Storage !== "undefined") ? Storage.obtenerUltimaPantalla() : null;


        if(ultima && ultima.tipo === "colonia" && ultima.id){

            const colonia = Storage.obtenerColoniaPorId(ultima.id);

            if(colonia){
                mostrarColonia(colonia);
            }else{
                mostrarInicio();
            }

        }else if(ultima && ultima.tipo === "colonias"){

            mostrarListaColonias();

        }else if(ultima && ultima.tipo === "ajustes" && typeof mostrarPantallaAjustes === "function"){

            mostrarPantallaAjustes();

        }else if(ultima && ultima.tipo === "nuevaColonia" && typeof mostrarFormularioColonia === "function"){

            mostrarFormularioColonia();

        }else{

            mostrarInicio();

        }


    },




    configurarNavegacion(){



        const btnInicio = document.getElementById("btnInicio");

        const btnColonias = document.getElementById("btnColonias");

        const btnNuevaColonia = document.getElementById("btnNuevaColonia");

        const btnAjustes = document.getElementById("btnAjustes");




        btnInicio?.addEventListener("click",()=>{


            mostrarInicio();


        });





        btnColonias?.addEventListener("click",()=>{


            mostrarListaColonias();


        });





        btnNuevaColonia?.addEventListener("click",()=>{


            if(typeof mostrarFormularioColonia === "function"){


                mostrarFormularioColonia();


            }else{


                alert("Error: no se ha cargado FormularioColonia.js");


            }


        });





        btnAjustes?.addEventListener("click",()=>{


            this.mostrarAjustes();


        });



    },






    mostrarAjustes(){

        if(typeof mostrarPantallaAjustes === "function"){

            mostrarPantallaAjustes();

        }else{

            document.getElementById("app").innerHTML = `
            <section class="tarjeta">
                <h2>⚙️ Ajustes</h2>
                <p>
                Configuración de AntKeeper ES
                </p>
            </section>
            `;

        }

    }



};





document.addEventListener("DOMContentLoaded",()=>{


    App.iniciar();


});


if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("Sw.js")
        .then(() => {
            console.log("Service Worker registrado correctamente.");
        })
        .catch((error) => {
            console.error("Error registrando Service Worker:", error);
        });

    });

}