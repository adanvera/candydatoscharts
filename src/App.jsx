import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import Metainfo from './Metainfo'
import { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import imgsanti from './assets/images/candydatos/santipena.png'
import imgefrain from './assets/images/candydatos/efrain-1.png'
import imgchila from './assets/images/candydatos/chila.png'
import imgeuclides from './assets/images/candydatos/euclides-1.png'
import imgpayo from './assets/images/candydatos/payocubas.png'
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

function App() {

  const [select, setSelect] = useState('plataforma')
  const [addClass, setAddClass] = useState(false)
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
        <Col className='justify-content-center d-flex md' >
          <div
            className={state.santi === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='santi'
            onClick={(e) => handleSetActive('santi')}
            style={{
              background: `url(${imgsanti})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <span>Santi Peña</span>
        </Col>
        <Col className='justify-content-center d-flex md' >
          <div
            className={state.efrain === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='sanefrainti'
            onClick={(e) => handleSetActive('efrain')}
            style={{
              background: `url(${imgefrain})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <span>Efraín Alegre</span>
        </Col>
        <Col className='justify-content-center d-flex md' >
          <div
            className={state.chila === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='chila'
            onClick={(e) => handleSetActive('chila')}
            style={{
              background: `url(${imgchila})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <span>Jose Luis Chilavert</span>
        </Col>
        <Col className='justify-content-center d-flex md' >
          <div
            className={state.euclides === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='euclides'
            onClick={(e) => handleSetActive('euclides')}
            style={{
              background: `url(${imgeuclides})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <span>Euclides Acevedo</span>
        </Col>
        <Col className='justify-content-center d-flex md' >
          <div
            className={state.payo === 'is-active' ? 'candydata is-active' : 'candydata'}
            id='payo'
            onClick={(e) => handleSetActive('payo')}
            style={{
              background: `url(${imgpayo})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
          <span>Payo Cubas</span>
        </Col>
      </>
    )


  }

  const handleScreenshot = async () => {
    const image = await htmlToImage.toPng(nodeRef.current);
    // you can use this image in any way you want
    console.log(image)
    let file = convertBase64ToFile(image, "image.png");
    saveAs(file, "image.png");
  };

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


  return (
    <div className="App">
      <Container className='main' ref={nodeRef} >
        <Row className='d-flex'>
          <Col md={5} className=''>
            <p className='titlehead'>Me gustaría ver datos sobre</p>
            <select className='select candy w-100' value={select} onChange={(e) => onChangeSelect(e)} >
              <option value="plataforma">SEGUIDORES EN PLATAFORMAS</option>
              <option value="meta">INVERSION EN META</option>
            </select>
          </Col>
          <Col md={7} id="itemca">
            <p className='titlecandidate'>Los candidatos</p>
            <Row className='selectcontainer'>
              {showImagesToSelect()}
            </Row>
          </Col>
        </Row>
        {
          select === 'plataforma' ?
            <>redes</>
            :
            <Metainfo state={state} />
        }
        <button onClick={handleScreenshot}>Take Screenshot</button>
      </Container>
    </div>
  )
}

export default App
