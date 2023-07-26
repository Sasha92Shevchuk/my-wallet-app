import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Container, Main } from "./Layout.styled";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Loader/Loader";

export const Layout = () => {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loader />}>
        <Main>{<Outlet />}</Main>
      </Suspense>
      <ToastContainer autoClose={3000} />
      <Footer />
    </Container>
  );
};
