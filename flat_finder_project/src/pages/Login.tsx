import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  return (
    
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full h-auto my-48 px-4 sm:px-20 md:px-52 mx-auto max-w-[900px] "
      >
        <h3 className="m-4 text-[16px] text-center font-semibold">Login to your account</h3>
        <div className="flex flex-col justify-center items-start w-full text-xs gap-1 ">
          <label htmlFor="email">Email address</label>
          <input
            {...register("email", {
              required: "Email is required",
              validate: {
                isEmail: (value) =>
                  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                  "Invalid email format",
              },
            })}
            className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
            type="text"
            placeholder="Email address"
            id="email"
          />
          <p className="text-[10px] h-6 text-red-600">
            {errors.email && (errors.email.message as string)}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start w-full  text-xs gap-1">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password length must be at least 6 charachters",
              },
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[a-zA-Z\d@#$%^&*!]{6,}$/,

                message:
                  "Password must contain at least one uppercase letter,one number and one special character",
              },
            })}
            className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
            type="text"
            placeholder="Password"
            id="password"
          />
          <p className="text-[10px] h-6 text-red-600">
            {errors.password && (errors.password.message as string)}
          </p>
        </div>
        <button
        className="bg-[#F1654D] text-white text-xs  font-semibold w-full h-8 rounded-md"
        type="submit"
      >
        Login
      </button>
      </form>
    
  );
};

export default Login;
