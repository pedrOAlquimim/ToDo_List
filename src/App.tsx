import { Header } from './components/Header';
import { Main } from './components/Main';
import styles from './App.module.css';
import './global.css';

function App() {
  return (
    <div>
      <Header/>
      <main className={styles.wrapper}>
        <Main />
      </main>
    </div>
  )
}

export default App
