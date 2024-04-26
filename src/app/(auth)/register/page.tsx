import { RegisterForm } from "../_assets/registerForm";
import styles from "../_assets/auth.module.scss";

export default function RegisterPage() {
  return (
    <main className={styles.Register}>
      <h1>Registro Kartodromo</h1>
      <RegisterForm />
    </main>
  );
}
