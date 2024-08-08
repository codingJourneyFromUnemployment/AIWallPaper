import Image from "next/image";
import Header from  "../components/header";
import Input from "../components/input";
import Wallpapers from "../components/wallpapers";
import Footer from "../components/footer";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Header />
      <Hero />
      <Input />
      <Wallpapers />
      <Footer />
    </div>
  );
}
