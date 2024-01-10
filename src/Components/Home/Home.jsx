import Header from "./Header";
import NewArrivals from "./NewArrivals";
import ReadMore from "./ReadMore";
import BasicInfo from "../Comman/BasicInfo";
import LovedByCostomer from "./LovedByCustomer";
import Reviews from "./Reviews";
import Gallerys from "../Comman/Gallerys";
import Footer from "../Comman/Footer";
import WatchFlawless from "./WatchFlawless";

export default function Home() {
  return (
    <>
      <Header />
      <NewArrivals />
      <ReadMore />
      <BasicInfo />
      <WatchFlawless />
      <LovedByCostomer />
      <Reviews />
      <Gallerys />
      <Footer />
    </>
  );
}
