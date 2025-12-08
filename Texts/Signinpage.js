import React, { useState } from "react";
import loginfruit from "../../Assets/Mask group (46).png";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { base_url } from "../../BaseUrls/BaseUrl";
import Toast from "../../Untils/Toast";




import { TfiEmail } from "react-icons/tfi";
// import React, { useEffect, useState } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Signinpage.css'



import { useFormik } from "formik";
import axios from "axios";
import Toastify from "../../Untils/Toastify";

const Signinpage = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState([]);

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    console.log("values", values);

    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/login`, values);
      console.log("signin", response);
      const newData = response.data;
      if (newData?.status === "success") {
        formik.resetForm();
        navigate("/otp", { state: { email: values.email, type: "login" } });
      }
    } catch (error) {
      // if (error.response?.data?.message === "Invalid username") {
      //   formik.setFieldError("username", "Invalid username");
      // } else if (error.response?.data?.message === "Invalid password") {
      //   formik.setFieldError("password", "Invalid password");

      // } else if (error.response?.data?.message === "The selected email is invalid.") {
      Toast({ message: error?.response?.data?.message, type: "error" });
      // formik.setFieldError("email", "The selected email is invalid.");

      // console.log(error.response?.data?.message + " The selected email is invalid.");

      // }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Enter a valid email address!")
        .required("Email is required!"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <>
      <div className="body_bgcolor d-flex min-vh-100  justify-content-center align-items-center">
        <div
          className="bg-dark rounded-4 w-100"
          style={{ maxWidth: "575px", maxHeight: "auto", display: "inline-block" }}
        >
          <div className="row g-0">
            <div className="col-md-6 px-2 py-4 d-flex align-items-center justify-content-end ">
              <img src={loginfruit} alt="fruit" className="img-fluid rounded imgForSigninpage"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
            </div>

            <div className="col-md-6 text-white px-2 py-3 pe-3"
              style={{ maxWidth: "350px", maxHeight: "365px", margin: "auto" }}>
              <h5 className="fw-semibold  cardfamily text-center pt-2 " >
                Sign into your account
              </h5>
              <p className="mb-3 small  text-center ">
                Welcome back, you've been missed!
              </p>

              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="mb-3 px-3 " style={{ header_text: "start" }}>
                  <label htmlFor="username" className="form-label fw-semibold "  >
                    Email
                  </label>
                  <Input
                    type="email"
                    className=""
                    id="email"
                    name="email"
                    prefix={<TfiEmail />} placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />


                  {/* <input
                    type="email"
                    className="form-control bg-white"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}

                  {formik.errors.email && formik.touched.email && (
                    <small style={{ color: "red", fontSize: "12px" }} className="ms-1 mt-1 ">
                      {formik.errors.email}
                    </small>
                  )}
                </div>

                {/* <div className="mb-3 px-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="position-relative">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control pe-5 px-5"
              />
              <AiOutlineEyeInvisible
                size={20}
                className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div> */}

                {/* <div className="mb-3 text-end">
            <a href="forgot" className="text-decoration-none  small">Forgot password?</a>
          </div> */}

                <div className="d-grid px-3 mb-3 ">
                  <button
                    type="submit"
                    className="btn btn-danger cart_color text-white rounded-2 p-1 "
                    disabled={loading}
                    style={{
                      fontSize: "12px",
                      cursor: loading ? "not-allowed" : "pointer"
                    }}
                  >
                    {loading ? "processing..." : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="d-flex align-items-center mb-1 px-3">
                <hr className="flex-grow-1 text-light" />
                <span className=" small" style={{ fontSize: "2vh" }}>Or Continue With</span>
                <hr className="flex-grow-1 text-light" />
              </div>

              <div className="d-flex justify-content-center gap-4 mx-auto mb-2"
                style={{ maxHeight: "35px", maxWidth: "35px" }}>
                <button className=" rounded-3 p-2 "  >
                  <FcGoogle size={18} className="mb-3" />
                </button>
                <button className=" rounded-3 p-2">
                  <BsApple size={18} className="text-dark mb-3" />
                </button>
              </div>

              <p className="small text-center text-white ">
                Not a member?
                <span
                  className="ms-1  text-danger fw-semibold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Create a account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signinpage;
