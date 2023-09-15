import React from "react";
import styles from "../assets/styles/EditManufacturer.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

const schemaManufacturer = yup
  .object({
    name: yup.string().required().lowercase(),
    description: yup.string().required().lowercase(),
    year: yup.number().required(),
    country: yup.string().required().lowercase(),
    webPage: yup.string().required(),
    imageLink: yup.string().required(),
  })
  .required();

export function EditManufacturer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getManufacturer = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/edit/${params.id}`
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManufacturer();
  }, []);

  const updateData = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/edit/${params.id}`,
        { ...values }
      );
      if (data.status) {
        navigate(`/manufacturersdetails/${params.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return data ? (
    <div className={styles.mainContainer}>
      <div className={styles.manufacturerContainer}>
        <h1>Edit manufacturer</h1>
        <form className={styles.form} onSubmit={handleSubmit(updateData)}>
          <input
            placeholder="Name"
            className={styles.input}
            {...register("name")}
            defaultValue={data.name}
          />
          <span className={styles.errors}>{errors.name?.message}</span>
          <input
            placeholder="Description"
            className={styles.input}
            {...register("description")}
            defaultValue={data.description}
          />
          <span className={styles.errors}>{errors.description?.message}</span>
          <input
            placeholder="Year of establishment"
            className={styles.input}
            {...register("year")}
            defaultValue={data.year}
          />
          <span className={styles.errors}>{errors.year?.message}</span>
          <input
            placeholder="Country od establishment"
            className={styles.input}
            {...register("country")}
            defaultValue={data.country}
          />
          <span className={styles.errors}>{errors.country?.message}</span>
          <input
            placeholder="Web page"
            className={styles.input}
            {...register("webPage")}
            defaultValue={data.webPage}
          />
          <span className={styles.errors}>{errors.webPage?.message}</span>
          <input
            placeholder="Image link"
            className={styles.input}
            {...register("imageLink")}
            defaultValue={data.imageLink}
          />
          <span className={styles.errors}>{errors.imageLink?.message}</span>
          <button className={styles.button}>Update</button>
        </form>
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
