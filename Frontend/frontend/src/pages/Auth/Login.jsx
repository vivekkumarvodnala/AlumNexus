// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import {useAuth} from "../../context/AuthProvider"

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);

    if (Object.keys(eObj).length === 0) {
      try {
        setLoading(true);

        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });

        // save JWT token
      //   localStorage.setItem("token", res.data.token);
      //   localStorage.setItem("role", res.data.role);
      // localStorage.setItem("name", res.data.name);
        // console.log(res.data);
       login(res.data._id,res.data.name, res.data.role, res.data.token);
      //  user(res.data);
        // redirect
        navigate(`/${res.data.role}-dashboard`);
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <FaSignInAlt className="text-4xl text-[#0D9488] dark:text-yellow-400 mb-3" />
        <h2 className="text-2xl font-bold text-[#0D9488] dark:text-yellow-400">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Login to continue your journey 🚀
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="dark:text-black space-y-5">
        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@college.edu"
          error={errors.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="w-4 h-4 accent-[#0D9488] dark:accent-yellow-400"
            />
            Remember me
          </label>
          <Link
            to="#"
            className="text-[#0D9488] dark:text-yellow-400 hover:underline"
          >
            Forgot?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-[#0D9488]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-[#8B5CF6] dark:text-yellow-400 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
