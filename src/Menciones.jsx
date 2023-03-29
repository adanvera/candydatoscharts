import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import nodata from './assets/images/nodata.png'
import LineChartMenciones from './LineChartMenciones'
import PieTwo from './PieTwo'

const Menciones = (props) => {

  const [showData, setShowData] = useState(false)
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

  //set true showData if some of the candidates is active
  useEffect(() => {
    if (filterCandidates.length > 0) {
      setShowData(true)
    }
  }, [filterCandidates])

  const [changeView, setChangeView] = useState(false)

  const changeViewChart = (data) => {
    if (data === false) {
      return <LineChartMenciones state={active} download={download} />
    } else {
      return <PieTwo state={active} download={download} />
    }
  }

  const dataValidation = filterCandidates.length > 0 ? true : false

  return (
    <>
      {
        dataValidation &&
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
            changeViewChart(changeView)
          }

        </>
      }
      {
        !dataValidation &&
        <Row className="nodata">
          <img
            src={nodata}
          />
        </Row>
      }
    </>
  )
}

export default Menciones