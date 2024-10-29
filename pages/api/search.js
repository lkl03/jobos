import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5-minute cache

// Sample job data
const allJobs = [
  { id: 1, title: 'Consultor de Negocios', company: 'Empresa ABC', url: 'https://example.com/job/1' },
  { id: 2, title: 'Desarrollador Full Stack', company: 'Empresa XYZ', url: 'https://example.com/job/2' },
  { id: 3, title: 'Analista de Datos', company: 'Empresa 123', url: 'https://example.com/job/3' },
  // Add more jobs if needed
];

export default async function handler(req, res) {
  const { query = '', page = 1 } = req.query;
  const limit = 10;
  const cacheKey = `${query}-${page}`;

  // Check if the response is cached
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  }

  // Filter jobs based on the query
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  // Implement pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const jobsPage = filteredJobs.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredJobs.length;

  // Prepare and cache response
  const responseData = { jobs: jobsPage, hasMore };
  cache.set(cacheKey, responseData);

  res.status(200).json(responseData);
}
