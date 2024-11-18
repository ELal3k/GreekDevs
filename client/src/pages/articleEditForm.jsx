import useApi from "../hooks/useApi"
import LoadingSpinner from "../components/UI/loadingSpinner"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function ArticleEditForm() {
  const { articleId } = useParams()
  const { response: article, isLoading, fetchData } = useApi()

  useEffect(() => {
    const getArticle = async () => {
      try {
        fetchData({
          url: `/articles/get/${articleId}`,
          method: "GET",
        })
      } catch (err) {
        console.log("Failed to fetch article", err)
      }
    }

    getArticle()
  }, [articleId])

  if (isLoading) return <LoadingSpinner />

  console.log(article)

  return <div>articleEditForm</div>
}
