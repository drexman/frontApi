import  React, {Component} from 'react';
import { Modal,Space, Button, Table } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import ContatoService from "../../services/contatoService";
import ContatoForm from '../Contact/form';

class Contact extends Component {

    constructor(props)
    {
        super(props);
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
                <Button onClick={this.editar.bind(this,e)}>
                    <EditOutlined />
                </Button>
                <Button onClick={this.delete.bind(this,e)}>
                    <DeleteOutlined />
                </Button>
                </Space>
                
            }
        ];
        this.state = {
            id: null,
            modal: false,
            currentPage: 0,
            totalItems: 0,
            totalPages: 0,
            dataSource : null,
        }
    }

    componentDidMount()
    {
        this.load();
    }

    load()
    {
        let params = {
            page: 0,
            size: 10
        };
        
        ContatoService.getData(params).then(response => {
            this.setState({
                dataSource : response.data.datas,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
                totalPages: response.data.totalPages
            });
        }).catch(err => {
            console.log(err); 
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
    }

    salvar(valores)
    {
        console.log(valores);
        ContatoService.save(valores).then(response => {
            this.load();
        }).catch(err => {
            console.log(err); 
        })
        this.setState({modal : false});
    } 
    
    delete(c)
    {
        Modal.confirm({
            title: 'Confirmação',
            icon: <ExclamationCircleOutlined/>,
            content: 'Deseja remover?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk() {
                ContatoService.delete(c.id).then(response => {
                    this.load();
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }

    cancelar(e)
    {
        this.setState({modal : false});
    }

    abrirNovo()
    {
        this.setState({
            title : "Novo Cadastro",
            modal : true,
            id: null
        });

    }

    editar(c)
    {
        this.setState({
            title : "Editar Contato",
            modal : true,
            id: c.id
        });
    }

    render()
    {
        return(
            <div>
                <ContatoForm 
                id={this.state.id}
                title={this.state.title}
                salvar={this.salvar.bind(this)} 
                cancelar={this.cancelar.bind(this)} 
                visible={this.state.modal}/>
                <Table 
                columns={this.columns} 
                dataSource={this.state.dataSource} 
                title={() => <div><Button type="primary" onClick={this.abrirNovo.bind(this)}><PlusOutlined /></Button></div>}
                onChange={this.handleTableChange}
                
                  />
            </div>
        );
    }
}

export default withRouter(Contact);