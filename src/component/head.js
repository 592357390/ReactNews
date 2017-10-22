import React from "react"
import {Row, Col, Modal} from 'antd'
import logo from '../logo.svg';
import {Menu, Icon, Tabs, message, Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class Header extends React.Component {


    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogin: false,
            userNickName: '',
            userId: 0
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    hasLogin: true,
                    userNickName: json.NickUserName,
                    userId: json.UserId
                })
                localStorage.userId = json.UserId
                localStorage.userNickName = json.NickUserName
            });
        message.success("请求成功")
        this.setModalVisible(false)
    }

    logout() {
        this.setState({
            hasLogin: false
        })
        localStorage.userId = ""
        localStorage.userNickName = ""
    }

    handleClick(e) {
        if (e.key === "register") {
            this.setModalVisible(true)
        }
        this.setState({
            current: e.key,
        });
    }

    handleOnChange(key) {
        if (key == 1) {
            this.setState({action: 'login'})
        } else {
            this.setState({action: 'register'})
        }
    };

    componentWillMount() {
        if (localStorage.userId !== "") {
            this.setState({
                hasLogin: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            })
        }
    }

    render() {

        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogin ?
            <Menu.Item key="logout" className="register">
                <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                {/*<Link target="_black">*/}
                <Button type='dashed' htmlType='button'>个人中心</Button>
                &nbsp;&nbsp;
                <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
                {/*</Link>*/}
            </Menu.Item> :
            <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登陆
                {/*<Link target="_black">*/}
                {/*<Button type='primary' htmlType='button'>个人中心</Button>*/}
                {/*</Link>*/}
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}/>
                    <Col span={2}>
                        <a className="App">
                            <img src={logo} className="App-logo"/>
                            <span className="App-title">MyReact</span>
                        </a>
                    </Col>
                    <Col span={18}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)}
                              selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        <Modal title="用户中心" wrapClassName="vertical-center-modal"
                               visible={this.state.modalVisible}
                               onOk={() => this.setModalVisible(false)}
                               onCancel={() => this.setModalVisible(false)}>
                            <Tabs type="card" onChange={this.handleOnChange.bind(this)}>

                                <Tabs.TabPane tab="登录" key="1">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                   placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                   placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </Tabs.TabPane>

                                <Tabs.TabPane tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                   placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                   placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                        </FormItem> <FormItem label="确认密码">
                                        <Input type="password" prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               placeholder="请输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                    </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </Tabs.TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}/>
                </Row>
            </header>
        )
    };

    setModalVisible(b) {
        this.setState({modalVisible: b});
    }
}

export default Header = Form.create({})(Header);
