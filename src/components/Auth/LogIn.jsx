import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "antd";
import { BACK_PORT } from "../../var";
import Swal from "sweetalert2";

function LogIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    axios
      .post(`${BACK_PORT}/user/login`, data)
      .then(function (response) {
        localStorage.setItem("auth-token", response?.data[0]);
        localStorage.setItem("user-info", response?.data[1]);
        window.location.reload();
      })
      .catch(function (error) {
        Swal.fire("Oops...", error.response.data, "error");
      });
    e.target.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="s-label" htmlFor="email">
          Email:
        </label>
        <input
          //   name="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <label className="s-label" htmlFor="password">
          Password:
        </label>
        <input
          //   name="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
