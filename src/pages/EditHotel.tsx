import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Updated Successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error while Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={hotel}
      onSave={handleSave}
      isLoading={isLoading}
      hotelId={hotelId}
    />
  );
};

export default EditHotel;
