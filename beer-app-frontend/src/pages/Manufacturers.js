import React, { useEffect, useState } from "react";
import styles from "../assets/styles/Manufacturers.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
export function Manufacturers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const getManufacturers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/manufacturers");
      setData(data);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    getManufacturers();
  }, []);

  const handleClick = (e) => {
    navigate(
      `/manufacturersdetails/${e.target.parentNode.getAttribute("productid")}`
    );
  };

  return (
    <>
      {data ? (
        <div className={styles.mainContainer}>
          {error ? (
            <h2>Something went wrong!</h2>
          ) : (
            <div className={styles.flexContainer}>
              {data?.map((item, index) => (
                <div
                  className={styles.itemContainer}
                  key={index}
                  productid={item._id}
                  onClick={handleClick}
                >
                  <img
                    src={item.imageLink}
                    alt="beer"
                    className={styles.image}
                  />
                  <p className={styles.name}>{item.name}</p>
                </div>
              ))}
            </div>
          )}
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
      )}
    </>
  );
}
