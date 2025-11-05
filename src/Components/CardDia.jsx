import React from 'react';
import CardTarefa from './CardTarefa';

const CardDia = ({
  dia,
  tarefas = [],
  onEditar,
  onRemover,
  onToggleConcluida,
}) => {
  return (
    <div className="bg-white/90 shadow-md p-4 rounded-lg border border-gray-100 ">
      <h2 className="text-xl font-semibold text-indigo-600 mb-3">{dia}</h2>
      <div className="space-y-2">
        {tarefas.length > 0 ? (
          tarefas.map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              tarefa={tarefa}
              onEditar={() => onEditar(tarefa)}
              onRemover={() => onRemover(tarefa.id)}
              onToggleConcluida={() => onToggleConcluida(tarefa.id)}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">Nenhuma tarefa neste dia</p>
        )}
      </div>
    </div>
  );
};

export default CardDia;
