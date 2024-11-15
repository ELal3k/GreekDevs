import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import TipTapViewer from "../components/TipTap/tipTapViewer"

export default function ArticlePage() {
  const { id } = useParams()
  const { response: article, isLoading, fetchData } = useApi()

  useEffect(() => {
    fetchData({
      url: `/articles/get/${id}`,
      method: "GET",
    })
  }, [])

  if (isLoading) return <LoadingSpinner />
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div
        className="border rounded-lg bg-white
          "
      >
        <TipTapViewer
          content={article?.content}
          title={article?.title}
          author={article?.author}
          id={article?._id}
          createdAt={article?.createdAt}
        />
      </div>
    </div>
  )
}
