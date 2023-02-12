import { Header } from './components/header/Header';
import { PlusCircle } from 'phosphor-react';
import './global.css';

import style from './App.module.css';
import { FormEvent, ChangeEvent, useState } from 'react';
import { Task } from './components/task/Task';

interface Task{
  id: string;
  content: string;
  finished: boolean;
}

export function App() {
  const [inputTask, setInputTaskTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmitTask(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: inputTask,
      finished: false,
    }
    setTasks((actualTasks) => [...actualTasks, newTask]);
    setInputTaskTask('');
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>){
    setInputTaskTask(event.target.value);
  }

  function handleToggleFinished(id:string){
    const updatedTasks = tasks.map(task => {
      if(task.id === id){
        task.finished = !task.finished;
      }
      return task;
    })

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id:string){
    const tasksWithoutRemovedOne = tasks.filter(task => task.id !== id);
    setTasks(tasksWithoutRemovedOne);
  }

  return (
    <div id="app" className={style.container}>
      <Header />
      <main className={style.content}>
        <form onSubmit={handleSubmitTask}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            onChange={handleChangeInput}
            value={inputTask}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>
        <Task 
          tasks={tasks} 
          handleToggleFinished={handleToggleFinished}
          handleRemoveTask={handleRemoveTask}
        />
      </main>
    </div>
  )
}