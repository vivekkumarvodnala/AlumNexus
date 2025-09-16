  // src/pages/Auth/Register.jsx
  import React, { useState } from "react";
  import Input from "../../components/Input";
  import Button from "../../components/Button";
  import { Link, useNavigate } from "react-router-dom";
  import { User, Mail, Lock, UserPlus } from "lucide-react";
  import axios from "axios";

  export default function Register() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirm: "",
      role: "student",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords must match";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);

    if (Object.keys(eObj).length === 0) {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          phone: form.phone
        });

        console.log("Register success:", res.data);

        // Redirect to dashboard or login
        navigate("/login");
      } catch (err) {
        console.error("Register error:", err.response?.data || err.message);
        setErrors({ api: err.response?.data?.message || "Registration failed" });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 transition-colors duration-300">
      {/* Header with icon + title */}
      <div className="text-center mb-6">
        <UserPlus className="mx-auto text-4xl text-primary dark:text-yellow-400" />
        <h2 className="text-2xl font-bold text-primary dark:text-yellow-400 mt-2">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Join our alumni network and start your journey today.
        </p>
      </div>

      {/* API Error */}
      {errors.api && (
        <p className="text-red-600 text-sm mb-3 text-center">{errors.api}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Full Name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          error={errors.name}
          icon={User}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@college.edu"
          error={errors.email}
          icon={Mail}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••"
          error={errors.password}
          icon={Lock}
        />

        <Input
          id="confirm"
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Repeat password"
          error={errors.confirm}
          icon={Lock}
        />

          <Input
          id="phone"
          label="Mobile Number"
          type="number"
          value={form.phone}
          onChange={handleChange}
          placeholder="enter number"
          error={errors.phone}
          icon={Lock}
        />

        {/* Role Selection */}
        <div>
          <label className="block text-sm text-accent/80 dark:text-gray-300 mb-2">
            Role
          </label>
          <div className="flex gap-6 text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={form.role === "student"}
                onChange={handleChange}
                className="text-primary focus:ring-primary dark:focus:ring-yellow-400"
              />
              Student
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="alumni"
                checked={form.role === "alumni"}
                onChange={handleChange}
                className="text-primary focus:ring-primary dark:focus:ring-yellow-400"
              />
              Alumni
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-4 text-sm text-accent/70 dark:text-gray-300 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary dark:text-yellow-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
