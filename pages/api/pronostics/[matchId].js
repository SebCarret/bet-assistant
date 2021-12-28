import request from 'sync-request';

const matchDetails = async (req, res) => {

    // ID d'un match précis
    const { matchId } = req.query;

    try {
        // Requête API football
        const apiRequest = await request('GET', `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${matchId}`, {
            headers: { 'x-rapidapi-key': process.env.API_FOOTBALL_KEY, 'x-rapidapi-host': 'api-football-v1.p.rapidapi.com/v3/' }
        });
        const results = await JSON.parse(apiRequest.body);

        // 5 derniers résultats des 2 équipes
        let lastHomeResults = results.response[0].teams.home.league.form;
        lastHomeResults = lastHomeResults.slice(lastHomeResults.length - 5);
        let lastAwayResults = results.response[0].teams.away.league.form;
        lastAwayResults = lastAwayResults.slice(lastAwayResults.length - 5);

        // Stats équipe à domicile
        const homeStats = {
            played: results.response[0].teams.home.league.fixtures.played.home,
            win: results.response[0].teams.home.league.fixtures.wins.home,
            draw: results.response[0].teams.home.league.fixtures.draws.home,
            lose: results.response[0].teams.home.league.fixtures.loses.home,
        };

        // Stats équipe à l'extérieur
        const awayStats = {
            played: results.response[0].teams.away.league.fixtures.played.away,
            win: results.response[0].teams.away.league.fixtures.wins.away,
            draw: results.response[0].teams.away.league.fixtures.draws.away,
            lose: results.response[0].teams.away.league.fixtures.loses.away,
        };

        // Objet final renvoyé au frontend
        const fixture = {
            home: {
                id: results.response[0].teams.home.id,
                team: results.response[0].teams.home.name,
                logo: results.response[0].teams.home.logo,
                lastResults: lastHomeResults.split(''),
                homeStats
            },
            away: {
                id: results.response[0].teams.away.id,
                team: results.response[0].teams.away.name,
                logo: results.response[0].teams.away.logo,
                lastResults: lastAwayResults.split(''),
                awayStats
            },
            predictions: {
                home: Number(results.response[0].predictions.percent.home.replace("%", "")),
                draw: Number(results.response[0].predictions.percent.draw.replace("%", "")),
                away: Number(results.response[0].predictions.percent.away.replace("%", ""))
            }
        };

        res.status(200).json({ success: true, fixture })
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
};

export default matchDetails;