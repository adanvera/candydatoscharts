import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Switch from "react-switch";

import nodata from './assets/images/nodata.png'
import imgsanti from './assets/images/candydatos/santipena.png'
import imgefrain from './assets/images/candydatos/efrain-1.png'
import imgchila from './assets/images/candydatos/chila.png'
import imgeuclides from './assets/images/candydatos/euclides-1.png'
import imgpayo from './assets/images/candydatos/payocubas.png'
import LineChart from './LineChart';
import Pie from './Pie';

const Metainfo = (props) => {

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

    function renderCharts(data) {
        if (data === false) {
            return <LineChart state={active} download={download} />
        } if (data === true) {
            return <Pie state={active} download={download} />
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
                        renderCharts(changeView)
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

export default Metainfo