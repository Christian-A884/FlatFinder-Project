import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Flat } from "../interface";
import { addNewFlat } from "../api/methods/flats/flats";
import { storage } from "../api/firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// type FormFields = {
//   city: string;
//   streetName: string;
//   streetNumber: number;
//   areaSize: number;
//   hasAC: boolean;
//   yearBuilt: number;
//   rentPrice: number;
//   dateAvailable: Date;
// };

const NewFlat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Flat>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Flat> = async (data: Flat) => {
    console.log(data);
    const file = data.flatImage[0];
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      navigate("/my-flats");
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const flatData = { ...data, flatImage: url };
      await addNewFlat(flatData);
    } catch (error) {
      throw new Error("Produsul nu a putut fi adaugat");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center w-full h-full px-20 sm:px-28 md:px-52 mx-auto max-w-[1024px] "
    >
      <h3 className="m-4 text-2xl text-center font-semibold">
        Add new flat
      </h3>
      <div className="flex flex-col justify-center items-start w-full text-base gap-1">
        <label htmlFor="city">City</label>
        <input
          {...register("city", {
            required: { value: true, message: "This field is required" },
          })}
          type="text"
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
          placeholder="City"
          id="firstName"
        />
        <p className="text-[12px] h-6 text-red-600">
          {errors.city && errors.city.message}
        </p>
      </div>
      <div className="flex w-full gap-4 justify-between">
        <div className="flex flex-col justify-center items-start w-full text-base gap-1">
          <label htmlFor="streetName">Street name</label>
          <input
            {...register("streetName", {
              required: { value: true, message: "This field is required" },
            })}
            type="text"
            className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
            placeholder="Street name"
            id="fstreetName"
          />
          <p className="text-[12px] h-6 text-red-600">
            {errors.streetName && errors.streetName.message}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start w-full text-base gap-1">
          <label htmlFor="streetNumber">Street number</label>
          <input
            {...register("streetNumber", {
              required: { value: true, message: "This field is required" },
            })}
            type="number"
            className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
            placeholder="Street number"
            id="streetNumber"
          />
          <p className="text-[12px] h-6 text-red-600">
            {errors.streetNumber && errors.streetNumber.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start w-full text-base gap-1">
        <label htmlFor="areaSize">Area size</label>
        <input
          {...register("areaSize", {
            required: { value: true, message: "This field is required" },
          })}
          type="number"
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
          placeholder="Area size"
          id="areaSize"
        />
        <p className="text-[12px] h-6 text-red-600">
          {errors.areaSize && errors.areaSize.message}
        </p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center items-start w-full text-base gap-1">
          <label htmlFor="hasAC">Has AC</label>
          <input
            {...register("hasAC")}
            type="checkbox"
            className="h-6 w-10 items-start border border-gray-500 rounded-md pl-4 text-xs placeholder:text-xs"
            placeholder="Has AC"
            id="hasAC"
          />
          <p className="text-[12px] h-6 text-red-600">
            {errors.hasAC && errors.hasAC.message}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start w-full text-base gap-1">
          <label htmlFor="yearBuilt">Year Built</label>
          <input
            {...register("yearBuilt", {
              required: { value: true, message: "This field is required" },
            })}
            type="number"
            className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
            placeholder="Year Built"
            id="yearBuilt"
          />
          <p className="text-[12px] h-6 text-red-600">
            {errors.yearBuilt && errors.yearBuilt.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start w-full text-base gap-1">
        <label htmlFor="rentPrice">Rent price</label>
        <input
          {...register("rentPrice", {
            required: { value: true, message: "This field is required" },
          })}
          type="text"
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
          placeholder="Rent price"
          id="rentPrice"
        />
        <p className="text-[12px] h-6 text-red-600">
          {errors.rentPrice && errors.rentPrice.message}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full text-base gap-1">
        <label htmlFor="dateAvailable">Date available</label>
        <input
          {...register("dateAvailable", {
            required: { value: true, message: "This field is required" },
          })}
          type="Date"
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
          placeholder="Date available"
          id="dateAvailable"
        />
        <p className="text-[12px] h-6 text-red-600">
          {errors.dateAvailable && errors.dateAvailable.message}
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full text-base gap-1">
        <label htmlFor="flatImage">Flat image</label>
        <input
          {...register("flatImage", { required:{value:true, message:"This field is required"} })}
          type="file"
          className="h-10 w-full border border-gray-500 rounded-md pl-2 text-sm placeholder:text-sm"
        />
        <p className="text-[12px] h-6 text-red-600">
          {errors.flatImage && errors.flatImage.message}
        </p>
      </div>
      <button
        className="bg-[#F1654D] text-white text-lg hover:text-gray-200  font-semibold w-full h-10 rounded-md"
        type="submit"
      >
        Add new flat
      </button>
    </form>
  );
};

export default NewFlat;
