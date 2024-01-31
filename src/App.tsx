import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css";
import ModalContextNode from "./context";
import DefaultLayout from "./layout/DefaultLayout";
import PrivateLayout from "./layout/PrivateLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="light"
        />
        <ModalContextNode>
          <Routes>
            <Route path="/*" element={<DefaultLayout />} />
            <Route path="/quan-ly/*" element={<PrivateLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ModalContextNode>
      </BrowserRouter>
    </>
  );
}

export default App;
