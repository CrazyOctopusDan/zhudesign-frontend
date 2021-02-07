import React from 'react'
import styles from './styles.module.less'

// import PageHeader from '@components/PageHeader/PageHeader'
import PageHeader from '../../components/PageHeader/PageHeader'

let timer = null

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      codeType: true,

      worksList: [{
        id: 1,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 2,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 3,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 4,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 5,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 6,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 7,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 8,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 9,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      },{
        id: 10,
        path: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg'
      }]
    }
  }

  componentDidMount() {
    // 挂载滚动监听
    window.addEventListener('scroll', this.bindScroll)
  }

  componentWillUnmount() {
      // 移除滚动监听
      window.removeEventListener('scroll', this.bindScroll)
  }

  /**
   * 滚动监听事件
   * @param {*} param 
   */
  bindScroll = (event) => {
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
          if (this.state.codeType) {
              // 执行回调
              // this.props.scrollCallback();
              // 关闭判断执行开关
              this.setState({
                codeType: false,
              });
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
            <img className="work-img" alt="作品" src={work.path}/>
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
      </div>
    )
  }
}

export default HomePage
