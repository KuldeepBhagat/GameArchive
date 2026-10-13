import Header from "./HomePageComponents/Header";
import Highlights from "./HomePageComponents/HighlightBoard";
import FeaturedOffers from "./HomePageComponents/FeaturedOffers";
import RandomOffers from "./HomePageComponents/RandomOffers";
import RandomProducts from "./HomePageComponents/RandomProducts";

export default function Home() {

  return (
    <div className="min-h-dvh flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col min-h-screen">
        <Header />
        <main className=" w-full flex flex-col items-center flex-1 gap-2 mt-2 px-2">
          <Highlights />
          <FeaturedOffers />
          <RandomOffers />
          <RandomProducts />
        </main>
      </div>
      <footer className="min-h-30 w-full bg-amber-300">
        Footer
      </footer>
    </div>
  );
}