import Link from "next/link";
import Image from "next/image";
import GuruPic from "../public/CryptoGuru.png";

export default function Home() {
  return (
    <div>
      <h1>Welcome to CryptoGuru</h1>
      <p>Get rich now!!</p>
      <Link href={`/coins`}>Go to were the action is💰💰💰</Link>
      <Image src={GuruPic} alt="Picture of the author" />
    </div>
  );
}
