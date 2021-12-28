import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Match.module.css';
import { Row, Col, Avatar, Typography, Progress, Divider, Button } from 'antd';
// Composant pour l'affichage des stats d'une équipe
import TeamCard from '../../components/TeamCard';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Match({ fixture }) {

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>My Bet Assistant</title>
        <meta name="description" content="Votre assistant dans vos choix de paris sportifs" />
        <link rel="icon" href="/betting.png" />
      </Head>
      <Row className={styles.row}>
        <Col xs={24} md={{ span: 18, offset: 3 }}>
          <Button icon={<ArrowLeftOutlined />} ghost type="primary" onClick={() => router.back()}>Retour à la liste</Button>
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col xs={24} md={{ span: 6, offset: 3 }}>
          <TeamCard type="home" fixture={fixture} />
        </Col>
        <Col xs={24} md={6}>
          <Divider style={{ padding: 10 }} orientation="center"><Avatar size={50} >VS</Avatar></Divider>
        </Col>
        <Col xs={24} md={6}>
          <TeamCard type="away" fixture={fixture} />
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col className={styles.prediction} xs={8} md={{ span: 6, offset: 3 }}>
          <Paragraph>% victoire {fixture.home.team}</Paragraph>
          <Progress type="circle" percent={fixture.predictions.home} width={80} />
        </Col>
        <Col className={styles.prediction} xs={8} md={6}>
          <Paragraph>% match nul</Paragraph>
          <Progress type="circle" percent={fixture.predictions.draw} width={80} />
        </Col>
        <Col className={styles.prediction} xs={8} md={6}>
          <Paragraph>% victoire {fixture.away.team}</Paragraph>
          <Progress type="circle" percent={fixture.predictions.away} width={80} />
        </Col>
      </Row>
    </div>
  )
};

// requête API pour récupérer les stats d'un match
export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/api/pronostics/${params.id}`);
  const response = await request.json();
  return {
    props: { fixture: response.fixture }
  }
}
