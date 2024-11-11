import { useState } from "react"
import { useForm } from "react-hook-form"

import { Eye, EyeOff } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "../auth/useAuth"
import useApi from "../hooks/useApi"
import "react-toastify/dist/ReactToastify.css"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const { fetchData } = useApi()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetchData({
        url: "/users/login",
        method: "POST",
        data: {
          email: data.email,
          password: data.password,
        },
      })

      if (res.token) {
        toast.success("Login Successful!", {
          autoClose: 2000,
        })
        setTimeout(() => {
          login(res.token)
        }, 2000)
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            toast.error(`${err.response.data.message}`)
            break
          case 500:
            toast.error("Server error.please try again later.")
            break
          default:
            toast.error("An error occured during login.")
        }
      } else {
        toast.error(err.message || "An unexpected error occurred")
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
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
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
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

        {/* PASSWORD */}
        <div className="mb-4 relative">
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  )
}
