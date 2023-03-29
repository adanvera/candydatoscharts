import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'

const LineChartMenciones = (props) => {
    // to show or hide component when some candidate is active or not
    const [showData, setShowData] = useState(false)

    const download = props?.download

    const active = props?.state

    // filter active candidates and return the name of the active candidate
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

    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        } else {
            setShowData(false)
        }
    }, [filterCandidates])

    // Use themes
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    const calcularOtros = (total, one, two, three, four, five, filterCandidates) => {

        var resta = 0
        // segun este incluido o no el candidato, se le resta o suma al total, si se encuentra dentro de filterCandidates, se le resta, si no, se le suma
        Object.keys(filterCandidates).forEach(function (key) {
            switch (filterCandidates[key]) {
                case 'santi':
                    resta = resta - one
                    break;
                case 'efrain':
                    resta = resta - two
                    break;
                case 'chila':
                    resta = resta - three
                    break;
                case 'euclides':
                    resta = resta - four
                    break;
                case 'payo':
                    resta = resta - five
                    break;
            }
        })

        return total + resta

    }

    // Add data
    chart.data = [
        {
            "DATE": new Date(2021, 7),
            "Santi Peña": 257,
            "Efrain Alegre": 85,
            "José Luis Chilavert": 425,
            "Euclides Acevedo": 64,
            "Payo Cubas": 257,
            "Otros": calcularOtros(1937, 257, 85, 425, 64, 257, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2021, 8),
            "Santi Peña": 1001,
            "Efrain Alegre": 947,
            "José Luis Chilavert": 621,
            "Euclides Acevedo": 423,
            "Payo Cubas": 114,
            "Otros": calcularOtros(5943, 1001, 947, 621, 423, 114, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2021, 9),
            "Santi Peña": 2603,
            "Efrain Alegre": 1227,
            "José Luis Chilavert": 1733,
            "Euclides Acevedo": 740,
            "Payo Cubas": 169,
            "Otros": calcularOtros(10942, 2603, 1227, 1733, 740, 169, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2021, 10),
            "Santi Peña": 1992,
            "Efrain Alegre": 599,
            "José Luis Chilavert": 799,
            "Euclides Acevedo": 833,
            "Payo Cubas": 45,
            "Otros": calcularOtros(10258, 1992, 599, 799, 833, 45, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2021, 11),
            "Santi Peña": 3580,
            "Efrain Alegre": 568,
            "José Luis Chilavert": 800,
            "Euclides Acevedo": 223,
            "Payo Cubas": 127,
            "Otros": calcularOtros(12307, 3580, 568, 800, 223, 127, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 0),
            "Santi Peña": 2561,
            "Efrain Alegre": 539,
            "José Luis Chilavert": 684,
            "Euclides Acevedo": 353,
            "Payo Cubas": 58,
            "Otros": calcularOtros(15881, 2561, 539, 684, 353, 58, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 1),
            "Santi Peña": 5288,
            "Efrain Alegre": 648,
            "José Luis Chilavert": 684,
            "Euclides Acevedo": 330,
            "Payo Cubas": 58,
            "Otros": calcularOtros(18354, 5288, 648, 684, 330, 58, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 2),
            "Santi Peña": 4682,
            "Efrain Alegre": 1592,
            "José Luis Chilavert": 1044,
            "Euclides Acevedo": 798,
            "Payo Cubas": 215,
            "Otros": calcularOtros(22494, 4682, 1592, 1044, 798, 215, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 3),
            "Santi Peña": 3673,
            "Efrain Alegre": 1328,
            "José Luis Chilavert": 679,
            "Euclides Acevedo": 1318,
            "Payo Cubas": 186,
            "Otros": calcularOtros(16787, 3673, 1328, 679, 1318, 186, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 4),
            "Santi Peña": 9758,
            "Efrain Alegre": 1405,
            "José Luis Chilavert": 2081,
            "Euclides Acevedo": 763,
            "Payo Cubas": 441,
            "Otros": calcularOtros(32548, 9758, 1405, 2081, 763, 441, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 5),
            "Santi Peña": 9004,
            "Efrain Alegre": 903,
            "José Luis Chilavert": 1349,
            "Euclides Acevedo": 836,
            "Payo Cubas": 593,
            "Otros": calcularOtros(33517, 9004, 903, 1349, 836, 593, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 6),
            "Santi Peña": 11424,
            "Efrain Alegre": 1803,
            "José Luis Chilavert": 307,
            "Euclides Acevedo": 623,
            "Payo Cubas": 207,
            "Otros": calcularOtros(34873, 11424, 1803, 307, 623, 207, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 7),
            "Santi Peña": 9117,
            "Efrain Alegre": 4827,
            "José Luis Chilavert": 907,
            "Euclides Acevedo": 2032,
            "Payo Cubas": 560,
            "Otros": calcularOtros(62937, 9117, 4827, 907, 2032, 560, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 8),
            "Santi Peña": 7312,
            "Efrain Alegre": 856,
            "José Luis Chilavert": 1569,
            "Euclides Acevedo": 352,
            "Payo Cubas": 189,
            "Otros": calcularOtros(16374, 7312, 856, 1569, 352, 189, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 9),
            "Santi Peña": 7275,
            "Efrain Alegre": 740,
            "José Luis Chilavert": 1338,
            "Euclides Acevedo": 274,
            "Payo Cubas": 217,
            "Otros": calcularOtros(15492, 7275, 740, 1338, 274, 217, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 10),
            "Santi Peña": 2895,
            "Efrain Alegre": 314,
            "José Luis Chilavert": 634,
            "Euclides Acevedo": 247,
            "Payo Cubas": 63,
            "Otros": calcularOtros(10706, 2895, 314, 634, 247, 63, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2022, 11),
            "Santi Peña": 7507,
            "Efrain Alegre": 102,
            "José Luis Chilavert": 521,
            "Euclides Acevedo": 408,
            "Payo Cubas": 42,
            "Otros": calcularOtros(11131, 7507, 102, 521, 408, 42, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2023, 0),
            "Santi Peña": 5840,
            "Efrain Alegre": 5119,
            "José Luis Chilavert": 2507,
            "Euclides Acevedo": 1995,
            "Payo Cubas": 449,
            "Otros": calcularOtros(26274, 5840, 5119, 2507, 1995, 449, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2023, 1),
            "Santi Peña": 3685,
            "Efrain Alegre": 4194,
            "José Luis Chilavert": 633,
            "Euclides Acevedo": 957,
            "Payo Cubas": 362,
            "Otros": calcularOtros(19592, 3685, 4194, 633, 957, 362, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        },
        {
            "DATE": new Date(2023, 2),
            "Santi Peña": 3817,
            "Efrain Alegre": 2991,
            "José Luis Chilavert": 575,
            "Euclides Acevedo": 636,
            "Payo Cubas": 368,
            "Otros": calcularOtros(17680, 3817, 2991, 575, 636, 368, filterCandidates),
            "santicolor": "#fd7358",
            "efraincolor": "#81539a",
            "chilacolor": "#b57295",
            "euclidescolor": "#f5a928",
            "payocolor": "#f28a38",
            "otroscolor": "#abb1f1"
        }
    ];


    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    dateAxis.renderer.labels.template.fill = am4core.color("#5458a2");
    dateAxis.renderer.grid.template.stroke = am4core.color("#5458a2");

    var fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // change color of axis
    valueAxis.renderer.labels.template.fill = am4core.color("#5458a2");

    const validateHiden = (filterCandidates, data) => {
        // if filterCandidates includes santi then return false
        return filterCandidates.includes(data) ? false : true;
    }

    // Create series
    var one = chart.series.push(new am4charts.LineSeries());
    one.dataFields.valueY = "Santi Peña";
    one.dataFields.dateX = "DATE";
    one.strokeWidth = 2;
    one.tensionX = 0.8;
    one.connect = false;
    one.name = "Santi Peña";
    one.propertyFields.stroke = "santicolor";
    one.propertyFields.fill = "santicolor";
    one.fillOpacity = 0.5;
    one.segments.template.fillModifier = fillModifier;
    // hide a series 
    one.hidden = validateHiden(filterCandidates, 'santi');
    // Legend color list
    one.stroke = am4core.color("#DF7767");
    one.fill = am4core.color("#DF7767");


    // add series two
    var two = chart.series.push(new am4charts.LineSeries());
    two.dataFields.valueY = 'Efrain Alegre';
    two.dataFields.dateX = "DATE";
    two.strokeWidth = 2;
    two.tensionX = 0.8;
    two.connect = false;
    two.name = 'Efrain Alegre'
    two.propertyFields.stroke = "efraincolor";
    two.propertyFields.fill = "efraincolor";
    two.fillOpacity = 0.5;
    two.segments.template.fillModifier = fillModifier;
    // hide a series
    two.hidden = validateHiden(filterCandidates, 'efrain');
    //legend color list
    two.stroke = am4core.color("#81539a");
    two.fill = am4core.color("#81539a");

    // add series three
    var three = chart.series.push(new am4charts.LineSeries());
    three.dataFields.valueY = 'José Luis Chilavert';
    three.dataFields.dateX = "DATE";
    three.strokeWidth = 2;
    three.tensionX = 0.8;
    three.connect = false;
    three.name = 'José Luis Chilavert'
    three.propertyFields.stroke = "chilacolor";
    three.fillOpacity = 0.5;
    three.segments.template.fillModifier = fillModifier;
    // hide a series
    three.hidden = validateHiden(filterCandidates, 'chila');
    // legend color list
    three.stroke = am4core.color("#b57295");
    three.fill = am4core.color("#b57295");

    // add series four
    var four = chart.series.push(new am4charts.LineSeries());
    four.dataFields.valueY = 'Euclides Acevedo';
    four.dataFields.dateX = "DATE";
    four.strokeWidth = 2;
    four.tensionX = 0.8;
    four.connect = false;
    four.name = 'Euclides Acevedo'
    four.propertyFields.stroke = "euclidescolor";
    four.propertyFields.fill = "euclidescolor";
    four.fillOpacity = 0.5;
    four.segments.template.fillModifier = fillModifier;
    // hide a series
    four.hidden = validateHiden(filterCandidates, 'euclides');
    // legend color list
    four.stroke = am4core.color("#F6A730");
    four.fill = am4core.color("#F6A730");

    // add series five
    var five = chart.series.push(new am4charts.LineSeries());
    five.dataFields.valueY = 'Payo Cubas';
    five.dataFields.dateX = "DATE";
    five.strokeWidth = 2;
    five.tensionX = 0.8;
    five.connect = false;
    five.name = 'Payo Cubas'
    five.propertyFields.stroke = "payocolor";
    five.propertyFields.fill = "payocolor";
    five.fillOpacity = 0.5;
    five.segments.template.fillModifier = fillModifier;
    // hide a series
    five.hidden = validateHiden(filterCandidates, 'payo');
    // legend color list
    five.stroke = am4core.color("#F18B39");
    five.fill = am4core.color("#F18B39");

    // add series others
    var others = chart.series.push(new am4charts.LineSeries());
    others.dataFields.valueY = 'Otros';
    others.dataFields.dateX = "DATE";
    others.strokeWidth = 2;
    others.tensionX = 0.8;
    others.connect = false;
    others.name = 'Otros'
    others.propertyFields.stroke = "otroscolor";
    others.propertyFields.fill = "otroscolor";
    others.fillOpacity = 0.4;
    others.segments.template.fillModifier = fillModifier;
    // legend color list
    others.stroke = am4core.color("#EAECFF");
    others.fill = am4core.color("#EAECFF");
    // add tooltip to series when hover
    others.tooltipText = "{name}\n{dateX}: {valueY}";

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.color = "#fff";
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ffff");

    // add x scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.toBack();

    // change chart font family to Nunito Sans
    chart.fontFamily = "Nunito Sans";
    chart.fontSize = 12;
    chart.fontWeight = "bold";

    // change color of title of names displayed in legend
    chart.legend.labels.template.fill = am4core.color("#5458a2");
    chart.legend.labels.template.fontFamily = "Nunito Sans";
    chart.legend.labels.template.fontSize = 12;
    chart.legend.labels.template.fontWeight = 900;
    
    // change color of title of names displayed in legend
    chart.legend.valueLabels.template.fill = am4core.color("#5458a2");
    chart.legend.valueLabels.template.fontFamily = "Nunito Sans";
    chart.legend.valueLabels.template.fontSize = 12;
    chart.legend.valueLabels.template.fontWeight = 900;
    
    
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

export default LineChartMenciones