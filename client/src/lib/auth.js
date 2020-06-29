import Axios from 'axios';

export const login = values =>
	Axios({
		method: 'POST',
		url: '/login',
		mode: 'same-origin',
		withCredentials: true,
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		data: { ...values }
	});

export const logout = () =>
	Axios({
		method: 'POST',
		url: '/logout',
		withCredentials: true,
		credentials: 'include'
	});

export const refreshToken = () =>
	Axios({
		method: 'POST',
		mode: 'same-origin',
		url: '/refresh_token',
		withCredentials: true,
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' }
	});

export const isAuthenticated = token => {
	return Axios({
		method: 'POST',
		url: '/verif_token',
		withCredentials: true,
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		data: { token }
	})
		.then(({ status }) => {
			if (status === 200) return true;
			return false;
		})
		.catch(() => false);
};
