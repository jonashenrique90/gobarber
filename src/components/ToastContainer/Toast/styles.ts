import styled, { css } from 'styled-components';
import { animated } from 'react-spring'

interface ContainerProps {
	type?: 'sucess' | 'info' | 'error' | 'warning';
	hasDescription: boolean;
}

export const toastTypeVariations = {
	info: css`
		background: #ebf8ff;
		color: #3172b7;
	`,
	sucess: css`
		background: #e6fffa;
		color: #2e656a;
	`,
	error: css`
		background: rgb(203,45,62);
		background: linear-gradient(90deg, rgba(203,45,62,1) 0%, rgba(239,71,58,1) 35%);
		color: #fff;
	`,
	warning: css`
		background: rgb(202,197,49);
		background: linear-gradient(90deg, rgba(202,197,49,1) 0%, rgba(243,249,167,1) 35%);
		color: #605C3C;
	`,
};

export const Container = styled(animated.div) <ContainerProps>`
	width: 360px;
	position: relative;
	padding: 16px 30px 16px 16px;
	border-radius: 10px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
	display: flex;

	& + div {
		margin-top: 8px;
	}

	${props => toastTypeVariations[props.type || 'info']}


	> svg {
		margin: 4px 12px 0 0; 
	}
	div {
		flex: 1;
	
		p {
		margin-top: 4px;
		font-size: 14px;
		opacity: 0.8;
		line-height: 20px;
		}
	}
	button {
		position: absolute;
		right: 16px;
		top: 19px;
		opacity: 0.6;
		border: 0;
		background: transparent;
		color: inherit;

	}
	${props => !props.hasDescription && css`
		align-items: center;
		svg {
			margin-top: 0;
		}
	`}
`;