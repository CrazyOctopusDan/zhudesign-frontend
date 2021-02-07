import React from 'react'
import styles from './styles.module.less'

import PageHeader from '../../components/PageHeader/PageHeader'
import RichText from '../../components/RichText/RichText'
import Uploader from '../../components/Uploader/Uploader'

import { Button, Divider, List, Image, Modal, Input, Upload } from 'antd'

const pageSize = 20

class BackStage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      dataCount: 30,
      selfIntro: {
        cnSelf: '',
        enSelf: '',
        cnAward: '',
        enAward: '',
        cnAct: '',
        enAct: ''
      },

      // 作品集相关
      workList: [
        {
          name: '这是第一幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
        }, {
          name: '这是第一幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
        }, {
          name: '这是第二幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
        }, {
          name: '这是第三幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
        }, {
          name: '这是第四幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
        }, {
          name: '这是第177171717171幅作品',
          brief: '这个作品牛逼啊啊！！！This is tree new bee s work',
          cover: 'https://payload.cargocollective.com/1/19/639301/14199919/prt_320x320_1608519762_2x.jpg',
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
      ],
      workIntro: '',
      choosedWork: null,
      modalVisible: false
    }
  }

  /**
   * 跳转页面
   */
  onLibrary(param) {
    this.props.history.push()
  }

  /**
   * 保存个人信息
   */
  saveSelfIntro = () => {

  }

  /**
   * 设置翻页
   */
  setListData = (page) => {
    this.setState({page}, () => this.getDetail())
  }

  /**
   * 查询列表信息
   */
  getDetail = async () => {
    const { page } = this.state

    try {
      
    } catch (error) {
      
    }
  }

  /**
   * 富文本输入监听
   */
  onChange = (type, val) => {
    switch (type) {
      case 'cnSelf':
        this.setState({
          selfIntro: {
            cnSelf: val
          }
        })
        break;
      case 'enSelf':
        this.setState({
          selfIntro: {
            enSelf: val
          }
        })
        break;
      case 'cnAward':
        this.setState({
          selfIntro: {
            cnAward: val
          }
        })
        break;
      case 'enAward':
        this.setState({
          selfIntro: {
            enAward: val
          }
        })
        break;
      case 'cnAct':
        this.setState({
          selfIntro: {
            cnAct: val
          }
        })
        break;
      case 'enAct':
        this.setState({
          selfIntro: {
            enAct: val
          }
        })
        break;
    
      case 'work':
        this.setState({
          workIntro: val
        })

        break;
      default:
        break;
    }
  }

  /**
   * 选中某项 准备编辑
   */
  onEdit = (item) => {
    this.setState({
      choosedWork: item
    }, () => this.toggleModal(true))
  }

  

  /**
   * 打开新建、编辑浮层
   */
  toggleModal = (visible) => {
    this.setState({
      modalVisible: visible
    })
  }

  /**
   * 处理浮层
   * @param {Boolean} isSave 
   */
  handleModal = (isSave) => {
    if (isSave) {
      // 保存关闭
      

      


    }

    this.setState({
      choosedWork: null
    }, () => this.toggleModal(false))
  }

  /**
   * 渲染-编辑个人简介区域
   */
  renderSelfIntro() {
    const { selfIntro } = this.state

    return (
      <div className={`${styles.selfIntro} section`}>
        <Divider>ABOUT ME</Divider>

        <div className="title">中文个人简介：</div>
        <RichText value={selfIntro.cnSelf} onChange={this.onChange} kind="cnSelf" />

        <div className="title">英文个人简介：</div>
        <RichText value={selfIntro.enSelf} onChange={this.onChange} kind="enSelf" />

        <div className="title">中文工作荣誉：</div>
        <RichText value={selfIntro.cnAward} onChange={this.onChange} kind="cnAward" />

        <div className="title">英文工作荣誉：</div>
        <RichText value={selfIntro.enAward} onChange={this.onChange} kind="enAward" />

        <div className="title">中文活动&展览：</div>
        <RichText value={selfIntro.cnAct} onChange={this.onChange} kind="cnAct" />

        <div className="title">英文活动&展览：</div>
        <RichText value={selfIntro.enAct} onChange={this.onChange} kind="enAct" />

        <Button type="primary" onClick={this.saveSelfIntro} size="large" >保存</Button>
      </div>
    )
  }

  /**
   * 编辑作品的列表
   */
  renderArchList() {
    const { workList, page, dataCount } = this.state

    const pagination = {
      total: dataCount,
      current: page,
      pageSize,
      onChange: this.setListData
    }

    return (
      <div className={`${styles.archList} section`}>
        <Divider>作品集</Divider>

        <Button 
          className="add-btn"
          type="primary" 
          size="large"
          onClick={() => this.toggleModal(true)}
        >
          新增作品
        </Button>

        <List
          dataSource={workList}
          bordered
          pagination={
            pagination
          }
          renderItem={
            item => (
              <List.Item className="work-item" actions={[<a onClick={() => this.onEdit(item)}>编辑作品</a>]}>
                <List.Item.Meta
                  avatar={<Image className="work-img" src={item.cover} />}
                  title={item.name}
                  description={item.brief}
                >

                </List.Item.Meta>
              </List.Item>
            )
          }
        />
      </div>
    )
  }

  /**
   * 渲染 新增 修改 模板
   */
  renderModal() {
    const { modalVisible, choosedWork } = this.state

    const _title = choosedWork == null ? '新增作品' : '编辑作品'

    return (
      <Modal
        title={_title}
        visible={modalVisible}
        destroyOnClose
        maskClosable={false}
        okText="保存"
        onCancel={() => this.handleModal(false)}
        onOk={() => this.handleModal(true)}
      >
        <div className="sec">
          <div className="title">
            作品名称：
          </div>

          <Input ></Input>
        </div>

        <div className="sec">
          <div className="title">
            作品简介：
          </div>

          <Input.TextArea ></Input.TextArea>
        </div>

        <div className="sec">
          <div className="title">
            作品图集：
          </div>

          <Uploader />
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <div className={styles.backstage}>
        <PageHeader history={this.props.history}/>
        
        <div className="container">
          {this.renderSelfIntro()}

          {this.renderArchList()}

          {this.renderModal()}
        </div>
      </div>
    )
  }
}

export default BackStage
