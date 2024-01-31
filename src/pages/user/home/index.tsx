import { BannerHome } from "./component/BannerHome";
import Catalogues from "./component/Catalogues";
import HomeNew from "./component/HomeNew";
import { Introduce } from "./component/Introduce";
import { ProductSpecial } from "./component/ProductSpecial";
import Solution from "./component/Solution";

function Home() {
  return (
    <div>
      <BannerHome />
      <Catalogues />
      <Introduce />
      <ProductSpecial />
      <Solution />
      <HomeNew />
    </div>
  );
}

export default Home;
