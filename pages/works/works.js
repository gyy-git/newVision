import common from "../../utils/common.js"
var navIdOut="";
var pageNum=0;
var navIdx=0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIdx:0,
    scrLeft:0,
    minHit:0,
    wkLists:[],
    onLoaded:false
  },

 

  //点击导航特效
  clickNav(res){
    
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })

    if(res.currentTarget){    
      var navIdx=res.currentTarget.dataset.idx
      var navId=res.currentTarget.dataset.id
    }else{
      var navIdx=res.navIdx
      var navId=res.navId
    }

    navIdOut=navId;    

    this.setData({
      navIdx,
      navId,
      wkLists:[]
    }) 
    
    this.getWkList(navId)
  
    

  },

  // 获取活动距离
  getScrLeft(navIdx){
    //获取手机使用宽度
    var itemWth=wx.getSystemInfoSync().windowWidth/5
    var scrLeft=(navIdx-2)*itemWth    
    if(scrLeft<0){
      scrLeft=0
    }
    this.setData({
      scrLeft
    })
  },

  //获取真实的导航列表内容
  getNavData(){
    wx.request({
      url: 'https://ku.qingnian8.com/school/infoclass.php',
      success:res=>{       
        this.setData({
          navLists:res.data
        })
        this.getScrLeft(navIdx) 
      }
    })

  },

  //获取真实的作品列表
  getWkList(classid=17,page=1,num=7){  
    pageNum=page; 
    this.setData({
      onLoaded:true
    })
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.request({
      url: 'https://ku.qingnian8.com/school/works.php',
      data:{
        cid:classid,
        num:num,
        page:page
      },
      success:res=>{   
        if(res.data.length==0 || res.data.length<5){
          this.setData({
            onLoaded:false
          })
        }
        res.data.forEach(item=>{
          item.title=common.getStrLen(item.title,25)
        })
        var oldList=this.data.wkLists;
        var newList=oldList.concat(res.data)

        this.setData({
          wkLists:newList          
        })
     

        wx.hideLoading()
        wx.stopPullDownRefresh()        
        
      
      }
    })
  },

  //获取最小高度
  getWinHit(){
    var winHit= wx.getSystemInfoSync().windowHeight-160
    this.setData({
      minHit:winHit
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   

    var id=options.id;
    var idx=options.idx

    navIdx=idx;
    navIdOut=id
    this.clickNav({navIdx,navIdOut});




    this.getNavData()    
    this.getWinHit()
    
    
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      wkLists:[]
    })
    this.getWkList(navIdOut);
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom: function () {
    pageNum++
        
    
    this.getWkList(navIdOut,pageNum)
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})