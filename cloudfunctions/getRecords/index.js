// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const collectionObj = db.collection('records')
// 云函数入口函数
exports.main = async (event, context) => {
    let { userInfo, data } = event
    let { openId, appId } = userInfo
    // 有传_id表示查询单个文档
    if (data && data._id) {
        return collectionObj
            .doc(data._id)
            .get()
            .then(res => {
                console.log('查询文档数据成功!')
                return res
            })
    }
    return collectionObj
        .where({
            openId,
            isUsed: 1,
        })
        .get()
        .then(res => {
            console.log('查询集合数据成功!')
            return res
        })
}
