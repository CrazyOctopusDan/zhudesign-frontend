import React from 'react'
import styles from './styles.module.less'

import { getIntro } from '../../services'

import PageHeader from '../../components/PageHeader/PageHeader'

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selfIntro: null,
      cnBrief: 'A Black Cover Design （简称：ABCD）2015 年成立于北京，是以品牌视觉设计为核心的国际设计机构。ABCD为客户和受众提供品牌设计、视觉识别、活动形象、产品包装、用户界面、印刷品，同时提供以设计为驱动力的策略服务。在以往的项目中，ABCD 一直强调设计在表现上的特殊性、系统性和针对性，这为他们赢得了客户的认可，以及众多国际国内奖项。2019年，ABCD 在旧金山设立办公室。',
      enBrief: 'A Black Cover Design (ABCD) is a global branding agency established in 2015 by Guang Yu and Nod Young, based in Beijing & San Francisco. ABCD developing branding, visual identity, product package, user interface, printed matter and design strategy service to clients and target audiences. The previous work which has shown our design concept is systematic and targeted, it also makes us won the client’s recognition and numerous international and domestic awards.',
      cnAward: '1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>',
      enAward: 'ni<br>hhh<br>sss<br>saer<br>kk',
      cnActivities: '2<br>2<br>2<br>2<br>2<br>2<br>1<br>1<br>1<br>1<br>1<br>1<br>',
      enActivities: 'nothing'
    }
  }

  componentDidMount() {
    this.getPersonalIntro()
  }

  /**
   * 获取个人信息
   */
  getPersonalIntro = async () => {
    try {
      const { data } = await getIntro()

      this.setState({
        selfIntro: data
      })
    } catch (error) {
      console.error('获取个人信息出错：', error)
    }
  }

  /**
   * 跳转页面
   */
  onLibrary(param) {
    this.props.history.push()
  }

  render() {
    const {
      selfIntro
    } = this.state

    return (
      <div className={styles.aboutMe}>
        <PageHeader history={this.props.history} needShortTips />
        
        <div className="container">
          <div className="section">
            <div className="cn-intro" dangerouslySetInnerHTML={{__html: selfIntro?.cnDescription }}/>
            
            <div className="en-intro" dangerouslySetInnerHTML={{__html: selfIntro?.enDescription }}/>
          </div>

          <div className="section">
            <div className="cn-intro cn-award title" dangerouslySetInnerHTML={{__html: selfIntro?.cnHonors }}/>
            
            <div className="en-intro en-award title" dangerouslySetInnerHTML={{__html: selfIntro?.enHonors }}/>
          </div>

          <div className="section">
            <div className="cn-intro cn-act title" dangerouslySetInnerHTML={{__html: selfIntro?.cnExperiences }}/>
            
            <div className="en-intro en-act title" dangerouslySetInnerHTML={{__html: selfIntro?.enExperiences }}/>
          </div>
          
        </div>
      </div>
    )
  }
}

export default AboutMe
