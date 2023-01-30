import { Trash, Circle, CheckCircle } from "phosphor-react";
import TaskBox from "../../domain/task";

import styles from './Tasks.module.css';

interface TaskProps {
  content: TaskBox;
  onDeleteTask: (taskToDelete: number) => void;
  onTaskChecked: (taskId: number) => void;
}

export function Tasks({ content, onDeleteTask, onTaskChecked }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(content.id);
  }

  function taskChecked() {
    onTaskChecked(content.id);
  }


  return (
    <div className={styles.container}>
      <div className={content.checked === true ? styles.contentCheckedTrue : styles.content}>
        <button onClick={taskChecked} className={content.checked === true ? styles.checkCircle : styles.uncheckCircle}>
          {
            content.checked === true
            ?
            <CheckCircle size={18} weight="fill" />
            :
            <Circle size={18} weight="bold" />
          }
        </button>
        <p>
          {content.description}
        </p>

        <button onClick={handleDeleteTask} className={styles.deleteButton}>
          <Trash size={18}/>
        </button>
      </div>
    </div>
  )
}