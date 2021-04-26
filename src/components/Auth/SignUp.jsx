import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACK_PORT } from "../../var";
import Swal from "sweetalert2";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    axios
      .post(`${BACK_PORT}/user/register`, data)
      .then(function (response) {
      })
      .catch(function (error) {
        Swal.fire("Oops...", error.response.data, "error");
      });
    e.target.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="s-label" htmlFor="name">
          Name:
        </label>
        <input
          //   name="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <br />
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
        <label className="s-label" htmlFor="confirm_password">
          Confirm Password:
        </label>
        <input
          //   name="password"
          type="password"
          {...register("confirm_password", { required: true })}
        />
        {errors.confirm_password && <span>This field is required</span>}
        <br />
        <label className="s-label" htmlFor="companyId">
          Company ID:
        </label>
        <input
          //   name="password"
          type="text"
          {...register("companyID", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
