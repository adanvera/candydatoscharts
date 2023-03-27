import './App.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
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

  // function show responsive images to select candidate 
  const showImagesToSelect = () => {
    return (
      <>
        <Col className={state.santi === 'is-active' ? 'justify-content-center active-text' : 'justify-content-center santi'}>
          <div
            className={state.santi === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='santi'
            onClick={(e) => handleSetActive('santi')}
          >
            <img src={imgsanti} />
          </div>
          <span>Santi Peña</span>
        </Col>
        <Col className={state.efrain === 'is-active' ? 'justify-content-center active-text' : 'justify-content-center efra '}>
          <div
            className={state.efrain === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='efrain'
            onClick={(e) => handleSetActive('efrain')}
          >
            <img src={imgefrain} />
          </div>
          <span>Efraín Alegre</span>
        </Col>
        <Col className={state.chila === 'is-active' ? 'justify-content-center active-text' : 'justify-content-center chila'}>
          <div
            className={state.chila === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='chila'
            onClick={(e) => handleSetActive('chila')}
          >
            <img src={imgchila} />
          </div>
          <div className='chila'>
            <span>Jose Luis</span>
            <span>Chilavert</span>
          </div>
        </Col>
        <Col className={state.euclides === 'is-active' ? 'justify-content-center active-text' : 'justify-content-center eucli '}>
          <div
            className={state.euclides === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='euclides'
            onClick={(e) => handleSetActive('euclides')}
          >
            <img src={imgeuclides} />
          </div>
          <div className='chila'>
            <span>Euclides</span>
            <span>Acevedo</span>
          </div>
        </Col>
        <Col className={state.payo === 'is-active' ? 'justify-content-center active-text' : 'justify-content-center payo '}>
          <div
            className={state.payo === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='payo'
            onClick={(e) => handleSetActive('payo')}
          >
            <img src={imgpayo} />
          </div>
          <span>Payo Cubas</span>
        </Col>
      </>
    )
  }


  // function to create image from html and download
  const handleScreenshot = async () => {
    const image = await htmlToImage.toJpeg(nodeRef.current)
    let file = convertBase64ToFile(image, "image.png");
    saveAs(file, "image.png");
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
    setModalShow(true);
  }

  useEffect(() => {
    if (modalShow) {
      setHideElements(true)
    } else {
      setHideElements(false)
    }
  }, [modalShow, hideElements])

  console.log(modalShow);

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 465,
  //   secure: false,
  //   auth: {
  //     user: 'candydatos@wumla.com',
  //     pass: 'p=kw-sR2XUKx',
  //   },
  // });

  // const emailHtml = render(<Email url="https://example.com" />);


  //   Username:	candydatos@wumla.com
  //   Password: p = kw - sR2XUKx
  // Incoming Server: mail.wumla.com
  // 		IMAP Port: 993 POP3 Port: 995
  // Outgoing Server: mail.wumla.com
  // 		SMTP Port: 465
  //   IMAP, POP3, and SMTP require authentication.

  function renderForm(data) {
    return (
      <Form>
        <Row className='formSendData'>
          <Col>
            <Form.Label>Nombre y apellido</Form.Label>
            <Form.Group className="mb-3" controlId="forName" required>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control type="email" placeholder="" required />
            </Form.Group>
          </Col>
        </Row>
        <Row className='formSendData'>
          <Col>
            <Form.Label>Telefono</Form.Label>
            <Form.Group className="mb-3" controlId="forPgone" required>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Tipo de uso:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">Investigación</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
        <Modal.Footer className='mt-4'>
          <Button className='regBtn' variant="primary" type="submit">
            REGISTRARSE
          </Button>
        </Modal.Footer>

      </Form>
    )
  }

  function ModalExport(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={logo} alt='logo' />
          </div>
          <h4>EXPORTA LA COMPARACIÓN</h4>
          <p>
            Descarga ahora como <span onClick={handleScreenshot} className='clickeed'>JPG</span>
          </p>
          <div className='separador'></div>
          <p>Registrate para descargar los datos</p>
          <p>en formato CSV/Excel</p>
          {renderForm(props.onHide)}
        </Modal.Body>
      </Modal>
    );
  }

  const renderButton = (hide, modal) => {
    // <Button className='mt-5' variant="primary" onClick={(e) => handleModal(e)}>Exportar datos</Button> : ''
    if (hide === true && modal === true) {
      return (
        <div>
          <img src={logo} alt='logo' />
        </div>
      )
    } else return <Button className='mt-5 pulse' variant="primary" onClick={(e) => handleModal(e)}>Exportar datos</Button>
  }

  return (
    <div className="App">
      <Container className='main' ref={nodeRef} >
        <Row className=''>
          <Col md={12} className='header'>
            <Row>
              <p className='titlehead'>Me gustaría ver datos sobre</p>
            </Row>
            <Row className='justify-content-center'>
              <Col md={5}>
                <Form.Select
                  // className='select candy'
                  className={select === 'seguidores'
                    ? 'select candy seguidores' :
                    select === 'meta' ? 'select candy meta' : 'select candy  plataforma'}
                  value={select}
                  onChange={(e) => onChangeSelect(e)}
                >
                  <option className='seguidores' value="seguidores">SEGUIDORES POR PLATAFORMA</option>
                  <option className='plataforma' value="plataforma">VOLUMEN DE MENCIONES</option>
                  <option className='meta' value="meta">INVERSION EN META</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt-3 mb-3'>
          <Col md={12} id="itemca">
            {
              modalShow === false &&
              <p className='titlecandidate'>Los candidatos</p>
            }

            <Row className='selectcontainer'>
              {showImagesToSelect()}
            </Row>
          </Col>
        </Row>
        {
          select === 'plataforma' &&
          <Menciones state={state} />
        }
        {
          select === 'seguidores' &&
          <Plataformas state={state} />
        }
        {
          select === 'meta' &&
          <Metainfo state={state} />
        }
        <ModalExport
          show={modalShow}
          onHide={() => setModalShow(false)}
          // no close when click outside
          backdrop="static"
        />
        {
          renderButton(hideElements, modalShow)
        }
      </Container>
    </div>
  )
}

export default App
