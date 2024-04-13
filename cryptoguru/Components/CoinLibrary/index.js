import { CoinsTable } from "../CoinTable/CoinTable";

import { useRouter } from "next/router";
import { Container, Typography, Box } from "@mui/material";

import { MultiCarousel } from "../MultiCarousel";

export function CoinLibrary({}) {
  // const router = useRouter();
  // const { query } = router;

  //   const [favoriteFilms, setFavoriteFilms] = useState([]);
  //   const [showFavorites, setShowFavorites] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [releaseYear, setReleaseYear] = useState(query.releaseYear || 2020); // Reading releaseYear from query object or when user changes state

  // Retrieve favorite films from localStorage on mount
  //   useEffect(() => {
  //     const storedFavoriteFilms = localStorage.getItem("favoriteFilms");
  //     if (storedFavoriteFilms) {
  //       setFavoriteFilms(JSON.parse(storedFavoriteFilms));
  //     }
  //   }, []);

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          style={{
            marginTop: 20,
            justifyContent: "center",
            display: "flex",
            color: "goldenrod",
          }}
        >
          🔥🚀📈Trending Coins📉🥶⚰️
        </Typography>
      </Container>
      <MultiCarousel />
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100dvw",
          position: "fixed",
          bottom: 24,
        }}
      > */}
      {/* <SyncChart /> */}

      {/*  */}
      {/* <Carousel coins={coinsToDisplay} /> */}
      {/* <CoinsTable /> */}
      {/* <LineChartConnectNulls /> */}
      <Container>
        {/* <MinMaxExample /> */}
        <CoinsTable />

        {/* <div className={styles.container}>
        <div className={styles.coinList}>
          <div className={styles.coinRows}>
            {coinsToDisplay.map((coin) => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </div>
        </div>
        <div className={styles.coinsTable}></div>
        <CoinsTable />
      </div> */}
      </Container>
      {/* </Box> */}
    </>
  );
}
