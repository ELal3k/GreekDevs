import * as Dialog from "@radix-ui/react-dialog"

export default function DashboardArticleCard({ title, onDelete, onEdit }) {
  return (
    <div className="w-full bg-white px-4 min-h-16 rounded-md shadow-md flex items-center justify-between">
      <p className="font-semibold text-xl text-blue-800">{title}</p>
      <div className="flex gap-6">
        <Dialog.Root>
          <Dialog.Trigger className=" px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md">
            Delete
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/3 rounded-md bg-white p-8 text-gray-800 shadow -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-4 ">
                <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
                <Dialog.Description className="text-gray-600 hidden">
                  This action cannot be undone. This will permanently delete
                  your data.
                </Dialog.Description>
                <div className=" flex justify-between">
                  <Dialog.Close
                    className=" px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md"
                    onClick={() => {
                      onDelete()
                    }}
                  >
                    Delete
                  </Dialog.Close>
                  <Dialog.Close className=" px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white shadow-md">
                    Dismiss
                  </Dialog.Close>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <button
          className=" px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow-md"
          onClick={() => onEdit()}
        >
          Edit
        </button>
      </div>
    </div>
  )
}
