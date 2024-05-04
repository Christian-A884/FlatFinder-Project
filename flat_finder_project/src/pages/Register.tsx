import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "../api/methods/auth/users";
import { User } from "../interface";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// type FormFields = {
//   uid: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   birthday: string;
//   role: "regular";
//   data: User;
// };

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const navigate = useNavigate();

  const [birthDate, setBirthDate] = useState("");

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error:unknown) {
      if (error.message.includes("weak")) {
        alert("Parola ta este prea scurta");
      } else if(error.message.includes("already-in-use")) {
        alert("Adresa de email este deja folosita");
      }
    }
  };

  const password = watch("password");

  function calculateAge(birthDate: string) {
    const currentDate = new Date();
    const birthday = new Date(birthDate);
    const ageInMilliseconds = currentDate.getTime() - birthday.getTime();
    const ageResult = Math.floor(
      ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    );

    return ageResult;
  }

  // console.log(calculateAge('01.01.1983'))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center w-full h-auto px-4 sm:px-20 md:px-52 mx-auto max-w-[900px] "
    >
      <h3 className="m-4 text-[16px] text-center font-semibold">
        Create your account
      </h3>
      <div className="flex flex-col justify-center items-start w-full text-xs gap-1">
        <label htmlFor="firstName">Firstname</label>
        <input
          {...register("firstName", {
            required: { value: true, message: "This field is required" },
            minLength: {
              value: 2,
              message: "Firstname should have at least 2 characters",
            },
          })}
          className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
          type="text"
          placeholder="First Name"
          id="firstName"
        />
        <p className="text-[10px] h-6 text-red-600">
          {errors.firstName && (errors.firstName.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full  text-xs gap-1">
        <label htmlFor="lasttName">Lastname</label>
        <input
          {...register("lastName", {
            required: { value: true, message: "This field is required" },
            minLength: {
              value: 2,
              message: "Lastname should have at least 2 characters",
            },
          })}
          className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
          type="text"
          placeholder="Last Name"
          id="lastName"
        />
        <p className="text-[10px] h-6 text-red-600">
          {errors.lastName && (errors.lastName.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full text-xs gap-1">
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
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,

              // /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!])[a-zA-Z\d@#$%^&*!]{6,}$/,

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
      <div className="flex flex-col justify-center items-start w-full text-xs gap-1">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "The passwords doesn't match",
          })}
          className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
          type="text"
          placeholder="Confirm Password"
          id="confirmPassword"
        />
        <p className="text-[10px] h-6 text-red-600">
          {errors.confirmPassword && (errors.confirmPassword.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full text-xs gap-1">
        <label htmlFor="birthday">Birthday</label>
        <input
          {...register("birthday", {
            required: "This field is required",

            validate: (value) =>
              (calculateAge(value) >= 18 && calculateAge(value) <= 120) ||
              "Age must be between 18 and 120",
          })}
          className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-xs"
          type="date"
          placeholder="Birthday"
          name="birthday"
          onChange={handleInputChange}
          value={birthDate}
        />
        <p className="text-[10px] h-6 text-red-600">
          {errors.birthday && (errors.birthday.message as string)}
        </p>
      </div>
      <button
        className="bg-[#F1654D] text-white text-xs  font-semibold w-full h-8 rounded-md"
        type="submit"
      >
        Create my account
      </button>
      <button className="text-[12px] text-[#F1654D] font-semibold underline mt-2">
        <Link to="/login">Already have an account? Please login! </Link>
      </button>
    </form>
  );
};

export default Register;
