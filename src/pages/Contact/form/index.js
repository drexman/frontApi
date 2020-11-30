import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import ContatoService from "../../../services/contatoService";

const ContatoForm = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let id = props.id;
        let visible = props.visible;

        if (visible) {
            if (id) {
                ContatoService.findById(id).then(contato => {

                    form.setFieldsValue({
                        id: contato.data.id,
                        nome: contato.data.nome,
                        email: contato.data.email,
                        telefone: contato.data.telefone
                    });
                }).catch(err => {
                    let data = err.response.data;
                    console.error(data.mensagem);
                });
            }
        } else {
            form.resetFields();
            setLoading(false);
        }
    }, [props.visible, props.id]);


    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onCancel={props.cancelar}
            footer={null}
        >
            <Form form={form}
                onFinish={props.salvar}
                layout="vertical">
                <Form.Item label="id" name="id" style={{ display: 'none' }} >
                    <Input />
                </Form.Item>
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Nome é um campo obrigatório!' }]}>
                    <Input placeholder="Nome" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email é um campo obrigatório!' }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Telefone" name="telefone" rules={[{ required: true, message: 'Telefone é um campo obrigatório!' }]}>
                    <MaskedInput mask="(11) 11111-1111" name="telefone" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={() => setLoading(true)}>
                        Salvar
                </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ContatoForm; 