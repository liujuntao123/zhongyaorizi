// pages/create/create.js
const { $Toast } = require('../../dist/base/index')
const { cloudFunction } = require('../../util/util')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        record: {
            name: '',
            date: '',
            remarks: '',
            topping: false,
        },
        confirmCreateVisible: false,
        confirmCreateActions: [
            {
                name: '取消',
            },
            {
                name: '确定',
                color: 'green',
                loading: false,
            },
        ],
        confirmDeleteVisible: false,
        confirmDeleteActions: [
            {
                name: '取消',
            },
            {
                name: '确定',
                color: 'green',
                loading: false,
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let myDate = new Date()
        this.setData({
            'record.date': myDate.Format('yyyy-MM-dd'),
        })
    },
    handleNameChange: function({ detail }) {
        this.setData({
            'record.name': detail.detail.value,
        })
    },
    handleRemarksChange: function({ detail }) {
        this.setData({
            'record.remarks': detail.detail.value,
        })
    },

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            'record.date': e.detail.value,
        })
    },

    checkInvalid: function() {
        if (!this.data.record.name) {
            $Toast({
                content: '请输入事件名称',
                type: 'error',
            })
            return true
        }
    },

    handleCreate: function() {
        if (this.checkInvalid()) {
            return
        }
        this.setData({
            confirmCreateVisible: true,
        })
    },
    handleConfirmCreate: function({ detail }) {
        if (detail.index === 0) {
            return this.setData({
                confirmCreateVisible: false,
            })
        }
        // 调用创建云函数
        // TODO: 根据是否有初始id判断是保存还是创建
        this.setData({
            'confirmCreateActions[1].loading': true,
        })
        cloudFunction('create', { data: this.data.record }).then(res => {
            this.setData({
                'confirmCreateActions[1].loading': false,
                confirmCreateVisible: false,
            })
            if (res) {
                $Toast({
                    content: '保存成功！',
                    type: 'success',
                })
                setTimeout(() => {
                    wx.navigateTo({
                        url: '/pages/index/index',
                    })
                }, 500)
            } else {
                $Toast({
                    content: '保存失败，请点击右上角三点反馈此问题',
                    type: 'error',
                })
            }
        })
    },
    handleDelete: function() {},
    handleConfirmDelete: function() {
        // 调用删除云函数
    },
    onToppingToggle: function() {
        this.setData({
            'record.topping': !this.data.record.topping,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
})
