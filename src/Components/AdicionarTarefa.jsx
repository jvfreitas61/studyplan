import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AdicionarTarefa({ isOpen, onClose, onSave, tarefaParaEditar }) {
  const [dia, setDia] = useState('Segunda');
  const [materia, setMateria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    if (tarefaParaEditar) {
      setDia(tarefaParaEditar.dia);
      setMateria(tarefaParaEditar.materia);
      setDescricao(tarefaParaEditar.descricao || '');
      setHorario(tarefaParaEditar.horario);
    } else {
      // limpa os campos se for nova tarefa
      setDia('Segunda');
      setMateria('');
      setDescricao('');
      setHorario('');
    }
  }, [tarefaParaEditar, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaTarefa = {
      id: tarefaParaEditar ? tarefaParaEditar.id : Date.now(), //verifica se a tarefa existe. caso não, é criada uma nova com o date como id
      dia,
      materia,
      descricao,
      horario,
    };

    onSave(novaTarefa); // envia os dados da nova tarefa ou da tarefa editada para o App.jsx
    onClose(); // fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="bg-black/80 h-full w-full fixed left-0 top-0 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg"
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {tarefaParaEditar ? 'Editar tarefa' : 'Adicionar tarefa de estudo'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="dia"
            id="dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <input
            type="text"
            name="materia"
            id="materia"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Matéria"
          />
          <input
            type="text"
            name="descricao"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Descrição (opcional)"
          />
          <input
            type="time"
            name="horario"
            id="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-slate-950 text-zinc-200 px-4 py-2 rounded-md text-sm hover:bg-slate-900 font-medium transition-colors"
          >
            {tarefaParaEditar ? 'Salvar alterações' : 'Salvar'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute right-4 top-4  opacity-70 transition-opacity hover:opacity-100 "
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
