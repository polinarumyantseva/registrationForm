import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../app.module.css';

const fieldsSchema = yup.object().shape({
	email: yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Неверный формат поля Email'),
	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Поле должно содержать хотя бы один заглавный и строчной символ, цифру',
		)
		.min(8, 'Поле должно содержать не менее 8 символов'),
	repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const ReactHookForm = ({ initialValue }) => {
	const submitButtonRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialValue,
		resolver: yupResolver(fieldsSchema),
	});

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	useEffect(() => {
		if (!emailError && !passwordError && !repeatPasswordError) {
			submitButtonRef.current.focus();
		}
	}, [emailError, passwordError, repeatPasswordError]);

	return (
		<div className={styles.container + ' ' + styles['react-hook-form']}>
			<h1 className={styles.title}>Форма регистрации</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.card}>
					<input
						className={styles.field}
						type="email"
						name="email"
						placeholder="Введите email"
						{...register('email')}
					/>
					{emailError && <div className={styles['error-message']}>{emailError}</div>}
					<input
						className={styles.field}
						type="password"
						name="password"
						placeholder="Введите пароль"
						{...register('password')}
					/>
					{passwordError && <div className={styles['error-message']}>{passwordError}</div>}
					<input
						className={styles.field}
						type="password"
						name="repeatPassword"
						placeholder="Повторите пароль"
						{...register('repeatPassword')}
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
