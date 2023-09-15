import React from "react";
import styles from "../assets/styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contactContainer}>
        <h2>Contact</h2>
        <p>beerShop@beerShop.com</p>
        <p>+123456789</p>
      </div>
      <div className={styles.locationContainer}>
        <h2>Location</h2>
        <p>Kopilica 5, 21000 Split</p>
      </div>
      <div className={styles.socialContainer}>
        <h2>Social media</h2>
        <div className={styles.iconContainer}>
          <a
            href="http://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </a>
          <a
            href="http://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </a>
          <a
            href="http://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
}
