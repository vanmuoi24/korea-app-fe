import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import viVN from "antd/locale/vi_VN";
import RouteApp from "./router/RouteApp";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Bounce, ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <RouteApp />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
