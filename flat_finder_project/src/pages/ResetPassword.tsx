import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../api/firebase/firebase.config";



const ResetPassword = () => {
// const [email, setEmail]=useState("")

// const handleEmail = (e) =>{
//   setEmail(e.target.value)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data:any)=>{
  sendPasswordResetEmail(auth, data.email)
console.log(data.email)
}
  

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full h-auto my-48 px-4 sm:px-20 md:px-52 mx-auto max-w-[900px] "
      >
        <h3 className="m-4 text-[16px] text-center font-semibold">
          Please enter your email address to generate a new password
        </h3>
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
            // onChange={(e)=>{handleEmail(e)}}
          />
          <p className="text-[10px] h-6 text-red-600">
            {errors.email && (errors.email.message as string)}
          </p>
        </div>
        <button
          className="bg-[#F1654D] text-white text-xs  font-semibold w-full h-8 rounded-md"
          type="submit"
        >
          Send request!
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
