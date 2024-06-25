import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Corrected header
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }


      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.data.role,
        },
      });

      // console.log(result, "login-data");

      setLoading(false);
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email here"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus-border-b-primaryColor text-[16px] leading-7 focus:outline-none text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus-border-b-primaryColor text-[16px] leading-7 focus:outline-none text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size='25' color="white"/> :`Login`}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
