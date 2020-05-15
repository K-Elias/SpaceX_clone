import { useState, useEffect } from 'react';

const useForm = (initial_State, validate, callback) => {
	const [values, setValues] = useState({ ...initial_State });
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		let checkErrors = 0;
		Object.keys(errors).forEach(error => {
			if (errors[error]) checkErrors += 1;
		});
		if (checkErrors === 0 && isSubmitting) {
			callback();
			setIsSubmitting(false);
		}
	}, [errors]);

	const handleChange = event => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleBlur = () => {
		const validationErrors = validate(values);
		setErrors(validationErrors);
	};

	return {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		errors
	};
};

export default useForm;
