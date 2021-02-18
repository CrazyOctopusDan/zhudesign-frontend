import * as FetchRequest from '../utils/request'

// ---------- art works --------------
/**
 * 获取作品列表
 * @param {*} params page pageSize
 */
const getArtsList = (params) => FetchRequest.get('/api/artworks', params)

/**
 * 获取作品详情
 * @param id 
 */
const getArtDetail = (id) => FetchRequest.get(`/api/artworks/${id}`)

/**
 * 新增作品
 * @param {*} params 
 */
const createArt = (params) => FetchRequest.post('/api/artworks/create', params)

/**
 * 更新作品
 * @param {*} params 
 */
const updArt = (params) => FetchRequest.post('/api/artworks/modify', params)

/**
 * 删除作品
 * @param {*} params 
 */
const delArt = (id) => FetchRequest.post(`/api/artworks/remove/${id}`)

// ----------- personal intros -------------
/**
 * 获取个人简介
 */
const getIntro = () => FetchRequest.get('/api/intro')

/**
 * 编辑个人简介
 * @param {*} params 
 */
const setIntro = (params) => FetchRequest.post('/api/intro', params)

export {
  getArtsList,
  getArtDetail,
  createArt,
  updArt,
  delArt,
  getIntro,
  setIntro
}
