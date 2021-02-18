import React from 'react'
import styles from './styles.module.less'

import PageHeader from '../../components/PageHeader/PageHeader'
import RichText from '../../components/RichText/RichText'
import Uploader from '../../components/Uploader/Uploader'

import { 
  getArtsList,
  createArt,
  updArt,
  delArt,
  getIntro,
  setIntro } from '../../services'

import { Button, Divider, List, Image, Modal, Input, Switch, message as Message } from 'antd'

const pageSize = 20

class BackStage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      totalCount: 30,
      selfIntro: {
        topTip: '',
        cnSelf: '',
        enSelf: '',
        cnAward: '',
        enAward: '',
        cnExp: '',
        enExp: ''
      },

      // 作品集相关
      workList: [],
      choosedWork: null,
      choosedCover: '',
      choosedImgList: [],
      modalVisible: false
    }
  }

  componentDidMount() {
    this.getArtList()
    this.getSelfIntro()
  }

  /**
   * 保存个人信息
   */
  saveSelfIntro = async () => {
    const {selfIntro} = this.state

    try {
      const { code, message } = await setIntro({
        summary: selfIntro.topTip,
        cnDescription: selfIntro.cnSelf,
        enDescription: selfIntro.enSelf,
        cnHonors: selfIntro.cnAward,
        enHonors: selfIntro.enAward,
        cnExperiences: selfIntro.cnExp,
        enExperiences: selfIntro.enExp,
      })

      if (code === 0) {
        Message.success('保存成功！')
      } else {
        Message.error('保存失败：', message)
      }
    } catch (error) {
      Message.error('保存个人信息发生了错误：', error)
    }
  }

  /**
   * 设置翻页
   */
  onPageChange = (page) => {
    this.setState({page}, () => this.getArtList())
  }

  /**
   * 查询个人简介信息
   */
  getSelfIntro = async () => {
    try {
      const { data } = await getIntro()
      console.log('看看个人介绍', data)
      this.setState({
        selfIntro: {
          topTip: data.summary || '-',
          cnSelf: data.cnDescription || '-',
          enSelf: data.enDescription || '-',
          cnAward: data.cnHonors || '-',
          enAward: data.enHonors || '-',
          cnExp: data.cnExperiences || '-',
          enExp: data.enExperiences || '-',
        }
      })
    } catch (error) {
      console.error('获取个人介绍出错:', error)
    }
  }

  /**
   * 查询列表信息
   */
  getArtList = async () => {
    const { page } = this.state

    try {
      const { totalCount, data } = await getArtsList({full: 1, page, pageSize})
      console.log('获取了列表数据', data, totalCount)

      this.setState({
        totalCount,
        workList: data
      })
    } catch (error) {
      Message.error('获取列表发生了错误：', error)
    }
  }

  /**
   * 富文本输入监听
   */
  onChange = (type, val) => {
    console.log('富文本输入', val)
    const { selfIntro } = this.state
    switch (type) {
      case 'topTip':
        this.setState({
          selfIntro: {
            ...selfIntro,
            topTip: val
          }
        })
        break;
      case 'cnSelf':
        this.setState({
          selfIntro: {
            ...selfIntro,
            cnSelf: val
          }
        })
        break;
      case 'enSelf':
        this.setState({
          selfIntro: {
            ...selfIntro,
            enSelf: val
          }
        })
        break;
      case 'cnAward':
        this.setState({
          selfIntro: {
            ...selfIntro,
            cnAward: val
          }
        })
        break;
      case 'enAward':
        this.setState({
          selfIntro: {
            ...selfIntro,
            enAward: val
          }
        })
        break;
      case 'cnExp':
        this.setState({
          selfIntro: {
            ...selfIntro,
            cnExp: val
          }
        })
        break;
      case 'enExp':
        this.setState({
          selfIntro: {
            ...selfIntro,
            enExp: val
          }
        })
        break;
    
      default:
        break;
    }
  }

  /**
   * 选中某项 准备编辑
   */
  onEdit = async (item, isDelete = false) => {
    if (isDelete) {
      // TODO 删除
      try {
        const { code } = await delArt(item.id)

        if (code === 0) {
          Message.success('删除成功！')
          const { page, totalCount } = this.state

          let _page = page

          if (_page > 1) {
            _page = totalCount - 1 > (_page - 1) * pageSize ? _page : _page - 1
          }

          this.setState({
            page: _page
          }, () => this.getArtList())
        }

        // this.getArtList()
      } catch (error) {
        Message.error('删除失败:', error)
      }
      return
    }

    console.log('这里也在设置吗', item)

    this.setState({
      choosedWork: item,
      choosedCover: item.coverImage.relatedUrl,
      choosedImgList: item.items.map(i => i.id)
    }, () => this.toggleModal(true))
  }

  /**
   * 浮层内的表单编辑
   */
  onFDEdit = (kind, val) => {
    const { choosedWork } = this.state
    
    const _cw = JSON.parse(JSON.stringify(choosedWork))

    switch (kind) {
      case 'onTop':
        _cw.onTop = val
        break;

      case 'completionTime':
        _cw.completionTime = val
        break;

      case 'name':
        _cw.name = val
        break;

      case 'description':
        _cw.description = val
        break;
    
      default:
        break;
    }

    this.setState({
      choosedWork: _cw
    })
  }

  /**
   * 作品封面上传监控
   * @param {*} visible 
   */
  onCoverChange = (imgList) => {
    console.log('coverChange', imgList)
    const _d = imgList.length ? imgList[0].relatedUrl : ''

    this.setState({
      choosedCover: _d
    })
  }

  /**
   * 作品集合上传监控
   */
  onWorkImgChange = (imgList) => {
    console.log('imgListChange', imgList)
    const _d = imgList.map(item => item.id || item.uid).filter(i => !!i)
    console.log('imgListChange', imgList, _d)
    this.setState({
      choosedImgList: _d
    })
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
   * 处理浮层 关闭 行为
   * @param {Boolean} isSave 
   */
  handleModal = async (isSave) => {
    const { choosedWork, choosedImgList, choosedCover } = this.state
    if (isSave) {
      // 保存 处理 并且重新获取一次列表数据
      const param = {
        ...choosedWork,
          onTop: choosedWork.onTop ? 1 : 0,
          coverImage: choosedCover,
          itemIds: choosedImgList
      }

      delete param.items

      try {
        const res = param.id ? await updArt(param) : await createArt(param)

        if (res.code === 0) {
          Message.success(param.id ? '修改成功' : '新建成功')
          this.getArtList()
        } else {
          Message.error('操作失败！')
        }

        console.log('修改完', res)
      } catch (error) {
        Message.error('保存错误：', error)
      }

    }

    // 重置并且关闭
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

        <div className="title">顶部简介：</div>
        <RichText value={selfIntro.topTip} onChange={this.onChange} kind="topTip" />

        <div className="title">中文个人简介：</div>
        <RichText value={selfIntro.cnSelf} onChange={this.onChange} kind="cnSelf" />

        <div className="title">英文个人简介：</div>
        <RichText value={selfIntro.enSelf} onChange={this.onChange} kind="enSelf" />

        <div className="title">中文工作经历：</div>
        <RichText value={selfIntro.cnAward} onChange={this.onChange} kind="cnAward" />

        <div className="title">英文工作经历：</div>
        <RichText value={selfIntro.enAward} onChange={this.onChange} kind="enAward" />

        <div className="title">中文工作荣誉：</div>
        <RichText value={selfIntro.cnExp} onChange={this.onChange} kind="cnExp" />

        <div className="title">英文工作荣誉：</div>
        <RichText value={selfIntro.enExp} onChange={this.onChange} kind="enExp" />

        <Button type="primary" onClick={this.saveSelfIntro} size="large" >保存</Button>
      </div>
    )
  }

  /**
   * 编辑作品的列表
   */
  renderArchList() {
    const { workList, page, totalCount } = this.state

    const pagination = {
      total: totalCount,
      current: page,
      pageSize,
      onChange: this.onPageChange
    }

    return (
      <div className={`${styles.archList} section`}>
        <Divider>作品集</Divider>

        <Button 
          className="add-btn"
          type="primary" 
          size="large"
          onClick={() => {
            this.setState({
              choosedCover: '',
              choosedImgList: [],
              choosedWork: {}
            })
            this.toggleModal(true)
          }}
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
              <List.Item 
                className="work-item" 
                actions={
                  [<a onClick={() => this.onEdit(item)}>编辑作品</a>, // eslint-disable-line jsx-a11y/anchor-is-valid
                  <a className="del-btn" onClick={() => this.onEdit(item, true)}>删除</a>] // eslint-disable-line jsx-a11y/anchor-is-valid
                }
              >
                <List.Item.Meta
                  avatar={<Image className="work-img" src={item.coverImage?.url} />}
                  title={item.name}
                  description={item.completionTime + '|' + item.description}
                />
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

    const _title = choosedWork?.id ? '编辑作品' : '新增作品'

    const coverImg = choosedWork?.id ? [{
      ...choosedWork.coverImage,
      name: '封面图'
    }] : []

    const imgList = choosedWork.items

    const renderSW = (
      <Switch 
        checkedChildren="置顶" 
        unCheckedChildren="取消" 
        checked={choosedWork.onTop} 
        onChange={(e) => this.onFDEdit('onTop', e)}
      />
    )

    return (
      <Modal
        className={styles.editModal}
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
            {renderSW}
          </div>
        </div>

        <div className="sec">
          <div className="title">
            作品时间「yyyy-mm-dd」：
          </div>

          <Input 
            value={choosedWork.completionTime} 
            onChange={(e) => this.onFDEdit('completionTime', e.target.value)}
          />
        </div>

        

        <div className="sec">
          <div className="title">
            作品名称：
          </div>

          <Input
            value={choosedWork.name}
            onChange={(e) => this.onFDEdit('name', e.target.value)}
          ></Input>
        </div>

        <div className="sec">
          <div className="title">
            作品简介：
          </div>
          
          <Input.TextArea
            value={choosedWork.description}
            onChange={(e) => this.onFDEdit('description', e.target.value)}
          />
        </div>

        <div className="sec">
          <div className="title">
            封面图：
          </div>

          <Uploader 
            limit={1} 
            initFileList={coverImg}
            onFileChange={this.onCoverChange}
          />
        </div>

        <div className="sec">
          <div className="title">
            作品图集：
          </div>

          <Uploader 
            initFileList={imgList}
            onFileChange={this.onWorkImgChange}
          />
        </div>
      </Modal>
    )
  }

  render() {
    const { choosedWork } = this.state
    return (
      <div className={styles.backstage}>
        <PageHeader history={this.props.history}/>
        
        <div className="container">
          {this.renderSelfIntro()}

          {this.renderArchList()}

          {choosedWork && this.renderModal()}
        </div>
      </div>
    )
  }
}

export default BackStage
