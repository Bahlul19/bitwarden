import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class FooterSection extends React.Component {
	constructor(props) {
	    super(props)
	}
	
	render() {
		return (
			<Footer>
				<p style={{fontSize: '1rem'}}>
					<span style={{float: 'left'}}>© 2023 Bitwarden Inc.</span>
					<span style={{float: 'right'}}>Version 2023.5.0</span>
				</p>
			</Footer>
		);
	}
}
export default FooterSection;