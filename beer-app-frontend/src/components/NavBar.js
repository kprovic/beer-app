import React, { useEffect } from "react";
import styles from "../assets/styles/NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

export function NavBar({ info }) {
  const [cookies, removeCookie] = useCookies([]);
  const logOut = () => {
    removeCookie("jwt");
  };
  useEffect(() => {});
  return (
    <div className={styles.navbar}>
      <div className={styles.logoBox}>
        <h1 className={styles.title}>BeerApp</h1>
        <FontAwesomeIcon icon={faBeerMugEmpty} className={styles.icon} />
      </div>
      <ul className={styles.list}>
        <Link to="/" className={styles.link}>
          <li className={styles.item}>Home</li>
        </Link>
        <Link to="/manufacturers" className={styles.link}>
          <li className={styles.item}>Manufacturers</li>
        </Link>
        {info?.admin ? (
          <>
            <Link to="/addproduct" className={styles.link}>
              <li className={styles.item}>Add product</li>
            </Link>
            <Link to="/addmanufacturer" className={styles.link}>
              <li className={styles.item}>Add manufacturer</li>
            </Link>
          </>
        ) : null}
        <Link onClick={logOut} className={styles.specialLink}>
          <li className={styles.special}>LogOut</li>
        </Link>
      </ul>
    </div>
  );
}
