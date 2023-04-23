import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'

const LineChart = (props) => {

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
        "inversion": 709416607,
        "color": "#DD7969",
    }

    const efrain = {
        "candydato": "Efraín Alegre",
        "inversion": 61863283,
        "color": "#966AA7",
    }

    const chila = {
        "candydato": "José Luis Chilavert",
        "inversion": 0,
        "color": "#FF6F91",
    }

    const euclides = {
        "candydato": "Euclides Acevedo",
        "inversion": 17218497,
        "color": "#FF9671",
    }

    const payo = {
        "candydato": "Payo Cubas",
        "inversion": 90096,
        "color": "#FFC75F",
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
        "inversion": calcularTotalOtros(1972617509, filterCandidates),
        "color": "#80D4A3"
    }

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdivtwoss", am4charts.XYChart);

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

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "candydato";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.fill = am4core.color("#000");
    categoryAxis.renderer.labels.template.fontSize = 10;
    categoryAxis.renderer.labels.template.fontWeight = "bold";
    categoryAxis.renderer.labels.template.color = "#5458a2";
    categoryAxis.renderer.labels.template.fill = am4core.color("#5E5CA5");
    // change font family to the axus
    categoryAxis.renderer.labels.template.fontFamily = "Nunito sans";
    categoryAxis.renderer.labels.template.fontWeight = "bold";
    categoryAxis.renderer.labels.template.fontSize = 10;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = "4,4";
    valueAxis.renderer.labels.template.disabled = false;
    valueAxis.min = 0;
    valueAxis.renderer.labels.template.fill = am4core.color("#5E5CA5");
    valueAxis.renderer.labels.template.fontFamily = "Nunito sans";
    valueAxis.renderer.labels.template.fontWeight = "bold";
    valueAxis.renderer.labels.template.fontSize = 10;

    // Do not crop bullets
    chart.maskBullets = false;

    // Remove padding
    chart.paddingBottom = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "inversion";
    series.dataFields.categoryX = "candydato";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.column.cornerRadiusTopLeft = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";
    series.columns.template.fillOpacity = 0.3;
    chart.responsive.enabled = true;

    // add x scrollbar
    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    // change chart font family to Nunito Sans
    chart.fontFamily = "Nunito Sans";
    chart.fontSize = 12;
    chart.fontWeight = "bold";

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
                    <div className='mt-3 mb-3' id="chartdivtwoss"></div>
                </>

            }
        </>
    )
}

export default LineChart