import { useForm } from "react-hook-form";
import { UserType } from "../../Types/types";

type Props = {
  loggedInUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ loggedInUser }: Props) => {
  const { 
    // handleSubmit, 
    register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      email: loggedInUser.email,
    },
  });

  console.log(loggedInUser);

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">confirm your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            disabled
            {...register("email")}
          />
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
