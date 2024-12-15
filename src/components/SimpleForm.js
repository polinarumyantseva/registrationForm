import { useRef, useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import styles from '../app.module.css';

export const SimpleForm = ({ initialValue }) => {
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);
	const submitButtonRef = useRef(null);

	const { getData, setState } = useStore(initialValue);

	const { email, password, repeatPassword } = getData();

	const onSubmit = (e) => {
		e.preventDefault();

		if (email === '') setEmailError('Поле не должно быть пустым');
		if (password === '') setPasswordError('Поле не должно быть пустым');
		if (repeatPassword === '') setRepeatPasswordError('Поле не должно быть пустым');

		if (email !== '' && password !== '' && repeatPassword !== '') {
			console.log({ email, password, repeatPassword });
		}
	};

	const onInputChange = ({ target }) => {
		setState(target.name, target.value);

		let emailMessage = null;
		let passwordMessage = null;
		let repeatPasswordMessage = null;

		if (target.name === 'email') {
			if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(target.value)) {
				emailMessage = 'Неверный формат поля Email';
			}

			setEmailError(emailMessage);
		} else if (target.name === 'password') {
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(target.value)) {
				passwordMessage = 'Поле должно содержать хотя бы один заглавный и строчной символ, цифру';
			} else if (target.value.length < 8) {
				passwordMessage = 'Поле должно содержать не менее 8 символов';
			}

			setPasswordError(passwordMessage);
		} else {
			if (password !== target.value) {
				repeatPasswordMessage = 'Пароли не совпадают';
			}

			setRepeatPasswordError(repeatPasswordMessage);
		}
	};

	useEffect(() => {
		if (
			!emailError &&
			!passwordError &&
			!repeatPasswordError &&
			email !== '' &&
			password !== '' &&
			repeatPassword !== ''
		) {
			submitButtonRef.current.focus();
		}
	}, [emailError, passwordError, repeatPasswordError, email, password, repeatPassword]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Форма регистрации</h1>
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.card}>
					<input
						value={email}
						className={styles.field}
						type="email"
						name="email"
						placeholder="Введите email"
						onChange={onInputChange}
					/>
					{emailError && <div className={styles['error-message']}>{emailError}</div>}
					<input
						value={password}
						className={styles.field}
						type="password"
						name="password"
						placeholder="Введите пароль"
						onChange={onInputChange}
					/>
					{passwordError && <div className={styles['error-message']}>{passwordError}</div>}
					<input
						value={repeatPassword}
						className={styles.field}
						type="password"
						name="repeatPassword"
						placeholder="Повторите пароль"
						onChange={onInputChange}
					/>
					{repeatPasswordError && <div className={styles['error-message']}>{repeatPasswordError}</div>}
				</div>

				<button
					ref={submitButtonRef}
					type="submit"
					className={styles['submit-button']}
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
