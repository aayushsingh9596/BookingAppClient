import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import { useAppContext } from "./contexts/AppContext";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>{<p>Home</p>}</Layout>} />
          <Route path="/register" element={<Layout>{<Register />}</Layout>} />
          <Route path="/signIn" element={<Layout>{<SignIn />}</Layout>} />
          <Route path="/search" element={<Layout>{<Search />}</Layout>} />
          <Route
            path="/hotelDetails/:hotelId"
            element={<Layout>{<Details />}</Layout>}
          />
          {isLoggedIn && (
            <>
              <Route
                path="/hotel/:hotelId/booking"
                element={<Layout>{<Booking />}</Layout>}
              />
              <Route
                path="/editHotel/:hotelId"
                element={<Layout>{<EditHotel />}</Layout>}
              />
              <Route
                path="/addHotel"
                element={<Layout>{<AddHotel />}</Layout>}
              />
              <Route
                path="/myHotels"
                element={<Layout>{<MyHotels />}</Layout>}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
