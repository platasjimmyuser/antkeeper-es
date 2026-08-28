window.comprimirImagen = function(archivo, maxAncho, calidad, callback){

    const lector = new FileReader();

    lector.onload = function(evento){

        const img = new Image();

        img.onload = function(){

            let ancho = img.width;
            let alto = img.height;

            if (ancho > maxAncho) {

                alto = Math.round(alto * (maxAncho / ancho));
                ancho = maxAncho;

            }

            const canvas = document.createElement("canvas");

            canvas.width = ancho;
            canvas.height = alto;

            const contexto = canvas.getContext("2d");

            contexto.drawImage(img, 0, 0, ancho, alto);

            const base64 = canvas.toDataURL("image/jpeg", calidad);

            callback(base64);

        };

        img.src = evento.target.result;

    };

    lector.readAsDataURL(archivo);

};