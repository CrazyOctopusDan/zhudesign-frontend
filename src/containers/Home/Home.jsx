import React from 'react'
import styles from './styles.module.less'

// import PageHeader from '@components/PageHeader/PageHeader'
import PageHeader from '../../components/PageHeader/PageHeader'
import PageFooter from '../../components/PageFooter/PageFooter'

import { getArtsList } from '../../services'

let timer = null

const pageSize = 21
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      codeType: true,
      page: 1,

      totalCount: 0,
      worksList: []
    }
  }

  componentDidMount() {
    // 挂载滚动监听
    window.addEventListener('scroll', this.bindScroll)

    // 获取列表信息
    this.getArtList()
  }

  componentWillUnmount() {
      // 移除滚动监听
      window.removeEventListener('scroll', this.bindScroll)
  }

  /**
   * 查询列表信息
   */
  getArtList = async () => {
    const { page, worksList } = this.state

    try {
      const { totalCount, data } = await getArtsList({page, pageSize})
      console.log('获取了列表数据', data, totalCount)

      this.setState({
        totalCount,
        worksList: worksList.concat(data).filter(i => !!i)
      })
    } catch (error) {
      console.error('获取列表发生了错误：', error)
    }
  }

  /**
   * 滚动监听事件
   * @param {*} param 
   */
  bindScroll = (event) => {
    const { totalCount, worksList, page } = this.state

    const calc = () => {
      // 滚动的高度
      const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
      // 视窗高度
      const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
      // 页面高度
      const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
      // 距离页面底部的高度
      const height = scrollHeight - scrollTop - clientHeight;
      // 判断距离页面底部的高度
      console.log('剩余高度！', height)
      if (height <= (320 || 0)) {
          // 判断执行回调条件
          if (this.state.codeType && worksList.length < totalCount) {
              // 执行回调
              // this.props.scrollCallback();
              // 关闭判断执行开关
              this.setState({
                codeType: false,
                page: page+1
              }, () => this.getArtList());
          }
      } else {
          // 打开判断执行开关
          this.setState({
              codeType: true
          });
      }
    }

    if (timer) {
      return
    }

    timer = setTimeout(() => {
      calc()
      timer = null
    }, 300)
  }

  /**
   * 跳转页面
   */
  goToLibrary(param) {
    this.props.history.push({
      pathname: `/archieves/${param}`
    })
  }

  /**
   * 封面列表
   */
  renderWorks() {
    return (
      <div className={styles.worksList}>
        {this.state.worksList.map(work => (
          <div 
            className="work-item"
            key={work.id}
            onClick={() => this.goToLibrary(work.id)}
          >
            <img className="work-img" alt="作品" src={work.coverImage?.url}/>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.homePage}>
        <PageHeader history={this.props.history} needShortTips={true} />
        
        <div className="container">
          {this.renderWorks()}
        </div>

        <PageFooter />
      </div>
    )
  }
}

export default HomePage
