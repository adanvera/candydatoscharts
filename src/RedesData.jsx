import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import nodata from './assets/images/nodata.png'


const RedesData = (props) => {


    const active = props?.state
    const [showData, setShowData] = useState(false)
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
    const redActive = props?.redes
    const dataValidation = filterCandidates.length > 0 ? true : false
    const redesValidation = redActive.length > 0 ? true : false

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // reload chart when window resize
    window.addEventListener("resize", function () {
        chart.invalidateRawData();
    });


    // add fill color gradient to chart

    var fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;


    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        } else {
            setShowData(false)
        }
    }, [filterCandidates, redActive, dataValidation, redesValidation, showData, chart])

    /**
     * Create dinamic data with parameters
     * anho, mes, fb, tw, insta, tk en ese orden
     * cabe destacar que el nro de meses es de 0 a 11
        un nuevo parametro en la funcion createDinamicData
        orden de candidatos
        santi
        efrain
        chila
        euclides
        payo
     */
    const createDinamicData = (
        anho, mes,
        sfb, stw, sinsta, stk,
        efb, etw, einsta, etk,
        cfb, ctw, cinsta, ctk,
        eufb, eutw, euinsta, eutk,
        pfb, ptw, pinsta, ptk
    ) => {
        // return a object with the data of the candidate
        // add dinamic data
        let data = {
            date: new Date(anho, mes),
            santifb: sfb,
            santitw: stw,
            santinsta: sinsta,
            santitk: stk,

            efrafb: efb,
            efratw: etw,
            efrainsta: einsta,
            efratk: etk,

            chilafb: cfb,
            chilatw: ctw,
            chilainsta: cinsta,
            chilatk: ctk,

            euclifb: eufb,
            euclitw: eutw,
            eucliinsta: euinsta,
            euclitk: eutk,

            payofb: pfb,
            payotw: ptw,
            payoinsta: pinsta,
            payotk: ptk,
        }

        return data
    }

    // Add data orden de redes fb, tw, insta, tk,
    chart.data = [
        createDinamicData(
            2022, 4, // mayo
            200000, 271655, 0, 5, // datos de redes de santi peña
            247000, 42811, 7476, 0, // datos de redes de efrain
            0, 246300, 0, 0, // datos de redes de chila
            113000, 233913, 94577, 0, // datos de redes de euclides
            564000, 78214, 45795, 370, // datos de redes de payo
        ),
        createDinamicData(
            2022, 5, // junio
            204206, 277850, 104754, 5, // datos de redes de santi peña
            247808, 43397, 7578, 0, // datos de redes de efrain
            0, 248664, 0, 0, // datos de redes de chila
            115000, 237269, 98359, 0, // datos de redes de euclides
            567784, 80207, 48133, 134, // datos de redes de payo
        ),
        createDinamicData(
            2022, 6, // julio
            207500, 281529, 107711, 7155, // datos de redes de santi peña
            247813, 43686, 7685, 0, // datos de redes de efrain
            196, 251099, 0, 0, // datos de redes de chila
            118263, 238354, 101345, 0, // datos de redes de euclides
            574132, 80938, 46470, 1250, // datos de redes de payo
        ),
        createDinamicData(
            2022, 7, // agosto
            211000, 286472, 111959, 21100, // datos de redes de santi peña
            249000, 44438, 7952, 0,  // datos de redes de efrain
            229, 251958, 0, 0, // datos de redes de chila
            112000, 239782, 102153, 11100, // datos de redes de euclides
            581000, 82010, 46753, 1366, // datos de redes de payo
        ),
        createDinamicData(
            2022, 8, // septiembre
            213000, 289859, 113913, 23600, // datos de redes de santi peña
            249000, 45539, 8429, 0, // datos de redes de efrain
            251, 252485, 0, 0, // datos de redes de chila
            125000, 240878, 102618, 11500, // datos de redes de euclides
            584000, 82580, 47066, 1477, // datos de redes de payo
        ),
        createDinamicData(
            2022, 9, // octubre
            218000, 295199, 118551, 42200, // datos de redes de santi peña
            250000, 46655, 9929, 0,  // datos de redes de efrain
            280, 255629, 0, 0, // datos de redes de chila
            126000, 241906, 102618, 11500, // datos de redes de euclides
            585000, 83032, 47438, 541, // datos de redes de payo
        ),
        createDinamicData(
            2022, 10, // noviembre
            219000, 297020, 119727, 44400, // datos de redes de santi peña
            250000, 46943, 10487, 0,  // datos de redes de efrain
            331, 255831, 15986, 9781, // datos de redes de chila
            126000, 242343, 102515, 13200, // datos de redes de euclides
            585000, 83263, 47536, 543, // datos de redes de payo
        ),
        createDinamicData(
            2022, 11, // diciembre
            222000, 300261, 121902, 45100, // datos de redes de santi peña
            251000, 47178, 10178, 0, // datos de redes de efrain
            335, 255897, 16975, 9924, // datos de redes de chila
            126000, 242413, 102361, 13900, // datos de redes de euclides
            585000, 83352, 47873, 10810, // datos de redes de payo
        ),
        createDinamicData(
            2023, 0, // enero
            228000, 307417, 127934, 51327, // datos de redes de santi peña
            254000, 48577, 12406, 0, // datos de redes de efrain
            357, 258479, 19532, 10053, // datos de redes de chila
            127000, 243303, 102174, 14184, // datos de redes de euclides
            586000, 84319, 47873, 10810,// datos de redes de payo
        ),
        createDinamicData(
            2023, 1, // febrero
            233000, 311146, 130454, 54165, // datos de redes de santi peña
            257000, 49575, 13484, 0, // datos de redes de efrain
            357, 259153, 20426, 10026, // datos de redes de chila
            127000, 243970, 102014, 17729, // datos de redes de euclides
            587000, 84962, 48509, 17708,// datos de redes de payo
        ),
        createDinamicData(
            2023, 2, // marzo
            237000, 313506, 135490, 55952, // datos de redes de santi peña
            258000, 50145, 14201, 0,  // datos de redes de efrain
            357, 259331, 21710, 10026, // datos de redes de chila
            127000, 243944, 103096, 20661, // datos de redes de euclides
            588000, 85391, 49578, 23279, // datos de redes de payo
        )
    ]

    /**
     * 
     * @param {*} filterCandidates  // array with the name of the candidates active
     * @param {*} data  // name of the candidate 
     * @param {*} filteredRed  // array with the name of the red active
     * @param {*} param // name of the red
     * @returns  // return true or false
     * @author Adán Vera
     */

    // validate serie data to show or hide 
    const validateHiden = (filterCandidates, data, filteredRed, param) => {

        // if filterCandidates includes santi then return false
        // and if filteredRed include param then return false
        if (filterCandidates.includes(data) && filteredRed.includes(param)) {
            return false
        } else {
            return true
        }
    }

    /// bloque de definiciones de santi peña

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // add color gradient to chart

    // Create santi series fb
    var santifb = chart.series.push(new am4charts.LineSeries());
    santifb.dataFields.valueY = "santifb";
    santifb.dataFields.dateX = "date";
    santifb.strokeWidth = 2;
    santifb.minBulletDistance = 10;
    santifb.tooltip.pointerOrientation = "vertical";
    //hide serie
    santifb.hidden = validateHiden(filterCandidates, 'santi', redActive, 'fb');
    // add color to the line displayed in the line chart
    santifb.stroke = am4core.color("#DD7969");
    santifb.fill = am4core.color("#DD7969");
    // add label to the line displayed in the line chart
    santifb.tooltipText = "Santi Peña"
    // add fill gradient to series
    santifb.fillOpacity = 0.04


    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    //add a dot bullet to the series
    var bullet = santifb.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create santi series tw
    var santitw = chart.series.push(new am4charts.LineSeries());
    santitw.dataFields.valueY = "santitw";
    santitw.dataFields.dateX = "date";
    santitw.strokeWidth = 2;
    santitw.minBulletDistance = 10;
    santitw.tooltip.pointerOrientation = "vertical";
    santitw.hidden = validateHiden(filterCandidates, 'santi', redActive, 'tw');
    // add color to the line displayed in the line chart
    santitw.stroke = am4core.color("#DD7969");
    santitw.fill = am4core.color("#DD7969");
    // add label to the line displayed in the line chart
    santitw.tooltipText = "Santi Peña"
    // add fill gradient to series
    santitw.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = santitw.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create santi series insta
    var santinsta = chart.series.push(new am4charts.LineSeries());
    santinsta.dataFields.valueY = "santinsta";
    santinsta.dataFields.dateX = "date";
    santinsta.strokeWidth = 2;
    santinsta.minBulletDistance = 10;
    santinsta.tooltip.pointerOrientation = "vertical";
    santinsta.hidden = validateHiden(filterCandidates, 'santi', redActive, 'insta');
    // add color to the line displayed in the line chart
    santinsta.stroke = am4core.color("#DD7969");
    santinsta.fill = am4core.color("#DD7969");
    // add label to the line displayed in the line chart
    santinsta.tooltipText = "Santi Peña"
    // add fill gradient to series
    santinsta.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = santinsta.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create santi series tk
    var santitk = chart.series.push(new am4charts.LineSeries());
    santitk.dataFields.valueY = "santitk";
    santitk.dataFields.dateX = "date";
    santitk.strokeWidth = 2;
    santitk.minBulletDistance = 10;
    santitk.tooltip.pointerOrientation = "vertical";
    // hide a serie
    santitk.hidden = validateHiden(filterCandidates, 'santi', redActive, 'tk');
    // add color to the line displayed in the line chart
    santitk.stroke = am4core.color("#DD7969");
    santitk.fill = am4core.color("#DD7969");
    // add label to the line displayed in the line chart
    santitk.tooltipText = "Santi Peña"
    // add fill gradient to series
    santitk.fillOpacity = 0.04

    //add a dot bullet to the santi series
    var bullet = santitk.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // adding series of efrain
    var efrafb = chart.series.push(new am4charts.LineSeries());
    efrafb.dataFields.valueY = "efrafb";
    efrafb.dataFields.dateX = "date";
    efrafb.strokeWidth = 2;
    efrafb.minBulletDistance = 10;
    efrafb.tooltip.pointerOrientation = "vertical";
    efrafb.hidden = validateHiden(filterCandidates, 'efrain', redActive, 'fb');
    // add color to the line displayed in the line chart
    efrafb.stroke = am4core.color("#966AA7");
    efrafb.fill = am4core.color("#966AA7");
    // add label to the line displayed in the line chart
    efrafb.tooltipText = "Efrain Alegre"
    // add fill gradient to series
    efrafb.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = efrafb.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create efrain series tw
    var efratw = chart.series.push(new am4charts.LineSeries());
    efratw.dataFields.valueY = "efratw";
    efratw.dataFields.dateX = "date";
    efratw.strokeWidth = 2;
    efratw.minBulletDistance = 10;
    efratw.tooltip.pointerOrientation = "vertical";
    efratw.hidden = validateHiden(filterCandidates, 'efrain', redActive, 'tw');
    // add color to the line displayed in the line chart
    efratw.stroke = am4core.color("#966AA7");
    efratw.fill = am4core.color("#966AA7");
    // add label to the line displayed in the line chart
    efratw.tooltipText = "Efrain Alegre"
    // add fill gradient to series
    efratw.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = efratw.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create efrain series insta
    var efrainsta = chart.series.push(new am4charts.LineSeries());
    efrainsta.dataFields.valueY = "efrainsta";
    efrainsta.dataFields.dateX = "date";
    efrainsta.strokeWidth = 2;
    efrainsta.minBulletDistance = 10;
    efrainsta.tooltip.pointerOrientation = "vertical";
    efrainsta.hidden = validateHiden(filterCandidates, 'efrain', redActive, 'insta');
    // add color to the line displayed in the line chart
    efrainsta.stroke = am4core.color("#966AA7");
    efrainsta.fill = am4core.color("#966AA7");
    // add label to the line displayed in the line chart
    efrainsta.tooltipText = "Efrain Alegre"
    // add fill gradient to series
    efrainsta.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = efrainsta.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create efrain series tk
    var efratk = chart.series.push(new am4charts.LineSeries());
    efratk.dataFields.valueY = "efratk";
    efratk.dataFields.dateX = "date";
    efratk.strokeWidth = 2;
    efratk.minBulletDistance = 10;
    efratk.tooltip.pointerOrientation = "vertical";
    efratk.hidden = validateHiden(filterCandidates, 'efrain', redActive, 'tk');
    // add color to the line displayed in the line chart
    efratk.stroke = am4core.color("#966AA7");
    efratk.fill = am4core.color("#966AA7");
    // add label to the line displayed in the line chart
    efratk.tooltipText = "Efrain Alegre"
    // add fill gradient to series
    efratk.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = efratk.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // adding series of chila
    var chilafb = chart.series.push(new am4charts.LineSeries());
    chilafb.dataFields.valueY = "chilafb";
    chilafb.dataFields.dateX = "date";
    chilafb.strokeWidth = 2;
    chilafb.minBulletDistance = 10;
    chilafb.tooltip.pointerOrientation = "vertical";
    chilafb.hidden = validateHiden(filterCandidates, 'chila', redActive, 'fb');
    // add color to the line displayed in the line chart
    chilafb.stroke = am4core.color("#FF6F91");
    chilafb.fill = am4core.color("#FF6F91");
    // add label to the line displayed in the line chart
    chilafb.tooltipText = "Jose Luis Chilavert"
    // add fill gradient to series
    chilafb.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = chilafb.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create chila series tw
    var chilatw = chart.series.push(new am4charts.LineSeries());
    chilatw.dataFields.valueY = "chilatw";
    chilatw.dataFields.dateX = "date";
    chilatw.strokeWidth = 2;
    chilatw.minBulletDistance = 10;
    chilatw.tooltip.pointerOrientation = "vertical";
    chilatw.hidden = validateHiden(filterCandidates, 'chila', redActive, 'tw');
    // add color to the line displayed in the line chart
    chilatw.stroke = am4core.color("#FF6F91");
    chilatw.fill = am4core.color("#FF6F91");
    // add label to the line displayed in the line chart
    chilatw.tooltipText = "Jose Luis Chilavert"
    // add fill gradient to series
    chilatw.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = chilatw.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create chila series insta
    var chilainsta = chart.series.push(new am4charts.LineSeries());
    chilainsta.dataFields.valueY = "chilainsta";
    chilainsta.dataFields.dateX = "date";
    chilainsta.strokeWidth = 2;
    chilainsta.minBulletDistance = 10;
    chilainsta.tooltip.pointerOrientation = "vertical";
    chilainsta.hidden = validateHiden(filterCandidates, 'chila', redActive, 'insta');
    // add color to the line displayed in the line chart
    chilainsta.stroke = am4core.color("#FF6F91");
    chilainsta.fill = am4core.color("#FF6F91");
    // add label to the line displayed in the line chart
    chilainsta.tooltipText = "Jose Luis Chilavert"
    // add fill gradient to series
    chilainsta.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = chilainsta.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create chila series tk
    var chilatk = chart.series.push(new am4charts.LineSeries());
    chilatk.dataFields.valueY = "chilatk";
    chilatk.dataFields.dateX = "date";
    chilatk.strokeWidth = 2;
    chilatk.minBulletDistance = 10;
    chilatk.tooltip.pointerOrientation = "vertical";
    chilatk.hidden = validateHiden(filterCandidates, 'chila', redActive, 'tk');
    // add color to the line displayed in the line chart
    chilatk.stroke = am4core.color("#FF6F91");
    chilatk.fill = am4core.color("#FF6F91");
    // add label to the line displayed in the line chart
    chilatk.tooltipText = "Jose Luis Chilavert"
    // add fill gradient to series
    chilatk.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = chilatk.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // adding series of eucli
    var euclifb = chart.series.push(new am4charts.LineSeries());
    euclifb.dataFields.valueY = "euclifb";
    euclifb.dataFields.dateX = "date";
    euclifb.strokeWidth = 2;
    euclifb.minBulletDistance = 10;
    euclifb.tooltip.pointerOrientation = "vertical";
    euclifb.hidden = validateHiden(filterCandidates, 'euclides', redActive, 'fb');
    // add color to the line displayed in the line chart
    euclifb.stroke = am4core.color("#FF9671");
    euclifb.fill = am4core.color("#FF9671");
    // add label to the line displayed in the line chart
    euclifb.tooltipText = "Euclides Acevedo"
    // add fill gradient to series
    euclifb.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = euclifb.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create eucli series tw
    var euclitw = chart.series.push(new am4charts.LineSeries());
    euclitw.dataFields.valueY = "euclitw";
    euclitw.dataFields.dateX = "date";
    euclitw.strokeWidth = 2;
    euclitw.minBulletDistance = 10;
    euclitw.tooltip.pointerOrientation = "vertical";
    euclitw.hidden = validateHiden(filterCandidates, 'euclides', redActive, 'tw');
    // add color to the line displayed in the line chart
    euclitw.stroke = am4core.color("#FF9671");
    euclitw.fill = am4core.color("#FF9671");
    // add label to the line displayed in the line chart
    euclitw.tooltipText = "Euclides Acevedo"
    // add fill gradient to series
    euclitw.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = euclitw.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create eucli series insta
    var eucliinsta = chart.series.push(new am4charts.LineSeries());
    eucliinsta.dataFields.valueY = "eucliinsta";
    eucliinsta.dataFields.dateX = "date";
    eucliinsta.strokeWidth = 2;
    eucliinsta.minBulletDistance = 10;
    eucliinsta.tooltip.pointerOrientation = "vertical";
    eucliinsta.hidden = validateHiden(filterCandidates, 'euclides', redActive, 'insta');
    // add color to the line displayed in the line chart
    eucliinsta.stroke = am4core.color("#FF9671");
    eucliinsta.fill = am4core.color("#FF9671");
    // add label to the line displayed in the line chart
    eucliinsta.tooltipText = "Euclides Acevedo"
    // add fill gradient to series
    eucliinsta.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = eucliinsta.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create eucli series tk
    var euclitk = chart.series.push(new am4charts.LineSeries());
    euclitk.dataFields.valueY = "euclitk";
    euclitk.dataFields.dateX = "date";
    euclitk.strokeWidth = 2;
    euclitk.minBulletDistance = 10;
    euclitk.tooltip.pointerOrientation = "vertical";
    euclitk.hidden = validateHiden(filterCandidates, 'euclides', redActive, 'tk');
    // add color to the line displayed in the line chart
    euclitk.stroke = am4core.color("#FF9671");
    euclitk.fill = am4core.color("#FF9671");
    // add label to the line displayed in the line chart
    euclitk.tooltipText = "Euclides Acevedo"
    // add fill gradient to series
    euclitk.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = euclitk.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // adding series of payo
    var payofb = chart.series.push(new am4charts.LineSeries());
    payofb.dataFields.valueY = "payofb";
    payofb.dataFields.dateX = "date";
    payofb.strokeWidth = 2;
    payofb.minBulletDistance = 10;
    payofb.tooltip.pointerOrientation = "vertical";
    payofb.hidden = validateHiden(filterCandidates, 'payo', redActive, 'fb');
    // add color to the line displayed in the line chart
    payofb.stroke = am4core.color("#FFC75F");
    payofb.fill = am4core.color("#FFC75F");
    // add label to the line displayed in the line chart
    payofb.tooltipText = "Payo Cubas"
    // add fill gradient to series
    payofb.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = payofb.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create payo series tw
    var payotw = chart.series.push(new am4charts.LineSeries());
    payotw.dataFields.valueY = "payotw";
    payotw.dataFields.dateX = "date";
    payotw.strokeWidth = 2;
    payotw.minBulletDistance = 10;
    payotw.tooltip.pointerOrientation = "vertical";
    payotw.hidden = validateHiden(filterCandidates, 'payo', redActive, 'tw');
    // add color to the line displayed in the line chart
    payotw.stroke = am4core.color("#FFC75F");
    payotw.fill = am4core.color("#FFC75F");
    // add label to the line displayed in the line chart
    payotw.tooltipText = "Payo Cubas"
    // add fill gradient to series
    payotw.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = payotw.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create payo series insta
    var payoinsta = chart.series.push(new am4charts.LineSeries());
    payoinsta.dataFields.valueY = "payoinsta";
    payoinsta.dataFields.dateX = "date";
    payoinsta.strokeWidth = 2;
    payoinsta.minBulletDistance = 10;
    payoinsta.tooltip.pointerOrientation = "vertical";
    payoinsta.hidden = validateHiden(filterCandidates, 'payo', redActive, 'insta');
    // add color to the line displayed in the line chart
    payoinsta.stroke = am4core.color("#FFC75F");
    payoinsta.fill = am4core.color("#FFC75F");
    // add label to the line displayed in the line chart
    payoinsta.tooltipText = "Payo Cubas"
    // add fill gradient to series
    payoinsta.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = payoinsta.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // Create payo series tk
    var payotk = chart.series.push(new am4charts.LineSeries());
    payotk.dataFields.valueY = "payotk";
    payotk.dataFields.dateX = "date";
    payotk.strokeWidth = 2;
    payotk.minBulletDistance = 10;
    payotk.tooltip.pointerOrientation = "vertical";
    payotk.hidden = validateHiden(filterCandidates, 'payo', redActive, 'tk');
    // add color to the line displayed in the line chart
    payotk.stroke = am4core.color("#FFC75F");
    payotk.fill = am4core.color("#FFC75F");
    // add label to the line displayed in the line chart
    payotk.tooltipText = "Payo Cubas"
    // add fill gradient to series
    payotk.fillOpacity = 0.04

    //add a dot bullet to the series
    var bullet = payotk.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.strokeWidth = 3;
    bullet.circle.fill = am4core.color("#fff");

    // add 
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.toBack();

    // change chart font family to Nunito san bold
    chart.fontFamily = "Nunito Sans";
    chart.fontSize = 12;
    chart.fontWeight = "bold";
    
    setTimeout(() => {
        setShowData(true);
    }, 2500);

    const renderData = (redesValidation, dataValidation) => {
        if (redesValidation && dataValidation) {
            return (
                <>
                    {
                        dataValidation &&
                        <>
                            <Row>
                                <Col xs={12} md={12} lg={12} className='mt-3 mb-3'>
                                    <div className='d-flex justify-content-evenly'>
                                        {
                                            filterCandidates.includes('santi') &&
                                            <div className='names santi'>
                                                Santi
                                            </div>
                                        }
                                        {
                                            filterCandidates.includes('efrain') &&
                                            <div className='names efra'>
                                                Efrain
                                            </div>
                                        }
                                        {
                                            filterCandidates.includes('chila') &&
                                            <div className='names chila'>
                                                Chilavert
                                            </div>
                                        }
                                        {
                                            filterCandidates.includes('euclides') &&
                                            <div className='names eucli'>
                                                Euclides
                                            </div>
                                        }
                                        {
                                            filterCandidates.includes('payo') &&
                                            <div className='names payo'>
                                                Payo
                                            </div>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {
                                redesValidation === false &&
                                <div className='nodatared'>
                                    <img src={nodata} alt='loading' />
                                </div>
                            }
                            {
                                (showData) &&
                                <>
                                    <div id="chartdiv" ></div>
                                </>
                            }
                        </>
                    }
                </>
            )
        } else {
            return (
                <Row className="nodata">
                    <img
                        src={nodata}
                    />
                </Row>
            )
        }
    }

    return (
        <>
            {
                renderData(redesValidation, dataValidation)
            }
        </>
    )

}

export default RedesData