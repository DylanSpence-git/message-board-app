import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import MessageBoardUI from '../components/MessageBoardUI';
import Footer from '../components/Footer';
import ky from 'ky-universal';

export async function getStaticProps(){
    let jsonData;

    try{
        jsonData = await ky(`${process.env.NEXT_PUBLIC_HOST}/api/messages`).json();
    } catch (err) {
        console.log('API Error: ' + err);
    }
    
    return{
        props:{
            jsonData
        }
    }
}

export default function Home({jsonData}) {
  return (
    <Container>
        <Row>
            <Col>
                <Header />
            </Col>
        </Row>
        <Row>
            <Col>
                <MessageBoardUI jsonData={jsonData}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Footer />
            </Col>
        </Row>
    </Container>
  )
}
