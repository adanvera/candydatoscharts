import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import insta from './assets/images/icos/Instagram.png'
import tw from './assets/images/icos/Twitter.png'
import fb from './assets/images/icos/Facebook.png'
import tk from './assets/images/icos/TikTok.png'
import nodata from './assets/images/nodata.png'
import RedesData from './RedesData'


const Plataformas = (props) => {

    const intialState = {
        insta: '',
        tw: '',
        fb: '',
        tk: '',
    }

    const [state, setState] = useState(intialState);
    const [showData, setShowData] = useState(false)
    const download = props?.download

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

    const handleSetActive = (data) => {

        let blankState = {
            insta: '',
            tw: '',
            fb: '',
            tk: '',
        }

        setState({
            ...blankState,
            [data]: 'is-active'
        })
    }

    const filteredRedes = (data) => {
        let redes = []
        for (const key in data) {
            if (data[key] === 'is-active') {
                redes.push(key)
            }
        }
        return redes
    }

    const redes = filteredRedes(state)

    //set true showData if some of the candidates is active
    useEffect(() => {
        if (filterCandidates.length > 0) {
            setShowData(true)
        }
    }, [filterCandidates])

    const dataValidation = filterCandidates.length > 0 ? true : false

    const renderFilters = () => {
        return (
            <>
                <Row>
                    <Col className='d-flex mt-5 mb-5 justify-content-center' id='listfilter'>

                        <Row className='redeslist'>
                            <Col>
                                <p className='pr-5'>Seleccionar red social:</p>
                            </Col>
                            <Col className={state.insta === 'is-active' ? 'colorfull' : 'bkandwhite'} id='insta' onClick={(e) => handleSetActive('insta')}>
                                <img src={insta} />
                            </Col>
                            <Col className={state.tw === 'is-active' ? 'colorfull' : 'bkandwhite'} id='tw' onClick={(e) => handleSetActive('tw')}>
                                <img src={tw} />
                            </Col>
                            <Col className={state.fb === 'is-active' ? 'colorfull' : 'bkandwhite'} id='fb' onClick={(e) => handleSetActive('fb')}>
                                <img src={fb} />
                            </Col>
                            <Col className={state.tk === 'is-active' ? 'colorfull' : 'bkandwhite'} id='tk' onClick={(e) => handleSetActive('tk')}>
                                <img src={tk} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    const renderRedesData = (data) => {
        return (
            <RedesData state={active} redes={redes} download={download} />
        )
    }

    console.log(redes);

    return (
        <Container fluid={true} >
            <>
                {
                    (dataValidation) &&
                    <>
                        {renderFilters()}
                        {
                            renderRedesData(redes)
                        }
                    </>
                }
                {
                    (!dataValidation) &&
                    <Row className="nodata">
                        <img
                            src={nodata}
                        />
                    </Row>
                }
            </>
        </Container>
    )
}

export default Plataformas