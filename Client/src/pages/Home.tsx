import Header from "./HomePageComponents/Header";
import Highlights from "./HomePageComponents/HighlightBoard";
import FeaturedOffers from "./HomePageComponents/FeaturedOffers";
import RandomOffers from "./HomePageComponents/RandomOffers";

export default function Home() {

  return (
    <div className="min-h-dvh flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col min-h-screen">
        <Header />
        <main className=" w-full flex flex-col items-center flex-1 gap-2 mt-2">
          <Highlights />
          <div>
            <FeaturedOffers />
          </div>
          <div>
             <RandomOffers />
          </div>
          <div>
            random products 
          </div>
        </main>
      </div>
      <footer className="min-h-30 w-full bg-amber-300">
        Footer
      </footer>
    </div>
  );
}