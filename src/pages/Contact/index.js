import  React, {Component} from 'react';
import { Table } from 'antd';
import { Link, withRouter } from "react-router-dom";
import ContatoService from "../../services/contatoService";

const dataSource = [
    {
        id: '1',
        nome: 'Samuel Toshikazu Oizume',
        email: 'Samuel.oizume@hotmail.com.br',
        telefone: '41999183266'
    }
]

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
    }
];

class Contact extends Component {

    constructor()
    {
        super();
        this.load();
    }

    load()
    {
        let params = {
            page: 0,
            size: 10
        };
        ContatoService.getAll(params).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err); 
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
    }

    render()
    {
        return(
            <div>
                <Table dataSource={dataSource} 
                onChange={this.handleTableChange}
                columns={columns} 
                  />
            </div>
        );
    }
}

export default withRouter(Contact);