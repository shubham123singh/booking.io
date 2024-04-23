import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Register from "./pages/register";
import SignIn from "./pages/signIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>homepage</Layout>} />
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
      </Routes>
    </Router>
  );
};

export default App;
