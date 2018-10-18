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
        loading: false,
    },
    ready: function() {
        this.setData({
            loading: true,
        })
        cloudFunction('getRecords').then(res => {
            console.log('拉取数据成功', res)
            this.setData({
                loading: false,
            })
            if (res) {
                let data = []
                if (res.result && res.result.data && Array.isArray(res.result.data)) {
                    data = res.result.data.map(item => ({ ...item, dateText: this.timeTextConv(item.date) }))
                }
                this.setData({
                    records: data,
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
        timeTextConv: function(date) {
            console.log(date)
            return 'date处理后的返回结果'
        },
    },
})
