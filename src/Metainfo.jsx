import React, { useEffect, useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import nodata from './assets/images/nodata.png'

const Metainfo = (props) => {

    const [showData, setShowData] = useState(false)
    const active = props?.state

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
        "inversion": 354798249
    }

    const efrain = {
        "candydato": "Efraín Alegre",
        "inversion": 67056894
    }

    const chila = {
        "candydato": "José Luis Chilavert",
        "inversion": 0
    }

    const euclides = {
        "candydato": "Euclides Acevedo",
        "inversion": 12190733
    }

    const payo = {
        "candydato": "Payo Cubas",
        "inversion": 90096
    }

    const calcularOtros = (santi, efrain, chila, euclides, payo, filterCandidates) => {
        const total = santi.inversion + efrain.inversion + chila.inversion + euclides.inversion + payo.inversion 
    }

    const otros = {
        "candydato": "Otros",
        "inversion": calcularOtros(santi, efrain, chila, euclides, payo, filterCandidates)
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
    rgm.brightnesses.push(-0.1, -0.1, -0.2, 0, - 0.2);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.0001;
    pieSeries.slices.template.strokeWidth = 0;
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
    pieSeries.colors.list = [
        am4core.color("#DD7969", 0.8),
        am4core.color("#966AA7", 0.8),
        am4core.color("#FF6F91", 0.8),
        am4core.color("#FF9671", 0.8),
        am4core.color("#FFC75F", 0.8),
        am4core.color("#80D4A3", 0.8),
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        }
    }, [filterCandidates])

    const [changeView, setChangeView] = useState(false)

    return (
        <>
            {
                showData &&
                <>
                    <Form>
                        <Form.Check
                            value={changeView}
                            onChange={() => setChangeView(!changeView)}
                            type="switch"
                            id="custom-switch"
                            label="Cambiar vista de gráfico"
                        />
                    </Form>
                    {
                        !changeView &&
                        <div id="chartdiv"></div>
                    }{
                        changeView &&
                        <div>otra vista</div>
                    }
                </>
            }
            {
                !showData &&
                <Row className="nodata">
                    <img
                        src={nodata}
                    />
                </Row>
            }
        </>

    )
}

export default Metainfo