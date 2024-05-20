import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../olx-logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: values.username }).then(() => {
            addDoc(collection(firestore, "users"), {
              id: user.uid,
              name: values.username,
              phone: values.phone,
            }).then(() => {
              setLoading(false);
              toast.success("Signup successful!");
              navigate("/login");
            });
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Alredy Used");
        });
    },
  });

  const handleButtonClick = () => {
    setShowErrors(true);
    formik.handleSubmit();
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <img className="logo" src={Logo} alt="OLX Logo" />
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {showErrors && formik.touched.username && formik.errors.username && (
            <div className="error">{formik.errors.username}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {showErrors && formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {showErrors && formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {showErrors && formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}

          <button type="button" onClick={handleButtonClick} disabled={loading}>
            Signup
          </button>
        </form>
        <a className="already-signup-link">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </a>
      </div>
      <ToastContainer />
    </div>
  );
}
