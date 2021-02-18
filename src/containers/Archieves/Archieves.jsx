import React from 'react'
import styles from './styles.module.less'
import { Image } from 'antd'

import { getArtDetail } from '../../services'

import PageHeader from '../../components/PageHeader/PageHeader'

class Archieves extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      workInfo: null,
    }
  }

  componentDidMount() {
    const { match } = this.props
    console.log('进入了页面', this.props, match)

    if (!match.params.workId) {
      this.props.history.push('/')

      return
    }

    this.getDetial(match.params.workId)
  }

  /**
   * 跳转页面
   */
  goToArchieve(id) {
    if (!id) {
      return
    }

    this.props.history.push({
      pathname: `/archieves/${id}`
    })

    this.getDetial(id)
  }

  /**
   * 获取作品详情
   */
  getDetial = async (id) => {
    try {
      const { data } = await getArtDetail(id)

      console.log('查看一下详情', data)

      document.title = data.name + '- ZHU DESIGN'

      this.setState({
        workInfo: data
      })
    } catch (error) {
      console.error('获取详情出错:', error)
    }
  }

  /**
   * 前后操作
   */
  renderCooBar() {
    const { workInfo } = this.state

    return (
      <div className={styles.cooBar}>
        <span 
          className={`btn ${workInfo?.prevId ? '' : 'disabled'}`} 
          onClick={() => this.goToArchieve(workInfo?.prevId)}
        >
          PRE
        </span>
        
        <span 
          className={`btn ${workInfo?.nextId ? '' : 'disabled'}`} 
          onClick={() => this.goToArchieve(workInfo?.nextId)}
        >
          NEXT
        </span>
      </div>
    )
  }

  render() {
    const { workInfo } = this.state

    return (
      <div className={styles.archieves}>
        <PageHeader history={this.props.history}/>
        
        <div className="container">
          {this.renderCooBar()}

          <div className="text-info" dangerouslySetInnerHTML={{__html: workInfo?.description}}/>

          <div className="img-list">
            <Image.PreviewGroup>
              {workInfo?.items.map((item, idx) => (
                <Image 
                  src={item.image} 
                  className="img-item" 
                  alt="作品" 
                  key={item.id}
                  preview={{
                    maskClassName: 'zhu-mask'
                  }}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Archieves
