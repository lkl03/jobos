'use client';

// pages/index.js
import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import Spinner from './components/Spinner';

export default function Home() {
  const [query, setQuery] = useState('');

  // Function to fetch jobs using React Query
  const fetchJobs = async ({ pageParam = 1 }) => {
    // Call the API at /api/search
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${pageParam}`);
    if (!res.ok) {
      throw new Error('Error al obtener los datos');
    }
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['jobs', query],
    queryFn: fetchJobs,
    enabled: !!query,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    cacheTime: 1000 * 60 * 5, // 5-minute cache
  });

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Combine results of pages into a single array
  const jobs = data ? data.pages.flatMap((page) => page.jobs) : [];

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {(status === 'loading' || isFetchingNextPage) && <Spinner />}
      {status === 'error' && <p className="text-center mt-4 text-red-500">{error.message}</p>}
      <JobList jobs={jobs} />
      {isFetchingNextPage && <p className="text-center mt-4">Cargando más resultados...</p>}
      {!hasNextPage && query && <p className="text-center mt-4">No hay más resultados.</p>}
    </div>
  );
}

