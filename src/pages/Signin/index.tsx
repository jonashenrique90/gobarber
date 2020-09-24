import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Content, AnimationContainer, Background } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import getValidationsErros from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

interface SignInFormData {
	email: string;
	password: string;
}

const Signin: React.FC = () => {

	const formRef = useRef<FormHandles>(null);
	const history = useHistory();
	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback(async (data: SignInFormData) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().required('Senha Obrigatória'),

			});
			await schema.validate(data, { abortEarly: false });
			await signIn({
				email: data.email,
				password: data.password,
			});
			history.push('/dashboard');
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationsErros(err);
				formRef.current?.setErrors(errors);
				return;
			}
			addToast({
				type: 'error',
				title: 'Erro na autenticação',
				description: 'Ocorreu erro ao fazer Login, cheque as credenciais.',
			});

		}
	}, [signIn, addToast, history]);
	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu Logon</h1>
						<Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />
						<Button type="submit">Entrar</Button>
						<Link to="/">Esqueci minha senha</Link>
					</Form>
					<Link to="/signup"><FiLogIn />Criar Conta</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	)
}

export default Signin;