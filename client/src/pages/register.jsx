import { useHistory } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import alertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/dist/index.css';

import { StyledInput, StyledBlock } from './login';
import { EntryPage, Button, useForm } from '../components';

const initialState = {
	email: '',
	password: '',
	repassword: ''
};

const Register = () => {
	const history = useHistory();

	const onSubmit = () =>
		axios.post('/register', { ...values }).then(() => {
			alertConfirm({
				title: 'Congrats!',
				content:
					'Your account has successfully been created, login to access the universe now!',
				onOk: () => history.push('/'),
				onCancel: () => history.push('/')
			});
		});

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useForm(initialState, onSubmit);

	return (
		<EntryPage>
			<StyledBlock>
				<form onSubmit={handleSubmit}>
					<StyledInput
						required
						type="email"
						name="email"
						placeholder="Type your email"
						data-testid="login-input"
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && <p className="error-text">{errors.email}</p>}
					<StyledInput
						required
						type="password"
						name="password"
						placeholder="Choose a password"
						data-testid="pwd-input"
						onBlur={handleBlur}
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && <p className="error-text">{errors.password}</p>}
					<StyledInput
						required
						type="password"
						name="repassword"
						placeholder="Confirm your password"
						data-testid="repwd-input"
						onBlur={handleBlur}
						value={values.repassword}
						onChange={handleChange}
					/>
					{errors.repassword && (
						<p className="error-text">{errors.repassword}</p>
					)}
					<Button disabled={isSubmitting} type="suxbmit">
						Register
					</Button>
				</form>
			</StyledBlock>
		</EntryPage>
	);
};

export default Register;
