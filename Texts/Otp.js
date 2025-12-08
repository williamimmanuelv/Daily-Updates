// import React, { useEffect, useState } from "react";
// import loginfruit from "../../Assets/Mask group (46).png";
// import { FcGoogle } from "react-icons/fc";
// import { BsApple } from "react-icons/bs";
// import { useLocation, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { base_url } from "../../BaseUrls/BaseUrl";
// import Toast from "../../Untils/Toast";
// import { useFormik } from "formik";
// import axios from "axios";
// import { InputOtp } from "primereact/inputotp";

// const Otp = () => {
//   const [token, setToken] = useState([]);
//   const [timer, setTimer] = useState(180);

//   const [resending, setResending] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const type = location.state?.type || "";
//   console.log("type email:", type);

//   const email = location.state?.email || "";
//   console.log("Received email:", email);

//   const name = location.state?.name || "";
//   console.log("namesssss",name)
//   const phone = location.state?.phone || "";
//   console.log("phoneee",phone)



//   //  Timer countdown logic
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
//        return () => clearInterval(countdown);
//     }
//   }, [timer]);
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   //  Resend OTP function
//   const handleResendOtp = async () => {
//     try {
//       setResending(true);

//       // Choose API endpoint dynamically
//       const endpoint =
//         type === "register"
//           ? `${base_url}/register`
//           : `${base_url}/login`;

//       const payload = { email,name,phone };

//       const response = await axios.post(endpoint, payload);

//         formik.resetForm()
//       // Reset timer (10 minutes again)
//       setTimer(180);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "Failed to resend OTP. Please try again.";
//       // Toast({ message: errorMessage, type: "error" });
//     } finally {
//       setResending(false);
//     }
//   };


//   //  Formik setup
//   const formik = useFormik({
//     initialValues: {
//       email: email,
//       otp: "",
//     },
//     validationSchema: yup.object().shape({
//       otp: yup
//         .string()
//         .required("OTP is required!")
//         .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
//     }),
//     onSubmit: async (values) => {
//       const payload = {
//         email: email,
//         otp: values.otp,
//       };

//       // console.log("Payload to send:", payload);

//       try {
//         const response = await axios.post(`${base_url}/verifyregister`, payload);
//         setToken(response.data);

//         localStorage.setItem("token", response?.data?.token);
//         localStorage.setItem("name", response?.data?.name);
//         localStorage.setItem("email", response?.data?.email);
//         localStorage.setItem("user_id", response?.data?.id);
//         localStorage.setItem("customer_id", response?.data?.customer_id);

//         // Toast({ message: "Successfully Verified!", type: "success" });

//         formik.resetForm();
//         navigate("/");
//       } catch (error) {


//         const errorMessage =
//           error.response?.data?.message ||
//           error.response?.data?.errors?.otp?.[0] ||
//           "Invalid OTP. Please try again.";
//       }
//     },
//   });

//   return (
//     <>
//       <div className="body_bgcolor min-vh-100 d-flex justify-content-center align-items-center">
//         <div className="bg-dark rounded-4 p-3 w-100" style={{ maxWidth: "800px" }}>
//           <div className="row g-0">
//             {/* Left Section */}
//             <div className="col-md-6 d-flex align-items-center justify-content-center">
//               <img src={loginfruit} alt="fruit" className="img-fluid rounded" />
//             </div>

//             {/* Right Section */}
//             <div className="col-md-6 text-white p-md-4">
//               <h5 className="fw-semibold mb-2 cardfamily ps-3">Verify OTP</h5>
//               <p className="mb-4 small ps-4">Enter the 6-digit code sent to your Email.</p>

//               <form onSubmit={formik.handleSubmit} autoComplete="off">
//                 <div className="mb-3 px-3 pt-3 text-center">
//                   <label htmlFor="otp" className="form-label fw-semibold text-start d-block ps-3">
//                    Enter Email OTP
//                   </label>

//                   {/*  InputOtp field */}
//                   <div className="d-flex justify-content-center">
//                     <InputOtp
//                       id="otp"
//                       value={formik.values.otp}
//                       onChange={(e) => formik.setFieldValue("otp", e.value)}
//                       length={6}
//                       integerOnly
//                     />
//                   </div>

//                   {/*  Validation error */}
//                   {formik.errors.otp && formik.touched.otp && (
//                     <p style={{ color: "red", fontSize: "12px" }} className="pt-2">
//                       {formik.errors.otp}
//                     </p>
//                   )}

//                   {/*  Timer & Resend */}
//                   <div className="pt-2">
//                     {timer > 0 ? (
//                       <span className="small text-light">
//                         OTP expires in {formatTime(timer)} minutes
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleResendOtp}
//                         disabled={resending}
//                         className="btn btn-link text-danger p-0 small"
//                       >
//                         {resending ? "Resending..." : "Resend OTP"}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="d-grid mb-4 px-5 mx-5 pt-3">
//                   <button
//                     type="submit"
//                     className="btn btn-danger cart_color text-white rounded-5 p-1"
//                   >
//                     Verify
//                   </button>
//                 </div>
//               </form>

//               <div className="d-flex align-items-center mb-3">
//                 <hr className="flex-grow-1 text-light" />
//                 <span className="mx-2 small">Or Continue With</span>
//                 <hr className="flex-grow-1 text-light" />
//               </div>

//               <div className="d-flex justify-content-center gap-3 mb-3">
//                 <button className="rounded-3 p-2">
//                   <FcGoogle size={22} />
//                 </button>
//                 <button className="rounded-3 p-2">
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

// export default Otp;


import React, { useEffect, useState } from "react";
import loginfruit from "../../Assets/Mask group (46).png";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { base_url } from "../../BaseUrls/BaseUrl";
import { useFormik } from "formik";
import axios from "axios";
import { InputOtp } from "primereact/inputotp";
import Common from "../../common/Common";
import { setToken, setUserData } from "../../store/authSlice";
import Toast from "../../Untils/Toast";

const Otp = () => {
  const [timer, setTimer] = useState(180);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type || "";

  const email = location.state?.email || "";

  const name = location.state?.name || "";
  const phone = location.state?.phone || "";
  const { dispatch } = Common();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  //  Resend OTP function
  const handleResendOtp = async () => {
    try {
      setResending(true);

      const endpoint =
        type === "register" ? `${base_url}/register` : `${base_url}/login`;

      const payload = { email, name, phone };

      const response = await axios.post(endpoint, payload);

      formik.resetForm();
      setTimer(180);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      Toast({ message: errorMessage, type: "error" });
    } finally {
      setResending(false);
    }
  };

  //  Formik setup
  const formik = useFormik({
    initialValues: {
      email: email,
      otp: "",
    },
    validationSchema: yup.object().shape({
      otp: yup
        .string()
        .required("OTP is required!")
        .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
    }),
    onSubmit: async (values) => {
      const payload = {
        email: email,
        otp: values.otp,
      };
      setLoading(true);
      try {
        const response = await axios.post(
          `${base_url}/verifyregister`,
          payload
        );
        console.log("response", response);
        const newData = response?.data;
        if (newData?.status === "success") {
          dispatch(setToken(newData?.token));
          dispatch(setUserData(newData));
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("name", response?.data?.name);
          localStorage.setItem("email", response?.data?.email);
          localStorage.setItem("user_id", response?.data?.id);
          localStorage.setItem("customer_id", response?.data?.customer_id);

          Toast({ message: newData?.message, type: "success" });

          formik.resetForm();
          navigate("/");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.errors?.otp?.[0] ||
          "Invalid OTP. Please try again.";
        Toast({ message: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.otp.length >= 6) {
      console.log("yes Otp is greater than 5");
      setLoading(true);
      formik.handleSubmit();

    }
    else {
      console.log("no");
      setLoading(false)

    }
  }, [formik.values.otp.length])

  return (
    <>
      <div className="body_bgcolor min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="bg-dark rounded-4 p-3 w-100"
          style={{ maxWidth: "800px" }}
        >
          <div className="row g-0">
            {/* Left Section */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={loginfruit} alt="fruit" className="img-fluid rounded" />
            </div>

            {/* Right Section */}
            <div className="col-md-6 text-white p-md-4">
              <h5 className="fw-semibold mb-2 cardfamily ps-3">Verify OTP</h5>
              <p className="mb-4 small ps-4">
                Enter the 6-digit code sent to your Email.
              </p>

              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="mb-3 px-3 pt-3 text-center">
                  <label
                    htmlFor="otp"
                    className="form-label fw-semibold text-start d-block ps-3"
                  >
                    Enter Email OTP
                  </label>

                  {/*  InputOtp field */}
                  <div className="d-flex justify-content-center">
                    <InputOtp
                      id="otp"
                      value={formik.values.otp}
                      onChange={(e) => formik.setFieldValue("otp", e.value)
                      }

                      length={6}
                      integerOnly
                    />
                  </div>

                  {/*  Validation error */}
                  {formik.errors.otp && formik.touched.otp && (
                    <p
                      style={{ color: "red", fontSize: "12px" }}
                      className="pt-2"
                    >
                      {formik.errors.otp}
                    </p>
                  )}

                  {/*  Timer & Resend */}
                  <div className="pt-2">
                    {timer > 0 ? (
                      <span className="small text-light">
                        OTP expires in {formatTime(timer)} minutes
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resending}
                        className="btn btn-link text-danger p-0 small"
                      >
                        {resending ? "Resending..." : "Resend OTP"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="d-grid mb-4 px-5 mx-5 pt-3">
                  <button
                    type="submit"
                    className="btn btn-danger cart_color text-white rounded-5 p-1"
                    disabled={loading}

                  >
                    {loading ? "processing..." : "Verify"}
                  </button>
                </div>
              </form>

              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1 text-light" />
                <span className="mx-2 small">Or Continue With</span>
                <hr className="flex-grow-1 text-light" />
              </div>

              <div className="d-flex justify-content-center gap-3 mb-3">
                <button className="rounded-3 p-2">
                  <FcGoogle size={22} />
                </button>
                <button className="rounded-3 p-2">
                  <BsApple size={22} className="text-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
