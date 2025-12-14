import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo, getStats } from '../services/api';
import { LogOut, Plus, BarChart3 } from 'lucide-react';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import FilterBar from '../components/FilterBar';

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({ completed: '', priority: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [filters]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const response = await getTodos(cleanFilters);
      setTodos(response.data.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  const handleCreateTodo = async (formData) => {
    try {
      await createTodo(formData);
      setShowForm(false);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Erreur création:', error);
    }
  };

  const handleUpdateTodo = async (formData) => {
    try {
      await updateTodo(editingTodo._id, formData);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error('Erreur modification:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await toggleTodo(id);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Erreur toggle:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Supprimer cette todo ?')) return;
    try {
      await deleteTodo(id);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Todos 📝</h1>
            <p className="text-gray-600 mt-1">Bienvenue, {user?.nom} ! 👋</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouvelle todo
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Complétées</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <p className="text-4xl">✅</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">En cours</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <p className="text-4xl">⏳</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Taux</p>
                  <p className="text-3xl font-bold">{stats.completionRate}</p>
                </div>
                <p className="text-4xl">📊</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={setSearchQuery}
        />

        {/* Todos List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : todos.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-6xl mb-4">📝</p>
            <p className="text-xl text-gray-600">Aucune todo pour le moment</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary mt-4 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Créer ma première todo
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={setEditingTodo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <TodoForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateTodo}
        />
      )}

      {editingTodo && (
        <TodoForm
          onClose={() => setEditingTodo(null)}
          onSubmit={handleUpdateTodo}
          initialData={editingTodo}
        />
      )}
    </div>
  );
};

export default Dashboard;