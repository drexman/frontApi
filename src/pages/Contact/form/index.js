import React, { useEffect } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import MaskedInput from 'antd-mask-input';
import ContatoService from "../../../services/contatoService";

const ContatoForm = (props) => {

    const [form] = Form.useForm();

    useEffect(() => {
        let id = props.id;
        if (!id) {
            form.setFieldsValue({

            });
            ContatoService.findById(id).then(contato => {

            })
        }
    }, [props]);


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
                <Form.Item label="Nome" name="nome">
                    <Input placeholder="Nome" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Telefone" name="telefone">
                    <MaskedInput mask="(11) 11111-1111" name="telefone" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Salvar
                </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ContatoForm; 