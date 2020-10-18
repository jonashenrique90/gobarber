import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationsErros from '../../utils/getValidationsErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileUpFormData {
	name: string;
	email: string;
	password: string;
	old_password: string;
	password_confirmation: string;
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();
	const { user, updateUser } = useAuth();

	const handleAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const data = new FormData();
			data.append('avatar', event.target.files[0]);
			api.patch('/users/avatar', data).then((response) => {
				updateUser(response.data);
				addToast({
					type: 'sucess',
					title: 'Avatar Atualizado!',
				});
			});
		}
	},[addToast, updateUser]);


	const handleSubmit = useCallback(async (data: ProfileUpFormData) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().min(3, 'Nome deve ter no mínimo 3 Letras'),
				email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
				old_password: Yup.string(),
				password: Yup.string()
				.when('old_password', {
					is: value => !!value.length,
					then: Yup.string().required('Campo obrigatório'),
					otherwise: Yup.string(),
				}),
				password_confirmation: Yup.string()
				.when('old_password', {
					is: value => !!value.length,
					then: Yup.string().required('Campo obrigatório'),
					otherwise: Yup.string(),
				})
				.oneOf([Yup.ref('password')], 'Confirmação incorreta'),
			});
			await schema.validate(data, { abortEarly: false });

			const { name, email, password, old_password, password_confirmation } = data;

			const formData = {
				name,
				email,
				...(old_password ? 
					{ 
						old_password,
						password,
						password_confirmation,
					} :
				 	{}),
			};
			
			const response = await api.put('/profile', formData);
			
			updateUser(response.data);

			history.push('/dashboard');
			addToast({
				type: 'sucess',
				title: 'Perfil atualizado!',
				description: 'Informações atualizadas com sucesso!'
			})

		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationsErros(err);
				formRef.current?.setErrors(errors);
				return;
			}
			addToast({
				type: 'error',
				title: 'Erro na atualização',
				description: 'Ocorreu erro ao atualizar perfil, tente novamente.',
			});
		}
	}, [addToast,updateUser, history]);

	return (
		<Container>
			<header>
				<div>
					<Link to="/dashboard">
						<FiArrowLeft></FiArrowLeft>
					</Link>
				</div>
			</header>
			<Content>
				<Form 
				ref={formRef} 
				initialData={{ 
					name: user.name,
					email: user.email,
				}} 
				onSubmit={handleSubmit}
				>
					<AvatarInput>
						<img src={user.avatar_url} alt={user.name}/>
						<label htmlFor="avatar">
							<FiCamera></FiCamera>
							<input type="file" id="avatar" onChange={handleAvatarChange}/>
						</label>
						
					</AvatarInput>
					<h1>Meu Perfil</h1>
					<Input name="name" icon={FiUser} type="text" placeholder="Nome" />
					<Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
					<Input name="old_password" icon={FiLock} type="password" placeholder="Senha atual" />
					<Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
					<Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />
					<Button type="submit">Confirmar mudanças</Button>
				</Form>
			</Content>

		</Container>
	)
}

export default Profile;
