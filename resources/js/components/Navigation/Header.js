import React from 'react';
import { Layout, Icon, Tooltip, Menu } from 'antd';
import { BrowserRouter as Router,  Link } from 'react-router-dom';
import SignOut from '../SignOut';
import {Navigate} from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import {
	AppstoreOutlined,
	SyncOutlined,
	FolderOpenOutlined,
	UnlockOutlined,
	DownloadOutlined,
	ImportOutlined
  } from '@ant-design/icons';
  import Logo from '../../assets/images/h-logo.png';
  

const { Header } = Layout;
class HeaderSection extends React.Component {
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
	isAuthenticated() {
	    const token = localStorage.getItem('token');
	    return token && token.length > 10;
	}
	render() {
		const isAlreadyAuthenticated = this.isAuthenticated();
		return (
			<div>
		        {!isAlreadyAuthenticated ? 
		        	<Navigate to="/" /> : 
		          	(
						<Header style={{ background: '#175ddc', color: '#fff', padding: 0 }}>
							<Menu defaultSelectedKeys={[this.state.current]} defaultOpenKeys={[this.state.openCurrent]} theme="dark" mode="horizontal" inlineCollapsed={true} className="header-menu">
								<Menu.Item key=""><Link to="/vault"><img src={Logo} className="h-logo" alt="Password Vault"/></Link></Menu.Item>
								<Menu.Item key="vault"><Link to="/vault"><UnlockOutlined  /><span>Vaults</span></Link></Menu.Item>
								<Menu.Item key="tools"><Link to="/generator"><SyncOutlined  /><span>Tools</span></Link></Menu.Item>
								<Tooltip placement="bottomLeft" title="Logout">
									<LogoutOutlined
										className="trigger logout"
										type="logout"
										onClick={SignOut}
									/>
								</Tooltip>
							</Menu>
			          </Header>	
		          	)
		        }
		    </div>
		);
	}
}
export default HeaderSection;