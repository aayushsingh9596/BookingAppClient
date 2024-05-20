import { PaymentIntent } from "@stripe/stripe-js";
import {
  HotelSearchResponse,
  HotelType,
  UserType,
} from "./Types/types";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};


export const signIn = async (formData: SignInFormData) => {
  console.log("request came", formData);

  const response = await fetch("https://bookingappserver-635a.onrender.com/api/auth/signIn", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const signOut = async () => {

  console.log("SignOut Called before api call");
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/auth/signOut", {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();
  console.log(responseBody);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/auth/validateToken", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  const result = await response.json();

  return result;
};

export const getUser = async (): Promise<UserType> => {
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/auth/getUser", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  const result = await response.json();
  return result;
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/hotel/addHotel", {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add Hotel");
  }

  const result = await response.json();
  console.log(result);

  return result;
};

export const getMyHotels = async () => {
  const response = await fetch("https://bookingappserver-635a.onrender.com/api/hotel/getMyHotels", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get Hotels");
  }

  const result = await response.json();
  console.log(result);

  return result;
};

export const getHotelById = async (hotelId: string) => {
  const response = await fetch(
    `https://bookingappserver-635a.onrender.com/api/hotel/getHotelById/${hotelId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Hotels");
  }

  const result = await response.json();
  console.log(result);

  return result;
};

export const updateHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `https://bookingappserver-635a.onrender.com/api/hotel/updateHotelById`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }
  const result = await response.json();
  return result;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  console.log("queryParams", queryParams.toString());
  const response = await fetch(
    `https://bookingappserver-635a.onrender.com/api/hotel/searchHotel?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error while fetching Hotels");
  }
  const result = await response.json();
  return result;
};

export const getHotelDetails = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(
    `https://bookingappserver-635a.onrender.com/api/hotel/getHotelDetails/${hotelId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get Hotels");
  }
  const result = await response.json();
  return result;
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntent> => {
  const response = await fetch(
    `https://bookingappserver-635a.onrender.com/api/hotel/bookings/createPaymentIntent/${hotelId}`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ numberOfNights }),
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};
