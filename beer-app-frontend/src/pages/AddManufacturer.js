import React from "react";
import styles from "../assets/styles/AddManufacturer.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

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

export function AddManufacturer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaManufacturer) });
  const [isSaved, setIsSaved] = useState();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/addmanufacturer",
        { ...values }
      );
      if (data.status === true) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.manufacturerContainer}>
        <h1>Add manufacturer</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Name"
            className={styles.input}
            {...register("name")}
          />
          <span className={styles.errors}>{errors.name?.message}</span>
          <input
            placeholder="Description"
            className={styles.input}
            {...register("description")}
          />
          <span className={styles.errors}>{errors.description?.message}</span>
          <input
            placeholder="Year of establishment"
            className={styles.input}
            {...register("year")}
          />
          <span className={styles.errors}>{errors.year?.message}</span>
          <input
            placeholder="Country od establishment"
            className={styles.input}
            {...register("country")}
          />
          <span className={styles.errors}>{errors.country?.message}</span>
          <input
            placeholder="Web page"
            className={styles.input}
            {...register("webPage")}
          />
          <span className={styles.errors}>{errors.webPage?.message}</span>
          <input
            placeholder="Image link"
            className={styles.input}
            {...register("imageLink")}
          />
          <span className={styles.errors}>{errors.imageLink?.message}</span>
          <button className={styles.button}>Add</button>
          {isSaved === true ? (
            <h3>Saved</h3>
          ) : isSaved === false ? (
            <h3>Error</h3>
          ) : null}
        </form>
      </div>
    </div>
  );
}
