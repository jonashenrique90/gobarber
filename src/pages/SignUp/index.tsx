import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErros from '../../utils/getValidationsErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();


	const handleSubmit = useCallback(async (data: SignUpFormData) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().min(3, 'Nome deve ter no mínimo 3 Letras'),
				email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().min(6, 'Senha no mínimo 6 caracteres'),

			});
			await schema.validate(data, { abortEarly: false });
			await api.post('/users', data);

			history.push('/');
			addToast({
				type: 'sucess',
				title: 'CadastroRealizado',
				description: 'Você já pode fazer seu Logon no GoBarber!'
			})

		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationsErros(err);
				formRef.current?.setErrors(errors);
				return;
			}
			addToast({
				type: 'error',
				title: 'Erro no cadastro',
				description: 'Ocorreu erro ao fazer cadastro, tente novamente.',
			});
		}
	}, [addToast, history]);

	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu Cadastro</h1>
						<Input name="name" icon={FiUser} type="text" placeholder="Nome" />
						<Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />
						<Button type="submit">Cadastrar</Button>
					</Form>
					<Link to="/"><FiArrowLeft />Voltar para logon</Link>
				</AnimationContainer>
			</Content>

		</Container>
	)
}

export default SignUp;
