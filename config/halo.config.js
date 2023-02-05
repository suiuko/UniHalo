
export default {
	showCopyright: true, // 显示开源版权信息
	showAbout: true, // 显示关于项目入口
	uni_halo_logo: 'https://tu.zgjnas.top:3443/images/2023/01/23/Zxix.jpg', // uni-halo的logo

	apiUrl: 'https://www.suiu.cc', // Api基础域名 [必填] ：你的Halo博客基础域名
	apiAuthorization: 'zgj', // Api认证key [必填]： Halo中-系统-博客设置-切换到高级选项-API设置-Access key

	title: 'Suiu blog', // 博客标题 [建议必填]：在某些页面没有设置具体的页面名称时候，使用该值显示
	miniCodeImageUrl: 'https://tu.zgjnas.top:3443/images/2023/02/03/cGyC.jpg', // 小程序的太阳码/二维码的图片地址 [建议必填]：主要用于文章详情页面的生成海报的功能
	aboutProfileImageUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 关于页面中的资料卡背景图 [建议必填]

	//启动页面的配置（页面地址`/pagesA/start/start`）
	start: {
		use: true, // 是否使用首次启动页：用户第一次使用你的应用会显示否则不显示
		title: 'Suiu blog', // 启动页面中的文字标题
		bg: '', // 留空则使用默认 开屏首页背景，可以是颜色值或者图片图片地址
		logo: 'https://tu.zgjnas.top:3443/images/2023/01/23/Zxix.jpg', // logo
		desc1: 'Suiu Blog', // 描述信息1
		desc2: 'welcome', // 描述信息2
		btnText: 'love you' // 按钮文字
	},

	// 博主信息 
	author: {
		use: true, // 是否启用这里配置的信息，不启用则获取PC端博客设置的信息
		nickname: 'Suiu', // 昵称
		avatar: 'https://tu.zgjnas.top:3443/images/2023/01/23/Z8su.jpg', // 头像
		email: 'https://suiukoer@gmail.com', // 邮箱
		description: 'slass love is colorful', // 介绍
	},

	// 版权信息（用于文章详情）
	copyright: {
		use: true, // 是否使用版权描述
		author: '', // 版权归属说明
		description: '', // 版权描述
		violation: '', // 侵权处理说明
	},

	// 社交信息(将会在`/pagesA/contact/contact`页面中展示)
	// 具体的某个参数值留空则不展示
	social: {
		qq: "81806484", // qq号
		wechat: "poshoi", // 微信号
		email: "https://suiukoer@gmail.com", // 邮箱地址
		blog: "https://www.suiu.cc", // 博客地址
		bilibili: "", // b站地址
		github: "https://github.com/poshoi", // github地址
		csdn: "" // CSDN地址
	},

	defaultThumbnailUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 默认封面图地址 
	defaultStaticThumbnailUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 静态默认封面图（不可以是随机图地址）
	defaultImageUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 默认图片地址 
	defaultAvatarUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 默认头像地址

	loadingGifUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 图片加载中的地址
	loadingErrUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 图片加载失败的地址
	loadingEmptyUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZB6l.jpg', // 加载图片为空地址

	waveImageUrl: 'https://tu.zgjnas.top:3443/images/2023/01/23/ZDdC.gif', // 关于页面波浪图片

	banner: { // 轮播图配置
		type: 'article', //  轮播图数据源 list=下方配置 article=热门文章封面 
		list: [],
	},

	quickNav: { // 快捷导航配置
		use: true,
		list: [{
				icon: 'halocoloricon-attent',
				text: '导航页',
				iconSize: 60,
				color: 'blue',
				type: 'page',
				path: 'https://www.suiu.cc',
			},
			{
				icon: 'halocoloricon-classify',
				text: '文章归档',
				iconSize: 60,
				color: 'blue',
				type: 'page',
				path: '/pagesA/archives/archives'
			},
			{
				icon: 'halocoloricon-calendar',
				text: '个人日记',
				iconSize: 60,
				color: 'blue',
				type: 'page',
				path: '/pagesA/journal/journal'
			},
			{
				icon: 'halocoloricon-message',
				text: '留言板',
				iconSize: 60,
				color: 'blue',
				type: 'page',
				path: '/pagesA/leaving/leaving'
			}
		]
	},

	// 微信分享信息
	wxShareConfig: {
		title: '', // 小程序分享标题[非必填]
		desc: '', // 小程序分享描述[非必填]
		imageUrl: '', // 小程序分享时候图片地址[非必填]
		path: '/pages/start/start', // 分享路径[非必填] - 基本不需要修改
		copyLink: '/pages/start/start', // 复制链接[非必填]  - 基本不需要修改
		query: {}, // 分享参数[非必填]  - 基本不需要填写
	},

	colors: [
		'#39B449',
		'#E44C41',
		'#8698A2',
		'#0080FE',
		'#1CBCB4',
		'#6638B5',
	]
}
