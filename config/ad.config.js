/**
 * 广告配置
 */
export default {
	adpid: '', // uni-AD App广告位id，在uni-AD官网申请广告位
	unitId: '', // 广告单元id，可在小程序管理后台的流量主模块新建 (非个人资质，小程序后台广告主开通申请)
	frequency: 8, // 列表中，广告出现的频率（8=每8条数据出现一次广告）
	// 首页广告
	home: {
		use: false,
	},
	// 文章列表广告
	articles: {
		use: false,
	},
	// 文章详情广告
	articleDetail: {
		// 微信广告/dclound申请的广告
		use: true,

		// 自定义广告
		custom: {
			use: true,
			cover: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZMnr.jpg',
			title: '欢迎来到我的blog！',
			content: '来我的blog转一转吧～',
			url: 'https://www.suiu.cc'
		}
	}
}
