import { useState } from "react";

import { Header, Layout } from "./components";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
