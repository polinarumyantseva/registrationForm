import { useState } from 'react';

export const useStore = (initialValue) => {
	const [state, setState] = useState(initialValue);

	return {
		getData: () => state,
		setState: (fieldName, fieldValue) => {
			setState({ ...state, [fieldName]: fieldValue });
		},
	};
};
