import { CoinsTable } from "../CoinTable/CoinTable";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Box, Button } from "@mui/material";
import useSWR from "swr";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import { MultiCarousel } from "../MultiCarousel";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";

export function CoinLibrary({}) {
  // const router = useRouter();
  // const { query } = router;

  const [favoriteCoins, setFavoriteCoins] = useState([]);
  // const [topCoins, setTopCoins] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");

  // Retrieve favorite coins from localStorage on mount
  // useEffect(() => {
  //   const storedFavoriteCoins = localStorage.getItem("favoriteCoins");
  //   if (storedFavoriteCoins) {
  //     setFavoriteCoins(JSON.parse(storedFavoriteCoins));
  //   }
  // }, []);

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
  const { data: topCoinsData, error } = useSWR(URL, fetcher);

  console.log("TopCoinsData : ", topCoinsData);
  console.log(error);

  if (error) return <div>Failed to load Top Coins</div>;
  if (!topCoinsData) return <div>Loading...</div>;

  const filteredCoinsData = topCoinsData?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // const coinsToDisplay = showFavorites ? favoriteCoins : topCoins;

  //   if (coin && coin.id) {
  //     const updatedFavoriteCoins = [...favoriteCoins, coin];
  //     setFavoriteCoins(updatedFavoriteCoins);
  //     console.log("favorites:", updatedFavoriteCoins);
  //   }
  //   // localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavoriteCoins));
  // };
  // const addToFaves = (coin) => {
  //   const updatedCoin = { ...coin, isFavorite: true }; // Update isFavorite property
  //   const updatedFavoriteCoins = [...favoriteCoins, updatedCoin];
  //   setFavoriteCoins(updatedFavoriteCoins);
  //   console.log("faves:", updatedFavoriteCoins);
  //   console.log("favedetail:", updatedCoin.isFavorite);
  //   // Update the isFavorite property of the corresponding coin in the topCoins array
  //   const updatedTopCoins = topCoins.map((c) =>
  //     c.id === coin.id ? updatedCoin : c
  //   );
  //   setTopCoins(updatedTopCoins);

  //   console.log("faves:", updatedFavoriteCoins);

  //   // localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavoriteCoins));

  //   // Update isFavorite property for the added coin
  //   //   const updatedCoins = coinsToDisplay.map((c) =>
  //   //     c.id === coin.id ? { ...c, isFavorite: true } : c
  //   //   );
  //   //   setCoinsToDisplay(updatedCoins);
  // };
  const updateFavorites = (coin) => {
    const isFavorite = favoriteCoins.some((c) => c.id === coin.id);
    if (isFavorite) {
      setFavoriteCoins(favoriteCoins.filter((c) => c.id !== coin.id));
      // localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavorites));
    } else {
      setFavoriteCoins([...favoriteCoins, { ...coin, isFavorite: true }]);
      // localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavorites));
    }
    console.log("favorites:", favoriteCoins);
  };

  // const updateFavorites = (coin) => {
  //   if (coin && coin.id) {
  //     const isFavorite = favoriteCoins.some((c) => c.id === coin.id);
  //     let updatedFavorites;
  //     if (isFavorite) {
  //       updatedFavorites = favoriteCoins.filter((c) => c.id !== coin.id);
  //     } else {
  //       updatedFavorites = [...favoriteCoins, { ...coin, isFavorite: true }];
  //     }
  //     setFavoriteCoins(updatedFavorites);
  //     localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavorites));
  //   }
  // };

  // const removeFromFaves = (coin) => {
  //   const updatedFavoriteCoins = favoriteCoins.filter((c) => c.id !== coin.id);
  //   setFavoriteCoins(updatedFavoriteCoins);
  //   console.log("favesremoved:", updatedFavoriteCoins);
  //   // localStorage.setItem("favoriteCoins", JSON.stringify(updatedFavoriteCoins));
  //   // Update the isFavorite property of the corresponding coin in the topCoins array
  //   const updatedTopCoins = topCoins.map((c) =>
  //     c.id === coinToRemove.id ? { ...c, isFavorite: false } : c
  //   );
  //   setTopCoins(updatedTopCoins);
  // };

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const coinsToDisplay = showFavorites
    ? favoriteCoins
    : filteredCoinsData.map((coin) => ({
        ...coin,
        isFavorite: favoriteCoins.some((c) => c.id === coin.id),
      }));
  // const coinsToDisplay = topCoinsData
  //   ? showFavorites
  //     ? favoriteCoins.slice((page - 1) * 10, page * 10)
  //     : filteredCoinsData.map((coin) => ({
  //         ...coin,
  //         isFavorite: favoriteCoins.some((c) => c.id === coin.id),
  //       }))
  //   : [];
  const pageCount = Math.ceil((coinsToDisplay?.length || 0) / 10);
  console.log("pagecount:", pageCount);

  return (
    <>
      <Container>
        <Typography
          variant="h3"
          style={{
            marginTop: 20,
            justifyContent: "center",
            display: "flex",
            color: "magenta",
            fontWeight: "bold",
          }}
        >
          🔥🚀📈Trending Coins📉🥶⚰️
        </Typography>
      </Container>
      <MultiCarousel />

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={toggleFavorites}
            startIcon={<SavingsTwoToneIcon />}
          >
            {showFavorites ? "Show All" : "Show Favorites"}
          </Button>
        </Box>
        <CoinsTable
          coins={coinsToDisplay}
          updateFavorites={updateFavorites}
          // addToFaves={addToFaves}
          // removeFromFaves={removeFromFaves}
          favoriteCoins={favoriteCoins}
          search={search}
          setSearch={setSearch}
          pageCount={pageCount}
        />
      </Container>
    </>
  );
}
