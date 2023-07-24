import { lazy } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout/Layout";

const Home = lazy(() => import("./pages/Home/Home"));
const Information = lazy(() => import("./pages/Information/Information"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="info" element={<Information />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
