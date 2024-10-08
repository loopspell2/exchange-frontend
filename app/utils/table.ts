"use client";

import axios from "axios";

const BASE_URL = "http://localhost:5001";

export async function getTable(){
    const data = await axios.get(`${BASE_URL}/table`)
    return data;
};

// function formatNumber(volume: number) {
//     if (volume >= 1e12) {
//         return (volume / 1e12).toFixed(2) + ' T'; // Trillion
//     } else if (volume >= 1e9) {
//         return (volume / 1e9).toFixed(2) + ' B'; // Billion
//     } else if (volume >= 1e6) {
//         return (volume / 1e6).toFixed(2) + ' M'; // Million
//     } else if (volume >= 1000) {
//         return (volume / 1000).toFixed(2) + ' K'; // Thousand
//     } else {
//         return volume.toString(); // No conversion for smaller values
//     }
// }

// const config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'https://price-indexer.workers.madlads.com/?ids=solana,usd-coin,pyth-network,jito-governance-token,tether,bonk,helium,helium-mobile,bitcoin,ethereum,dogwifcoin,jupiter-exchange-solana,parcl,render-token,tensor,wormhole,wen-4,cat-in-a-dogs-world,book-of-meme,raydium,hivemapper,kamino,drift-protocol,nyan,jeo-boden,habibi-sol,io,zeta,mother-iggy,sanctum-2,shuffle-2,pepe,shiba-inu,chainlink,uniswap,ondo-finance,holograph,starknet,matic-network,mon-protocol,blur,worldcoin-wld,polyhedra-network,unagi-token,layerzero,aave,lido-dao,matr1x,polygon-ecosystem-token',
// };

// interface Coin {
//     id: string;
//     symbol: string;
//     name: string;
//     image: string;
//     currencies: {
//       usd: {
//         price: number;
//         market_cap: number;
//         price_change_percentage_24hr: number;
//         volume: number;
//       };
//     };
//     high_24h: number;
//     low_24h: number;
//   }

// export async function getTable() {
//     try {
//         const response = await axios.request(config)

//         if (!response) {
//             console.error(response);
//             return null;
//         }

//         const simpleData = response.data.map((coin: Coin) => {
//             return {
//                 id: coin.id,
//                 symbol: coin.symbol,
//                 name: coin.name,
//                 image: coin.image,
//                 currentPrice: coin.currencies.usd.price,
//                 marketCap: formatNumber(coin.currencies.usd.market_cap),
//                 high24h: coin.high_24h.toFixed(5),
//                 low24h: coin.low_24h.toFixed(5),
//                 priceChange24h: coin.currencies.usd.price_change_percentage_24hr.toFixed(3),
//                 volume: formatNumber(coin.currencies.usd.volume),
//             };
//         });

//         // console.log(simpleData);

//         return simpleData;

//     } catch (err) {
//         console.error("error", err);
//         return null;
//     }
// }
