import React from 'react';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const items = [];
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      windowHeight: null
    }
  }
  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: this.state.windowHeight }}>
          <Header collapsed={this.state.collapsed} toggle={this.toggle} current="vault" openCurrent="vault"/>
          <Layout>
            <Sidebar collapsed={this.state.collapsed} current="home" openCurrent="home"/>
            <Content  style={{ padding: 24, minHeight: this.state.windowHeight - 112 }}>
              <div type="flex" justify="center" align="middle" style={{ background: '#fff', padding: 24, minHeight: this.state.windowHeight - 112 }}>
                <h1 style={{ color: '#000' }}>Welcome to Bitwarden Online Password Vault</h1>
              </div>
            </Content>
          </Layout>
          <Footer/>
        </Layout>
      </div>
    );
  }
}
export default Home;