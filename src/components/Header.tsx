import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookingApp</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link 
              className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              to="/myBookings">My Bookings</Link>
              <Link 
              className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              to="/myHotels">My Hotels</Link>
              <SignOutButton/>
            </>
          ) : (
            <Link
              to="/signIn"
              className="flex items-center bg-white text-blue-600 px-3 
                font-bold rounded-sm hover:bg-blue-600 hover:text-white"
            >
              SignIn
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
