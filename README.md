Bet-assistant is a [Next.js](https://nextjs.org/) project created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and customized with [`Ant Design`](https://ant.design/)

## Before Starting

This app uses [API Football](https://www.api-football.com/) to get predictions on a fixture.

First, create an account and get your free API key.

Then, create a `env.local` file at the root of your folder, and add your API key like on the `env.example` file :

```
API_FOOTBALL_KEY = 'Your API football key here'
```

## Getting Started

Once your API key is set, install node modules :

```
npm install
```

Then start the app :

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The first page you can see on launch is `pages/index.js`, which displays a list of incoming matchs in Ligue 1 (french championship).

When you click on details button, a Football API endpoint is called. You can edit it on `pages/api/pronostics/[matchId].js`.

A new page with teams statistics is also displayed, feel free tu customize it on `pages/match/[id].js`!

## Learn More

To learn more about this app, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Ant Design components](https://ant.design/components/overview/) - learn about Ant Design components.
- [Football API Documentation](https://www.api-football.com/documentation-v3#operation/get-predictions) - learn about predictions endpoint.