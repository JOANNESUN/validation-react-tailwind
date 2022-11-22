import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "./Footer";
import "./App.css";

function App() {
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const [isRequired, setRequired] = useState(false);
  const [isMinLength, setMinLength] = useState(false);
  const [isUppercase, setUppercase] = useState(false);
  const [isSpecial, setSpecial] = useState(false);

  const clearState = () => {
    setRequired(false);
    setMinLength(false);
    setUppercase(false);
    setSpecial(false);
  };

  const SignupSchema = yup.object().shape(
    {
      oldPassword: yup.string().required("Please Enter your old password"),
      newPassword: yup
        .string()
        .when("newPassword", (password, field) => {
          if (password == null) {
            setRequired(false);
            return field.required();
          } else {
            setRequired(true);
          }
        })
        .when("newPassword", (password, field) => {
          if (password?.length <= 8) {
            setMinLength(false);
            return field.min(8, "Must be 8 characters or more");
          } else {
            setMinLength(true); //mark min length check as green
          }
        })
        .when("newPassword", (password, field) => {
          if (!/[A-Z]+/.test(password)) {
            setUppercase(false);
            return field.matches(/[A-Z]+/, "One uppercase character");
          } else {
            setUppercase(true); //mark uppercase check as green
          }
        })
        .when("newPassword", (password, field) => {
          if (!/[@$!%*#?&]+/.test(password)) {
            setSpecial(false);
            return field.matches(/[@$!%*#?&]+/, "One special character");
          } else {
            setSpecial(true); //mark special character check as green
          }
        }),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm password is required"),
    },
    [["newPassword", "newPassword"]]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Change Password
            </h2>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="old-password-input"
              type="password"
              {...register("oldPassword")}
            />
            <div id="old-password-error">
              {errors.oldPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="new-password-input"
              type="password"
              {...register("newPassword")}
            />
            <div class="new-password-error">
              {errors.newPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.newPassword.message}
                </p>
              )}
              {(isSpecial || isRequired || isMinLength || isUppercase) && (
                <>
                  <p className="text-red-500 text-xs italic">
                    {!isSpecial && "special character required \n"}
                  </p>
                  <p className="text-red-500 text-xs italic">
                    {!isRequired && "this field is required  \n"}
                  </p>
                  <p className="text-red-500 text-xs italic">
                    {!isMinLength && "min 8 character required \n"}
                  </p>
                  <p className="text-red-500 text-xs italic">
                    {" "}
                    {!isUppercase && "at least one uppercase required \n"}
                  </p>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="confirm-password-input"
              type="password"
              {...register("confirmPassword")}
            />
            <div id="confirm-password-error">
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div class="grid gap-x-8 gap-y-4 grid-cols-3">
            <button
              className="group relative flex w-half justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex-initial w-32 gap-4"
              type="reset"
              onClick={clearState}
            >
              Cancel
            </button>
            <button
              className="group relative flex w-half justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex-initial w-48"
              id="submit-password"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
}

export default App;
