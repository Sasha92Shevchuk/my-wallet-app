import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Container, Main } from "./Layout.styled";
import { Suspense } from "react";
import { Loader } from "../../Loader/Loader";

export const Layout = () => {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loader />}>
        <Main>{<Outlet />}</Main>
      </Suspense>

      <Footer />
    </Container>
  );
};
