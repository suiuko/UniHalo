<template>
	<view class="app-page">
		<view v-if="loading != 'success'" class="loading-wrap">
			<tm-skeleton model="card"></tm-skeleton>
			<tm-skeleton model="card"></tm-skeleton>
			<tm-skeleton model="card"></tm-skeleton>
		</view>
		<block v-else>
			<!-- 顶部信息 -->
			<view class="head ma-24">
				<view class="title">{{ result.title }}</view>
				<view class="detail">
					<view class="author">
						<text class="author-name">博主：{{ author.nickname }}</text>
						<text
							class="author-time">时间：{{ { d: result.createTime, f: 'yyyy年MM月dd日 星期w' } | formatTime }}</text>
					</view>

					<view class="cover" v-if="result.thumbnail">
						<image class="cover-img" mode="aspectFill" :src="calcUrl(result.thumbnail)"></image>
					</view>
					<view class="count" :class="{ 'no-thumbnail': !result.thumbnail }">
						<view class="count-item">
							<text class="value">{{ result.visits }}</text>
							<text class="label">阅读</text>
						</view>
						<view class="count-item">
							<text class="value">{{ result.likes }}</text>
							<text class="label">喜欢</text>
						</view>
						<view class="count-item">
							<text class="value">{{ result.commentCount }}</text>
							<text class="label">评论</text>
						</view>
						<view class="count-item">
							<text class="value">{{ result.wordCount }}</text>
							<text class="label">字数</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 分类 -->
			<view class="category">
				<view class="category-type">
					<text class="text-weight-b">分类：</text>
					<text v-if="result.categories.length == 0" class="category-tag is-empty">未选择分类</text>
					<block v-else>
						<text class="category-tag" v-for="(item, index) in result.categories" :key="index"
							 >{{ item.name }}</text>
					</block>
				</view>
				<view class="mt-18 category-type">
					<text class="text-weight-b">标签：</text>
					<text v-if="result.tags.length == 0" class="category-tag is-empty">未选择标签</text>
					<block v-else>
						<text class="category-tag" :style="{ backgroundColor: item.color }"
							v-for="(item, index) in result.tags" :key="index"  >
							{{ item.name }}
						</text>
					</block>
				</view>
			</view>
			 
			<!-- 内容区域 -->
			<view class="content ml-24 mr-24">
				<!-- markdown渲染 -->
				<mp-html class="evan-markdown" lazy-load :domain="markdownConfig.domain"
					:loading-img="markdownConfig.loadingGif" :scroll-table="true" :selectable="true"
					:tag-style="markdownConfig.tagStyle" :container-style="markdownConfig.containStyle"
					:content="result.content" :markdown="true" :showLineNumber="true" :showLanguageName="true"
					:copyByLongPress="true" />

				<!-- 广告区域：自定义广告位 -->
				<view class="ad-card" v-if="haloAdConfig.articleDetail.custom.use">
					<text class="ad-card_tip">广告</text>
					<image class="ad-card_cover" :src="haloAdConfig.articleDetail.custom.cover" mode="scaleToFill">
					</image>
					<view class="ad-card_info">
						<view class="ad-card_info-title">{{ haloAdConfig.articleDetail.custom.title }}</view>
						<view class="ad-card_info-desc">{{ haloAdConfig.articleDetail.custom.content }}</view>
						<view v-if="haloAdConfig.articleDetail.custom.url" class="ad-card_info-link"
							@click="fnToWebview(haloAdConfig.articleDetail.custom)">立即查看</view>
					</view>
				</view>

				<!-- 版权声明 -->
				<view v-if="copyright.use" class="copyright-wrap bg-white mt-24 pa-24 round-4">
					<view class="copyright-title text-weight-b">版权声明</view>
					<view
						class="copyright-content mt-12  grey-lighten-5 text-grey-darken-2 round-4 pt-12 pb-12 pl-24 pr-24 ">
						<view v-if="copyright.author" class="copyright-text text-size-s ">版权归属：{{ copyright.author }}
						</view>
						<view v-if="copyright.description" class="copyright-text text-size-s mt-12">
							版权说明：{{ copyright.description }}</view>
						<view v-if="copyright.violation" class="copyright-text text-size-s mt-12 text-red">
							侵权处理：{{ copyright.violation }}</view>
					</view>
				</view>

			</view>

			<!-- 弹幕效果 -->
			<barrage ref="barrage" :maxTop="240" :type="globalAppSettings.barrage.type"></barrage>
			<!-- 返回顶部 -->
			<tm-flotbutton  icon="icon-angle-up" color="bg-gradient-light-blue-accent"
				@click="fnToTopPage()"></tm-flotbutton>
		</block>

		<!-- 海报 -->
		<tm-poup v-model="poster.show" width="90vw" height="auto" :round="6" :over-close="true" position="center">
			<view class="poster-content pt-12 bg-white">
				<view v-if="poster.loading" class="poster-loading flex flex-center text-grey-darken-1">
					<text class="e-loading-icon iconfont icon-loading"></text>
					<text class="ml-6">海报正在生成...</text>
				</view>
				<block v-if="poster.showCanvas">
					<r-canvas ref="rCanvas"></r-canvas>
					<view class="poster-save ma-24 mt-0 pt-20 flex flex-center">
						<tm-button theme="bg-gradient-light-blue-accent" size="m" @click="fnSavePoster()">保存到相册
						</tm-button>
						<tm-button theme="bg-gradient-blue-grey-accent" size="m" @click="fnOnPosterClose()">关 闭
						</tm-button>
					</view>
				</block>
			</view>
		</tm-poup>
	</view>
</template>

<script>
	import MarkdownConfig from '@/common/markdown/markdown.config.js';

	import tmSkeleton from '@/tm-vuetify/components/tm-skeleton/tm-skeleton.vue';
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmFlotbutton from '@/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue';
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';

	import mpHtml from '@/components/mp-html/components/mp-html/mp-html.vue';
	import commentList from '@/components/comment-list/comment-list.vue';
	import commentItem from '@/components/comment-item/comment-item.vue';

	import rCanvas from '@/components/r-canvas/r-canvas.vue';
	import barrage from '@/components/barrage/barrage.vue';

	const serveroptions = {
		apiUrl: 'https://www.slass.cc',
		apiAuthorization: 'zgj',
	}
	export default {
		components: {
			tmSkeleton,
			tmPoup,
			tmFlotbutton,
			tmButton,
			tmEmpty,
			mpHtml,
			commentList,
			commentItem,
			rCanvas,
			barrage
		},
		data() {
			return {
				loading: 'loading',
				markdownConfig: MarkdownConfig,
				 
				queryParams: {
					articleId: null
				},
				result: {},

				commentDetail: {
					loading: 'loading',
					show: false,
					comment: {},
					postId: undefined,
					list: []
				},
				poster: {
					show: false,
					showCanvas: false,
					loading: true,
					res: null
				}
			};
		},
		computed: {
			copyright() {
				return getApp().globalData.copyright;
			},
			calcUrl() {
				return url => {
					if (this.$utils.checkIsUrl(url)) {
						return url;
					}
					return getApp().globalData.baseApiUrl + url;
				};
			},
			// 获取博主信息
			bloggerInfo() {
				let blogger = this.$tm.vx.getters().getBlogger;
				blogger.avatar = this.$utils.checkAvatarUrl(blogger.avatar, true);
				return blogger;
			}
		},
		onLoad(e) {
			this.fnSetPageTitle('文章加载中...');
			this.queryParams.articleId = e.articleId;
			this.fnGetData();
		},

		onPullDownRefresh() {
			this.fnGetData();
		},
		methods: {
			fnGetData() {
				this.loading = 'loading';
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: serveroptions.apiUrl + `/api/content/posts/${this.queryParams.articleId}`,
					method: 'GET',
					data: {
						formatDisabled: false,
						sourceDisabled: true
					},
					header: {
						'api-authorization': this.$haloConfig.apiAuthorization,
						ContentType: 'application/json',
					},
					dataType: 'json',
					success: (res) => {
						const {
							data
						} = res;
						if (data.status == 200) {
							this.result = data.data;
							this.fnSetPageTitle('文章详情');
							this.loading = 'success';
							this.fnSetWxShareInfo();
						} else {
							this.loading = 'error';
						}
					},
					fail: (err) => {
						this.loading = 'error';
					},
					complete: () => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				})
			},
			fnSetWxShareInfo() {
				// #ifdef MP-WEIXIN
				uni.$tm.vx.commit('setWxShare', {
					title: this.result.title,
					desc: this.result.summary,
					imageUrl: this.$utils.checkThumbnailUrl(this.result.thumbnail),
					path: `/pagesA/article-detail/article-detail?articleId=${this.queryParams.articleId}`,
					copyLink: this.$haloConfig.apiUrl,
					query: {}
				});
				// #endif
			},
		  
			fnToWebview(data) {
				uni.navigateTo({
					url: '/pagesC/website/website?data=' +
						JSON.stringify({
							title: data.title,
							url: data.url
						})
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app-page {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fafafd;
	}

	.loading-wrap {
		padding: 0 24rpx;
		height: inherit;
		background-color: #fff;
	}

	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 36rpx 24rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 4rpx 24rpx rgba(0, 0, 0, 0.03);
		// box-shadow: 0rpx 6rpx 30rpx rgba(182, 223, 255, 0.3);

		border-radius: 24rpx;

		.title {
			font-size: 36rpx;
			font-weight: 600;
			text-align: center;
		}

		.detail {
			width: 100%;
			margin-top: 24rpx;
			font-size: 26rpx;

			.author {
				text-align: center;
				font-size: 24rpx;
				color: #666;

				&-name {}

				&-time {
					margin-left: 36rpx;
				}
			}

			.cover {
				margin-top: 24rpx;
				width: 100%;
				height: 280rpx;

				&-img {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
			}

			.count {
				margin-top: 24rpx;
				display: flex;
				justify-content: space-between;

				&.no-thumbnail {
					border-top: 2rpx solid #f2f2f2;
					padding-top: 12rpx;

					.count-item {
						position: relative;
						color: #666;

						&::after {
							content: '';
							position: absolute;
							right: 0;
							background-color: #eee;
							width: 2rpx;
							height: 32rpx;
						}

						&:last-child {
							&::after {
								display: none;
							}
						}
					}
				}

				&-item {
					flex: 1;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					color: #666;

					.label {
						font-size: 24rpx;
						padding-left: 8rpx;
					}

					.value {
						font-size: 32rpx;
					}
				}
			}
		}
	}

	.category {
		margin: 0 24rpx;
		padding: 24rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		// box-shadow: 0rpx 0rpx 24rpx rgba(182, 223, 255, 0.3);
		box-shadow: 0rpx 4rpx 24rpx rgba(0, 0, 0, 0.03);
		// border: 2rpx solid #f8f8f8;
		font-size: 28rpx;

		&-type {
			line-height: 55rpx;
		}

		&-tag {
			background-color: #5bb8fa;
			color: #fff;
			padding: 6rpx 12rpx;
			border-radius: 6rpx;
			font-size: 24rpx;

			&.is-empty {
				background-color: #607d8b;
			}
		}
	}

	.category-tag+.category-tag {
		margin-left: 12rpx;
	}

	.content {
		margin-top: 24rpx;
	}

	.evan-markdown,
	.ad-wrap,
	.copyright-wrap,
	.comment-wrap {
		box-shadow: 0rpx 0rpx 24rpx rgba(0, 0, 0, 0.03);
	}

	.copyright-title {
		position: relative;
		box-sizing: border-box;
		padding-left: 24rpx;
		font-size: 30rpx;

		&:before {
			content: '';
			position: absolute;
			left: 0rpx;
			top: 8rpx;
			width: 8rpx;
			height: 26rpx;
			background-color: rgb(3, 174, 252);
			border-radius: 6rpx;
		}
	}

	.poup-head {
		border-bottom: 2rpx solid #f5f5f5;
	}

	.poup-body {
		height: 50vh;
	}

	.poup-empty {
		width: 100%;
		height: 40vh;
	}

	.poup-loading-wrap {
		width: 100%;
		height: 40vh;

		.e-loading-icon {
			font-size: 80rpx;
		}
	}

	.poster-content {
		width: 100%;
		min-height: 60vh;
		overflow: hidden;
	}

	.copyright-text {
		line-height: 1.7;
	}

	.poster-loading {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		// background-color: rgba(0, 0, 0, 0.1);
		z-index: 666;
	}

	.poster-save {
		box-sizing: border-box;
		border-top: 2rpx dashed #eee;
	}
</style>
