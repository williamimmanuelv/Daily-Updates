// import React, { useState } from "react";
// import loginfruit from "../../Assets/Mask group (46).png";
// import { AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { BsApple } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { base_url } from "../../BaseUrls/BaseUrl";
// import Toast from "../../Untils/Toast";
// import { useFormik } from "formik";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Register = () => {
//   const navigate = useNavigate();

//   const [token, setToken] = useState([]);

//   const onSubmit = async (values) => {
//     console.log("values", values);

//     try {
//       //  const response = await axios.post( "https://rooptek.com/ttsbrothers/api/admin/login", values)
//       const response = await axios.post(`${base_url}/register`, values);

//       setToken(response.data);
//       console.log("response.data", response.data);
//       localStorage.setItem("token", response?.data?.token);

//       // localStorage.removeItem("token")

//       formik.resetForm();
//       // navigate('/otp')

//       navigate("/otp", {
//         state: {
//           email: values.email,
//           name: values.name,
//           phone: values.phone,
//           type: "register",
//         },
//       });
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.errors?.email?.[0] ||
//         "Invalid email. Please try again.";

//       // Toast({ message: errorMessage, type: "error" });
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       name: "",
//       phone: "",
//     },
//     validateOnChange: true,
//     validateOnBlur: true,
//     validationSchema: yup.object().shape({
//       name: yup.string().required("name is required!"),
//       email: yup
//         .string()
//         .email("Enter a valid email address!")
//         .required("Email is required!"),

//       // phone: yup
//       //     .string()
//       //     .matches(/^[0-9]*$/, "Only numbers allowed!")
//       //     .length(10,"Phone number must be exactly 10 digits!")
//       //     .min(10, "Phone number must be exactly 10 digits!")
//       //     .max(10, "Phone number must be exactly 10 digits!")
//       //     .required("Phone number is required!"),
//       phone: yup
//         .string()
//         .matches(/^[0-9]*$/, "Only numbers allowed!")
//         .length(10, "Phone number must be exactly 10 digits ")
//         .required("Phone number is required!"),
//     }),

//     onSubmit,
//   });
//   return (
//     <>
//       <div className="body_bgcolor min-vh-100 d-flex justify-content-center align-items-center">
//         <div
//           className="bg-dark rounded-4  p-3 w-100"
//           style={{ maxWidth: "800px" }}
//         >
//           <div className="row g-0">
//             <div className="col-md-6 d-flex align-items-center justify-content-center">
//               <img src={loginfruit} alt="fruit" className="img-fluid rounded" />
//             </div>

//             <div className="col-md-6 text-white  p-md-4 ">
//               <h5 className="fw-semibold  cardfamily ps-3">
//                 Register your account
//               </h5>
//               <p className="mb-4 small ps-4">
//                 Welcome back, you've been missed!
//               </p>

//               <form onSubmit={formik.handleSubmit} autoComplete="off">
//                 <div className="mb-3 px-3 pt-1">
//                   <label htmlFor="name" className="form-label fw-semibold">
//                     Name
//                   </label>
//                   {/* <input
//                                         type="text"
//                                         className="form-control bg-white"
//                                         id="name"
//                                         name="name"
//                                         placeholder="Enter name"
//                                         value={formik.values.name}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     /> */}
//                   <input
//                     type="text"
//                     className="form-control bg-white text-capitalize"
//                     id="name"
//                     name="name"
//                     placeholder="Enter name"
//                     value={formik.values.name}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       const capitalized =
//                         value.charAt(0).toUpperCase() +
//                         value.slice(1).toLowerCase();
//                       formik.setFieldValue("name", capitalized);
//                     }}
//                     onBlur={formik.handleBlur}
//                   />

//                   {formik.errors.name && formik.touched.name && (
//                     <p style={{ color: "red", fontSize: "12px" }}>
//                       {formik.errors.name}
//                     </p>
//                   )}
//                 </div>

//                 <div className="mb-3 px-3 pt-1">
//                   <label htmlFor="username" className="form-label fw-semibold">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control bg-white"
//                     id="email"
//                     name="email"
//                     placeholder="Enter email"
//                     value={formik.values.email}
//                     // onChange={formik.handleChange}
//                     onChange={(e) => {
//                       formik.setFieldValue("email", e.target.value);

//                       // 👇 instantly show validation error while typing
//                       formik.validateField("email");
//                     }}
//                     onBlur={formik.handleBlur}
//                   />

//                   {formik.errors.email && formik.touched.email && (
//                     <p style={{ color: "red", fontSize: "12px" }}>
//                       {formik.errors.email}
//                     </p>
//                   )}
//                 </div>

//                 <div className="mb-3 px-3 pt-1">
//                   <label htmlFor="phone" className="form-label fw-semibold">
//                     Phone No
//                   </label>
//                   <input
//                     type="text"
//                     maxLength={10}
//                     className="form-control bg-white"
//                     id="phone"
//                     name="phone"
//                     placeholder="Enter phone"
//                     value={formik.values.phone}
//                     onChange={(e) => {
//                       const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
//                       formik.setFieldValue("phone", onlyNumbers);
//                     }}
//                     onBlur={formik.handleBlur}
//                   />

//                   {formik.touched.phone && formik.errors.phone && (
//                     <small style={{ color: "red" }}>
//                       {formik.errors.phone}
//                     </small>
//                   )}
//                 </div>

//                 <div className="d-grid mb-4 px-5 mx-5 pt-3">
//                   <button
//                     type="submit"
//                     className="btn btn-danger cart_color text-white rounded-5 p-0 p-1"
//                   >
//                     Send OTP
//                   </button>
//                 </div>
//               </form>

//               <div className="d-flex align-items-center mb-2">
//                 <hr className="flex-grow-1 text-light" />
//                 <span className="mx-2 small">Or Continue With</span>
//                 <hr className="flex-grow-1 text-light" />
//               </div>

//               <div className="d-flex justify-content-center gap-3 mb-2">
//                 <button className=" rounded-3 p-2">
//                   <FcGoogle size={22} />
//                 </button>
//                 <button className=" rounded-3 p-2">
//                   <BsApple size={22} className="text-dark" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import loginfruit from "../../Assets/Mask group (46).png";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { base_url } from "../../BaseUrls/BaseUrl";
import Toast from "../../Untils/Toast";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";



import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import './Register.css'



const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${base_url}/register`, values);
      console.log("res", res);
      const newData = res?.data;
      if (newData?.status === "success") {
        navigate("/otp", {
          state: {
            email: values.email,
            name: values.name,
            phone: values.phone,
            type: "register",
          },
        });
        formik.resetForm();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        "Invalid email. Please try again.";

      Toast({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      email: yup
        .string()
        .email("Enter a valid email address!")
        .required("Email is required!"),

      phone: yup
        .string()
        .matches(/^[0-9]*$/, "Only numbers allowed!")
        .length(15, "Phone number must be exactly 15 digits ")
        .required("Phone number is required!"),
    }),

    onSubmit,
  });
  return (
    <>
      <div className="body_bgcolor min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="bg-dark rounded-4 py-3 w-100"
          style={{ maxWidth: "725px", maxHeight: "auto", display: "inline-block" }}
        >
          <div className="row g-0">
            <div className="col-md-6 d-flex align-items-center justify-content-end">
              <img src={loginfruit} alt="fruit" className="img-fluid rounded imgForRegister"
                style={{ maxWidth: "470px", maxHeight: "470px" }} />
            </div>

            <div className="col-md-6 text-white  mx-auto px-2 py-3 pe-2"
              style={{ maxWidth: "400px", maxHeight: "550px" }}>
              <h5 className="fw-semibold  cardfamily  text-center mt-2">
                Register your account
              </h5>
              <p className="mb-2 small text-center">
                Welcome back, you've been missed!
              </p>

              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="mb-1 px-3 pt-1">
                  <label htmlFor="name" className="form-label fw-semibold fs-6">
                    Name
                  </label>


                  <Input
                    type="text"
                    // className="form-control bg-white"
                    prefix={<UserOutlined />}
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formik.values.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyText = value.replace(/[^A-Za-z ]/g, "");
                      const formatted =
                        onlyText.charAt(0).toUpperCase() +
                        onlyText.slice(1).toLowerCase();

                      formik.setFieldValue("name", formatted);
                    }}
                    onBlur={formik.handleBlur} />
                  {/* 
                  <input
                    type="text"
                    className="form-control bg-white text-capitalize"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formik.values.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyText = value.replace(/[^A-Za-z ]/g, "");
                      const formatted =
                        onlyText.charAt(0).toUpperCase() +
                        onlyText.slice(1).toLowerCase();

                      formik.setFieldValue("name", formatted);
                    }}
                    onBlur={formik.handleBlur}
                  /> */}

                  {formik.errors.name && formik.touched.name && (
                    <small style={{ color: "red", fontSize: "12px" }} className="ms-1 mt-1">
                      {formik.errors.name}
                    </small>
                  )}
                </div>

                <div className="px-3 pt-1">
                  <label htmlFor="username" className="form-label fw-semibold">
                    Email
                  </label>

                  <Input
                    prefix={<TfiEmail />}
                    type="email"
                    // className="form-control bg-white"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);

                      // 👇 instantly show validation error while typing
                      formik.validateField("email");
                    }}
                    onBlur={formik.handleBlur} />


                  {/* <input
                    type="email"
                    className="form-control bg-white"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);

                      // 👇 instantly show validation error while typing
                      formik.validateField("email");
                    }}
                    onBlur={formik.handleBlur}
                  /> */}

                  {formik.errors.email && formik.touched.email && (
                    <small style={{ color: "red", fontSize: "12px", }} className="ms-1 mt-1">
                      {formik.errors.email}
                    </small>
                  )}
                </div>

                <div className="px-3 pt-1">
                  <label htmlFor="phone" className="form-label fw-semibold ">
                    Phone No
                  </label>

                  <Input
                    prefix={<FiPhone />}
                    type="text"
                    maxLength={15}
                    // className="form-control bg-white"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                      formik.setFieldValue("phone", onlyNumbers);
                    }}
                    onBlur={formik.handleBlur}
                  />


                  {/* <input
                    type="text"
                    maxLength={15}
                    className="form-control bg-white"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                      formik.setFieldValue("phone", onlyNumbers);
                    }}
                    onBlur={formik.handleBlur}
                  /> */}

                  {formik.touched.phone && formik.errors.phone && (
                    <small style={{ color: "red", fontSize: "12px" }} className="ms-1 mt-1">
                      {formik.errors.phone}
                    </small>
                  )}
                </div>

                <div className="d-grid mb-1 px-5 mx-5 pt-3">
                  <button
                    type="submit"
                    className="btn btn-danger cart_color text-white rounded-5 p-0 p-1"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Send OTP"}
                  </button>
                </div>
              </form>

              <div className="d-flex align-items-center px-3 mb-2">
                <hr className="flex-grow-1 text-light" />
                <span className="mx-2  small">Or Continue With</span>
                <hr className="flex-grow-1 text-light" />
              </div>

              <div className="d-flex justify-content-center gap-3"
                style={{ maxHeight: '35px' }}>
                <button className=" rounded-3 p-2" >
                  <FcGoogle size={18} className="mb-3" />
                </button>
                <button className=" rounded-3 p-2">
                  <BsApple size={18} className="text-dark mb-3" />
                </button>
              </div>


              <div className="text-center mt-3">
                <p className="small text-white">
                  Already have an account?{" "}
                  <span
                    className="text-danger fw-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
