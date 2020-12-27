/**
 * @author
 * @date 2020-12-23
 */
import React from 'react';
import { Input, Button, Select, Icon } from 'antd';
import ReactDOM from 'react-dom';
import styles from './Search.less';

const selectOptions = [
  { value: 'name', name: '姓名' },
  { value: 'phone', name: '手机号' },
  { value: 'email', name: '邮箱' }
]

class Search extends React.Component {

  state = {
    selectValue: 'name',
  }

  handeleSelectChange = (value) => {
    this.setState({
      selectValue: value,
    })
  }

  handleSearch = () => {
    const data = {
      keyword: ReactDOM.findDOMNode(this.refs.searchInput).value,
    }
    data.field = this.state.selectValue
    this.props.onSearch && this.props.onSearch(data);
  }

  render () {
    const { keyword, select } = this.props;
    const { selectValue } = this.state;
    return (
      <Input.Group compact className={styles.search} style={{ width: '120%' }} >
        <Select style={{ width: '30%' }} onChange={this.handeleSelectChange} defaultValue={selectValue}>
          {
            selectOptions.map((item, key) =>
              <Select.Option value={item.value} key={key}>
                {item.name || item.value}
              </Select.Option>
            )
          }
        </Select>

        <Input ref='searchInput' style={{ width: '50%' }} defaultValue={keyword} />
        <Button type='primary' onClick={this.handleSearch} ><Icon type='search' />搜索</Button>
      </Input.Group>

    )
  }
}
export default Search;
