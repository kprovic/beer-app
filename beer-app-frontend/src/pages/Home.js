import React, { useEffect, useRef, useState } from "react";
import styles from "../assets/styles/Home.module.css";
import { Footer } from "../components/Footer";
import { Products } from "../pages/Products";

export function Home({ info }) {
  const countries = [
    { name: "Czech Republic", litres: "181.7" },
    { name: "Austria", litres: "96.9" },
    { name: "Poland", litres: "96.0" },
    { name: "Romania", litres: "95.0" },
    { name: "Germany", litres: "92.5" },
    { name: "Estonia", litres: "84.4" },
    { name: "Namibia", litres: "83.4" },
    { name: "Lithuania", litres: "83.4" },
    { name: "Slovakia ", litres: "82.2" },
    { name: "Spain", litres: "81.6" },
  ];
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.textContainer}>
          <h1>{`Welcome, ${info?.name}!`}</h1>
          <a className={styles.link} onClick={handleClick}>
            Look at our offer
          </a>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.aboutContainer}>
          <h1>About beer</h1>
          <p className={styles.text}>
            Beer is one of the oldest types of alcoholic drinks in the world,and
            the most widely consumed.It is the third most popular drink overall
            after potable water and tea.It is produced by the brewing and
            fermentation of starches, mainly derived from cereal grains—most
            commonly malted barley, though wheat, maize (corn), rice, and oats
            are also used. During the brewing process, fermentation of the
            starch sugars in the wort produces ethanol and carbonation in the
            resulting beer.Most modern beer is brewed with hops, which add
            bitterness and other flavours and act as a natural preservative and
            stabilising agent. Other flavouring agents such as gruit, herbs, or
            fruits may be included or used instead of hops. In commercial
            brewing, the natural carbonation effect is often removed during
            processing and replaced with forced carbonation.
          </p>
        </div>
        <div className={styles.factContainer}>
          <h1>Top 10 countries that consume the most beer per capita(2020):</h1>
          <ol className={styles.text}>
            {countries.map((item, index) => (
              <li key={index}>
                {item.name}-{item.litres}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div ref={ref}>
        <Products />
      </div>
      <Footer />
    </div>
  );
}
