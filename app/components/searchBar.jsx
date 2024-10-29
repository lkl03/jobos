import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center mt-10 px-4">
            <input
                type="text"
                placeholder="Buscar empleo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-gray-300 px-4 py-2 w-full sm:w-1/2 rounded-t sm:rounded-l sm:rounded-t-none"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full sm:w-auto rounded-b sm:rounded-r sm:rounded-b-none">
                Buscar
            </button>
        </form>
    );
}
