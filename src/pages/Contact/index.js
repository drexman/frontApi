import React, { Component } from 'react';
import { Modal, Space, Button, Table, Pagination } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import ContatoService from "../../services/contatoService";
import ContatoForm from '../Contact/form';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.self = this;
        this.columns = [
            {
                title: 'Nome',
                dataIndex: 'nome',
                key: 'nome'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Telefone',
                dataIndex: 'telefone',
                key: 'telefone'
            },
            {
                title: 'Operações',
                key: 'operation',
                fixed: 'center',
                width: 150,
                render: (e) =>
                    <Space>
                        <Button onClick={this.editar.bind(this, e)}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={this.delete.bind(this, e)}>
                            <DeleteOutlined />
                        </Button>
                    </Space>

            }
        ];
        this.state = {
            id: null,
            modal: false,
            pagination: {
                current: 0,
                pageSize: 10,
                total: 0,
            },
            dataSource: null,
        }
    }

    componentDidMount() {
        this.load({ page: 0, size: 10 });
    }

    load = (params) => {
        this.setState({ loading: true });
        ContatoService.getData(params).then(response => {
            let data = response.data;
            this.setState({
                dataSource: data.datas,
                loading: false,
                pagination: {
                    current: data.currentPage,
                    pageSize: parseInt(data.size),
                    total: data.totalItems,
                }

            });
        }).catch(err => {
            let data = err.response.data;
            this.setState({ loading: false });
            console.log(data.mensagem);
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
 
    }

    handlePageChange(current, pageSize) {
       console.log(pageSize);
        let params = {
            page: current == 0 ? current : current - 1,
            size: pageSize
        }
        this.load(params);
    }   

    salvar(valores) {
        if (!valores.id) {

            //Cadastrar novo
            ContatoService.save(valores).then(response => {
                this.load({ page: 0, size: 10 });
            }).catch(err => {
                let data = err.response.data;
                console.log(data.mensagem);
            })
        } else {
            ContatoService.update(valores.id, valores).then(response => {
                this.load({ page: 0, size: 10 });
            }).catch(err => {
                let data = err.response.data;
                console.log(data.mensagem);
            })
        }
        this.setState({ modal: false });
    }

    delete(c) {
        const callback = () => {
            this.load({ page: 0, size: 10 });
        }
        Modal.confirm({
            title: 'Confirmação',
            icon: <ExclamationCircleOutlined />,
            content: 'Deseja remover?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk() {
                ContatoService.delete(c.id).then(response => {
                    callback()
                }).catch(err => {
                    let data = err.response.data;
                    console.log(data.mensagem);
                })
            }
        })
    }

    cancelar(e) {
        this.setState({ modal: false });
    }

    abrirNovo() {
        this.setState({
            title: "Novo Cadastro",
            modal: true,
            id: null
        });

    }

    editar(c) {
        this.setState({
            title: "Editar Contato",
            modal: true,
            id: c.id
        });
    }

    render() {
        return (
            <div>
                <ContatoForm
                    id={this.state.id}
                    title={this.state.title}
                    salvar={this.salvar.bind(this)}
                    cancelar={this.cancelar.bind(this)}
                    visible={this.state.modal} />
                <Table
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    loading={this.state.currentloading}
                    title={() => <div><Button type="primary" onClick={this.abrirNovo.bind(this)}><PlusOutlined /></Button></div>}
                />

                <Pagination style={{ 'float' : 'right', 'margin-top': '10px' }}
                    showSizeChanger
                    defaultCurrent={1}
                    page={this.state.pagination.currentPage}
                    pageSize={this.state.pagination.pageSize}
                    total={this.state.pagination.total}
                    onChange={this.handlePageChange.bind(this)}
                />

            </div>
        );
    }
}

export default withRouter(Contact);