import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
	background: #232119;
	border-radius: 10px;
	padding: 16px;
	width: 100%;
	display: flex;
	align-items: center;
	border: 2px solid #232129;
	color: #666360;

	& + div {
		margin-top: 8px;
	}
	${props => props.isErrored && css`
		border-color: #c53030;
	`}

	${props => props.isFocused && css`
		color: #ff9000;
		border-color: #ff9000;
	`}
	${props => props.isFilled && css`
		color: #ff9000;
	`}

	input {
		background: transparent;
		flex: 1;
		border: 0;
		color: #F4EDE8;
		&:-webkit-autofill,
  		&:-webkit-autofill:hover,
  		&:-webkit-autofill:focus,
  		&:-webkit-autofill:active {
    		-webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
			-webkit-transition-delay: 9999s;
			background: #232119 !important;
			color: #F4EDE8 !important;
			font-family: 'Roboto Slab', serif;
			font-size: 16px;
  		}

		&::placeholder {
			color: #666360;
		}
	}
	svg {
		margin-right: 16px;
	}

`;

export const Error = styled(Tooltip)`
		margin-left: 16px;
		height: 20px;
	svg {
		margin:0;
	}
	span {
		background: #c53030;
		color: #fff;
		&::before {
			border-color: #c53030 transparent;

		}
	}
`;