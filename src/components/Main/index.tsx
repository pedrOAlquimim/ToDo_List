import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Tasks } from '../Task';
import { PlusCircle } from 'phosphor-react';
import TaskBox from '../../domain/task';
import clipboardImage from '../../assets/Clipboard.svg'

import styles from './Main.module.css';

export function Main() {
  const [tasks, setTasks] = useState([] as TaskBox[]);
  const [newCommentChange, setNewCommentChange] = useState('');

  const styleWithoutAnyTasks = tasks.length === 0;

  const taskId = (tasks[- 1]?.id || 0) + 1;
  const newTask = { id: taskId, description: newCommentChange, checked: false };

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, newTask]);
    setNewCommentChange('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentChange(event.target.value);
  }

  function deleteTask(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter(content => {
      return content.id !== taskToDelete;
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
            <span>{tasks.length}</span>
          </div>

          <div className={styles.doneTasksTitle}>
            <p>Done</p>
            <span>2 de {tasks.length}</span>
          </div>
        </header>

        {
          styleWithoutAnyTasks
        ?
          <div className={styles.withoutTasksContainer}>
            <img src={clipboardImage}/>
            <div>
              <p>You don't have any tasks registered yet</p>
              <p>Create tasks and organize your to-do items</p>
            </div>
          </div>
        :   
          tasks.map(content => {
            return (
              <Tasks
                key={content.id}
                content={content}
                onDeleteTask={deleteTask}
              />
            )
          })
        }
      </div>
    </div>
  )
}