(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/comments/comments"],{"1dcf":function(t,n,e){"use strict";(function(t,n){var o=e("4ea4");e("1ea4");o(e("66fd"));var a=o(e("3ef3"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(a.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"3ef3":function(t,n,e){"use strict";e.r(n);var o=e("a240"),a=e("a1aa");for(var i in a)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("a84b");var c=e("f0c5"),s=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"5f7d7d60",null,!1,o["a"],void 0);n["default"]=s.exports},"961f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={components:{tmSkeleton:function(){e.e("tm-vuetify/components/tm-skeleton/tm-skeleton").then(function(){return resolve(e("3f1b"))}.bind(null,e)).catch(e.oe)},tmButton:function(){e.e("tm-vuetify/components/tm-button/tm-button").then(function(){return resolve(e("9bbf"))}.bind(null,e)).catch(e.oe)},tmEmpty:function(){e.e("tm-vuetify/components/tm-empty/tm-empty").then(function(){return resolve(e("947c"))}.bind(null,e)).catch(e.oe)},tmTabs:function(){Promise.all([e.e("common/vendor"),e.e("tm-vuetify/components/tm-tabs/tm-tabs")]).then(function(){return resolve(e("61fe"))}.bind(null,e)).catch(e.oe)},tmTranslate:function(){e.e("tm-vuetify/components/tm-translate/tm-translate").then(function(){return resolve(e("c684"))}.bind(null,e)).catch(e.oe)},tmFlotbutton:function(){Promise.all([e.e("common/vendor"),e.e("tm-vuetify/components/tm-flotbutton/tm-flotbutton")]).then(function(){return resolve(e("1902"))}.bind(null,e)).catch(e.oe)},tmTags:function(){e.e("tm-vuetify/components/tm-tags/tm-tags").then(function(){return resolve(e("0783"))}.bind(null,e)).catch(e.oe)},tmPoup:function(){e.e("tm-vuetify/components/tm-poup/tm-poup").then(function(){return resolve(e("2b9f"))}.bind(null,e)).catch(e.oe)},tmInput:function(){e.e("tm-vuetify/components/tm-input/tm-input").then(function(){return resolve(e("7908"))}.bind(null,e)).catch(e.oe)}},data:function(){return{loading:"loading",tab:{adtiveIndex:0,list:["文章评论","页面评论","日记评论"]},queryParams:{size:10,page:0},result:{},dataList:[],queryType:"Posts",isLoadMore:!1,loadMoreText:"加载中...",reply:{show:!1,data:{},form:{allowNotification:!0,author:"",authorUrl:"",content:"",email:"",parentId:0,postId:0}}}},computed:{bloggerInfo:function(){return this.$tm.vx.getters().getBlogger}},onLoad:function(){this.fnSetPageTitle("评论管理")},created:function(){this.fnGetData()},onPullDownRefresh:function(){this.isLoadMore=!1,this.queryParams.page=0,this.fnGetData()},onReachBottom:function(n){this.result.hasNext?(this.queryParams.page+=1,this.isLoadMore=!0,this.fnGetData()):t.showToast({icon:"none",title:"没有更多数据了"})},methods:{fnOnTabChange:function(t){this.fnResetReply(),this.dataList=[],this.queryType=["Posts","Sheets","Journals"][t],this.fnToTopPage(),this.fnGetData()},fnGetData:function(){var n=this;t.showLoading({mask:!0,title:"加载中..."}),this.isLoadMore||(this.loading="loading"),this.loadMoreText="加载中...",this.$httpApi.admin["get".concat(this.queryType,"Comments")](this.queryParams).then((function(t){console.log("请求结果："),console.log(t),n.loading="success",n.loadMoreText=t.data.hasNext?"上拉加载更多":"呜呜，没有更多数据啦~";var e=t.data.content.map((function(t){return t.avatar=n.$utils.checkAvatarUrl(t.avatar,t.isAdmin),t}));n.result=t.data,n.isLoadMore?n.dataList=n.dataList.concat(e):n.dataList=e})).catch((function(t){console.error(t),n.loading="error",n.loadMoreText="加载失败，请下拉刷新！"})).finally((function(){setTimeout((function(){t.hideLoading(),t.stopPullDownRefresh()}),800)}))},fnShowReplyModal:function(t){switch(this.reply.data=t,this.reply.form.parentId=t.id,this.queryType){case"Posts":this.reply.form.postId=t.post.id;break;case"Sheets":this.reply.form.postId=t.sheet.id;break;case"Journals":this.reply.form.postId=t.journal.id;break}this.reply.show=!0},fnResetReply:function(){this.reply={show:!1,data:{},form:{allowNotification:!0,author:"",authorUrl:"",content:"",email:"",parentId:0,postId:0}}},fnReplyPass:function(n){var e=this;t.$eShowModal({title:"提示",content:"您是否要通过 ".concat(n.author," 的评论？"),showCancel:!0,cancelText:"否",cancelColor:"#999999",confirmText:"是",confirmColor:"#03a9f4"}).then((function(o){e.$httpApi.admin["update".concat(e.queryType,"CommentsStatus")](n.id,"PUBLISHED").then((function(e){200==e.status?(t.$tm.toast("操作成功！"),n.status="PUBLISHED"):t.$tm.toast("操作失败，请重试！")})).catch((function(n){t.$tm.toast("操作失败，请重试！")}))})).catch((function(t){}))},fnReplySubmit:function(){var n=this;this.reply.form.author=this.bloggerInfo.nickname,this.reply.form.authorUrl=this.$haloConfig.social.blog||this.$haloConfig.apiUrl,this.reply.form.email=this.bloggerInfo.email,t.showLoading({title:"正在回复中..."}),this.$httpApi.admin["post".concat(this.queryType,"Comments")](this.reply.form).then((function(e){200==e.status?(t.$tm.toast("回复成功"),n.fnResetReply(),n.fnToTopPage(),t.startPullDownRefresh()):t.$tm.toast("回复失败，请重试！")})).catch((function(n){t.$tm.toast("回复失败，请重试！")}))},fnRestore:function(n){var e=this;t.$eShowModal({title:"提示",content:"您是否要将 ".concat(n.author," 的评论还原？"),showCancel:!0,cancelText:"否",cancelColor:"#999999",confirmText:"是",confirmColor:"#03a9f4"}).then((function(o){e.$httpApi.admin["update".concat(e.queryType,"CommentsStatus")](n.id,"PUBLISHED").then((function(e){200==e.status?(t.$tm.toast("已将 ".concat(n.author," 的评论还原！")),n.status="PUBLISHED"):t.$tm.toast("操作失败，请重试！")})).catch((function(n){t.$tm.toast("操作失败，请重试！")}))})).catch((function(t){}))},fnRecycle:function(n){var e=this;t.$eShowModal({title:"提示",content:"您是否要将 ".concat(n.author," 的评论移到回收站？"),showCancel:!0,cancelText:"否",cancelColor:"#999999",confirmText:"是",confirmColor:"#03a9f4"}).then((function(o){e.$httpApi.admin["update".concat(e.queryType,"CommentsStatus")](n.id,"RECYCLE").then((function(e){200==e.status?(t.$tm.toast("已将 ".concat(n.author," 的评论移到回收站！")),n.status="RECYCLE"):t.$tm.toast("操作失败，请重试！")})).catch((function(n){t.$tm.toast("操作失败，请重试！")}))})).catch((function(t){}))},fnDelete:function(n){var e=this;t.$eShowModal({title:"提示",content:"您是否要将 ".concat(n.author," 的评论删除？"),showCancel:!0,cancelText:"否",cancelColor:"#999999",confirmText:"是",confirmColor:"#03a9f4"}).then((function(o){e.$httpApi.admin["delete".concat(e.queryType,"CommentsById")](n.id).then((function(o){if(200==o.status){t.$tm.toast("".concat(n.author," 的评论已删除！"));var a=e.dataList.findIndex((function(t){return t.id==n.id}));e.dataList.splice(a,1)}else t.$tm.toast("操作失败，请重试！")})).catch((function(n){t.$tm.toast("操作失败，请重试！")}))})).catch((function(t){}))}}};n.default=o}).call(this,e("543d")["default"])},a1aa:function(t,n,e){"use strict";e.r(n);var o=e("961f"),a=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},a240:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var o=function(){var t=this,n=t.$createElement,e=(t._self._c,"success"==t.loading?t.dataList.length:null),o="success"==t.loading&&0!=e?t.__map(t.dataList,(function(n,e){var o=t.__get_orig(n),a=t.$tm.dayjs(n.createTime).format("YYYY年MM月DD日 HH点mm分");return{$orig:o,g1:a}})):null;t._isMounted||(t.e0=function(n){return t.$utils.copyText(t.reply.data.email,"邮箱地址复制成功！")},t.e1=function(n){return t.$utils.copyText(t.reply.data.authorUrl,"网站地址复制成功！")},t.e2=function(n){t.reply.show=!1}),t.$mp.data=Object.assign({},{$root:{g0:e,l0:o}})},a=[]},a84b:function(t,n,e){"use strict";var o=e("b0dd"),a=e.n(o);a.a},b0dd:function(t,n,e){}},[["1dcf","common/runtime","common/vendor"]]]);