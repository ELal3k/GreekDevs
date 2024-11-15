export default function DashboardArticleCard({ title }) {
  return (
    <div className="w-full bg-white px-4 min-h-16 rounded-md shadow-md flex items-center justify-between">
      <p className="font-semibold text-xl text-blue-800">{title}</p>
      <div className="flex gap-6">
        <button className=" px-2 py-1 rounded-md bg-red-500 text-white shadow-md">
          Delete
        </button>
        <button className=" px-2 py-1 rounded-md bg-blue-500 text-white shadow-md">
          Edit
        </button>
      </div>
    </div>
  )
}
