import React, { useEffect, useState } from 'react'
import imgsanti from './assets/images/candydatos/santipena.png'
import imgefrain from './assets/images/candydatos/efrain-1.png'
import imgchila from './assets/images/candydatos/chila.png'
import imgeuclides from './assets/images/candydatos/euclides-1.png'
import imgpayo from './assets/images/candydatos/payocubas.png'
import { CSVLink } from 'react-csv'


const Pie = (props) => {

    const active = props?.state
    const download = props?.download

    // filtrar active y devolver el nombre del candidato activo
    const activeCandidates = (active) => {
        let candidates = []
        for (const key in active) {
            if (active[key] === 'is-active') {
                candidates.push(key)
            }
        }
        return candidates
    }

    const filterCandidates = activeCandidates(active)

    const santi = {
        "candydato": "Santi Peña",
        "inversion": 354798249,
        "color": "#DD7969",
        "href": { imgsanti }
    }

    const efrain = {
        "candydato": "Efraín Alegre",
        "inversion": 67056894,
        "color": "#966AA7",
        "href": { imgefrain }
    }

    const chila = {
        "candydato": "José Luis Chilavert",
        "inversion": 0,
        "color": "#FF6F91",
        "href": { imgchila }
    }

    const euclides = {
        "candydato": "Euclides Acevedo",
        "inversion": 12190733,
        "color": "#FF9671",
        "href": { imgeuclides }
    }

    const payo = {
        "candydato": "Payo Cubas",
        "inversion": 90096,
        "color": "#FFC75F",
        "href": { imgpayo }
    }

    const calcularTotalOtros = (total, filterCandidates) => {

        var resta = 0

        Object.keys(filterCandidates).map((key) => {
            switch (filterCandidates[key]) {
                case 'santi':
                    resta += santi.inversion
                    break;
                case 'efrain':
                    resta += efrain.inversion
                    break;
                case 'chila':
                    resta += chila.inversion
                    break;
                case 'euclides':
                    resta += euclides.inversion
                    break;
                case 'payo':
                    resta += payo.inversion
                    break;
                default:
                    break;
            }
        })

        return total - resta

    }

    const otros = {
        "candydato": "Otros",
        "inversion": 1487995426,
        "color": "#80D4A3"
    }

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);

    //add data dinacmic with filterCandidates array
    const addDatatoChart = (santi, efrain, chila, euclides, payo, otros, filterCandidates) => {
        const data = []

        Object.keys(filterCandidates).map((key) => {
            switch (filterCandidates[key]) {
                case 'santi':
                    data.push(santi)
                    break;
                case 'efrain':
                    data.push(efrain)
                    break;
                case 'chila':
                    data.push(chila)
                    break;
                case 'euclides':
                    data.push(euclides)
                    break;
                case 'payo':
                    data.push(payo)
                    break;
                default:
                    data.push(otros)
                    break;
            }
        })

        // calulo de otros restando de los candidatos clicados
        const otrosRest = otros.inversion - data.reduce((a, b) => a + b.inversion, 0)
        data.push({ "candydato": "Otros", "inversion": otrosRest })

        return data
    }

    // Add data
    chart.data = addDatatoChart(santi, efrain, chila, euclides, payo, otros, filterCandidates)

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "inversion";
    pieSeries.dataFields.category = "candydato";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;
    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, 0.5, -0.1, 1.5, 0.3, -0.1);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0.04; // Establece el espacio (gap) entre los segmentos del pastel

    const validarColores = (filterCandidates) => {
        const colores = []
        Object.keys(filterCandidates).map((key) => {
            switch (filterCandidates[key]) {
                case 'santi':
                    colores.push(am4core.color("#fd7358", 0.8))
                    break;
                case 'efrain':
                    colores.push(am4core.color("#966AA7", 0.8))
                    break;
                case 'chila':
                    colores.push(am4core.color("#FF6F91", 0.8))
                    break;
                case 'euclides':
                    colores.push(am4core.color("#F9D3B8", 0.8))
                    break;
                case 'payo':
                    colores.push(am4core.color("#FFC75F", 0.8))
                    break;
            }
        })

        //setea el siguiente color siempre para que el siguiente sea el color de otros
        colores.push(am4core.color("#EAECFF", 1))

        return colores

    }

    pieSeries.colors.list = validarColores(filterCandidates)
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    const [showData, setShowData] = useState(false)

    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        }
    }, [filterCandidates])

    return (
        <>
            {
                showData &&
                <>
                    <div id="chartdiv"></div>
                </>
            }
        </>
    )
}

export default Pie