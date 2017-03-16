<template>
	<div>
		<h1 @click="fullScreen">music pages</h1>
		<canvas id="myCan" width="400" height="300" style="background-color: #eee;"></canvas>
	</div>
</template>

<script>
import {music as api} from "../config/api.js"
export default {
	data() {
		return {

		}
	},
	methods: {
		fullScreen() {
			this.$nextTick(function(e) {
				document.querySelector('body').webkitRequestFullScreen();
			})
		}
	},
	created() {
		// this.$http.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017_10&topid=28&type=top&song_begin=0&song_num=30&g_tk=5381&jsonpCallback=MusicJsonCallbacktoplist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0').then(res => {
		// 	console.log(res);
		// })
	}
}

</script>

<style>
	
</style>