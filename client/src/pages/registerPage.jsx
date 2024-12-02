import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
// import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  const onSubmit = async (data) => {
    try {
      console.log(
        "API URL:",
        `${import.meta.env.VITE_API_BASE_URL}/users/register`
      )
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      )
      res.data.success
        ? toast.success("Registration successful!")
        : toast.error("Registration failed. Please try again.")
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during registration"
      )
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 shadow-md p-4 rounded-xl bg-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*------------- USERNAME --------------*/}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>

          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username should be at least 6 characters long",
              },
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        {/* ------------------- EMAIL ----------------------- */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ------------------- PASSWORD ----------------------- */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])(?=.{8,})/,
                  message:
                    "Password should be 8+ characters long and include uppercase, lowercase, number & special character",
                },
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <div
              className="absolute bottom-[10px] right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff strokeWidth={0.7} />
              ) : (
                <Eye strokeWidth={0.7} />
              )}
            </div>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ------------------- CONFIRM PASSWORD ----------------------- */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <div
              className="absolute bottom-[10px] right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff strokeWidth={0.7} />
              ) : (
                <Eye strokeWidth={0.7} />
              )}
            </div>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  )
}
