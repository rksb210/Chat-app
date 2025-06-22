import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const { login, isLoggin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) login(formData);
  };
  return (
    <div className="grid lg:grid-cols-2 flex-1 bg-slate-900">
      <div className="flex flex-col justify-center items-center ">

        <div className="text-bold text-orange-400 text-2xl">Login</div>


        <form className="w-[50%]" onSubmit={handleSubmit}>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium text-white">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0  pl-3 flex items-center z-30">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium text-white">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0  pl-3 flex items-center z-30">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={`${showPassword ? "text" : "password"}`}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-30 "
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 " />
                ) : (
                  <Eye className="size-5 " />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 p-2 rounded text-white"
            disabled={isLoggin}
          >
            {isLoggin ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-base-content/60 text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default LoginPage;
