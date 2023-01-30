import { ChangeEvent, FormEvent, useState, useEffect, InvalidEvent } from 'react';
import { Tasks } from '../Task';
import { PlusCircle } from 'phosphor-react';
import TaskBox from '../../domain/task';
import clipboardImage from '../../assets/Clipboard.svg'

import styles from './Main.module.css';

export function Main() {
  const [tasks, setTasks] = useState<TaskBox[]>(() => {
    const tasksStoredJSON = localStorage.getItem('@todo-list:tasks-1.0.0')
    if (tasksStoredJSON) {
      return JSON.parse(tasksStoredJSON)
    }
    return []
  });
  const [tasksDone, setTasksDone] = useState<TaskBox[]>(() => {
    const tasksDoneStoredJSON = localStorage.getItem('@todo-list:tasksDone-1.0.0')
    if (tasksDoneStoredJSON) {
      return JSON.parse(tasksDoneStoredJSON)
    }
    return []
  });
  const [newCommentChange, setNewCommentChange] = useState('');

  useEffect(() => {
    const tasksJSON = JSON.stringify(tasks)
    localStorage.setItem('@todo-list:tasks-1.0.0', tasksJSON)

    const tasksDoneJSON = JSON.stringify(tasksDone)
    localStorage.setItem('@todo-list:tasksDone-1.0.0', tasksDoneJSON)

  }, [tasks, tasksDone])

  const styleWithoutAnyTasks = tasks.length === 0;
  const isNewCommentEmpty = newCommentChange.length === 0;

  const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, {
      id: taskId,
      description: newCommentChange,
      checked: false
    }]);
    setNewCommentChange('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentChange(event.target.value);
    event.target.setCustomValidity('');
  }

  function deleteTask(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter(content => {
      return content.id !== taskToDelete;
    })
    const tasksWithoutDeletedOneTD = tasksDone.filter(content => {
      return content.id !== taskToDelete;
    })
    setTasks(tasksWithoutDeletedOne);
    setTasksDone(tasksWithoutDeletedOneTD)
  }

  function handleTaskChecked(taskId: number) {
    const tasksCheckedorNot = tasks.map(content => {
      if (taskId === content.id) {
        content.checked = !content.checked
      }
      return content;
    })
    setTasks(tasksCheckedorNot);
    setTasksDone(tasks.filter((content => {
      return content.checked === true
    })
    ));
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('This field is required');
  }
  

  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder='Add a new task'
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          value={newCommentChange}
          required
        />
        <button type='submit' className={styles.createButton} disabled={isNewCommentEmpty}>
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
            <span>{tasksDone.length} de {tasks.length}</span>
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
                onTaskChecked={handleTaskChecked}
              />
            )
          })
        }
      </div>
    </div>
  )
}
