const App = {


    iniciar(){


        this.configurarNavegacion();


        mostrarInicio();


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