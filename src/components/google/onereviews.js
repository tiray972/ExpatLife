"use client";


export default function OneReviews({ review }) {
  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Avis Clients</h2> */}
      <img src="/images/logoGoogle.png" className="max-w-32"/>
      <div className="flex justify-center">
      <div className="max-w-2xl w-full p-6 bg-white  text-center">
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-lg font-semibold">{review.authorName}</h3>
          <p className="text-sm text-gray-500">{review.relativeTime}</p>
        </div>
        <p className="text-gray-800 text-lg font-medium mb-4">{review.text}</p>
        <div className="flex justify-center">
          {Array.from({ length: review.rating }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>
      </div>
    </div>

    </section>
  );
}
