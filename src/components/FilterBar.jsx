import { Search, Filter } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => onSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <select
            value={filters.priority || ''}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="input"
          >
            <option value="">Toutes priorités</option>
            <option value="haute">🔴 Haute</option>
            <option value="moyenne">🟡 Moyenne</option>
            <option value="basse">🟢 Basse</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="input"
          >
            <option value="">Toutes catégories</option>
            <option value="travail">💼 Travail</option>
            <option value="personnel">👤 Personnel</option>
            <option value="urgent">⚡ Urgent</option>
            <option value="autre">📌 Autre</option>
          </select>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onFilterChange('completed', '')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.completed === '' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => onFilterChange('completed', 'false')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.completed === 'false' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En cours
        </button>
        <button
          onClick={() => onFilterChange('completed', 'true')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.completed === 'true' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Complétées
        </button>
      </div>
    </div>
  );
};

export default FilterBar;