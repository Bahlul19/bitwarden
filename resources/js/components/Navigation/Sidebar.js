import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router,  Link, Redirect } from 'react-router-dom';
import '../../assets/css/App.css';
import {
  AppstoreOutlined,
  SyncOutlined,
  FolderOpenOutlined,
  UnlockOutlined,
  DownloadOutlined,
  ImportOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      openCurrent: props.openCurrent,
      openItem: props.openItem
    }
  }
  handleClick = (e) => {
    this.setState({
      current : this.props.current
    });
  }
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        style={{ background: '#fff', color: '000', border: '1px solid #00000020' }}
        >

          <div className="sidebar-header">
            <h1>FILTERS</h1>
          </div>
          
          <Menu defaultSelectedKeys={[this.state.current]} defaultOpenKeys={[this.state.openCurrent]} theme="dark" mode="inline" inlineCollapsed={true}>
            {/* <Menu.Item key="home"><Link to="/"><AppstoreOutlined  /><span>Dashboard</span></Link></Menu.Item> */}
            <Menu.Item key="folders"><Link to="/folders"><FolderOpenOutlined  /><span>Folders</span></Link></Menu.Item>
            <Menu.Item key="vault"><Link to="/vault"><UnlockOutlined  /><span>My Vault</span></Link></Menu.Item>
          </Menu>
      </Sider>   
    );
  }
}
export default Sidebar;
