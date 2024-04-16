import Link from "next/link";
import { Button } from "@mui/material";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Uh oh, that page doesn't exist.</h1>
      <Link href={`/coins`}>
        <Button variant="contained" color="secondary" size="large">
          Head back to Coinchest💰💰💰
        </Button>
      </Link>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <div style={{ padding: "30px", display: "flex", alignItems: "center" }}>
        <iframe
          src="https://giphy.com/embed/1lzNi9pLSJOrP0JkGQ"
          width="480"
          height="480"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/lost-searching-no-door-1lzNi9pLSJOrP0JkGQ">
          via GIPHY
        </a>
      </p>
    </div>
  );
}
