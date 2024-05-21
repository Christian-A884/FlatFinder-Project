import { sendPasswordResetEmail } from "firebase/auth";
import { FieldValues, useForm } from "react-hook-form";
import { auth } from "../api/firebase/firebase.config";
import { Link } from "react-router-dom";
import logo from "../assets/flatFinder.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


//syntax which display thre reset password form and help the user to start the process to recover his account password
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      sendPasswordResetEmail(auth, data.email);
      console.log(data.email);
      toast.success("Reset password email was send");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex h-[1024px] justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full h-auto my-36 px-4 sm:px-20 md:px-52 mx-auto max-w-[1098px] "
        >
          <Link to="/">
            <img src={logo} className="h-[80px] mb-10" alt="logo" />
          </Link>
          <h3 className="m-4 text-xl text-center font-semibold">
            Please enter your email address to generate a new password
          </h3>
          <div className="flex flex-col justify-center items-start w-full text-base gap-1 ">
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
              className="h-8 w-full border border-gray-500 rounded-md pl-2 text-xs placeholder:text-sm"
              type="text"
              placeholder="Email address"
              id="email"

            />
            <p className="text-[10px] h-6 text-red-600">
              {errors.email && (errors.email.message as string)}
            </p>
          </div>
          <button
            className="bg-[#F1654D] text-white text-base hover:text-gray-200   font-semibold w-full h-8 rounded-md"
            type="submit"
          >
            Send request
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
