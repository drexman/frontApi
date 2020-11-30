import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Alert, Form, Input, Button } from 'antd';
import { saveToken } from '../../auth/auth';
import UsuarioService from "../../services/usuarioService";

require('./style.css');


const SignIn = () => {
    const [form] = Form.useForm();
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);


    const entrarNovo = () => {
        window.location.href = "/signUp";
    }

    const autenticar = (values) => {
        UsuarioService.auth(values).then(response => {
            
            saveToken(response.data.token);
            setLoading(false);
            window.location.href = "/App";
        }).catch(err => {
        
            let data = err.response.data;

            setMsg({ type: 'error', txt: data.mensagem });
            setLoading(false);
        });

    }

    const onFail = () => {
        setLoading(false);
    }

    return (
        <div className="loginform">
            {msg && (
                <Alert
                    style={{ width: 400, marginBottom: 5 }}
                    message={msg.txt}
                    type={msg.type}
                    showIcon
                    closable
                />
            )}
            <Form style={{
                background: '#fff',
                width: 400,
                'minHeight': '350px',
                padding: '20px'
            }}
                form={form}
                layout="vertical"
                onFinish={autenticar}
                onFinishFailed={onFail}
                >

                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Favor preencher email do usuario !' }]}>
                    <Input placeholder="Email do usuário" />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[{ required: true, message: 'Favor preencher a senha' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item style={{'marginTop':'30px'}}>
                    <Button style={{width:'100%'}} type="primary" htmlType="submit" loading={loading} onClick={() => setLoading(true)}>Logar</Button>
                    <Button style={{ 'marginTop': '10px', width:'100%'}} onClick={entrarNovo} >Cadastrar novo usuário</Button>
                </Form.Item>
            </Form>
        </div>
    );

}

export default withRouter(SignIn);