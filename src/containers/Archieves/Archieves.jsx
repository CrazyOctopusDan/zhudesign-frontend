import React from 'react'
import styles from './styles.module.less'
import { Image } from 'antd'

// import PageHeader from '@components/PageHeader/PageHeader'
import PageHeader from '../../components/PageHeader/PageHeader'

class Archieves extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      textInfo: 'abababab<br>bbbbbbabababab<br>bbbbbbabababab<br>bbbbbbabababab<br>bbbbbbabababab<br>bbbbbbabababab<br>bbbbbb',
      imgList: [{
        path: 'https://payload.cargocollective.com/1/19/639301/14198891/makeessense2_1_4500.jpg'
      }, {
        path: 'https://payload.cargocollective.com/1/19/639301/14198891/makeessense3_4500.jpg'
      }, {
        path: 'https://payload.cargocollective.com/1/19/639301/14198891/makeessense4_4500.jpg'
      },{
        path: 'https://payload.cargocollective.com/1/19/639301/14198891/makeessense5_4500.jpg'
      },{
        path: 'https://payload.cargocollective.com/1/19/639301/14198891/makeessense6_5_4500.jpg'
      }]
    }
  }

  componentDidMount() {
    const { match } = this.props
    console.log('进入了页面', this.props, match)

    if (!match.params.workId) {
      this.props.history.push('/')
    }
  }

  /**
   * 跳转页面
   */
  goToArchieve(param) {
    this.props.history.push()
  }

  /**
   * 前后操作
   */
  renderCooBar() {
    return (
      <div className={styles.cooBar}>
        <span className="btn" onClick={() => this.goToArchieve()}>PRE</span>
        <span className="btn" onClick={() => this.goToArchieve()}>NEXT</span>
      </div>
    )
  }

  render() {
    const { textInfo, imgList } = this.state


    return (
      <div className={styles.archieves}>
        <PageHeader history={this.props.history}/>
        
        <div className="container">
          {this.renderCooBar()}

          <div className="text-info" dangerouslySetInnerHTML={{__html: textInfo}}/>

          <div className="img-list">
            <Image.PreviewGroup>
              {imgList.map((item, idx) => (
                <Image src={item.path} className="img-item" alt="作品" key={idx} />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Archieves
