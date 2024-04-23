import { useForm } from "react-hook-form";
import * as apiClient from '../api-client';
import { useAppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();
  const navigate = useNavigate()



  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "Sucess" });
      await queryClient.invalidateQueries("validateToken");
      navigate( "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });  
  
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2>Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded py-1 px-2 font-normal"
            {...register("firstName", { required: "this filed is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded py-1 px-2 font-normal"
            {...register("lastName", { required: "this field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded py-1 px-2 font-normal"
          {...register("email", { required: "this field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded py-1 px-2 font-normal"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "Confirm password",
            validate: (val) => {
              if (!val) {
                return "this value is required";
              } else if (watch("password") !== val) {
                return "your passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already Registered? <Link className="underline" to={"/sign-in"}>SignIn</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create account
        </button>
      </span>
    </form>
  );
};

export default Register;
