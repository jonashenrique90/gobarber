import React from 'react';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App = () => {
	return (
		<>
			<SignUp></SignUp>
			{/* <Signin></Signin> */}
			<GlobalStyle />
		</>
	)
}

export default App;
