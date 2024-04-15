import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Uh oh, that page doesn't exist.</h1>
      <Link href={`/coins`}>Head back to coins</Link>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <iframe
        src="https://giphy.com/embed/1lzNi9pLSJOrP0JkGQ"
        width="480"
        height="480"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/lost-searching-no-door-1lzNi9pLSJOrP0JkGQ">
          via GIPHY
        </a>
      </p>
    </div>
  );
}
