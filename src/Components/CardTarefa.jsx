import { Trash2, Edit } from 'lucide-react';

const CardTarefa = ({ tarefa, onEditar, onRemover, onToggleConcluida }) => {
  return (
    <div className="flex justify-between items-center bg-indigo-50 rounded-lg p-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={tarefa.concluida || false}
          onChange={() => onToggleConcluida(tarefa.id)}
        />
        <div>
          <p
            className={`font-medium ${
              tarefa.concluida ? 'line-through text-gray-400' : ''
            }`}
          >
            {tarefa.materia}
          </p>
          {tarefa.horario && (
            <p
              className={`text-sm text-indigo-600 ${
                tarefa.concluida ? 'line-through text-gray-400' : ''
              }`}
            >
              ⏰ {tarefa.horario}
            </p>
          )}
          {tarefa.descricao && (
            <p
              className={`text-sm ${
                tarefa.concluida ? 'line-through text-gray-400' : ''
              }`}
            >
              {tarefa.descricao}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEditar}
          className="text-indigo-500 hover:text-indigo-700"
        >
          <Edit size={16} />
        </button>
        <button onClick={onRemover} className="text-red-500 hover:text-red-700">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CardTarefa;
