<template>
  <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/">
				<span class="mui-icon iconfont icon-waimai"></span>
				<span class="mui-tab-label">外卖</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon iconfont icon-weibiaoti--"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<router-link class="mui-tab-item" to="/order">
				<span class="mui-icon iconfont icon-icon--copy"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">订单</span>
			</router-link>
			<router-link class="mui-tab-item" to="/personal">
				<span class="mui-icon iconfont icon-wode"></span>
				<span class="mui-tab-label">个人中心</span>
			</router-link>
		</nav>
</template>

