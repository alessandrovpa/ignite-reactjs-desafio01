import style from './Task.module.css';
import { Trash, Circle, CheckCircle } from 'phosphor-react';

interface Task{
  id: string;
  content: string;
  finished: boolean;
}

interface TaskProps {
  tasks: Task[];
  handleToggleFinished: (id: string) => void;
  handleRemoveTask: (id: string) => void;
}

export function Task({tasks, handleToggleFinished, handleRemoveTask}: TaskProps){
  const totalTasks = tasks.length;
  const totalFinishedTasks = tasks.filter(task => task.finished).length;

  return (
    <div className={style.container}>
      <header>
        <div>
          Tarefas criadas
          <span>{totalTasks}</span>
        </div>
        <div>
          Tarefas concluídas
          <span>{totalFinishedTasks} de {totalTasks}</span>  
        </div>  
      </header>
      <section>
        {tasks.map(task => {
          return (
            <article key={task.id} className={style.task}>
              <button 
                onClick={() => handleToggleFinished(task.id)}
              >
                {task.finished ? <CheckCircle size={20}/> : <Circle size={20}/>}
              </button>
              <p>{task.content}</p>
              <button
                onClick={() => handleRemoveTask(task.id)}
              ><Trash /></button>
            </article>
          );
        })}
      </section>
    </div>
  )
}