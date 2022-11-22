import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from './Footer';
import "./App.css";

const SignupSchema = yup.object().shape({
  oldPassword:yup
  .string()
  .required('Please Enter your password')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  newPassword: yup
  .string()
  .required('Please Enter your password')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  confirmPassword: yup
  .string()
  .required()
  .oneOf([yup.ref("newPassword"), null], "Passwords must match")
});


function App() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <h1>Change Password</h1>
      <label>Old Password</label>
      <input {...register("oldPassword")} />
      {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
    </div>
    <div>
      <label>New Password</label>
      <input {...register("newPassword")} />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
    </div>
    <div>
      <label>Confirm Password</label>
      <input {...register("confirmPassword")} />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
    </div>
    <div className="buttonContainer">
    <button
        type="reset"
      >Cancel</button>
    <button type="submit">Change Password</button>
    </div>
  </form>
  <Footer/>
  </div>
  );
}

export default App;
