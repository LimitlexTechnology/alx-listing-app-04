import axios from 'axios'
import { useEffect, useState } from 'react'

type Props = {
  propertyId: string | number
}

export default function ReviewSection({ propertyId }: Props) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`)
        setReviews(response.data)
      } catch (e: any) {
        setError('Error fetching reviews')
        console.error('Error fetching reviews:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [propertyId])

  if (loading) {
    return <p>Loading reviews...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div>
      {reviews.map((review: any) => (
        <div key={review.id} className="border-b py-3">
          <p className="text-gray-800">{review.comment}</p>
          {review.author && (
            <p className="text-sm text-gray-500">— {review.author}</p>
          )}
        </div>
      ))}
      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  )
}
