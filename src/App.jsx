import './App.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Metainfo from './Metainfo'
import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import imgsanti from './assets/images/candydatos/santipena.png'
import imgefrain from './assets/images/candydatos/efrain-1.png'
import imgchila from './assets/images/candydatos/chila.png'
import imgeuclides from './assets/images/candydatos/euclides-1.png'
import imgpayo from './assets/images/candydatos/payocubas.png'
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import logo from './assets/images/logo.png'
import Menciones from './Menciones';
import Plataformas from './Plataformas';
import { Box, DialogActions, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import compara from './assets/images/compara.png';
import caramelo from './assets/images/caramelo1.png'
import carametwo from './assets/images/caramelo2.png'
import caramethree from './assets/images/caramelo3.png'
import caramefour from './assets/images/caramelo4.png'

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     display: 'flex',
//     justifyContent: 'center',
//   },
// }));

const App = (props) => {

  const [select, setSelect] = useState('plataforma')
  const nodeRef = useRef(null);

  const onChangeSelect = (e) => {
    e.preventDefault();
    setSelect(e.target.value)
  }

  const intialState = {
    santi: '',
    efrain: '',
    chila: '',
    euclides: '',
    payo: '',
  }

  const [state, setState] = useState(intialState);

  const handleSetActive = (data) => {
    // add or remove class is-active
    if (state[data] === 'is-active') {
      setState({ ...state, [data]: '' })
    } else {
      setState({ ...state, [data]: 'is-active' })
    }
  }

  const [download, setDownload] = useState(false)

  // function show responsive images to select candidate  
  const showImagesToSelect = () => {
    return (
      <>
        <Col className={state.santi === 'is-active' ? 'justify-content-center active-text cont mt-1' : 'justify-content-center santi cont mt-1'}>
          <div
            className={state.santi === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='santi'
            onClick={(e) => handleSetActive('santi')}
          >
            <img src={imgsanti} />
          </div>
          <span className='etiqueta'>Santi</span>
          <span className='etiqueta'>Peña</span>
        </Col>
        <Col className={state.efrain === 'is-active' ? 'justify-content-center active-text cont mt-1' : 'justify-content-center efra  cont mt-1'}>
          <div
            className={state.efrain === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='efrain'
            onClick={(e) => handleSetActive('efrain')}
          >
            <img src={imgefrain} />
          </div>
          <span className='etiqueta'>Efraín</span>
          <span className='etiqueta'>Alegre</span>
        </Col>
        <Col className={state.chila === 'is-active' ? 'justify-content-center active-text cont mt-1' : 'justify-content-center chila cont mt-1'}>
          <div
            className={state.chila === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='chila'
            onClick={(e) => handleSetActive('chila')}
          >
            <img src={imgchila} />
          </div>
          <div className='chila'>
            <span className='etiqueta'>Jose Luis </span>
            <span className='etiqueta'>Chilavert</span>
          </div>
        </Col>
        <Col className={state.euclides === 'is-active' ? 'justify-content-center active-text cont mt-1' : 'justify-content-center eucli cont mt-1'}>
          <div
            className={state.euclides === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='euclides'
            onClick={(e) => handleSetActive('euclides')}
          >
            <img src={imgeuclides} />
          </div>
          <div className='chila'>
            <span className='etiqueta'>Euclides</span>
            <span className='etiqueta'>Acevedo</span>
          </div>
        </Col>
        <Col className={state.payo === 'is-active' ? 'justify-content-center active-text cont mt-1 ' : 'justify-content-center payo cont mt-1'}>
          <div
            className={state.payo === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='payo'
            onClick={(e) => handleSetActive('payo')}
          >
            <img src={imgpayo} />
          </div>
          <span className='etiqueta'>Payo</span>
          <span className='etiqueta'>Cubas</span>
        </Col>
      </>
    )
  }

  // function to create image from html and download
  const handleScreenshot = async () => {
    const image = await htmlToImage.toJpeg(nodeRef.current)
    let file = convertBase64ToFile(image, "image.jpg");
    saveAs(file, "image.jpg");
    setTimeout(() => {
      setHideElements(false)
    }, 15000);
  };

  // function to convert base64 to file
  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  }

  const [modalShow, setModalShow] = useState(false);
  const [hideElements, setHideElements] = useState(false)

  const handleModal = (e) => {
    e.preventDefault();
    setHideElements(true)
    setOpen(true)
    setModalShow(true);
  }

  useEffect(() => {
    if (open) {
      setHideElements(true)
    } else {
      setHideElements(false)
    }
  }, [modalShow, hideElements])

  // submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === '' || user.email === '' || user.phone === '' || user.uso === '') {
      alert('Completa todos los campos')
      return
    }

    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      uso: user.uso,
    }

    axios.post('https://sheet.best/api/sheets/d27a800a-841d-42e0-bd2b-de627f0f9993', data).then(response => {
      console.log(response);
      setName('');
      setAge('');
      setDesignation('');
      setSalary('');
    })

    setDataSended(true)
    setDownload(true)

  }

  const userState = {
    name: '',
    email: '',
    phone: '',
    uso: '',
  }

  const [user, setUser] = useState(userState)
  const [dataSended, setDataSended] = useState(false)

  const handleChange = (e) => {
    setUser(prevState => {
      const updatedValues = {
        ...prevState,
        [e.target.name]: e.target.value,
      }
      return { ...updatedValues };
    });
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const renderButton = (hide, modal) => {
    if (hide === true && modal === true) {
      return (
        <div>
          <img src={logo} alt='logo' />
        </div>
      )
    } else return <Button className='mt-5 pulse' variant="primary" onClick={(e) => handleModal(e)}>Exportar datos</Button>
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = (event, reason) => {
    event.preventDefault()
    setHideElements(false)
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    document.querySelectorAll('.object').forEach(function (move) {
      var speed = move.getAttribute('data-value');
      var x = (window.innerWidth - e.pageX * speed) / 100;
      var y = (window.innerHeight - e.pageY * speed) / 100;
      move.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  return (
    <div className="App">
      <Container isFluid={true} className={hideElements === true ? 'main bkpsc' : 'main'} ref={nodeRef} >
        <div className='ctimage'>
          <img src={caramelo} className='object' data-value="-2" id='caramelo1' />
          <img src={carametwo} className='object' data-value="-5" id='caramelo2' />
        </div>
        <section className='header-top mb-3'>
          <Row>
            <Col md={6} className='header'>
              <img src={logo} />
            </Col>
            <Col md={6} className='header'>
              <img src={compara} />
            </Col>
          </Row>
        </section>
        <Row className=''>
          <Col md={12} className='header'>
            <Row className='tophead'>
              <p className='titlehead'>ver datos sobre</p>
            </Row>
            <Row>
              <Col md={4}>
              </Col>
              <Col md={4} className={select === 'seguidores'
                ? 'select candy seguidores' :
                select === 'meta' ? 'select candy meta' : 'select candy  plataforma'}>
                <FormControl >
                  <Select
                    className={select === 'seguidores'
                      ? 'select candy seguidores' :
                      select === 'meta' ? 'select candy meta' : 'select candy  plataforma'}
                    value={select}
                    onChange={(e) => onChangeSelect(e)}
                  >
                    <MenuItem className={select === 'seguidores'
                      ? 'select candy seguidores' :
                      select === 'meta' ? 'select candy meta' : 'select candy  plataforma'} value="seguidores" id='seguidores'>SEGUIDORES POR PLATAFORMA</MenuItem>
                    <MenuItem className={select === 'seguidores'
                      ? 'select candy seguidores' :
                      select === 'meta' ? 'select candy meta' : 'select candy  plataforma'} value="plataforma" id='paltaforma'>VOLUMEN DE MENCIONES</MenuItem>
                    <MenuItem className={select === 'seguidores'
                      ? 'select candy seguidores' :
                      select === 'meta' ? 'select candy meta' : 'select candy  plataforma'} value="meta" id='meta' >INVERSION EN META</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col md={4} >
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt-3 mb-3'>
          <Col md={12} id="itemca">
            <p className='titlecandidate mb-4'>Seleccionar candidatos</p>
            <Row className='selectcontainer'>
              {showImagesToSelect()}
            </Row>
          </Col>
        </Row>
        {
          select === 'plataforma' &&
          <Menciones state={state} download={dataSended} />
        }
        {
          select === 'seguidores' &&
          <Plataformas state={state} download={dataSended} />
        }
        {
          select === 'meta' &&
          <Metainfo state={state} download={dataSended} />
        }
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableBackdropClick={true}
        >
          <Box sx={style}>
            <div>
              <img src={logo} alt='logo' />
            </div>
            <h4>EXPORTA LA COMPARACIÓN</h4>
            <p>
              <span onClick={handleScreenshot} className='clickeed'> Descarga ahora como JPG</span>
            </p>
            <DialogActions className='emete'>
              <Button className='btnnn mt-3' onClick={handleClose}>Cerrar</Button>
            </DialogActions>
          </Box>
        </Modal>
        {
          renderButton(hideElements, modalShow)
        }
        <footer className='footerimg'>
          <img src={caramethree} className='object' data-value="-2" id='caramelo3' />
          <img src={caramefour} className='object' data-value="-5" id='caramelo4' />
        </footer>
      </Container>
    </div>
  )
}

export default App
