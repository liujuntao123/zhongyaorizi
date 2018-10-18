// pages/index/home/home.js
const { cloudFunction } = require('../../../util/util')

Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        records: [],
    },
    ready: function() {
        cloudFunction('getRecords').then(res => {
          console.log(res)
            if (res && Array.isArray(res)) {
                this.setData({
                    records: res,
                })
            }
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleCreateRecord: function() {
            wx.navigateTo({
                url: '/pages/create/create',
            })
        },
        timeTextConv:function(date){
          console.log(date)
          return 'date处理后的返回结果'
        }
    },
})
