import React from "react";
import styles from "../assets/styles/BeerDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

export function BeerDetails({ info }) {
  const params = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/beerdetails/${params.id}`
      );

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, [params]);

  const deleteItem = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/beerdetails/${params.id}`
      );
      if (data.status) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return data ? (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img src={data.imageLink} alt="beer" className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.beerName}>{data.name}</h1>
        <p className={styles.info}>{`Manufacturer: ${data.manufacturer}`}</p>
        <p
          className={styles.info}
        >{`Alcohol percentage: ${data.alcoholPercentage}%`}</p>
        <p className={styles.info}>{`Type: ${data.type}`}</p>
        <p className={styles.info}>{`Price: ${data.price}€`}</p>
        <div className={styles.buttonContainer}>
          {info?.admin ? (
            <>
              <button onClick={deleteItem} className={styles.button}>
                Delete
              </button>
              <button
                onClick={() => navigate(`/editproduct/${params.id}`)}
                className={styles.button}
              >
                Edit
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.mainContainer}>
      <ProgressBar
        borderColor="#1B1A17"
        barColor="#E45826"
        height="150"
        width="150"
      />
    </div>
  );
}
