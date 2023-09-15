import React, { useState } from "react";
import beer from "../assets/images/matt-palmer-lGzhgzkN6UI-unsplash.jpg";
import styles from "../assets/styles/SignUp.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          setErr(data.errors);
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Sign up</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name")}
              placeholder="Name"
              className={styles.input}
            />
            <span className={styles.errors}>{errors.name?.message}</span>

            <input
              {...register("lastName")}
              placeholder="Last name"
              className={styles.input}
            />
            <span className={styles.errors}>{errors.lastName?.message}</span>

            <input
              {...register("email")}
              placeholder="E-mail"
              className={styles.input}
            />
            <span className={styles.errors}>{errors.email?.message}</span>

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className={styles.input}
            />
            <span className={styles.errors}>{errors.password?.message}</span>

            <button className={styles.button}>Sign up</button>
            <span>
              Already have account? <Link to="/login">SignIn</Link>
            </span>

            {err ? <h3 className={styles.errors}>{err.msg}</h3> : null}
          </form>
        </div>
        <div className={styles.imageContainer}>
          <img src={beer} className={styles.image} alt="beer" />
        </div>
      </div>
    </div>
  );
}
