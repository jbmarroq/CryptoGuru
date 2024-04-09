import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to CryptoGuru</h1>
      <p>Get rich now!!</p>
      <Link href={`/coins`}>Go to were the action is💰💰💰</Link>
    </div>
  );
}
