import Image from "next/image";
import Header from  "../components/header";
import Input from "../components/input";
import Wallpapers from "../components/wallpapers";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Input />
      <Wallpapers />
      <Footer />
    </>
  );
}
