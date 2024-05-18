import { useForm } from "react-hook-form";
import * as apiClient from '../api-client';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useMutation, useQueryClient } from "react-query";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const {showToast} = useAppContext();


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();


  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "Success" });
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
    <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Sign In</h2>
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered? <Link className="underline" to={"/register"}> Create an account here</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          SignIn
        </button>
      </span>
    </form>
  );
};

export default SignIn;
