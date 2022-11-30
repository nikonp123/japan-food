import styles from '../components/Cart/SubmitOrder.module.css';

function useClasses(hasError) {
  const classesName = `${styles.control} ${hasError ? styles.invalid : ''}`;
  return classesName;
}

export default useClasses;
