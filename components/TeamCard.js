import { Typography, Progress, Image, Card, Badge, Tooltip, Divider } from 'antd';
import { CheckCircleOutlined, MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from '../styles/Match.module.css';

const { Title } = Typography;

const TeamCard = (props) => {

    // type : domicile ou extérieur
    // fixture: statistiques d'un match
    const {type, fixture} = props;

    let logo = type === 'home' ? fixture.home.logo : fixture.away.logo;
    let lastResults = type === 'home' ? fixture.home.lastResults : fixture.away.lastResults;
    let teamStats = type === 'home' ? fixture.home.homeStats :  fixture.away.awayStats;

    return (
        <Card
            cover={<Image src={logo} width={80} alt="team logo" />}
            className={styles.card}
        >
            <div className={styles.cardBody}>
                <Title level={5}>5 derniers résultats</Title>
                <div className={styles.stats}>
                    {
                        lastResults.map((result, i) => {
                            let type;
                            let icon;
                            let score;
                            if (result == "W") {
                                type = "success";
                                icon = <CheckCircleOutlined style={{ color: '#52C41A' }} />;
                                score = "Victoire"
                            } else if (result == "D") {
                                type = "warning";
                                icon = <MinusCircleOutlined style={{ color: '#FAAC14' }} />;
                                score = "Nul"
                            } else {
                                type = "error";
                                icon = <CloseCircleOutlined style={{ color: '#FF4D4E' }} />
                                score = "Défaite"
                            };
                            return (
                                <Tooltip title={score} key={`team-result-${i}`}>
                                    <Badge count={icon} />
                                </Tooltip>
                            )
                        })
                    }
                </div>
                <Divider />
                <Title level={5}>{type === 'home' ? 'Performances à domicile' : 'Performances à l\'extérieur'}</Title>
                <div className={styles.progress}>
                    <Progress
                        percent={Math.round(teamStats.win / teamStats.played * 100)} size="small"
                        format={() => `${teamStats.win} victoires`}
                    />
                    <Progress
                        percent={Math.round(teamStats.draw / teamStats.played * 100)} size="small"
                        format={() => `${teamStats.draw} nuls`}
                    />
                    <Progress
                        percent={Math.round(teamStats.lose / teamStats.played * 100)} size="small"
                        format={() => `${teamStats.lose} défaites`}
                    />
                </div>
            </div>
        </Card>
    )
};

export default TeamCard;