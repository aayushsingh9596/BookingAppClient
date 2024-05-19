import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient=useQueryClient();
  const mutataion = useMutation(apiClient.signOut, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed out Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={() => mutataion.mutate()}
    >
      SignOut
    </button>
  );
};

export default SignOutButton;
