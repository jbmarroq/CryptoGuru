import Link from "next/link";
import Image from "next/image";
import GuruPic from "../public/CryptoGuru.png";
import { Button } from "@mui/material";
export default function Home() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to CryptoGuru</h1>
      <p>Get rich now!!</p>
      <Link href={`/coins`}>
        <Button variant="contained" color="secondary" size="large">
          Go to were the action is💰💰💰
        </Button>
      </Link>
      <Image src={GuruPic} alt="Picture of the CryptoGuru" priority />
    </div>
  );
}
