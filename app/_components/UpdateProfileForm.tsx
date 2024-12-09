"use client";
import React from "react";
import { GuestProps } from "../_lib/types";
import Image from "next/image";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";

const UpdateProfileForm = ({
  children,
  guest,
}: {
  children: React.ReactNode;
  guest: GuestProps;
}) => {
  if (!guest) return null;
  // const countryFlag = "pt.jpg";
  //   define count state
  // const [count, setCount] = useState(0);
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest?.fullName ?? "user name"}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={guest?.email as string}
          disabled
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest?.countryFlag && (
            <Image
              src={guest?.countryFlag as string}
              alt="Country flag"
              className="rounded-sm"
              width={20}
              height={20}
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest?.nationalID as string}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
};
function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
}
export default UpdateProfileForm;
