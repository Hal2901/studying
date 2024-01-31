import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import NotFound from "../pages/NotFound";
import { publicRoutes } from "../utils/routers";
import { Suspense, useEffect } from "react";
import Loading from "../pages/Loading";

const DefaultLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);
  return (
    <div>
      <Header />
      <div className="mt-[72px]">
        <Routes>
          {publicRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
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
      <Footer />
    </div>
  );
};

export default DefaultLayout;
