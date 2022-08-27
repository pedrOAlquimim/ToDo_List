import { Trash, Circle } from "phosphor-react";
import clipboardImage from '../../assets/Clipboard.svg'
import styles from './Tasks.module.css';

interface TaskProps {
  content: string;
  onDeleteTask: (taskToDelete: string) => void;
}

export function Tasks({ content, onDeleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(content);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.uncheckCircle}>
          <Circle size={18} weight="bold" />
        </button>
        <p>
          {content}
        </p>
        <button onClick={handleDeleteTask} className={styles.deleteButton}>
          <Trash size={18}/>
        </button>
      </div>
    </div>
  )
}