import { useState } from 'react';
import styles from './app.module.css';
import { SimpleForm, ReactHookForm } from './components';

const initialValue = {
	email: '',
	password: '',
	repeatPassword: '',
};

export const App = () => {
	const [isShowFirstForm, setIsShowFirstForm] = useState(true);

	return (
		<div className={styles.app}>
			<button
				type="button"
				className={styles['secondary-button']}
				onClick={() => setIsShowFirstForm(!isShowFirstForm)}
			>
				{isShowFirstForm ? 'Показать React Hook Form' : 'Показать простую форму'}
			</button>

			{isShowFirstForm ? (
				<SimpleForm initialValue={initialValue} />
			) : (
				<ReactHookForm initialValue={initialValue} />
			)}
		</div>
	);
};
