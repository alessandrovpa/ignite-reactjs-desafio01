import styles from './Header.module.css';
import { Rocket } from 'phosphor-react';

export function Header(){
  return (
    <header className={styles.header}>
      <Rocket size={30}/>
      <h1>todo</h1>
    </header>
  )
}