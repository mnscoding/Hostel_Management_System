/*import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 0, paddingTop: "0px" }}>
      <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reg. No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Gender"
          variant="outlined"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registering Year"
          variant="outlined"
          value={registeringYear}
          onChange={(e) => setRegisteringYear(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Faculty"
          variant="outlined"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No."
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Parent's Contact No."
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/
/*11.03
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 0, paddingTop: "0px" }}>
      <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reg. No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty 1">Faculty 1</MenuItem>
            <MenuItem value="Faculty 2">Faculty 2</MenuItem>
            <MenuItem value="Faculty 3">Faculty 3</MenuItem>
            <MenuItem value="Faculty 4">Faculty 4</MenuItem>
            <MenuItem value="Faculty 5">Faculty 5</MenuItem>
            <MenuItem value="Faculty 6">Faculty 6</MenuItem>
            <MenuItem value="Faculty 7">Faculty 7</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No."
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No."
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        Paymentslip:
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/

/*2025.01.31
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      const res = await fetch("http://localhost:3000/api/register/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setResponse(`Upload successful! Test ID: ${result._id}`);
        onSuccess(); // Call the success callback
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Hostel Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty of Applied Sciences">
              Faculty of Applied Sciences
            </MenuItem>
            <MenuItem value="Faculty of Computing">
              Faculty of Computing
            </MenuItem>
            <MenuItem value="Faculty of Agricultural Sciences">
              Faculty of Agricultural Sciences
            </MenuItem>
            <MenuItem value="Faculty of Geomatics">
              Faculty of Geomatics
            </MenuItem>
            <MenuItem value="Faculty of Management Studies">
              Faculty of Management Studies
            </MenuItem>
            <MenuItem value="Faculty of Social Sciences and Languages">
              Faculty of Social Sciences and Languages
            </MenuItem>
            <MenuItem value="Faculty of Technology">
              Faculty of Technology
            </MenuItem>
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Slip:
          </Typography>
          <input type="file" onChange={handleFileChange} required />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
        </Button>
      </form>
      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default TestUpload;*/

/*2025.02.01
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe instance
const stripePromise = loadStripe(
  "pk_test_51QnLCvGdZ5LBY08Ggg1g3mOVYhIyYkfkQJ4GJuHUcMeTHsuMMmm3YxfElHC8e0pKm2N4vQ7xrtPyq5q0EIRibBId00fbU8ix5f"
); // Replace with your actual Stripe publishable key

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Stripe hooks to handle the payment
  const stripe = useStripe();
  const elements = useElements();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    // Collect registration data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      // Create the payment intent on the backend
      const res = await fetch(
        "http://localhost:3000/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }), // Example: Amount in cents (e.g., $50.00)
        }
      );

      const paymentIntentData = await res.json();

      if (!res.ok) {
        throw new Error(paymentIntentData.error);
      }

      // Confirm the card payment using Stripe
      if (!stripe || !elements) {
        setResponse("Stripe not ready");
        return;
      }

      const { clientSecret } = paymentIntentData;

      // Get the CardElement and create a payment method
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setResponse("Card Element is not available");
        return;
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: name,
            email: email,
          },
        });

      if (paymentMethodError) {
        setResponse(`Payment method error: ${paymentMethodError.message}`);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        setResponse(`Error: ${error.message}`);
      } else {
        // If payment is successful, upload the registration data
        const uploadRes = await fetch(
          "http://localhost:3000/api/register/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await uploadRes.json();
        if (uploadRes.ok) {
          setResponse(`Upload successful! Test ID: ${result._id}`);
          onSuccess(); // Call the success callback
        } else {
          setResponse(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Hostel Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty of Applied Sciences">
              Faculty of Applied Sciences
            </MenuItem>
            <MenuItem value="Faculty of Computing">
              Faculty of Computing
            </MenuItem>
            <MenuItem value="Faculty of Agricultural Sciences">
              Faculty of Agricultural Sciences
            </MenuItem>
            <MenuItem value="Faculty of Geomatics">
              Faculty of Geomatics
            </MenuItem>
            <MenuItem value="Faculty of Management Studies">
              Faculty of Management Studies
            </MenuItem>
            <MenuItem value="Faculty of Social Sciences and Languages">
              Faculty of Social Sciences and Languages
            </MenuItem>
            <MenuItem value="Faculty of Technology">
              Faculty of Technology
            </MenuItem>
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Card Details:
          </Typography>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Slip:
          </Typography>
          <input type="file" onChange={handleFileChange} required />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload & Pay"
          )}
        </Button>
      </form>
      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

const WrappedTestUpload = (props) => (
  <Elements stripe={stripePromise}>
    <TestUpload {...props} />
  </Elements>
);

export default WrappedTestUpload;*/

/*02.03
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe instance
const stripePromise = loadStripe(
  "pk_test_51QnLCvGdZ5LBY08Ggg1g3mOVYhIyYkfkQJ4GJuHUcMeTHsuMMmm3YxfElHC8e0pKm2N4vQ7xrtPyq5q0EIRibBId00fbU8ix5f"
);

const TestUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Stripe hooks to handle the payment
  const stripe = useStripe();
  const elements = useElements();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Helper function to convert technical errors to user-friendly messages
  const getUserFriendlyErrorMessage = (error) => {
    if (error.code === "invalid_email") {
      return "The email address you entered is invalid. Please check and try again.";
    }
    if (error.code === "card_declined") {
      return "Your card was declined. Please check your card details or try another card.";
    }
    if (error.type === "validation_error") {
      return "There was an issue with the information you entered. Please check and try again.";
    }
    if (error.message) {
      return error.message; // Generic fallback for unknown errors
    }
    return "An unknown error occurred. Please try again later.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");
    setErrorMessage("");
    setOpenSnackbar(false);

    // Collect registration data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      // Create the payment intent on the backend
      const res = await fetch(
        "http://localhost:3000/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }), // Example: Amount in cents (e.g., $50.00)
        }
      );

      const paymentIntentData = await res.json();

      if (!res.ok) {
        throw new Error(paymentIntentData.error);
      }

      // Confirm the card payment using Stripe
      if (!stripe || !elements) {
        setErrorMessage("Stripe not ready. Please try again later.");
        setOpenSnackbar(true);
        return;
      }

      const { clientSecret } = paymentIntentData;

      // Get the CardElement and create a payment method
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setErrorMessage("Card details are missing. Please try again.");
        setOpenSnackbar(true);
        return;
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: name,
            email: email,
          },
        });

      if (paymentMethodError) {
        const userFriendlyMessage =
          getUserFriendlyErrorMessage(paymentMethodError);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        const userFriendlyMessage = getUserFriendlyErrorMessage(error);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
      } else {
        // If payment is successful, upload the registration data
        const uploadRes = await fetch(
          "http://localhost:3000/api/register/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await uploadRes.json();
        if (uploadRes.ok) {
          setResponse(`Upload successful! Test ID: ${result._id}`);
          onSuccess(); // Call the success callback
        } else {
          setErrorMessage(`Error: ${result.error}`);
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Hostel Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty of Applied Sciences">
              Faculty of Applied Sciences
            </MenuItem>
            <MenuItem value="Faculty of Computing">
              Faculty of Computing
            </MenuItem>
            <MenuItem value="Faculty of Agricultural Sciences">
              Faculty of Agricultural Sciences
            </MenuItem>
            <MenuItem value="Faculty of Geomatics">
              Faculty of Geomatics
            </MenuItem>
            <MenuItem value="Faculty of Management Studies">
              Faculty of Management Studies
            </MenuItem>
            <MenuItem value="Faculty of Social Sciences and Languages">
              Faculty of Social Sciences and Languages
            </MenuItem>
            <MenuItem value="Faculty of Technology">
              Faculty of Technology
            </MenuItem>
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Card Details:
          </Typography>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Slip:
          </Typography>
          <input type="file" onChange={handleFileChange} required />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload & Pay"
          )}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

const WrappedTestUpload = (props) => (
  <Elements stripe={stripePromise}>
    <TestUpload {...props} />
  </Elements>
);

export default WrappedTestUpload;*/
/*
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe instance
const stripePromise = loadStripe(
  "pk_test_51QnLCvGdZ5LBY08Ggg1g3mOVYhIyYkfkQJ4GJuHUcMeTHsuMMmm3YxfElHC8e0pKm2N4vQ7xrtPyq5q0EIRibBId00fbU8ix5f"
);

const TestUpload = ({ onSuccess }) => {
  //const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Stripe hooks to handle the payment
  const stripe = useStripe();
  const elements = useElements();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Helper function to convert technical errors to user-friendly messages
  const getUserFriendlyErrorMessage = (error) => {
    if (error.code === "invalid_email") {
      return "The email address you entered is invalid. Please check and try again.";
    }
    if (error.code === "card_declined") {
      return "Your card was declined. Please check your card details or try another card.";
    }
    if (error.type === "validation_error") {
      return "There was an issue with the information you entered. Please check and try again.";
    }
    if (error.message) {
      return error.message; // Generic fallback for unknown errors
    }
    return "An unknown error occurred. Please try again later.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");
    setErrorMessage("");
    setOpenSnackbar(false);

    // Collect registration data
    const formData = new FormData();
    //formData.append("file", file);
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      // Create the payment intent on the backend
      const res = await fetch(
        "http://localhost:3000/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }), // Example: Amount in cents (e.g., $50.00)
        }
      );

      const paymentIntentData = await res.json();

      if (!res.ok) {
        throw new Error(paymentIntentData.error);
      }

      // Confirm the card payment using Stripe
      if (!stripe || !elements) {
        setErrorMessage("Stripe not ready. Please try again later.");
        setOpenSnackbar(true);
        return;
      }

      const { clientSecret } = paymentIntentData;

      // Get the CardElement and create a payment method
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setErrorMessage("Card details are missing. Please try again.");
        setOpenSnackbar(true);
        return;
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: name,
            email: email,
          },
        });

      if (paymentMethodError) {
        const userFriendlyMessage =
          getUserFriendlyErrorMessage(paymentMethodError);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        const userFriendlyMessage = getUserFriendlyErrorMessage(error);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
      } else {
        // If payment is successful, upload the registration data
        const uploadRes = await fetch(
          "http://localhost:3000/api/register/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await uploadRes.json();
        if (uploadRes.ok) {
          setResponse(`Upload successful! Test ID: ${result._id}`);
          onSuccess(); // Call the success callback
        } else {
          setErrorMessage(`Error: ${result.error}`);
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Hostel Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty of Applied Sciences">
              Faculty of Applied Sciences
            </MenuItem>
            <MenuItem value="Faculty of Computing">
              Faculty of Computing
            </MenuItem>
            <MenuItem value="Faculty of Agricultural Sciences">
              Faculty of Agricultural Sciences
            </MenuItem>
            <MenuItem value="Faculty of Geomatics">
              Faculty of Geomatics
            </MenuItem>
            <MenuItem value="Faculty of Management Studies">
              Faculty of Management Studies
            </MenuItem>
            <MenuItem value="Faculty of Social Sciences and Languages">
              Faculty of Social Sciences and Languages
            </MenuItem>
            <MenuItem value="Faculty of Technology">
              Faculty of Technology
            </MenuItem>
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Card Details:
          </Typography>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload & Pay"
          )}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

const WrappedTestUpload = (props) => (
  <Elements stripe={stripePromise}>
    <TestUpload {...props} />
  </Elements>
);

export default WrappedTestUpload;*/

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

// Initialize Stripe instance
const stripePromise = loadStripe(
  "pk_test_51QnLCvGdZ5LBY08Ggg1g3mOVYhIyYkfkQJ4GJuHUcMeTHsuMMmm3YxfElHC8e0pKm2N4vQ7xrtPyq5q0EIRibBId00fbU8ix5f"
);

const TestUpload = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [registeringYear, setRegisteringYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNoError, setContactNoError] = useState("");

  // Stripe hooks to handle the payment
  const stripe = useStripe();
  const elements = useElements();

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Contact number validation
  const validateContactNo = (contactNo) => {
    return /^\d{10}$/.test(contactNo);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Handle contact number input change
  const handleContactNoChange = (e) => {
    const value = e.target.value;
    setContactNo(value);
    if (!validateContactNo(value)) {
      setContactNoError("Contact number must be exactly 10 digits.");
    } else {
      setContactNoError("");
    }
  };

  // Helper function to convert technical errors to user-friendly messages
  const getUserFriendlyErrorMessage = (error) => {
    if (error.code === "invalid_email") {
      return "The email address you entered is invalid. Please check and try again.";
    }
    if (error.code === "card_declined") {
      return "Your card was declined. Please check your card details or try another card.";
    }
    if (error.type === "validation_error") {
      return "There was an issue with the information you entered. Please check and try again.";
    }
    if (error.message) {
      return error.message; // Generic fallback for unknown errors
    }
    return "An unknown error occurred. Please try again later.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");
    setErrorMessage("");
    setOpenSnackbar(false);

    // Validate all fields before submission
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!validateContactNo(contactNo)) {
      setContactNoError("Contact number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    // Collect registration data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("regNo", regNo);
    formData.append("gender", gender);
    formData.append("registeringYear", registeringYear);
    formData.append("faculty", faculty);
    formData.append("department", department);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("parentNo", parentNo);

    try {
      // Create the payment intent on the backend
      const res = await fetch(
        "http://localhost:3000/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }), // Example: Amount in cents (e.g., $50.00)
        }
      );

      const paymentIntentData = await res.json();

      if (!res.ok) {
        throw new Error(paymentIntentData.error);
      }

      // Confirm the card payment using Stripe
      if (!stripe || !elements) {
        setErrorMessage("Stripe not ready. Please try again later.");
        setOpenSnackbar(true);
        return;
      }

      const { clientSecret } = paymentIntentData;

      // Get the CardElement and create a payment method
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setErrorMessage("Card details are missing. Please try again.");
        setOpenSnackbar(true);
        return;
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: name,
            email: email,
          },
        });

      if (paymentMethodError) {
        const userFriendlyMessage =
          getUserFriendlyErrorMessage(paymentMethodError);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (error) {
        const userFriendlyMessage = getUserFriendlyErrorMessage(error);
        setErrorMessage(userFriendlyMessage);
        setOpenSnackbar(true);
      } else {
        // If payment is successful, upload the registration data
        const uploadRes = await fetch(
          "http://localhost:3000/api/register/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await uploadRes.json();
        if (uploadRes.ok) {
          setResponse(`Upload successful! Test ID: ${result._id}`);
          onSuccess(); // Call the success callback
        } else {
          setErrorMessage(`Error: ${result.error}`);
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Check if all fields are valid
  const isFormValid =
    name &&
    regNo &&
    gender &&
    registeringYear &&
    faculty &&
    department &&
    address &&
    validateEmail(email) &&
    validateContactNo(contactNo) &&
    parentNo;

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Hostel Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration No"
          variant="outlined"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Registering Year</InputLabel>
          <Select
            value={registeringYear}
            onChange={(e) => setRegisteringYear(e.target.value)}
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Faculty</InputLabel>
          <Select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <MenuItem value="Faculty of Applied Sciences">
              Faculty of Applied Sciences
            </MenuItem>
            <MenuItem value="Faculty of Computing">
              Faculty of Computing
            </MenuItem>
            <MenuItem value="Faculty of Agricultural Sciences">
              Faculty of Agricultural Sciences
            </MenuItem>
            <MenuItem value="Faculty of Geomatics">
              Faculty of Geomatics
            </MenuItem>
            <MenuItem value="Faculty of Management Studies">
              Faculty of Management Studies
            </MenuItem>
            <MenuItem value="Faculty of Social Sciences and Languages">
              Faculty of Social Sciences and Languages
            </MenuItem>
            <MenuItem value="Faculty of Technology">
              Faculty of Technology
            </MenuItem>
            <MenuItem value="Faculty of Medicine">Faculty of Medicine</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="Department 1">Department 1</MenuItem>
            <MenuItem value="Department 2">Department 2</MenuItem>
            <MenuItem value="Department 3">Department 3</MenuItem>
            <MenuItem value="Department 4">Department 4</MenuItem>
            <MenuItem value="Department 5">Department 5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact No"
          variant="outlined"
          value={contactNo}
          onChange={handleContactNoChange}
          required
          error={!!contactNoError}
          helperText={contactNoError}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
          error={!!emailError}
          helperText={emailError}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parent's Contact No"
          variant="outlined"
          value={parentNo}
          onChange={(e) => setParentNo(e.target.value)}
          required
          error={!!contactNoError}
          helperText={contactNoError}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Payment Card Details:
          </Typography>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="rgb(81,1,2)"
          fullWidth
          sx={{ mb: 2 }}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload & Pay"
          )}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {response && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {response}
        </Typography>
      )}
    </Box>
  );
};

const WrappedTestUpload = (props) => (
  <Elements stripe={stripePromise}>
    <TestUpload {...props} />
  </Elements>
);

export default WrappedTestUpload;
