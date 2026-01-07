import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PropertyDetail() {
  const router = useRouter()
  const { id } = router.query

  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchProperty = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`/api/properties/${id}`)
        setProperty(res.data)
      } catch (e: any) {
        setError('Failed to load property details')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <Link href="/" className="text-blue-600 underline">
          Back to listings
        </Link>
      </div>
    )
  }
  if (!property) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No property found.</p>
        <Link href="/" className="text-blue-600 underline">
          Back to listings
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/" className="text-blue-600 underline">
        ← Back to listings
      </Link>
      <div className="mt-4 bg-white shadow rounded-lg p-6">
        {property?.image && (
          <img
            src={property.image}
            alt={property?.title || property?.name || 'Property'}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-2xl font-bold">
          {property?.title || property?.name || 'Untitled Property'}
        </h1>
        {property?.location && (
          <p className="text-gray-600 mt-1">{property.location}</p>
        )}
        {property?.price && (
          <p className="mt-2 font-semibold">
            ${Number(property.price).toLocaleString()}
          </p>
        )}
        {property?.description && (
          <p className="mt-4 text-gray-700">{property.description}</p>
        )}
      </div>
    </div>
  )
}
