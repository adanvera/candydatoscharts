import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
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
        "inversion": 354798249,
        "color": "#DD7969"
    }

    const efrain = {
        "candydato": "Efraín Alegre",
        "inversion": 67056894,
        "color": "#966AA7"
    }

    const chila = {
        "candydato": "José Luis Chilavert",
        "inversion": 0,
        "color": "#FF6F91"
    }

    const euclides = {
        "candydato": "Euclides Acevedo",
        "inversion": 12190733,
        "color": "#FF9671"
    }

    const payo = {
        "candydato": "Payo Cubas",
        "inversion": 90096,
        "color": "#FFC75F"
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
        "inversion": calcularTotalOtros(1487995426, filterCandidates),
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
    rgm.brightnesses.push(-0.1, -0.1, -0.2, 0, - 0.2);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.0001;
    pieSeries.slices.template.strokeWidth = 0;
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;

    const validarColores = (filterCandidates) => {
        const colores = []
        Object.keys(filterCandidates).map((key) => {
            switch (filterCandidates[key]) {
                case 'santi':
                    colores.push(am4core.color("#DD7969", 0.8))
                    break;
                case 'efrain':
                    colores.push(am4core.color("#966AA7", 0.8))
                    break;
                case 'chila':
                    colores.push(am4core.color("#FF6F91", 0.8))
                    break;
                case 'euclides':
                    colores.push(am4core.color("#FF9671", 0.8))
                    break;
                case 'payo':
                    colores.push(am4core.color("#FFC75F", 0.8))
                    break;
            }
        })

        //setea el siguiente color siempre para que el siguiente sea el color de otros
        colores.push(am4core.color("#80D4A3", 0.8))

        return colores

    }

    pieSeries.colors.list = validarColores(filterCandidates)
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";

    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        }
    }, [filterCandidates])

    const [changeView, setChangeView] = useState(false)


    /**
     * chart 2
     * to show the data of the candidates in a 3d cylinder chart
     */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chartTwo = am4core.create("chartdivsdre", am4charts.XYChart3D);
    chartTwo.paddingBottom = 30;
    chartTwo.angle = 35;

    chartTwo.data = addDatatoChart(santi, efrain, chila, euclides, payo, otros, filterCandidates)

    // Create axes
    var categoryAxis = chartTwo.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "candydato";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = "bottom";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated
    

    var valueAxis = chartTwo.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;

    // Create series
    var seriesssss = chartTwo.series.push(new am4charts.ConeSeries());
    seriesssss.dataFields.valueY = "inversion";
    seriesssss.dataFields.categoryX = "candydato";
    
    var columnTemplate = seriesssss.columns.template;

    columnTemplate.adapter.add("fill", function (fill, target) {
        return target.dataItem.dataContext["color"];
    })

    columnTemplate.adapter.add("stroke", function (stroke, target) {
        return target.dataItem.dataContext["color"];
    })



    return (
        <>
            {
                showData &&
                <>
                    <Row className='rowswitch'>
                        <Col className='colswitch'>
                            <Form>
                                <Form.Check
                                    value={changeView}
                                    onChange={() => setChangeView(!changeView)}
                                    type="switch"
                                    id="custom-switch"
                                    label="Cambiar vista de gráfico"
                                />
                            </Form>
                        </Col>
                    </Row>
                    {
                        !changeView &&
                        <div id="chartdiv"></div>
                    }{
                        changeView &&
                        <div id="chartdivsdre" className='mt-5'></div>
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