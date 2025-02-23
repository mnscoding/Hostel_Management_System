/*import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages &components
import Home from "./pages/Home";
//import Navbar from "./components/Navbar";
import Navbar from "./components/NavBar";
//import Login from "./pages/Login";
import Login from "./pages/Login";
//import Signup from "./pages/Signup";
import Signup from "./pages/Signup";
import NewHome from "./pages/Home";
//import Notice from "./pages/Notice";
import Notice from "./pages/Notice";
import AboutUs from "./pages/AboutUs";
import Complaint from "./pages/Complaints";
import Staff from "./pages/Staff";
import AdminDashboard from "./pages/AdminDashboard";
import NewAdminDashboard from "./pages/NewAdminDashBoard";
import Students from "./pages/Students";
import Hostel from "./pages/Hostel";
import StudentHostel from "./pages/StudentHostel";
import RegisterHostel from "./pages/RegisterHostel";
import ApplyRequest from "./pages/ApplyRequest";
//import Notice from "./pages/NewNotice";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import User from "./pages/User";
import ApprovedEmail from "./pages/ApprovedEmail";
import AddUser from "./pages/AddUser";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user && user.category === "Admin" ? (
                  <NewAdminDashboard />
                ) : (
                  <NewHome />
                )
              }
            ></Route>
            <Route path="/notices" element={<Notice />}></Route>
            <Route
              path="/complaints"
              element={!user ? <Login /> : <Complaint />}
            ></Route>
            <Route
              path="/hostels"
              element={
                !user || user.category === "Staff" ? (
                  <StudentHostel />
                ) : user && user.category === "Admin" ? (
                  <Hostel />
                ) : (
                  <RegisterHostel />
                )
              }
            ></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/staff" element={<Staff />}></Route>
            <Route
              path="/students"
              element={!user ? <Login /> : <Students />}
            ></Route>
            <Route
              path="/register"
              element={!user ? <Login /> : <Register />}
            ></Route>
            <Route path="/contact" element={<ContactUs />}></Route>

            <Route
              path="/applyrequests"
              element={!user ? <Login /> : <ApplyRequest />}
            ></Route>
            <Route path="/adduser" element={<AddUser />}></Route>
            <Route path="/users" element={!user ? <Login /> : <User />}></Route>
            <Route
              path="/approvedEmails"
              element={!user ? <Login /> : <ApprovedEmail />}
            ></Route>

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;*/
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
import Navbar from "./components/NavBar";
// import Login from "./pages/Login";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Signup from "./pages/Signup";
import NewHome from "./pages/Home";
// import Notice from "./pages/Notice";
import Notice from "./pages/Notice";
import AboutUs from "./pages/AboutUs";
import Complaint from "./pages/Complaints";
import Staff from "./pages/Staff";
import AdminDashboard from "./pages/AdminDashboard";
import NewAdminDashboard from "./pages/NewAdminDashBoard";
import Students from "./pages/Students";
import Hostel from "./pages/Hostel";
import StudentHostel from "./pages/StudentHostel";
import RegisterHostel from "./pages/RegisterHostel";
import ApplyRequest from "./pages/ApplyRequest";
// import Notice from "./pages/NewNotice";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import User from "./pages/User";
import ApprovedEmail from "./pages/ApprovedEmail";
import AddUser from "./pages/AddUser";
import ForgotPassword from "./pages/ForgotPassword"; // New page
import ResetPassword from "./pages/ResetPassword"; // New page
import StudentRequest from "./pages/StudentRequest";
import TransferRequest from "./pages/TransferRequest";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user && user.category === "Admin" ? (
                  <NewAdminDashboard />
                ) : (
                  <NewHome />
                )
              }
            ></Route>
            <Route path="/notices" element={<Notice />}></Route>
            <Route
              path="/complaints"
              element={!user ? <Login /> : <Complaint />}
            ></Route>
            <Route
              path="/studentrequests"
              element={!user ? <Login /> : <StudentRequest />}
            ></Route>
            <Route
              path="/hostels"
              element={
                !user || user.category === "Staff" ? (
                  <StudentHostel />
                ) : user && user.category === "Admin" ? (
                  <Hostel />
                ) : (
                  <RegisterHostel />
                )
              }
            ></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/staff" element={<Staff />}></Route>
            <Route
              path="/students"
              element={!user ? <Login /> : <Students />}
            ></Route>
            <Route
              path="/register"
              element={
                user && user.category === "Admin" ? <Register /> : <Home />
              }
            ></Route>
            <Route path="/contact" element={<ContactUs />}></Route>
            <Route
              path="/applyrequests"
              element={!user ? <Login /> : <ApplyRequest />}
            ></Route>
            <Route path="/adduser" element={<AddUser />}></Route>
            <Route path="/users" element={!user ? <Login /> : <User />}></Route>
            <Route
              path="/approvedEmails"
              element={
                user && user.category === "Admin" ? <ApprovedEmail /> : <Home />
              }
            ></Route>
            <Route
              path="/transferrequests"
              element={
                user && user.category === "Admin" ? (
                  <TransferRequest />
                ) : (
                  <Home />
                )
              }
            ></Route>

            {/* Add Forgot Password and Reset Password routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Login and Signup routes */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
