import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Home } from "./Home";
import { Manufacturers } from "./Manufacturers";
import { BeerDetails } from "./BeerDetails";
import { ManufacturersDetails } from "./ManufacturersDetails";
import { AddProduct } from "./AddProduct";
import { AddManufacturer } from "./AddManufacturer";
import { EditManufacturer } from "./EditManufacturer";
import { EditProduct } from "./EditProduct";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import axios from "axios";
import { useCookies } from "react-cookie";
import { NoMatch } from "./NoMatch";

export function Main() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(null);
  const getUser = async () => {
    if (cookies.jwt) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          {
            withCredentials: true,
          }
        );
        setUser(data);
        setAuth(true);
        if (data.status === false) {
          removeCookie("jwt");
          setAuth(false);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAuth(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, [cookies, removeCookie, auth]);

  const NavLayout = () => (
    <>
      <NavBar info={user?.user} />
      <Outlet />
    </>
  );
  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<NavLayout />}>
            <Route path="/" element={<Home info={user?.user} />} />
            <Route path="/manufacturers" element={<Manufacturers />} />
            <Route
              path="/beerdetails/:id"
              element={<BeerDetails info={user?.user} />}
            />
            <Route
              path="/manufacturersdetails/:id"
              element={<ManufacturersDetails info={user?.user} />}
            />
            {user?.user.admin && (
              <>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addmanufacturer" element={<AddManufacturer />} />
                <Route path="/edit/:id" element={<EditManufacturer />} />
                <Route path="/editproduct/:id" element={<EditProduct />} />
              </>
            )}
          </Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </>
      )}
      <Route element={<NoMatch />} />
    </Routes>
  );
}
