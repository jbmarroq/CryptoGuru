import React, { useState, useEffect } from "react";
import { LineChart, Line } from "recharts";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SavingsIcon from "@mui/icons-material/Savings";

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
  Stack,
  Box,
  Pagination,
} from "@mui/material";

import { useRouter } from "next/router";

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

export function CoinsTable({
  coins,
  setSearch,
  search,
  pageCount,
  updateFavorites,

  // addToFaves,
  // removeFromFaves,
}) {
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handleRowClick = (coinId) => {
    router.push(`/coins/${coinId}`);
  };
  // const handleFavoriteClick = (e, coin) => {
  //   e.stopPropagation();
  //   console.log("cliked and funcs");
  //   if (coin.isFavorite) {
  //     removeFromFaves(coin);
  //   } else {
  //     addToFaves(coin);
  //   }
  // };
  const handleFavoriteClick = (e, coin) => {
    e.stopPropagation();
    updateFavorites(coin);
  };

  return (
    <Container
      sx={{
        backgroundColor: "pink",
        borderRadius: "0.5rem",
        marginBottom: "20px",
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginTop: 20,
          justifyContent: "center",
          display: "flex",
          color: "magenta",

          padding: "5px",
          // fontWeight: "bold",
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
            {coins.slice((page - 1) * 10, page * 10).map((coin) => (
              <TableRow
                hover
                sx={{ cursor: "pointer" }}
                key={coin.id}
                onClick={() => handleRowClick(coin.id)} //<Link to={`/coins/${coin.id}`}> <<=this changes layout
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <button
                        variant="text"
                        color="inherit"
                        sx={{ padding: 0 }}
                        onClick={(e) => handleFavoriteClick(e, coin)}
                      >
                        {coin.isFavorite ? (
                          <SavingsIcon color="secondary" />
                        ) : (
                          <SavingsOutlinedIcon color="secondary" />
                        )}
                      </button>
                    </Box>
                    <img
                      src={coin.image}
                      alt={`${coin?.name} Ticker`}
                      width={50}
                      height={50}
                    />
                    <Box
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Typography variant="subtitle1">{coin.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {coin.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </Stack>
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
                  {coin.price_change_percentage_24h != null
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : "N/A"}
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
                        time: index, // time is linearly increasing
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageCount >= 1 && (
        <Box
          sx={{
            mt: 1,
            justifyContent: "center",
            display: "flex",
            marginBottom: "40px",
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{
              mt: 1,
              justifyContent: "center",
              display: "flex",
              marginBottom: "40px",
            }}
            size="large"
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
}
