import React from 'react';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';
import Footer from '../Navigation/Footer';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Table, Spin, Tooltip } from 'antd';
import axios from 'axios';
import { FileOutlined, EditOutlined, PlusCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Config from '../../constants/config';

const FormItem = Form.Item;
const INITIAL_STATE = {
  name: '',
  password: '',
  errors: '',
  success: ''
};
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    no: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    no: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const { Content } = Layout;
const items = [];
class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      windowHeight: null,
      isModalOpen:false,
      isDeleteModalOpen:false,
      isEditModalOpen:false,
      delId:null, 
      delName:null,
      ...INITIAL_STATE,
      loadingContent: true,
      dataRequested : [],
      columnRequested: [
        {
          title: "No.",
          dataIndex: 'no',
          key: 'no'
        },
        {
          title: "Name",
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (text, row) => {   
            return(             
              <span>
                <Tooltip placement="bottomLeft" title={"View Folder"}>
                  <span className="btn-view"><Link to={'/folders/' + row.id}><EyeOutlined type="eye" theme="outlined" style={{ fontSize: '20px', margin: '0', color:'#000' }}/></Link></span>
                </Tooltip>
                <span className="vertical_hr"></span>
                <span className="btn-edit"><EditOutlined onClick={() => this.showEditModal(row.id,row.name)} type="edit" theme="outlined" style={{ fontSize: '20px', margin: '0' }}/></span>
                <span className="vertical_hr"></span>
                <span><DeleteOutlined onClick={() => this.showDeleteModal(row.id,row.name)} type="delete" theme="outlined" style={{ fontSize: '20px', margin: '0' }}/></span>
              </span>
            )
          }
        }
      ],
    }
  }
  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
    this.getAllFolders();
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  showModal = () => {
    this.setState({ isModalOpen: true, error: '', success: '' });
  };
  showDeleteModal = (id, name) => {
    this.setState({ isDeleteModalOpen: true, delId:id, delName:name });
  };
  showEditModal = (id, name) => {
    this.setState({ isEditModalOpen: true, delId:id, delName:name, error: '', success: '' });
  };
  handleOk = () => {
    this.setState({ isModalOpen: false });
  };
  handleCancel = () => {
    this.setState({ isModalOpen: false, delId:null, delName:null, error: '', success: '' });
  };
  handleEditCancel = () => {
    this.setState({ isEditModalOpen: false, delId:null, delName:null, error: '', success: '' });
  };
  handleDeleteCancel = () => {
    this.setState({ isDeleteModalOpen: false, delId:null, delName:null, error: '', success: '' });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  };
  onUpdateChange = event => {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  };
  onSubmit = event => {
    const { name } = this.state;
    event.preventDefault();
    const headers = {
      headers: {'content-type': 'application/json'}
    };
    var self = this;
    axios.post(Config.add_folder, {
      name: name,
      user_id: localStorage.getItem('userId')
    },headers)
    .then(function (response) {
      if(response.data.success === false) {
        self.setState({errors: response.data.message, success: ''});
      }
      if(response.data.success === true) {
        self.setState({success: response.data.message, error: '', isModalOpen: false});
        self.getAllFolders();
      }
      else {
        self.setState({errors: "Failed! Please try again", success: ''}); 
      }
    })
  };
  onUpdate = event => {
     const { delId, delName } = this.state;
     event.preventDefault();
     const headers = {
       headers: {'content-type': 'application/json'}
     };
     var self = this;
     axios.post(Config.edit_folder, {
       name: delName,
       id: delId
     },headers)
     .then(function (response) {
       if(response.data.success === false) {
         self.setState({errors: response.data.message, success: ''});
       }
       if(response.data.success === true) {
         self.setState({success: response.data.message, error: '', isEditModalOpen: false});
         self.getAllFolders();
       }
       else {
         self.setState({errors: "Failed! Please try again", success: ''}); 
       }
     })
   };
  getAllFolders = () => {
    axios.get(Config.get_folder + localStorage.getItem('userId'), { headers: {"authorization" : localStorage.getItem('token')} })
      .then(({ data }) => {
        const state = { ...this.state }
        state.dataRequested = data;
        state.loadingContent = false;
        this.setState(state);
      }).catch((err) => {
      })
  }
  removeFolder = () =>{
    axios.delete(Config.delete_folder + this.state.delId, { headers: {"authorization" : localStorage.getItem('token')} })
      .then(({ data }) => {
        this.getAllFolders();
        this.setState({ isDeleteModalOpen: false, delId:null, delName:null });
      })
      .catch((err) => {
        console.log('error', err);
      })
  }
  render() {
    const { dataRequested, columnRequested } = this.state;
    const loadingContent = this.state.loadingContent;
    return (
      <div className="App">
        <Layout style={{ minHeight: this.state.windowHeight }}>
          <Header collapsed={this.state.collapsed} toggle={this.toggle} current="vault" openCurrent="vault"/>
          <Layout>
            <Sidebar collapsed={this.state.collapsed} current="folders" openCurrent="folders"/>
            <Content  style={{ padding: 24, minHeight: this.state.windowHeight - 112 }}>
              <div type="flex" justify="center" align="middle" style={{ background: '#fff', padding: 24, minHeight: this.state.windowHeight - 112 }}>
              
              <Modal title="ADD FOLDER" open={this.state.isModalOpen} onOk={this.onSubmit} onCancel={this.handleCancel} okText="Save" centered={true}>
                <Form method="post"  name="userLoginForm" onSubmit={this.onSubmit} className="login-form" layout="vertical" initialValues={{layout: "vertical"}} type="flex" justify="center" align="middle">
                  <div className="errorMsg">{this.state.errors}</div>
                  <div className="successMessage">{this.state.success}</div>
                        <FormItem label="Name">
                          <Input prefix={<FileOutlined />} placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChange}/>
                        </FormItem>
                </Form>
              </Modal>

              <Modal title="EDIT FOLDER" open={this.state.isEditModalOpen} onOk={this.onUpdate} onCancel={this.handleEditCancel} okText="Update" centered={true}>
                <Form method="post"  name="userLoginForm" onSubmit={this.onUpdate} className="login-form" layout="vertical" initialValues={{layout: "vertical"}} type="flex" justify="center" align="middle">
                  <div className="errorMsg">{this.state.errors}</div>
                  <div className="successMessage">{this.state.success}</div>
                        <FormItem label="Name">
                          <Input prefix={<FileOutlined />} placeholder="Enter name" name="delName" value={this.state.delName} onChange={this.onUpdateChange}/>
                        </FormItem>
                </Form>
              </Modal>

              <Modal title="Are you sure to delete this folder?" open={this.state.isDeleteModalOpen} onOk={this.removeFolder} onCancel={this.handleDeleteCancel} okText="Yes" cancelText="No" centered={true}>
              </Modal>

              { loadingContent ?
                  <div className="outerLoadingDiv" type="flex" justify="center" align="middle" style={{ minHeight: window.screen.height + 27 }}>
                    <div className="innerLoadingDiv">
                      <Row gutter={16} type="flex" justify="space-around" align="middle">
                        <Col className="gutter-row" span={24}>
                          <div className="gutter-box">
                            <Spin size="large" tip="Loading..."/>
                          </div>
                        </Col>
                      </Row>
                    </div>   
                  </div>
                  :
                  <Row>
                    <Button style={{height:45,fontSize:20,marginBottom:10,float:'right'}} onClick={this.showModal}>
                        <PlusCircleOutlined type="plus" /> ADD
                    </Button>
                    <Col span={24}>
                    <Table columns={columnRequested} dataSource={dataRequested}/>
                    </Col>
                  </Row>
              }
              </div>
            </Content>
          </Layout>
          <Footer/>
        </Layout>
      </div>
    );
  }
}
export default Folder;