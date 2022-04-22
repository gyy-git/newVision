import common from "../../utils/common.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  getRequest(){
      //发送网络请求获取真实的行业动态列表
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      data:{
        num:5,
        page:3
      },
      success:res=>{ 
        res.data.forEach(item => {
           //
           var time = parseInt(item.posttime) * 1000;
           var d = new Date(time);
           var year = d.getFullYear();
           var month = d.getMonth()+1;
           month = month<10?"0"+month:month;
           var date = d.getDate();
           date = date<10?"0"+date:date;
          //  var h=d.getHours();
          //  var m = d.getMinutes();
          //  var s= d.getSeconds();
          // var finalTime = year+"-"+month+"-"+date +" "+h+":"+m+":"+s;
           var finalTime = year+"-"+month+"-"+date;
           item.posttime = finalTime;
          // item.posttime = common.getMyDate(item.posttime*1000,'Y-m-d');

        });

        res.data.forEach(item=>{
          var title = item.title;
          item.title =  common.getStrLen(title,25);
     
        })
        this.setData({
          dataList:res.data
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})