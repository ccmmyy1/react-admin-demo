/**
 * @author 
 * @date  2020-12-19
 */
import React from 'react';
import { Card, Carousel } from 'antd';
import './css/style.css'; // 背景色 字体颜色

class CarouselDemo extends React.Component {

  render () {
    return (
      <Card>
        <Carousel speed={100} autoplay>
          <div>
            <div className='slider-item' style={{ background: '#364d79' }}>
              <h3>Ant Design</h3>
              <p>The Fast Way Use Animation In React</p>
            </div>
          </div>
          <div>
            <div className='slider-item' style={{ background: '#64cbcc' }}>
              <h3>Ant Design</h3>
              <p>The Fast Way Use Animation In React</p>
            </div>
          </div>
          <div>
            <div className='slider-item' style={{ background: 'sandybrown' }}>
              <h3>Ant Design</h3>
              <p>The Fast Way Use Animation In React</p>
            </div>
          </div>
        </Carousel>
      </Card>
    )
  }
}

export default CarouselDemo;
