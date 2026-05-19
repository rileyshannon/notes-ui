import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import axios from "axios";

interface Props {
  setToken: (token: string) => void;
}

export default function Register({ setToken }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/register", form);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/notes");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Register</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
