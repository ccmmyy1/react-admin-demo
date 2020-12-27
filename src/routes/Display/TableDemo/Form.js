/**
 * @author
 * @date 2020-12-20
 */
import React from 'react';
import { Form, Input, Cascader, Button, message, DatePicker, Radio, Select } from 'antd';
import cityData from '../../../utils/CityCode';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
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
// 将city的json数据转换成antd级联组件格式
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
// 将后端返回的城市进行回显 性能消耗太大 todo
// let arr = [];
// const { residence } = this.props.record;
// for (let i in cityData) {
//   if (cityData[i].value === residence[0]) {
//     arr.push(cityData[i].text)
//   }
//   for (let j in cityData.children) {
//     if (cityData[i].children[j].value === residence[1]) {
//       arr.push(cityData[i].children[j].text)
//     }
//     for (let k in cityData[i].children[j].children) {
//       if (cityData[i].children[j].children[k].value === residence[2]) {
//         arr.push(cityData[i].children[j].children[k].text)
//       }
//     }
//   }
//   arr.join('/');
// }
// console.log(arr.join('/'), 'huixian'); //todo


const roleList = [
  {
    id: 1, name: '管理员'
  },
  {
    id: 2, name: '用户'
  },
  {
    id: 3, name: '超级管理员'
  }
]

@Form.create()
class FormLayout extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const okHandle = this.props.okHandle; // 传给父组件调接口
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.warning('请先填写正确的表单');
      } else {
        const time = values.date.format('YYYY-MM-DD HH:mm:ss');
        console.log(time);
        const value = {
          date: time,
          time: time,
          ...values
        }
        console.log(value, 'vvvv'); //todo
        okHandle(values); //在上一层调接口传参数 不要将应用层和业务层混合使用
        message.success('提交成功');
      }
    });
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { record } = this.props; // 父组件传来的

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='姓名' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: record ? record.name : '',
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
        <Form.Item label='性别'  {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: record ? record.isMale : false,
            rules: [
              {
                required: true,
                type: 'boolean',
                message: '请选择性别',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='手机号' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('phone', {
              initialValue: record ? record.phone : '',
              rules: [
                {
                  len: 11,
                  pattern: /^[1][3|4|5|7|8][0-9]{9}$/,
                  required: true,
                  message: '请输入正确的11位手机号'
                }
              ]
            })(
              <Input />
            )
          }
        </Form.Item>
        <Form.Item label='邮箱' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('email', {
              initialValue: record ? record.email : '',
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址'
                },
                {
                  required: true,
                  message: '请填写邮箱地址'
                }
              ]
            })(
              <Input />
            )
          }
        </Form.Item>
        <Form.Item label='角色' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: record ? record.roleName : '',
              rules: [
                {
                  required: true,
                  message: '角色不能为空'
                }
              ]
            })(
              <Select
                placeholder="--请选择角色--"
              >
                {roleList.map(item =>
                  <Select.Option key={item.id} value={item.id.toString()}>
                    {item.name}
                  </Select.Option>
                )
                }
              </Select>
            )
          }
        </Form.Item>


        <Form.Item label='地址' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('residence', {
              initialValue: record ? record.residence : '',
              rules: [
                {
                  type: 'array',
                  required: false,
                  message: '请选择住址'
                }
              ]
            })(
              <Cascader options={sortCityList} expandTrigger='hover' placeholder='' />
            )
          }
        </Form.Item>
        <Form.Item label='生日' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('date', {
              initialValue: record.date ? moment(record.date) : null,
              rules: [
                {
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
                format='YYYY-MM-DD HH:mm:ss'
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
