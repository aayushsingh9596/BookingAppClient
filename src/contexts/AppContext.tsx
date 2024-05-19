import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import {useQuery } from "react-query";
import * as apiClient from "../api-client"
import { loadStripe,Stripe } from "@stripe/stripe-js";


const STRIPE_PUB_KEY="pk_test_51PHlQ1SEWStGMFxWGzsdQWXPXi5bJTdYloCmg9B8GlrQw6EjTsTF5BtiLKTIxX0HIUfskvJz98bzdYlq5KXMcHSB00J93nY4xa";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn:boolean;
  stripePromise: Promise<Stripe|null>;

};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise=loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


    const {isError}=useQuery("validateToken",apiClient.validateToken,{
        retry:false
    })

  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{ showToast: (toastMessage) => setToast(toastMessage),isLoggedIn:!isError,stripePromise }}
      
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
