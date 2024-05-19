import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
// import { Elements } from "@stripe/react-stripe-js";
// import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { data: loggedInUser } = useQuery("getUser", apiClient.getUser);
  console.log(loggedInUser);

  // const {stripePromise}=useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // const { data: paymentIntentData } = useQuery("createPaymentIntent", () => {
  //   apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
  //   {
  //     enabled:!!hotelId && numberOfNights >0,
  //   }
  // });

  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {loggedInUser && (
        // <Elements stripe={stripePromise}>
        <BookingForm loggedInUser={loggedInUser} />
        // </Elements>
      )}
    </div>
  );
};

export default Booking;
