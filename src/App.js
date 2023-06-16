import styles from "./App.module.css";
import { useState, useRef } from "react";

export const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [statusError, setStatusError] = useState(null);

  const submitButton = useRef(null);

  let error = null;

  const enterEmail = ({ target }) => {
    setEmail(target.value);

    if (!/^[\w_@.]*$/.test(target.value)) {
      error =
        "Ошибка логина. Логин может содержать буквы, цифры и нижнее подчеркивание.";
    } else if (target.value.length > 20) {
      error = "Ошибка логина. Логин может содержать не больше 20 символов.";
    }
    setStatusError(error);
  };

  const enterPassword = ({ target }) => {
    setPassword(target.value);
    if (!/^[\w]*$/.test(target.value)) {
      error = "Ошибка пароля. Пароль должен содержать буквы и цифры.";
    } else if (target.value.length > 20) {
      error = "Ошибка пароля. Пароль должен содержать не больше 20 символов.";
    }
    setStatusError(error);
  };

  const enterRepeatPassword = ({ target }) => {
    setRepeatPassword(target.value);
    if (password.length === target.value.length && password === target.value) {
      submitButton.current.focus();
    }
  };

  const onBlurPassword = ({ target }) => {
    if (password.length !== target.value.length || password !== target.value) {
      error = "Пароли не совпадают.";
    } else if (password.length < 6) {
      error = "Пароль должен содержать не менее 6-х символов.";
    }
    setStatusError(error);
  };

  const onBlurEmail = ({ target }) => {
    if (target.length < 12) {
      error = "Ошибка логина. Логин должен содержать не менее 12-х символов.";
    }
    setStatusError(error);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <>
      {setStatusError && (
        <div className={styles.errorMessage}>{statusError}</div>
      )}
      <div className={styles.app}>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={enterEmail}
            onBlur={onBlurEmail}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            onChange={enterPassword}
            onBlur={onBlurPassword}
          />
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            placeholder="Повторите пароль"
            onChange={enterRepeatPassword}
          />
          <button
            ref={submitButton}
            type="submit"
            disabled={statusError !== null}
          >
            Зарегестрирваться
          </button>
        </form>
      </div>
    </>
  );
};
