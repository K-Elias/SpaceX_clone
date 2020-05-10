export default values => {
	const errors = {};
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	// Email Errors
	if (!values.email) {
		errors.email = 'Required Email';
	} else if (!emailRegex.test(values.email)) {
		errors.email = 'Invalid email address';
	} else {
		errors.email = null;
	}
	// Password Errors
	if (!values.password) {
		errors.password = 'Required Password';
	} else if (values.password.length < 5) {
		errors.password = 'Password must be at least 5 characters';
	} else {
		errors.password = null;
	}
	// More check
	if (Object.keys(values).includes('repassword')) {
		if (!values.repassword) {
			errors.repassword = 'Confirm password';
		} else if (values.repassword !== values.password) {
			errors.repassword = 'The password is different';
		} else {
			errors.repassword = null;
		}
	}
	return errors;
};
