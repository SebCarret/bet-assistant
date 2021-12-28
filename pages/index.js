import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { Row, Col, Table, Image, Button, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

// données source pour les matchs
import Ligue1 from '../datas/ligue1_fixtures.json';

const { Title, Paragraph } = Typography;

export default function Home() {

  const [list, setList] = useState([]);
  const router = useRouter();

  // initialisation de la liste des matchs
  useEffect(() => {

    const { calendar } = Ligue1;

    let finalList = [];
    for (let match of calendar) {
      if (new Date() <= new Date(match.fixture.date)) {
        finalList.push({
          home: match.teams.home,
          date: match.fixture.date,
          away: match.teams.away,
          id: match.fixture.id,
        })
      }
    };
    finalList = finalList.sort((a, b) => new Date(a.date) - new Date(b.date));
    setList(finalList);
  }, []);

  const goToMatchPage = id => router.push(`/match/${id}`);

  // Paramétrage des colonnes du composant Table (Ant Design)
  const columns = [
    {
      title: '',
      dataIndex: 'home',
      key: 'home',
      responsive: ['md'],
      width: "200px",
      render: team => <Paragraph className={styles.homeName}>{team.name}</Paragraph>
    },
    {
      title: 'Home',
      dataIndex: 'home',
      key: 'home',
      render: team => <Image preview={false} src={team.logo} width={50} alt="home team logo" />
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => new Date(date).toLocaleDateString()
    },
    {
      title: 'Away',
      dataIndex: 'away',
      key: 'away',
      render: team => <Image preview={false} src={team.logo} width={50} alt="away team logo" />
    },
    {
      title: '',
      dataIndex: 'away',
      key: 'away',
      responsive: ['md'],
      width: "200px",
      render: team => <Paragraph className={styles.awayName}>{team.name}</Paragraph>
    },
    {
      title: 'Bet',
      dataIndex: 'id',
      key: 'id',
      render: id => <Button icon={<EyeOutlined />} type="primary" ghost onClick={() => goToMatchPage(id)}>DETAILS</Button>
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>My Bet Assistant</title>
        <meta name="description" content="Votre assistant dans vos choix de paris sportifs" />
        <link rel="icon" href="/betting.png" />
      </Head>
      <Row className={styles.row}>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <Title className={styles.title} level={3}>Sélectionnez un match pour voir les statistiques détaillées</Title>
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <Table showHeader={false} dataSource={list} columns={columns} />
        </Col>
      </Row>
    </div>
  )
};