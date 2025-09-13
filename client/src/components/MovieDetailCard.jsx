import React from 'react'

const MovieDetailCard = ({ title, releaseDate, poster, backdrop, genre, overview, director, cast, trailer }) => {
  return (
    <div className="text-white">
      <div className="relative w-full h-[600px]">
        <img
          src={backdrop}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-700/80"></div>
        <div className="absolute inset-0 flex items-center px-20 py-10">
          <img
            src={poster}
            alt={title}
            className="w-[300px] h-full rounded-xl shadow-lg object-cover block"
          />
          <div className="ml-6 space-y-4">
            <h1 className="text-5xl font-bold">{title} ({new Date(releaseDate)?.getFullYear()})</h1>
            <p className="text-gray-300 text-md">
              {releaseDate} • {genre?.join(", ")}
            </p>
            <p className="italic text-gray-300 text-md">Directed by: {director}</p>
            <p className='text-xl font-medium'>Overview</p>
            <p className="max-w-2xl text-sm md:text-base text-gray-200">
              {overview}
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-12 my-10">
      <h2 className="text-xl font-bold mb-4">Top Billed Cast</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {cast?.map((actor, index) => {
          const { name, character, profile } = actor;
          return (
            <div
              key={index}
              className="w-[140px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
            >
              <img
                src={
                  profile
                    ? `https://image.tmdb.org/t/p/w300${profile}`
                    : "/fallback-profile.png"
                }
                alt={name}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {name}
                </p>
                <p className="text-xs text-gray-500 truncate">{character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
      {trailer && (
        <div className="my-6 flex justify-center">
          <iframe
            width="80%"
            height="400"
            src={trailer}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default MovieDetailCard
