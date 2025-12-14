import { Check, Trash2, Edit2, Calendar, Flag } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const priorityColors = {
    basse: 'bg-green-100 text-green-800',
    moyenne: 'bg-yellow-100 text-yellow-800',
    haute: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    travail: 'bg-blue-100 text-blue-800',
    personnel: 'bg-purple-100 text-purple-800',
    urgent: 'bg-red-100 text-red-800',
    autre: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={`card p-4 hover:shadow-lg transition-shadow ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo._id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-900 mb-1 ${todo.completed ? 'line-through' : ''}`}>
            {todo.titre}
          </h3>
          
          {todo.description && (
            <p className="text-sm text-gray-600 mb-3">{todo.description}</p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
              <Flag className="w-3 h-3 inline mr-1" />
              {todo.priority}
            </span>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>

            {todo.deadline && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <Calendar className="w-3 h-3 inline mr-1" />
                {new Date(todo.deadline).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;