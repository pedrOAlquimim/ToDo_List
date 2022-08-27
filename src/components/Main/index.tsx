import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { Tasks } from '../Task';
import styles from './Main.module.css';

export function Main() {
  const [tasks, setTasks] = useState([] as string[]);
  const [newCommentChange, setNewCommentChange] = useState('');

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, newCommentChange]);
    setNewCommentChange('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentChange(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(content => {
      return content !== taskToDelete;
    })
    setTasks(tasksWithoutDeletedOne);
  }


  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder='Add a new task'
          onChange={handleNewCommentChange}
          value={newCommentChange}
        />
        <button className={styles.createButton}>
          Create
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>

      <div className={styles.tasksContainer}>
        <header className={styles.tasksHeader}>
          <div className={styles.createdTasksTitle}>
            <p>Created tasks</p>
            <span>5</span>
          </div>

          <div className={styles.doneTasksTitle}>
            <p>Done</p>
            <span>2 de 5</span>
          </div>
        </header>

        {tasks.map(content => {
          return (
            <Tasks
              key={content}
              content={content}
              onDeleteTask={deleteTask}
            />
          )
        })}
      </div>
    </div>
  )
}