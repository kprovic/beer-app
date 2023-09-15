import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../assets/styles/AddProduct.module.css";
import axios from "axios";

const schemaProduct = yup
  .object({
    name: yup.string().required().lowercase(),
    manufacturer: yup.string().required().lowercase(),
    color: yup.string().required().lowercase(),
    type: yup.string().required().lowercase(),
    price: yup.number().required(),
    alcoholPercentage: yup.number().required(),
    imageLink: yup.string().required(),
  })
  .required();

export function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSaved, setIsSaved] = useState();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:4000/addproduct", {
        ...values,
      });
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
      <div className={styles.productContainer}>
        <h1>Add product</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Name"
            className={styles.input}
            {...register("name")}
          />
          <span className={styles.errors}>{errors.name?.message}</span>
          <input
            placeholder="Manufacturer"
            className={styles.input}
            {...register("manufacturer")}
          />
          <span className={styles.errors}>{errors.manufacturer?.message}</span>
          <input
            placeholder="Type(Ipa,lager..)"
            className={styles.input}
            {...register("type")}
          />
          <span className={styles.errors}>{errors.type?.message}</span>
          <input
            placeholder="Price"
            className={styles.input}
            {...register("price")}
          />
          <span className={styles.errors}>{errors.price?.message}</span>
          <input
            placeholder="Alcohol percentage"
            className={styles.input}
            {...register("alcoholPercentage")}
          />
          <span className={styles.errors}>
            {errors.alcoholPercentage?.message}
          </span>
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
