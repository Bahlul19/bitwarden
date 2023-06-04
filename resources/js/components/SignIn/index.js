import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Divider } from 'antd';
import axios from 'axios';
import Logo from '../../assets/images/l-logo.png';
import Config from '../../constants/config';
import * as ROUTES from '../../constants/routes';
import { MailOutlined, LockOutlined, ClusterOutlined } from '@ant-design/icons';
import {Navigate} from 'react-router-dom';
import { BrowserRouter as Router,  Link } from 'react-router-dom';

const FormItem = Form.Item;
const INITIAL_STATE = {
  email: '',
  password: '',
  errors: ''
};
class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

 isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    const headers = {
      headers: {'content-type': 'application/json'}
    };
    var self = this;
    axios.post(Config.sign_in, {
      email: email,
      password: password
    },headers)
    .then(function (response) {
      localStorage.setItem('token', response.data.data.email);
      localStorage.setItem('userId', response.data.data.id);
      window.location.reload();
    }).catch(function (error) {
      self.setState({errors: "Your account or password is incorrect! Please try again"});
    });
  };
  
  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';
    const isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <div className="wrapper">
        <div className="container">
          {isAlreadyAuthenticated ? 
             <Navigate to="/folders" replace={true} /> : 
              (
                <div type="flex" justify="center" align="middle">
                  <Row className="" style={{margin: '50px 5px 20px'}}>
                    <Col span={24}>
                      <img src={Logo} className="logo" alt="Bitwarden"/>
                      <p style={{color: '#000', fontSize: '1.25rem'}}>Log in or create a new account to access<br/>your secure vault.</p>
                    </Col>
                  </Row>

                  <Row className="form-login">
                    <Col span={24}>
                      <Form method="post" name="userLoginForm" onSubmit={this.onSubmit} className="login-form" layout="vertical" initialValues={{layout: "vertical"}} type="flex" justify="center" align="middle">
                        <div className="errorMsg">{this.state.errors}</div>
                        <FormItem label="Email address (required)">
                          <Input prefix={<MailOutlined />} placeholder="Email" name="email" value={this.state.email} onChange={this.onChange}/>
                        </FormItem>
                        <FormItem label="Password">
                          <Input prefix={<LockOutlined />} type="password" placeholder="**********" name="password" value={this.state.password} onChange={this.onChange}/>
                        </FormItem>
                        <FormItem>
                          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid} onClick={this.onSubmit}>
                          Log In
                          </Button>
                          <Divider/>
                          <p style={{float: 'left'}}>New around here? <Link to="/signup"><span>Create Account</span></Link></p>
                        </FormItem>
                      </Form>
                    </Col>
                  </Row>

                  <Row className="" style={{margin: '50px 5px 20px'}}>
                    <Col span={24}>
                      <p style={{color: '#000', fontSize: '1rem'}}>© 2023 Bitwarden Inc.<br/>Version 2023.5.0</p>
                    </Col>
                  </Row>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
export default SignIn;