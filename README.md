# Open AI Chatbot

## Table of Contents

- [Description](#description)
  - [Client](#client)
  - [Server](#server)
- [Tech Stack](#tech-stack)
- [Features](#features-wait-until-gifs-load)
- [Open AI DALL·E 2 API](#open-ai-dall-e-2-api)
- [Database Structure](#database-structure)
  - [MongoDB](#mongodb)
  - [Cloudinary](#cloudinary)
- [Format Configuration](#format-configuration)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)

## Description

The Cryptocurrency Application is a comprehensive platform that provides in-depth information about the crypto world, including markets, exchanges, and the latest news. The application is built using [React](https://reactjs.org) and utilizes [Ant Design](https://ant.design) for the user interface design and [Styled Components](https://styled-components.com) for styling the components. The APIs used in the application are provided by [RapidAPI](https://rapidapi.com) and include both [Coinranking](https://rapidapi.com/CoinRanking/api/CoinRanking) and [Bing News Search](https://rapidapi.com/Bing/api/BingNewsSearch) APIs.

The application makes use of [Redux Toolkit](https://redux-toolkit.js.org) for managing API calls and retrieving data from the APIs. The data retrieved from the Coinranking API is used to provide real-time market data and price updates, allowing users to stay up-to-date with the latest trends and fluctuations in the crypto market. This information is presented to users in a clear and concise manner, making it easy for them to quickly understand the current state of the market.

In addition to market data, the application also provides access to the latest news and updates from the world of cryptocurrency. This is achieved through the integration of the Bing News Search API, which allows users to search for news articles related to specific cryptocurrencies, exchanges, or other relevant topics. The news articles are presented in a clean and readable format, making it easy for users to stay informed about the latest developments in the crypto world.

The use of [Chart.js](https://www.chartjs.org) allows for the visual representation of the market data, making it easy for users to understand and analyze trends and fluctuations in the crypto market. The combination of Redux Toolkit, Chart.js, and the RapidAPI APIs helps to ensure a fast and responsive user experience, allowing users to easily interact with the application and retrieve the information they need.

Overall, the cryptocurrency application provides a comprehensive and up-to-date understanding of the crypto world, making it an invaluable tool for anyone interested in investing in or following the world of cryptocurrency.

## Tech Stack

- [React](https://reactjs.org)
- [Ant Design](https://ant.design)
- [Styled Components](https://styled-components.com)
- [RapidAPI](https://rapidapi.com)
  - [Coinranking](https://rapidapi.com/CoinRanking/api/CoinRanking)
  - [Bing News Search](https://rapidapi.com/Bing/api/BingNewsSearch)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Chart.js](https://www.chartjs.org)

## Features (wait until GIFs load)

- View list of images

- Download images.

- Title and User included in each image.

- Create and post the image

- Random prompt to generate.

- View generated image before posting.

## Rapid API

### CoinRanking

- `cryptoApi.js`

The code defines four endpoints for the cryptocurrency application's API: getCryptos, getCryptoDetails, getCryptoHistory, and getExchanges. These endpoints are used to retrieve data from the Coinranking API, which provides real-time market data and price updates for various cryptocurrencies.

The getCryptos endpoint retrieves a list of cryptocurrencies, with the number of cryptocurrencies being limited by the count parameter.
The getCryptoDetails endpoint retrieves details for a specific cryptocurrency, identified by its coinId.
The getCryptoHistory endpoint retrieves historical data for a specific cryptocurrency, identified by its coinId, over a specified timeperiod.
The getExchanges endpoint retrieves a list of exchanges. Note that this endpoint requires a premium plan.
These endpoints are defined using the builder.query method, which allows for making GET requests to the API. The hooks exported by the API can be used in React components to access the data returned by these endpoints, providing a way to retrieve the latest information about the crypto market.

```
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

```

### Bing News Search

- `cryptoNewsApi.js`

The code defines a Redux Toolkit API for retrieving cryptocurrency news from the Bing News Search API. The API is used to fetch news articles related to a specific cryptocurrency, specified by the newsCategory parameter. The number of articles returned by the API is limited by the count parameter.

```
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

```

## Format Configuration

```

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}

```

## Folder Structure

```
.
|-- CrytoExchangeMockData.json
|-- README.md
|-- package-lock.json
|-- package.json
|-- public
|   |-- cryptoCurrency.png
|   |-- demoImage.webp
|   |-- favicon.ico
|   |-- index.html
|   |-- logo192.png
|   `-- manifest.json
`-- src
    |-- App.css
    |-- App.js
    |-- app
    |   `-- store.js
    |-- components
    |   |-- CryptoCurrencies.jsx
    |   |-- CryptoDetails.jsx
    |   |-- Exchanges.jsx
    |   |-- Homepage.jsx
    |   |-- LineChart.jsx
    |   |-- Loader.jsx
    |   |-- Navbar.jsx
    |   |-- News.jsx
    |   `-- index.js
    |-- images
    |   `-- cryptoCurrency.png
    |-- index.js
    |-- logo.svg
    `-- services
        |-- cryptoApi.js
        `-- cryptoNewsApi.js

```

## Environment Variables

- Generated key availiable in [CoinRanking](https://rapidapi.com/Coinranking/api/coinranking1) under section "Endpoint".

```
REACT_APP_RAPIDAPI_KEY =
REACT_APP_CRYPTO_RAPIDAPI_HOST =
REACT_APP_CRYPTO_API_URL =
```

- Generated key availiable in [Bing News Search](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1) under section "Endpoint".

```
REACT_APP_NEWS_API_URL = '
REACT_APP_NEWS_RAPIDAPI_HOST =
```
