import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import nodata from './assets/images/nodata.png'


const Plataforma = (props) => {

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

  //set true showData if some of the candidates is active
  useEffect(() => {
    if (filterCandidates.length > 0) {
      setShowData(true)
    }
  }, [filterCandidates])

  am4core.useTheme(am4themes_animated);

  // Create chart
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.paddingRight = 20;

  // Generate random data
  var data = [];
  var value1 = 0;
  var value2 = 0;
  var value3 = 0;

  for (var i = 1; i < 200; i++) {
    value1 = Math.random();
    value2 = Math.random();
    value3 = Math.random();

    if (i % 30 == 0) {
      value1 += Math.random() * 10;
    }

    if (i % 25 == 0) {
      value2 += Math.random() * 15;
    }

    if (i % 50 == 0) {
      value3 += Math.random() * 20;
    }

    data.push({
      date: new Date(2018, 0, i),
      value1: value1,
      value2: value2,
      value3: value3
    });
  }

  chart.data = data;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.minWidth = 35;

  function createSeries(field, index, count) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = field;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.fillOpacity = 0.5;
    series.strokeWidth = 2;
    return series;
  }

  createSeries("value1", 0, 3);
  createSeries("value2", 1, 3);
  createSeries("value3", 2, 3);

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;

  var scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX = scrollbarX;


  return (
    <>
      {
        showData &&
        <div id="chartdiv"></div>

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

export default Plataforma