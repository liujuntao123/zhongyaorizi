// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const collectionObj=db.collection('records')

const getRandom=function(min,max){
    return Math.floor(Math.random() * (max - min)) + min
}

// 云函数入口函数
exports.main = async (event, context) => {
    let {userInfo,data}=event
    let {openId,appId}=userInfo
    if(!data.name){
        return null
    }
    data.img_url=getRandom(0,32)+'.png'
    // 删除为假删除,isUsed=0为删除
    data.isUsed=1
    return collectionObj.add({
        data:{...data,openId,appId,createTime: db.serverDate(),updateTime:db.serverDate()}
    }).then(res=>{
        console.log('>>>>>>',res)
        return res
    }).catch(console.error)
}