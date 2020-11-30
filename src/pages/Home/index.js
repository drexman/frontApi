import React, { Component } from 'react';
import { Layout, Avatar, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LogoutOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title'; 
import loadable from '@loadable/component';
import { logout } from '../../auth/auth';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

const LoadableComponent = loadable(props =>
     import(`../../pages/${props.page}`));

class Home extends Component {

    constructor(props)
    {
        super(props);
    }

    sair = () => {
        logout();
        window.location.href="/";
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header style={{padding:10}}>
                        <Title style={{color:'white'}} level={3}>App</Title>
                    </Header>
                </Layout>
                <Layout style={{ height: '100vh' }}>
                    <Sider width={200}>
                        <Menu mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1" icon={<UserOutlined />}>Contatos</Menu.Item>
                            <Menu.Item onClick={this.sair.bind(this)} key="1" icon={<LogoutOutlined />}>Sair</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                            }}
                        >
                            <LoadableComponent page={this.props.page}/>
                        </Content>
                        <Footer>
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default Home;