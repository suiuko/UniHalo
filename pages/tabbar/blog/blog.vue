<template>
	<view class="app-page">
		<!-- 顶部切换 -->
		<view class="e-fixed shadow-2">
			<tm-search v-model="queryParams.keyword" :round="24" :shadow="0" color="light-blue"
				insert-color="light-blue" :clear="true" @confirm="fnOnSearch"></tm-search>
		</view>
		<!-- 占位区域 -->
		<view style="width: 100vw;height: 100rpx;"></view>
		<view v-if="loading != 'success'" class="loading-wrap">
			<tm-skeleton model="card"></tm-skeleton>
			<tm-skeleton model="cardActions"></tm-skeleton>
			<tm-skeleton model="list"></tm-skeleton>
			<tm-skeleton model="listAvatr"></tm-skeleton>
			<tm-skeleton model="listAvatr"></tm-skeleton>
			<tm-skeleton model="listAvatr"></tm-skeleton>
		</view>
		<block v-else>
			<view class="flex flex-between mt-16 mb-24 pl-24 pr-24">
				<view class="page-item_title text-weight-b ">分类</view>
			</view>
			<scroll-view class="category" scroll-x="true">
				<view v-if="categoryList.length == 0" class="cate-empty round-3 mr-5 flex flex-center text-grey">
					还没有任何文章分类~</view>
				<block v-else>
					<view class="content" v-for="(category, index) in categoryList" :key="category.createTime"
						@click="fnToCategoryBy(category)">
						<category-mini-card :category="category"></category-mini-card>
					</view>
				</block>
			</scroll-view>

			<!-- 最新文章 -->
			<view class="flex flex-between mt-24 mb-24 pl-24 pr-24">
				<view class="page-item_title text-weight-b">文章列表</view>
			</view>
			<view v-if="articleList.length == 0" class="article-empty">
				<tm-empty icon="icon-shiliangzhinengduixiang-" label="博主还没有发表任何文章~"></tm-empty>
			</view>
			<block v-else>
				<view :class="globalAppSettings.layout.home">
					<block v-for="(article, index) in articleList" :key="article.createTime">
						<tm-translate class="ani-item" animation-name="fadeUp" :wait="(index + 1) * 50">
							<article-card from="home" :article="article" @on-click="fnToArticleDetail"></article-card>
						</tm-translate>
					</block>
				</view>
				<view class="load-text mt-12">{{ loadMoreText }}</view>
				<tm-flotbutton v-if="articleList.length > 10" color="light-blue" @click="fnToTopPage" size="m"
					icon="icon-angle-up"></tm-flotbutton>
			</block>
		</block>
	</view>
</template>

<script>
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmSkeleton from '@/tm-vuetify/components/tm-skeleton/tm-skeleton.vue';
	import tmTranslate from '@/tm-vuetify/components/tm-translate/tm-translate.vue';
	import tmFlotbutton from '@/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmEmpty from '@/tm-vuetify/components/tm-empty/tm-empty.vue';
	import tmSearch from '@/tm-vuetify/components/tm-search/tm-search.vue';
	const serveroptions = {
		apiUrl: 'https://www.slass.cc',
		apiAuthorization: 'zgj',
	}

	export default {
		components: {
			tmMenubars,
			tmSkeleton,
			tmTranslate,
			tmFlotbutton,
			tmIcons,
			tmEmpty,
			tmSearch
		},
		data() {
			return {
				loading: 'loading',
				queryParams: {
					size: 10,
					page: 0
				},
				result: {},
				isLoadMore: false,
				loadMoreText: '加载中...',
				articleList: [],
				categoryList: [],
			};
		},

		computed: {
			bloggerInfo() {
				let blogger = this.$tm.vx.getters().getBlogger;
				blogger.avatar = this.$utils.checkAvatarUrl(blogger.avatar, true);
				return blogger;
			}
		},
		onLoad() {
			this.fnSetPageTitle();
		},

		created() {
			this.fnQuery();
		},
		onPullDownRefresh() {
			this.isLoadMore = false;
			this.queryParams.page = 0;
			this.fnQuery();
		},

		onReachBottom(e) {
			if (this.result.hasNext) {
				this.queryParams.page += 1;
				this.isLoadMore = true;
				this.fnGetArticleList();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有更多数据了'
				});
			}
		},
		methods: {
			fnQuery() {
				this.fnGetArticleList();
				this.fnGetCategoryList();
			},

			fnGetCategoryList() {
				uni.request({
					url: serveroptions.apiUrl + '/api/content/categories',
					method: 'GET',
					data: {
						more: true
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
							this.categoryList = data.data.sort((a, b) => {
								return b.postCount - a.postCount;
							});

							setTimeout(() => {
								this.loading = 'success';
							}, 500);
						} else {
							this.loading = 'error';
						}
					},
					fail: (err) => {
						this.loading = 'error';
					},
					complete: () => {
						setTimeout(() => {
							uni.hideLoading();
							uni.stopPullDownRefresh();
						}, 500);
					}
				})
			},
			fnOnSearch(){
				this.fnGetArticleList();
			},
			// 文章列表
			fnGetArticleList() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				// 设置状态为加载中
				if (!this.isLoadMore) {
					this.loading = 'loading';
				}
				this.loadMoreText = '加载中...';
				uni.request({
					url: serveroptions.apiUrl + '/api/content/posts',
					method: 'GET',
					data: this.queryParams,
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
							this.loading = 'success';
							this.loadMoreText = data.data.hasNext ? '上拉加载更多' : '呜呜，没有更多数据啦~';
							this.result = data.data;
							if (this.isLoadMore) {
								this.articleList = this.articleList.concat(data.data.content);
							} else {
								this.articleList = data.data.content;
							}
							this.loading = 'success';
						} else {
							this.loading = 'error';
							this.loadMoreText = '加载失败，请下拉刷新！';
							uni.$tm.toast(err.message || '数据加载失败！');
						}
					},
					fail: (err) => {
						this.loading = 'error';
						this.loadMoreText = '加载失败，请下拉刷新！';
						uni.$tm.toast(err.message || '数据加载失败！');
					},
					complete: () => {
						setTimeout(() => {
							uni.hideLoading();
							uni.stopPullDownRefresh();
						}, 500);
					}
				})
			},

			//跳转文章详情
			fnToArticleDetail(article) {
				uni.navigateTo({
					url: '/pagesA/blog-article-detail/blog-article-detail?articleId=' + article.id,
					animationType: 'slide-in-right'
				});
			},

			// 根据slug查询分类下的文章
			fnToCategoryBy(category) {
				uni.navigateTo({
					url: `/pagesA/blog-category-detail/blog-category-detail?slug=${category.slug}&name=${category.name}`
				});
			}, 
		}
	};
</script>

<style lang="scss" scoped>
	.app-page {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		// background-color: #ffffff;

		.logo {
			width: 60rpx;
			height: 60rpx;
			box-sizing: border-box;
		}

		::v-deep {
			.tm-menubars .body .body_wk .left {
				min-width: initial;
			}
		}
	}

	.loading-wrap {
		padding: 24rpx;
	}

	.search-input {
		background-color: #f5f5f5;
		align-items: center;
		/* #ifdef MP-WEIXIN */
		margin-right: 24rpx;

		/* #endif */
		&_icon {}

		&_text {}
	}

	.show-more {
		width: 42rpx;
		height: 42rpx;
		box-sizing: border-box;
		box-shadow: 0rpx 0rpx 24rpx rgba(0, 0, 0, 0.03);
	}

	.banner {
		overflow: hidden;
	}

	.quick-nav {
		background-color: #fff;
		box-sizing: border-box;

		// box-shadow: 0rpx 2rpx 24rpx rgba(0, 0, 0, 0.03);
		.name {
			color: var(--main-text-color);
		}
	}

	.category {
		width: 94vw;
		display: flex;
		height: 200rpx;
		white-space: nowrap;
		margin: 0 24rpx;

		.content {
			display: inline-block;
			padding-left: 24rpx;

			&:first-child {
				padding-left: 0;
			}
		}

		.cate-empty {
			height: inherit;
		}
	}

	.page-item {
		&_title {
			position: relative;
			padding-left: 24rpx;
			font-size: 32rpx;
			z-index: 1;
			color: var(--main-text-color);

			&:before {
				content: '';
				position: absolute;
				left: 0rpx;
				top: 8rpx;
				width: 8rpx;
				height: 30rpx;
				background-color: rgba(33, 150, 243, 1);
				border-radius: 6rpx;
				z-index: 0;
			}
		}
	}

	.h_row_col2 {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 0 12rpx;

		.ani-item {
			width: 50%;
		}
	}
</style>
