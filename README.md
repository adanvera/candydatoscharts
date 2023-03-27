# candydatoscharts


El esarrollo del proyecto esta a cargo de [Adan Vera](https://www.linkedin.com/in/adanvera/) 

<table>
  <tr>
    <td align="center"><a href="https://github.com/adanvera">
        <img src="https://avatars.githubusercontent.com/u/64652682?s=96&v=4" width="100px;" alt="Adán Vera"/><br />
            <sub><b>Adan Vera</b></sub></a></td>
  </tr>
</table>

# Para agregar datos en los charts seguir las siguientes indicaciones

1. Redes:  RedesData.jsx
la funcion createDinamicData(), es la encargada de agregar los datos,
para agregar un dato mas, se precisa ir a la variable 'chart.data'
en donde le pasaremos los párametros correspondientes:
createDinamicData(
    año, mes, // año y mes donde mes va de 0 a 11
    237000, 313506, 135490, 55952, // datos santi fb,tw,insta, tk en ese orden
    258000, 50145, 14201, 0,  // datos efrain fb,tw,insta, tk en ese orden
    357, 259331, 21710, 10026, // datos de chila fb,tw,insta, tk en ese orden
    127000, 243944, 103096, 20661, // datos de euclides fb,tw,insta, tk 
    588000, 85391, 49578, 23279, // datos de payo fb, tw,insta, tk 
)

2. Menciones linechart: en LineChartMenciones.jsx
Para agregar mas datos nos dirigimos a la variable 'chart.data' en donde
le agregaremos un json en el caso de que querramos agregar mas con los siguientes
parametros
{
    "DATE": new Date(2022, 6), // año y mes va de 0 a 11
    "Santi Peña": 11424, // numeros de santi
    "Efrain Alegre": 1803, // numeros efra
    "José Luis Chilavert": 307, numeros chila
    "Euclides Acevedo": 623, numeros de euclides
    "Payo Cubas": 207, // numeros de payo
    "Otros": calcularOtros(34873, 11424, 1803, 307, 623, 207, filterCandidates),
    "santicolor": "#fd7358", // color de santi
    "efraincolor": "#81539a",// color de efra
    "chilacolor": "#b57295", // color de chila
    "euclidescolor": "#f5a928", // color de euclides
    "payocolor": "#f28a38", // color de payo
    "otroscolor": "#abb1f1" // color de otros
}

2. Menciones pie chart: PieMenciones.jsx
Se se desea modificar los datos dirigirnos a PieMenciones.jsx
Como en este pie se basa sobre el total entonces nos dirigimos a 
cambiar los valores actuales en las constantes ya sea
const santi = {
        "candydato": "Santi Peña", // el nombre 
        "inversion": 103271, // valor a modificar
        "color": "#DD7969", // color si se requiere modificar
        "href": { imgsanti }
}

3. Meta, LineChart.js para modificar valores lo mismo que el anterior





