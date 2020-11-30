import  React, {Component} from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import ContatoService from "../../services/contatoService";
import ContatoForm from '../Contact/form';

const columns = [
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
        rebder: () => <a></a>
    }
];


class Contact extends Component {

    constructor(props)
    {
        super(props);
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

    cancelar(e)
    {
        this.setState({modal : false});
    }

    abrirNovo()
    {
        this.setState({
            modal : true,
            id: null
        });

    }

    render()
    {
        return(
            <div>
                <ContatoForm 
                id={this.state.id}
                title=""
                salvar={this.salvar.bind(this)} 
                cancelar={this.cancelar.bind(this)} 
                visible={this.state.modal}/>
                <Table 
                columns={columns} 
                dataSource={this.state.dataSource} 
                title={() => <div><Button type="primary" onClick={this.abrirNovo.bind(this)}><PlusOutlined /></Button></div>}
                onChange={this.handleTableChange}
                
                  />
            </div>
        );
    }
}

export default withRouter(Contact);