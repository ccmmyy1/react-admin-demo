/**
 * @author
 * @date 2020-12-19
 * 1.，destroyOnClose的作用
 * 2. 三级联动的城市数据回显？数据格式不清楚 
 */
import React from 'react';
import { Card, Table, Divider, Button, Popconfirm, Modal, Spin, Checkbox, message } from 'antd';
import FormLayout from './Form';
import Search from './Search';

const confirm = Modal.confirm;

class TableDemo extends React.Component {
  state = {
    title: '',  // 可在model的state中设置type为编辑还是新增，根据type再定义title  可见dva-admin
    visible: false,
    operation: '',  // 类似于model中的type
    confirmLoading: false,
    formData: {}, // 可放入model层中的state
    loading: false,
  }
  // 禁用
  changeStatus (record) {
    // 需要dispatch一个action 改变 把新参数传过去后端

  }
  // 勾选
  handleChange (show) {
    let newShow = show ? 0 : 1;
    // 1.调接口传参数newshow 2.重新获取list更新list
  }
  // 新增
  handleAdd () {
    // dispacth... paload:{type: 'create'}
    this.setState({
      title: '添加',
      visible: true,
      operation: 'add'
    })
  };
  // 编辑
  handleEdit (record) {
    // dispatch({ type: '/edit', payload:  }) record回显到formdata中，进行展示
    this.setState({
      title: '编辑',
      visible: true,
      operation: 'edit',
      formData: record,
    })
  };
  // 删除
  handleDelete (id) {
    // 发送dispatch和参数到接口
    //dispatch({ type: 'accountAdmin/delete', payload: { id } })
    console.log(id, '删除');
    this.setState({
      loading: true
    })
  }

  onDelete = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk () {
        console.log(record.id, '调删除接口');
      },
    })
  }

  // 取消modal 
  cancelHandle () {
    this.setState({
      visible: false,
      formData: {}
    })
  }
  // 提交表单
  okHandle (data) {
    console.log(data, 'data'); //todo
    this.setState({
      visible: false,
      formData: data
    }, () => {
      const { operation } = this.state;
      const { formData } = this.state;
      // 也可以判断id是否存在 如果不存在则dispatch到update 否则create
      if (operation === 'edit') {
        // 编辑的接口 把format传过去
      } else {
        // 增加的接口
      }
      // 处理完成后再置空以免回显示
      this.setState({
        formData: {}
      })
    })
  }

  render () {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'isMale', // 后端对应的字段名
        key: 'isMale',
        render: text => (<span>{text ? '男' : '女'}</span>)
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '住址',
        dataIndex: 'residence',
        key: 'residence',
      },
      {
        title: '生日',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => <span>{status ? '已启用' : '已禁用'}</span>,
      },
      {
        title: '勾选',
        dataIndex: 'chocie',  // 后端字段true为展示否则不展示
        key: 'chocie',
        render: (chocie, record) => (
          <Checkbox checked={chocie} onChange={e => this.handleChange(chocie)} />
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button size='small' onClick={() => this.changeStatus(record)}>{record.status ? '禁用' : '启用'}</Button>
            <Divider type='vertical' />
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Divider type='vertical' />
            <Popconfirm title='确定要删除吗？' onConfirm={() => this.handleDelete(record.id)}>
              <Button size="small" >删除</Button>
            </Popconfirm>
            <Divider type='vertical' />
            <Button size="small" onClick={() => this.onDelete(record)}>删除</Button>
          </span>
        )
      }
    ]
    const data = [
      {
        key: '1',
        name: 'John Brown',
        isMale: true,
        phone: '13230304567',
        email: 'admin@qq.com',
        roleName: '管理员',
        residence: '北京',
        date: '2020-12-23 12:33:44',
        status: true,
        chocie: true,
      },
      {
        key: '2',
        name: 'Brown',
        isMale: false,
        phone: '13230304567',
        email: 'admin@qq.com',
        roleName: '管理员',
        residence: '上海',
        date: '2020-12-15 13:44:55',
        status: true,
        chocie: false,
      },
      {
        key: '3',
        name: 'John',
        isMale: false,
        phone: '13230304567',
        email: 'admin@qq.com',
        roleName: '管理员',
        residence: '杭州',
        date: '2020-12-18 14:00:00',
        status: true,
        chocie: true,
      },
    ]
    const { title, visible, confirmLoading, loading } = this.state;
    return (
      <Card bordered={false} title='基本用法'>
        <Search onAdd={this.handleAdd.bind(this)} />
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey='name'  // 目前没有id
          />
        </Spin>
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.cancelHandle.bind(this)}
          footer={null}
          destroyOnClose
        >
          <FormLayout record={this.state.formData} okHandle={this.okHandle.bind(this)} />
        </Modal>
      </Card>

    )
  }
}

export default TableDemo;
