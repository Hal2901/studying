import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";
import { privateRoutes } from "../utils/routers";
import NavBar from "./components/NavBar";
import PrivateHeader from "./header/PrivateHeader";

const PrivateLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div>
      <PrivateHeader />
      <div className="flex bg-whiteFFF mt-[72px]">
        <NavBar />
        <div className="px-24 py-12 h-screen min-w-[572px] w-full overflow-y-scroll hidden-scroll">
          <Routes>
            {privateRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path.slice(9)}
                  element={
                    <Suspense fallback={<Loading />}>
                      <route.element />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
