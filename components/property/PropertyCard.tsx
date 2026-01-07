import Link from 'next/link'

type Props = {
  property: any
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {property?.image && (
        <img
          src={property.image}
          alt={property?.title || property?.name || 'Property'}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h3 className="text-lg font-semibold">
        {property?.title || property?.name || 'Untitled Property'}
      </h3>
      {property?.location && (
        <p className="text-sm text-gray-600">{property.location}</p>
      )}
      {property?.price && (
        <p className="mt-2 font-medium">
          ${Number(property.price).toLocaleString()}
        </p>
      )}
      <div className="mt-3">
        {property?.id ? (
          <Link
            href={`/property/${property.id}`}
            className="text-blue-600 hover:underline"
          >
            View details →
          </Link>
        ) : (
          <span className="text-gray-400">No details available</span>
        )}
      </div>
    </div>
  )
}
