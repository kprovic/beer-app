import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../assets/styles/AddProduct.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

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

export function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/editproduct/${params.id}`
      );

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const updateProduct = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/editproduct/${params.id}`,
        { ...values }
      );
      if (data.status) {
        navigate(`/beerdetails/${params.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return data ? (
    <div className={styles.mainContainer}>
      <div className={styles.productContainer}>
        <h1>Edit product</h1>
        <form className={styles.form} onSubmit={handleSubmit(updateProduct)}>
          <input
            placeholder="Name"
            className={styles.input}
            {...register("name")}
            defaultValue={data.name}
          />
          <span className={styles.errors}>{errors.name?.message}</span>
          <input
            placeholder="Manufacturer"
            className={styles.input}
            {...register("manufacturer")}
            defaultValue={data.manufacturer}
          />
          <span className={styles.errors}>{errors.manufacturer?.message}</span>
          <input
            placeholder="Type(Ipa,lager..)"
            className={styles.input}
            {...register("type")}
            defaultValue={data.type}
          />
          <span className={styles.errors}>{errors.type?.message}</span>
          <input
            placeholder="Price"
            className={styles.input}
            {...register("price")}
            defaultValue={data.price}
          />
          <span className={styles.errors}>{errors.price?.message}</span>
          <input
            placeholder="Alcohol percentage"
            className={styles.input}
            {...register("alcoholPercentage")}
            defaultValue={data.alcoholPercentage}
          />
          <span className={styles.errors}>
            {errors.alcoholPercentage?.message}
          </span>
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
