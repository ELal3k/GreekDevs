import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/useAuth"
import { User, LayoutDashboard, LogOut } from "lucide-react"

export default function UserDropdown({ user }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-2 text-lg transition-colors hover:bg-blue-600">
          {user.username.substring(0, 1)}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] rounded-md bg-white p-2 shadow-lg"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item className="outline-none">
            <button className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-500">
              <User className="h-4 w-4" />
              Edit Profile
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <Link
              to="/dashboard"
              className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-500"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-1 h-[1px] bg-gray-200" />

          <DropdownMenu.Item className="outline-none">
            <button
              className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
