import React, { useEffect } from "react";
import styles from "../assets/styles/ManufacturersDetails.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

export function ManufacturersDetails({ info }) {
  const params = useParams();
  const [data, setData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const navigate = useNavigate();

  const getManufacturer = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/manufacturersdetails/${params.id}`
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getManufacturer();
  }, []);

  const deleteItem = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/manufacturersdetails/${params.id}`
      );
      setDeleteData(data);
      if (data.status) {
        navigate("/manufacturers");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateItem = () => {
    navigate(`/edit/${params.id}`);
  };

  return data ? (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img src={data.imageLink} alt="beer" className={styles.image} />
      </div>
      <div className={styles.information}>
        <div>
          <h1 className={styles.text}>{data.name}</h1>
        </div>
        <div>
          <h2>About</h2>
          <p className={styles.info}>{data.description}</p>
        </div>
        <div>
          <h2 className={styles.text}>year and country of establishment</h2>
          <p className={styles.info}>{data.country + "," + data.year}</p>
        </div>
        <div>
          <h2 className={styles.text}>web page</h2>
          <a href={data.webPage} className={styles.info}>
            {data.name}
          </a>
        </div>
        {info.admin ? (
          <>
            <button className={styles.button} onClick={deleteItem}>
              Delete
            </button>
            <button className={styles.button} onClick={updateItem}>
              Edit
            </button>
          </>
        ) : null}
        <span>{deleteData?.error}</span>
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
