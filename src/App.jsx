import './index.css';
import { Plus } from 'lucide-react';
import CardDia from './Components/CardDia';
import { AdicionarTarefa } from './Components/AdicionarTarefa';
import { useState, useEffect } from 'react';

function App() {
  const dias = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);

  // Carrega tarefas salvas no localStorage ao iniciar
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Sempre que as tarefas mudarem, salva no localStorage
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Adicionar ou atualizar tarefa
  const handleSalvarTarefa = (tarefa) => {
    let novasTarefas;

    if (tarefaParaEditar) {
      // Editar tarefa existente
      novasTarefas = tarefas.map((t) => (t.id === tarefa.id ? tarefa : t));
      setTarefaParaEditar(null);
    } else {
      // Adicionar nova
      novasTarefas = [...tarefas, tarefa];
    }

    // Ordena as tarefas pelo horário
    novasTarefas.sort((a, b) => {
      if (!a.horario) return 1; // tarefas sem horário vão para o final
      if (!b.horario) return -1;
      return a.horario.localeCompare(b.horario);
    });

    setTarefas(novasTarefas);
  };

  // Excluir tarefa
  const handleRemoverTarefa = (id) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      const novasTarefas = tarefas.filter((t) => t.id !== id);

      // Ordena novamente
      novasTarefas.sort((a, b) => {
        if (!a.horario) return 1;
        if (!b.horario) return -1;
        return a.horario.localeCompare(b.horario);
      });

      setTarefas(novasTarefas);
    }
  };

  // Abrir modal para editar
  const handleEditarTarefa = (tarefa) => {
    setTarefaParaEditar(tarefa);
    setIsOpen(true);
  };

  // Marcar ou desmarcar tarefa como concluída
  const handleToggleConcluida = (id) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container m-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">StudyPlan</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-slate-950 text-zinc-200 px-4 py-2 rounded-md text-sm hover:bg-slate-900 font-medium transition-colors"
          >
            <Plus size={18} />
            Adicionar Tarefa
          </button>
          <AdicionarTarefa
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setTarefaParaEditar(null);
            }}
            onSave={handleSalvarTarefa}
            tarefaParaEditar={tarefaParaEditar}
          />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dias.map((dia) => (
            <CardDia
              dia={dia}
              key={dia}
              tarefas={tarefas.filter((t) => t.dia === dia)}
              onEditar={handleEditarTarefa}
              onRemover={handleRemoverTarefa}
              onToggleConcluida={handleToggleConcluida}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
