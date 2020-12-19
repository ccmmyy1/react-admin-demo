import React from 'react';
import { Form, Input, Cascader, Button, message, DatePicker } from 'antd';
import cityData from '../../../utils/CityCode';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 4,
    },
  },
};

let sortCityList = [];
for (let i in cityData) {
  let city = {};
  city.value = cityData[i].value;
  city.label = cityData[i].text;
  city.children = cityData[i].children;
  for (let j in city.children) {
    city.children[j].value = city.children[j].value;
    city.children[j].label = city.children[j].text;
    city.children[j].children = city.children[j].children;
    for (let k in city.children[j].children) {
      city.children[j].children[k].value = city.children[j].children[k].value;
      city.children[j].children[k].label = city.children[j].children[k].text;
    }
  }
  sortCityList.push(city);
}
@Form.create()
class FormLayout extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values, 'vvvv'); // 20201220 todo
      if (err) {
        message.warning('请先填写正确的表单');
      } else {
        console.log(values, 'values'); //调接口传参数
        message.success('提交成功');
      }
    });
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { record } = this.props; // 父组件传来的
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='姓名' {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: record ? record.name : "",
              rules: [
                {
                  required: true,
                  message: '请填写姓名'
                }
              ]
            })(
              <Input />
            )
          }
        </Form.Item>
        <Form.Item label='年龄' {...formItemLayout}>
          {
            getFieldDecorator('age', {
              initialValue: record ? record.age : "",
              rules: [
                {
                  len: 3,
                  required: true,
                  message: '请填写正确的年龄',
                  pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
                }
              ]
            })(
              <Input />
            )
          }
        </Form.Item>
        <Form.Item label='地址' {...formItemLayout}>
          {
            getFieldDecorator('residence', {
              initialValue: record ? record.residence : "",
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: '请选择住址'
                }
              ]
            })(
              <Cascader options={sortCityList} expandTrigger='hover' placeholder='' />
            )
          }
        </Form.Item>
        <Form.Item label='生日' {...formItemLayout}>
          {
            getFieldDecorator('date', {
              initialValue: record ? record.date : "",
              rules: [
                {
                  //type: 'array',
                  required: false,
                  message: '请选择日期'
                }
              ]
            })(
              <DatePicker
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            )
          }
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }} {...tailLayout}>
          <Button type="primary" htmlType="submit" >提交</Button>
        </Form.Item>
      </Form>

    )
  }
}

export default FormLayout;
