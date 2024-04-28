import Link from "next/link";
import styles from "./_assets/auth.module.scss";
import { LoginForm } from "./_assets/loginForm";

export default function LoginPage() {
  return (
    <main className={styles.Login}>
      <h1>Login Kartódromo</h1>
      <LoginForm />
      <Link style={{marginTop: 16}} href={'/register'}>Criar Kartódromo</Link>
    </main>
  );
}
