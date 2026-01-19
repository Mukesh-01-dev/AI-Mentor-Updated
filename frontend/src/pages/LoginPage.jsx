import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import SocialLogin from "../components/auth/SocialLogin";

/* FormInput stays exactly as your designed UI */
const FormInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BEA5] focus:border-transparent transition-all dark:bg-[#0f172a] dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const LoginPage = () => {
  /* 🔹 LOGIC FROM WORKING LOGIN PAGE (UNCHANGED) */
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      login(data, keepLoggedIn);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  /* 🔹 UI */
  return (
    <AuthLayout
      title="Join Us Today!"
      subtitle="Create your account for an enhanced experience at your fingertips."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ✅ Direct Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BEA5] focus:border-transparent transition-all dark:bg-[#0f172a] dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Keep Logged In & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-[#00BEA5] focus:ring-[#00BEA5]"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Keep me logged in
            </span>
          </label>

          <a
            href="/forgot-password"
            className="text-sm font-semibold text-[#00BEA5] hover:text-[#00a08b] transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2186df] to-[#02ffbb] text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>

      <SocialLogin />

      <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#00BEA5] hover:text-[#00a08b] transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
