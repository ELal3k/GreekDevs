import { useAuth } from "../auth/useAuth"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user, isLoading, error } = useAuth()
  const navigate = useNavigate()

  if (isLoading)
    return <div className="text-center mt-8 text-blue-700">Loading....</div>

  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Welcome back, {user.username}!
            </h1>
            <button
              onClick={() => {
                /* Handle edit profile */
              }}
              className="text-blue-500 hover:text-blue-600"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">Profile Information</p>
              <p>
                <span className="font-medium">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Account Statistics</p>
              <p>
                <span className="font-medium">Member since:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Articles written:</span>{" "}
                {user.articlesCount || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/create-article")}
              className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <span className="block font-medium">New Article</span>
              <span className="text-sm text-gray-600">Create a new post</span>
            </button>

            <button
              onClick={() => {
                /* Handle action */
              }}
              className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100"
            >
              <span className="block font-medium">My Articles</span>
              <span className="text-sm text-gray-600">View your posts</span>
            </button>

            {/* Add more quick actions as needed */}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Add recent activity list here */}
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  )
}
