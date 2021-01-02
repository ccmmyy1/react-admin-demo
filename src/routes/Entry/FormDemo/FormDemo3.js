/**
 * 知识点：
 * 1.电话号码正则
 * 2.网站正则
 * 3.城市三级联动,以及将json数据改为cascader所要类型
 * 4.验证码
 * @anthor 
 * @date 2020-12-11
 */
import React from 'react';
import { Card, Cascader, Col, Row, Input, message, Form, Button, Checkbox, BackTop } from 'antd';
import cityData from '../../../utils/CityCode';
// 由于使用antdv3得用getFieldDecorator,因而不能使用函数组件
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
class FormDemo3 extends React.Component {
  state = {
    count: 60,
    text: '获取验证码',
    disabled: false,
  }
  // 验证码倒计时
  countdown = (e) => {
    const timer = setInterval(() => {
      this.setState({
        text: this.state.count + 's',
        count: this.state.count - 1,
        disabled: true
      }, () => {
        if (this.state.count === 1) {
          clearInterval(timer)
          this.setState({
            count: 60,
            text: '获取验证码',
            disabled: false
          })
        }
      })
    }, 1000)
  }
  // validateFieldsAndScroll 验证不通过自动滚到该field
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
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
    return (
      <div>
        <Card bordered={false} title='基础表单'>
          <Form style={{ width: '70%', margin: '0 auto' }} onSubmit={this.handleSubmit}>
            <Form.Item label='邮箱' {...formItemLayout}>
              {
                getFieldDecorator('email', {
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
            <Form.Item label='密码' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码'
                    },
                    {
                      min: 6,
                      message: '密码至少为6个字符'
                    },
                    {
                      max: 16,
                      message: '密码最多为16个字符'
                    },
                    {
                      whitespace: true,
                      message: '密码中不能有空格'
                    }
                  ]
                })(
                  <Input type='password' />
                )
              }
            </Form.Item>
            <Form.Item label='确认密码' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('confirm', {
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        const { getFieldValue } = this.props.form;
                        //如果上面的密码为空
                        if (!getFieldValue('password')) {
                          callback('请输入上面的密码！')
                        }
                        // 如果与上面的不一致
                        if (value && value !== getFieldValue('password')) {
                          callback('两次输入不一致！')
                        }
                        callback();
                      }
                    }
                  ]
                })(
                  <Input type='password' />
                )
              }
            </Form.Item>
            <Form.Item label='昵称' {...formItemLayout}>
              {
                getFieldDecorator('nickname', {
                  rules: []
                })(
                  <Input />
                )
              }
            </Form.Item>
            <Form.Item label='住址' {...formItemLayout}>
              {
                getFieldDecorator('residence', {
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
            <Form.Item label='手机号' {...formItemLayout}>
              {
                getFieldDecorator('phone', {
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
            <Form.Item label='个人网站' {...formItemLayout}>
              {
                getFieldDecorator('website', {
                  rules: [
                    {
                      pattern: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/,
                      message: '请输入正确的站点地址'
                    }
                  ]
                })(
                  <Input />
                )
              }
            </Form.Item>
            <Form.Item label='验证码' {...formItemLayout}>
              <Row gutter={8}>
                <Col span={12}>
                  {
                    getFieldDecorator('captcha', {
                      rules: [
                        {
                          required: true,
                          message: '请输入验证码'
                        }
                      ]
                    })(
                      <Input />
                    )
                  }
                </Col>
                <Col span={12}>
                  <Button
                    disabled={this.state.disabled}
                    onClick={(e) => this.countdown(e)}
                  >
                    {this.state.text}
                  </Button>

                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...tailLayout}>
              {
                getFieldDecorator('agreement', {

                })(
                  <Checkbox>我已阅读并同意<a>协议</a></Checkbox>
                )
              }
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }} {...tailLayout}>
              <Button type="primary" htmlType="submit" disabled={!getFieldValue('agreement')}>提交</Button>
            </Form.Item>
          </Form>
        </Card>
        <BackTop visibilityHeight={50} style={{ right: 50 }} />
      </div>
    )
  }
}

export default FormDemo3;
