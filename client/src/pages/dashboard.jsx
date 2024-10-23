import { useEffect } from "react"
import { useAuth } from "../auth/useAuth"
import useApi from "../hooks/useApi"

export default function Dashboard() {
  const { decodeToken } = useAuth()
  const { data: user, isLoading, error, get } = useApi()

  const { userId } = decodeToken()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await get(`/users/${userId}`)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
  }, [get, userId])

  console.log(user)

  if (isLoading)
    return <div className="text-center mt-8 text-blue-700">Loading....</div>

  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return <div>Dashboard</div>
}
