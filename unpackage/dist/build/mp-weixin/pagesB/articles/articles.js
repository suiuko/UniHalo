(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/articles/articles"],{2081:function(t,e,n){"use strict";n.r(e);var a=n("4881"),o=n("5fdd");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("3781");var s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"eb3d5c76",null,!1,a["a"],void 0);e["default"]=c.exports},2342:function(t,e,n){},3781:function(t,e,n){"use strict";var a=n("2342"),o=n.n(a);o.a},4881:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,"success"==t.loading?t.dataList.length:null),a="success"==t.loading&&0!=n?t.__map(t.dataList,(function(e,n){var a=t.__get_orig(e),o=e.categories.length,i=e.tags.length,s=e.tags.length,c=e.tags.length,r=t.$tm.dayjs(e.createTime).format("YYYY年MM月DD日 HH点mm分ss秒");return{$orig:a,g1:o,g2:i,g3:s,g4:c,g5:r}})):null;t.$mp.data=Object.assign({},{$root:{g0:n,l0:a}})},o=[]},"5fdd":function(t,e,n){"use strict";n.r(e);var a=n("d548"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},ca1a:function(t,e,n){"use strict";(function(t,e){var a=n("4ea4");n("1ea4");a(n("66fd"));var o=a(n("2081"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},d548:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{tmSkeleton:function(){n.e("tm-vuetify/components/tm-skeleton/tm-skeleton").then(function(){return resolve(n("3f1b"))}.bind(null,n)).catch(n.oe)},tmSearch:function(){n.e("tm-vuetify/components/tm-search/tm-search").then(function(){return resolve(n("af77"))}.bind(null,n)).catch(n.oe)},tmTranslate:function(){n.e("tm-vuetify/components/tm-translate/tm-translate").then(function(){return resolve(n("c684"))}.bind(null,n)).catch(n.oe)},tmTabs:function(){Promise.all([n.e("common/vendor"),n.e("tm-vuetify/components/tm-tabs/tm-tabs")]).then(function(){return resolve(n("61fe"))}.bind(null,n)).catch(n.oe)},tmFlotbutton:function(){Promise.all([n.e("common/vendor"),n.e("tm-vuetify/components/tm-flotbutton/tm-flotbutton")]).then(function(){return resolve(n("1902"))}.bind(null,n)).catch(n.oe)},tmEmpty:function(){n.e("tm-vuetify/components/tm-empty/tm-empty").then(function(){return resolve(n("947c"))}.bind(null,n)).catch(n.oe)},tmTags:function(){n.e("tm-vuetify/components/tm-tags/tm-tags").then(function(){return resolve(n("0783"))}.bind(null,n)).catch(n.oe)},tmButton:function(){n.e("tm-vuetify/components/tm-button/tm-button").then(function(){return resolve(n("9bbf"))}.bind(null,n)).catch(n.oe)},tmPickers:function(){n.e("tm-vuetify/components/tm-pickers/tm-pickers").then(function(){return resolve(n("c426"))}.bind(null,n)).catch(n.oe)}},data:function(){return{isBlackTheme:!1,loading:"loading",tab:{activeIndex:0,list:["全部","已发布","私密","草稿","回收站"]},queryParams:{size:10,page:0,status:"",keyword:"",categoryId:void 0},cache:{dataList:[],total:0},isLoadMore:!1,loadMoreText:"加载中...",result:{},dataList:[],category:{loading:"loading",show:!1,list:[],selected:[0]}}},onLoad:function(){this.fnSetPageTitle("文章管理"),this.fnGetCategoryList()},created:function(){var e=this;this.fnGetData(),t.$on("refresh-article-list",(function(){e.isLoadMore=!1,e.queryParams.page=0,e.fnGetData()}))},onPullDownRefresh:function(){this.isLoadMore=!1,this.queryParams.page=0,this.fnGetData()},onReachBottom:function(e){this.result.hasNext?(this.queryParams.page+=1,this.isLoadMore=!0,this.fnGetData()):t.showToast({icon:"none",title:"没有更多数据了"})},methods:{fnOnTabChange:function(t){this.dataList=[];this.queryParams.status={0:"",1:"PUBLISHED",2:"INTIMATE",3:"DRAFT",4:"RECYCLE"}[t],this.queryParams.page=0,this.fnToTopPage(),this.fnGetData()},fnGetCategoryList:function(){var t=this;this.category.loading="loading",this.$httpApi.admin.getCategoryList().then((function(e){if(200==e.status){var n=e.data;n.unshift({id:void 0,name:"全部"}),t.category.list=n,t.category.loading="success"}else t.category.loading="error"})).catch((function(e){t.category.loading="error"}))},fnOnCategoryConfirm:function(t){this.category.selected=[t[0].index],this.queryParams.categoryId=t[0].data.id},fnOnSearch:function(){this.queryParams.page=0,this.isLoadMore=!1,this.fnToTopPage(),this.fnGetData()},fnGetData:function(){var e=this;t.showLoading({mask:!0,title:"加载中..."}),this.isLoadMore||(this.loading="loading"),this.loadMoreText="加载中...",this.$httpApi.admin.getPostsByPage(this.queryParams).then((function(t){if(console.log("请求结果："),console.log(t),200==t.status){e.result=t.data;var n=t.data.content.map((function(t){return t.hasThumbnail=""!=t.thumbnail,t.thumbnail&&(t.thumbnail=e.$utils.checkThumbnailUrl(t.thumbnail)),t}));e.isLoadMore?e.dataList=e.dataList.concat(n):e.dataList=n,e.loading="success",e.loadMoreText=t.data.hasNext?"上拉加载更多":"呜呜，没有更多数据啦~"}else e.loading="error",e.loadMoreText="呜呜，加载失败了~"})).catch((function(t){console.error(t),e.loading="error",e.loadMoreText="加载失败，请下拉刷新！"})).finally((function(){setTimeout((function(){t.hideLoading(),t.stopPullDownRefresh()}),800)}))},fnToArticleDetail:function(e){t.navigateTo({url:"/pagesA/article-detail/article-detail?articleId="+e.id,animationType:"slide-in-right"})},fnOnAddArticle:function(){this.$Router.push({path:"/pagesB/articles/article-edit",query:{}})},fnOnEditArticle:function(t){this.$Router.push({path:"/pagesB/articles/article-edit",query:{postsId:t.id}})},fnOnSetArticle:function(t,e){this.$Router.push({path:"/pagesB/articles/article-setting",query:{postsId:t.id,postTitle:t.title,isEdit:1,from:"list"}})},fnOnDelArticle:function(e,n){var a=this;t.$eShowModal({title:"提示",content:"是否确定要删除该文章？",showCancel:!0,cancelText:"否",cancelColor:"#999999",confirmText:"是",confirmColor:"#03a9f4"}).then((function(o){t.showLoading({mask:!0,title:"删除中..."}),a.$httpApi.admin.deletePostsByIds([e.id]).then((function(e){200==e.status?(t.$tm.toast("文章已删除成功！"),a.dataList.splice(n,1)):t.$tm.toast("操作失败，请重试！")})).catch((function(e){t.$tm.toast("操作失败，请重试！")}))})).catch((function(t){}))}}};e.default=a}).call(this,n("543d")["default"])}},[["ca1a","common/runtime","common/vendor"]]]);