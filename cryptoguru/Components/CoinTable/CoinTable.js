import React, { useState } from "react";
import { LineChart, Line } from "recharts";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import {
  Container,
  Card,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatNumber(number) {
  if (Math.abs(number) >= 1e9) {
    return (number / 1e9).toFixed(2) + " B";
  } else if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(2) + " M";
  } else {
    return number.toString();
  }
}
const calculateLineColor = (prices) => {
  if (prices.length < 2) return "blue"; // Default color

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  return firstPrice <= lastPrice ? "green" : "red"; // Green for uptrend, red for downtrend
};

export function CoinsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handleRowClick = (coinId) => {
    router.push(`/coins/${coinId}`);
  };

  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${aud}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`;
  //        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=${aud}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'; GET SPARKLINE!!!!
  const { data: topCoins, error } = useSWR(URL, fetcher);

  console.log("TopCoins : ", topCoins);
  console.log(error);
  if (error) return <div>Failed to load Top Coins</div>;
  if (!topCoins) return <div>Loading...</div>;

  const filteredCoins = topCoins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil((filteredCoins?.length || 0) / 10);

  return (
    <Container className="bg-pink-300 rounded-lg">
      <Typography
        variant="h4"
        style={{
          marginTop: 20,
          justifyContent: "center",
          display: "flex",
          color: "cyan",
        }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search for a Cryptocurrency"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Coin",
                "Price",
                "24h Change",
                "24h Volume",
                "Market Cap",
                "7D Chart",
              ].map((head) => (
                <TableCell key={head}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins?.slice((page - 1) * 10, page * 10).map((coin) => (
              // <Link href={`/coins/${coin.id}`} passHref>
              <TableRow
                hover
                sx={{ cursor: "pointer" }}
                key={coin.id}
                onClick={() => handleRowClick(coin.id)} //<Link to={`/coins/${coin.id}`}> <<=this changes layout
              >
                <TableCell
                //   style={{display: "flex",gap: 15,}}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={coin.image}
                      alt={`${coin?.name} Ticker`}
                      width={50}
                      height={50}
                    />
                    <div
                    //className="flex flex-col" //</TableCell>style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span>{coin.name}</span>
                      <br></br>
                      <span
                        className="text-gray-500" //style={{ color: "darkgrey" }}
                      >
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  AU$ {numberWithCommas(coin.current_price.toFixed(2))}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      coin.price_change_percentage_24h != null &&
                      coin.price_change_percentage_24h >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {
                    coin.price_change_percentage_24h != null
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A" /* Or any other placeholder text or UI element */
                  }
                </TableCell>
                <TableCell>AU$ {formatNumber(coin.total_volume)}</TableCell>
                <TableCell>AU$ {formatNumber(coin.market_cap)}</TableCell>
                <TableCell>
                  {coin.sparkline_in_7d && (
                    <LineChart
                      width={100}
                      height={100}
                      data={coin.sparkline_in_7d.price.map((price, index) => ({
                        price: price,
                        time: index, // Assuming the time is linearly increasing
                      }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={calculateLineColor(coin.sparkline_in_7d.price)}
                        strokeWidth={1}
                        dot={false}
                      />
                    </LineChart>
                  )}
                </TableCell>
              </TableRow>
              // </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          style={{
            marginTop: 10,
            justifyContent: "center",
            display: "flex",
          }}
          size="large"
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      )}
    </Container>
  );
}
