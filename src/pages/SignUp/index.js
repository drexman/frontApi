import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Alert, Form, Input, Button } from 'antd';
import { saveToken } from '../../auth/auth';
import UsuarioService from "../../services/usuarioService";

require('./style.css');

const SignUp = () => {

    const [form] = Form.useForm();
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const save = (values) => {

        UsuarioService.save(values, { validateStatus: () => true }).then(response => {
            let data = response.data;
            setMsg({type: 'success', txt : data.mensagem});
            setLoading(false);
            setTimeout(() => {
                window.location.href = "/Login";
            },2000);
        }).catch(error => {
           console.log(error);
            let data = error.response.data;

            setMsg({ type: 'error', txt: data.mensagem });
            setLoading(false);
        });
    }

    const onFail = () => {
        setLoading(false);
    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className="usuarioform">
            {msg && (
                <Alert
                    style={{ width: 400, marginBottom: 5 }}
                    message={msg.txt}
                    type={msg.type}
                    showIcon
                    closable
                />
            )}
            <Form
                style={{
                    background: '#fff',
                    width: 400,
                    'minHeight': '350px',
                    padding: '20px'
                }}
                form={form}
                layout="vertical"
                onFinish={save}
                onFinishFailed={onFail}
            >
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Nome é um campo obrigatório!' }]}>
                    <Input placeholder="Nome" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email é um campo obrigatório!' }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Senha" name="senha" rules={[{ required: true, message: 'Senha é um campo obrigatório!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={() => setLoading(true)}>Cadastrar</Button>
                    <Button style={{ 'marginLeft': 5 }} htmlType="button" onClick={onReset}> Limpar</Button>
                </Form.Item>
                <hr/>
                <Link to="/">Voltar para login</Link>
            </Form>
        </div>
    );
   
}

export default withRouter(SignUp)