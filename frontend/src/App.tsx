import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/layout";
import Register from "./pages/register";
import SignIn from "./pages/signIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/appContext";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/editHotel";
import Search from "./pages/Search";


const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>homepage</Layout>} />
        <Route path="search" element ={
          <Layout>
            <Search></Search>
          </Layout>
        }>
        </Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register></Register>
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn></SignIn>
            </Layout>
          }
        ></Route>

        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel></AddHotel>
                </Layout>
              }
            ></Route>
            <Route
              path="/my-hotel"
              element={
                <Layout>
                  <MyHotel></MyHotel>
                </Layout>
              }
            ></Route>
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel></EditHotel>
                </Layout>
              }
            ></Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
