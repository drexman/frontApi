import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { saveToken } from '../../auth/auth';
import { Container, Form } from "../SignUp/styles";

class SignIn extends Component {

    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        if(!email || !password )
        {
            this.setState({error: "Preencha e-mail e senha pra continuar!"});
        } else {
            try {
                let token = "ABC1564"; 
                saveToken(token);
                this.props.history.push("/app");
            } catch (error) {
                this.setState({
                    error: "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }   
    };

    render()
    {
        return(
            <Container>
                <Form onSubmit={this.handleSignIn}>
                {this.state.error && <p>{this.state.error}</p>}
                <input
                    type="email"
                    placeholder="Endereço de e-mail"
                    onChange={e => this.setState({ email : e.target.value })}
                />

                <input 
                    type="password"
                    placeholder="Senha"
                    onChange={e => this.setState({ password: e.target.value })}
                    />
                <button type="submit">Entrar</button>
                <hr />
                <Link to="/signup">Criar conta gratis</Link>    
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignIn)