import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { User, LayoutDashboard, LogOut } from "lucide-react"

export default function UserDropdown({ user }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="bg-blue-500 text-lg p-2 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600 transition-colors">
          {user.username.substring(0, 1)}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] bg-white rounded-md p-2 shadow-lg"
          sideOffset={5}
          align="middle"
        >
          <DropdownMenu.Item className="outline-none">
            <button className="w-full text-left px-2 py-2 text-sm rounded hover:bg-gray-100 flex items-center gap-2">
              <User className="w-4 h-4" />
              Edit Profile
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <button className="w-full text-left px-2 py-2 text-sm rounded hover:bg-gray-100 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-gray-200 m-1" />

          <DropdownMenu.Item className="outline-none">
            <button className="w-full text-left px-2 py-2 text-sm rounded hover:bg-gray-100 flex items-center gap-2">
              <LogOut className="w-4 h-4 " />
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
    // <div className=" bg-blue-500 text-lg p-2 w-10 h-10 rounded-full flex justify-center items-center">
    //   {user.username.substring(0, 1)}
    // </div>
  )
}
