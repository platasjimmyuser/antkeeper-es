function generarGraficaEvolucion(revisiones){

    if (!Array.isArray(revisiones) || revisiones.length === 0) {

        return "<p>Aún no hay revisiones registradas para mostrar la evolución.</p>";

    }


    function parsearFecha(fechaTexto){

        const [dia, mes, anio] = fechaTexto.split("/");

        return new Date(anio, mes - 1, dia);

    }


    const ordenadas = [...revisiones].sort((a, b) => {

        return parsearFecha(a.fecha) - parsearFecha(b.fecha);

    });


    const anchoTotal = 600;
    const altoTotal = 260;
    const margen = 40;


    const valores = ordenadas.flatMap(r => [

        r.huevos || 0,
        r.larvas || 0,
        r.pupas || 0,
        r.obreras || 0

    ]);

    const maxValor = Math.max(...valores) || 1;

    const pasoX = ordenadas.length > 1
        ? (anchoTotal - 2 * margen) / (ordenadas.length - 1)
        : 0;


    function coordY(valor){

        return (altoTotal - margen) -
            (valor / maxValor) * (altoTotal - 2 * margen);

    }


    function generarPuntos(campo){

        return ordenadas.map((r, i) => {

            const x = margen + i * pasoX;
            const y = coordY(r[campo] || 0);

            return x + "," + y;

        }).join(" ");

    }


    const colores = {

        huevos: "#f4b400",
        larvas: "#8bc34a",
        pupas: "#795548",
        obreras: "#3f51b5"

    };

    const nombres = {

        huevos: "🥚 Huevos",
        larvas: "🐛 Larvas",
        pupas: "🟤 Pupas",
        obreras: "🐜 Obreras"

    };


    let svg = `<svg viewBox="0 0 ${anchoTotal} ${altoTotal}" style="width:100%;height:auto;">`;

    svg += `<line x1="${margen}" y1="${altoTotal - margen}" x2="${anchoTotal - margen}" y2="${altoTotal - margen}" stroke="#999" stroke-width="1"/>`;

    Object.keys(colores).forEach(campo => {

        svg += `<polyline fill="none" stroke="${colores[campo]}" stroke-width="2" points="${generarPuntos(campo)}"/>`;

    });

    svg += `</svg>`;


    let leyenda = `<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;">`;

    Object.keys(colores).forEach(campo => {

        leyenda += `<span style="display:flex;align-items:center;gap:4px;">
            <span style="width:12px;height:12px;background:${colores[campo]};display:inline-block;border-radius:2px;"></span>
            ${nombres[campo]}
        </span>`;

    });

    leyenda += `</div>`;


    return svg + leyenda;

}


window.generarGraficaEvolucion = generarGraficaEvolucion;