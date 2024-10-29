import React from 'react';

export default React.memo(function JobList({ jobs }) {
  return (
    <div className="mt-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-700">{job.company}</p>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Ver más
            </a>
          </div>
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
});

