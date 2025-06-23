import Image from "next/image";

import BookApp from "../pages/BookApp/BookApp";
import Header from "../components/Header";
import "./globals.css";
export default function Home() {
  return (
    <div>
      <Header />
      <BookApp />
    </div>
  );
}
