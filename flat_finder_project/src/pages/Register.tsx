import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFileds = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFileds>();

  const [birthDate, setBirthDate] = useState('')
 

  const onSubmit:SubmitHandler<FormFileds> = (data) => {console.log(data)};

  const password = watch('password')

  function calculateAge(birthDate:string) {
    const currentDate = new Date()
    const birthday = new Date(birthDate)
    const ageInMilliseconds = currentDate.getTime() - birthday.getTime()
    const ageResult = Math.floor(ageInMilliseconds/(1000*60*60*24*365.25))

    return ageResult
  }

  // console.log(calculateAge('01.01.1983'))
  

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {setBirthDate(e.target.value)
   
    }


 
  return (           
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center max-w[1440px] h-full gap-5 mx-auto mt-36 mb-36"
    >
      <h1 className="m-4 text-2xl font-semibold">Create your account</h1>
      <div className="flex flex-col justify-center items-start w-[900px] ">
        <label htmlFor="firstName">Firstname</label>
        <input
          {...register("firstName", {
            required: { value: true, message: "This filed is required" },
            minLength: {
              value: 2,
              message: "Firstname should have at least 2 characters",
            },
          })}
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="text"
          placeholder="First Name"
          id="firstName"
        />
        <p className="text-sm h-6 text-red-600">
          {errors.firstName && (errors.firstName.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-[900px] ">
        <label htmlFor="lasttName">Lastname</label>
        <input
          {...register("lastName", {
            required: { value: true, message: "This filed is required" },
            minLength: {
              value: 2,
              message: "Lastname should have at least 2 characters",
            },
          })}
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="text"
          placeholder="Last Name"
          id="lastName"
        />
        <p className="text-sm h-6 text-red-600">
          {errors.firstName && (errors.firstName.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-[900px] ">
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
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="text"
          placeholder="Email address"
          id="email"
        />
        <p className="text-sm h-6 text-red-600">
          {errors.email && (errors.email.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-[900px] ">
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
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="text"
          placeholder="Password"
          id="password"
        />
        <p className="text-sm h-6 text-red-600">
          {errors.password && (errors.password.message as string)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-[900px] ">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input {...register("confirmPassword", {
            
            validate: value =>
              value === password || "The passwords doesn't match"
            }
      
          )}
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="text"
          placeholder="Confirm Password"
          id="confirmPassword"
        />
        <p className="text-sm h-6 text-red-600">
          {errors.confirmPassword && (errors.confirmPassword.message as string)}</p>
      </div>
      <div className="flex flex-col justify-center items-start w-[900px] ">
        <label htmlFor="birthday">Birthday</label>
        <input
        {...register('birthday',{
          required:"This field is required",
        
          validate: value => calculateAge(value) >= 18 && calculateAge(value) <= 120 || "Age must be between 18 and 120"
        })}
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm"
          type="date"
          placeholder="Birthday"
          name="birthday"
          onChange={handleInputChange}
          value={birthDate}
        />
        <p className="text-sm h-6 text-red-600">
          {errors.birthday && (errors.birthday.message as string)}</p>
      </div>
      <button
        className="bg-[#F1654D] text-white text-lg  font-semibold w-[900px] h-10 rounded-md"
        type="submit"
      >
        Create my account
      </button>
    </form>
  );
};

export default Register;
