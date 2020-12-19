/**
 * @author
 * @date 2020-12-19
 */
import React from 'react';
import { Card, Table, Divider, Button, Popconfirm, Modal } from 'antd';
import FormLayout from './Form';

class TableDemo extends React.Component {
  state = {
    title: '',
    visible: false,
    operation: '',
    confirmLoading: false,
    formData: {}
  }
  handleAdd (record) {
    this.setState({
      title: '添加',
      visible: true,
      operation: 'add'
    })
  }

  cancelHandle () {
    this.setState({
      visible: false,
      formData: {}
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
        title: '年龄',
        dataIndex: 'age', // 后端对应的字段名
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'residence',
        key: 'residence',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button size='small' onClick={() => this.handleAdd(record)}>添加</Button>
            <Divider type='vertical' />
            <Button size="small">编辑</Button>
            <Divider type='vertical' />
            <Popconfirm title='确定要删除吗？'>
              <Button size="small" >删除</Button>
            </Popconfirm>
          </span>
        )
      }
    ]
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: '北京',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: '上海',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: '重庆',
      }
    ]
    const { title, visible, confirmLoading } = this.state;
    return (
      <Card bordered={false} title='基本用法'>
        <Table columns={columns} dataSource={data} />
        <Modal
          title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={() => this.cancelHandle()}
          footer={null}
        >
          <FormLayout record={this.state.formData} />
        </Modal>
      </Card>

    )
  }
}

export default TableDemo;
