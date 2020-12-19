/**
 * @author 
 * @date 2020-12-19
 * 上传接口如何调用
*/
import { Card, message, Upload } from 'antd';
import React from 'react';
import { Button, Icon } from 'antd';
import Axios from 'axios';
// react为16.4不能使用函数组件 16.7以上可以
class UploadDemo extends React.Component {
  state = {
    loading: false,
    fileList: [{}]
  }

  beforeUpload (file, fileList) {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error('只能上传PNG格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不超过 2MB!');
    }
    return isPNG && isLt2M;
  }

  render () {
    const { imageUrl } = this.state;
    const props = {
      name: "avatar",
      showUploadList: false,//设置只上传一张图片，根据实际情况修改
      customRequest: info => {//手动上传
        const formData = new FormData();
        formData.append('avatar', info.file);//名字和后端接口名字对应
        Axios({
          url: '//jsonplaceholder.typicode.com/posts/',//上传url
          method: 'post',
          processData: false,
          data: formData,
          success: (res) => {//上传成功回调
            if (res.code === '0') {
              this.setState({
                imageUrl: res.imageUrl
              });
              message.success('上传成功！');
            }
          },
          error: () => {//上传失败回调
            message.error('上传失败！');
          },
        });
      },
      onRemove: file => {//删除图片调用
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      }
    }

    return (
      <Card bordered={false} title='基本用法' >
        <Upload
          name="avatar"
          showUploadList={false}
          action='/upload'
          beforeUpload={this.beforeUpload}
          {...props}
        >
          {imageUrl
            ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            : <Button><Icon type='upload' />上传</Button>
          }
        </Upload>
      </Card >
    )
  }
}

export default UploadDemo;
