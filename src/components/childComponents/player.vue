<template>
	<div id="player" class="palette palette-night-dark" :class="{active: isActive}">
		<div class="container">
			<div class="row">
				<div class="col-md-5">
					<div class="song-info">
						<img :src="albumpic_small" :alt="songName" draggable="false">
						<div style="padding: 0 10px;">正在播放：</div>
						<div id="songName" :title="songName">{{songName}}</div>
					</div>
				</div>
				<div class="col-md-7">
					<div class="controller">	
						<button id="reload" @click="reload" class="btn btn-default glyphicon glyphicon-repeat"></button>
						<button id="swift" @click="swift" class="btn btn-default glyphicon" :class="songStatus"></button>
						<button id="stop" @click="stop" class="btn btn-default glyphicon glyphicon-stop"></button>
						<button @click="toggleActive" class="btn btn-default">词</button>
					</div>
					<div id="progressInfo">
						<div class="time fl">{{couterFront}}</div>
				        <div class="time fr">{{couterEnd}}</div>
						<!-- <div id="progressBar" class="ui-slider ui-slider-horizontal">
				          	<div class="ui-slider-range"></div>
				          	<a id="progressHandler" class="ui-slider-handle" href="javascript:;" @mouseup="adjustProgressEnd" @mousedown="adjustProgressStart"></a>
				        </div>
 -->
				        <div id="progressBar" class="ui-slider ui-slider-horizontal" draggable="false">
				        	<div class="ui-slider-handle" draggable="false"></div>
				        	<div class="ui-slider-range ui-corner-all" draggable="false"></div>
				        </div>
					</div>
				</div>
			</div>
			<div class="row">
				<div id="lyrics" class="col-md-12" v-bind:style="{ height: lyricsHeight }">
				<!-- {{lyrics}} -->
					告白气球
词：方文山<br/><br/>
曲：周杰伦<br/><br/>
演唱：周杰伦<br/><br/>
塞纳河畔 左岸的咖啡<br/><br/>
我手一杯 品尝你的美<br/><br/>
留下唇印的嘴<br/><br/>
花店玫瑰 名字写错谁<br/><br/>
告白气球 风吹到对街<br/><br/>
微笑在天上飞<br/><br/>
你说你有点难追 想让我知难而退<br/><br/>
礼物不需挑最贵 只要香榭的落叶<br/><br/>
喔 营造浪漫的约会 不害怕搞砸一切<br/><br/>
拥有你就拥有 全世界<br/><br/>
亲爱的 爱上你 从那天起<br/><br/>
甜蜜的很轻易<br/><br/>
亲爱的 别任性 你的眼睛<br/><br/>
在说我愿意<br/><br/>
塞纳河畔 左岸的咖啡<br/><br/>
我手一杯 品尝你的美<br/><br/>
留下唇印的嘴<br/><br/>
花店玫瑰 名字写错谁<br/><br/>
告白气球 风吹到对街<br/><br/>
微笑在天上飞<br/><br/>
你说你有点难追 想让我知难而退<br/><br/>
礼物不需挑最贵 只要香榭的落叶<br/><br/>
喔 营造浪漫的约会 不害怕搞砸一切<br/><br/>
拥有你就拥有 全世界<br/><br/>
亲爱的 爱上你 从那天起<br/><br/>
甜蜜的很轻易<br/><br/>
亲爱的 别任性 你的眼睛<br/><br/>
在说我愿意<br/><br/>
亲爱的 爱上你 恋爱日记<br/><br/>
飘香水的回忆<br/><br/>
一整瓶 的梦境 全都有你<br/><br/>
搅拌在一起<br/><br/>
亲爱的别任性 你的眼睛<br/><br/>
在说我愿意<br/><br/>
				</div>
			</div>
			<audio id="audio" :src="songSrc" loop controls style="display: none"></audio>
		</div>
	</div>
</template>

<script>
import bus from '../../assets/eventBus.js'
import core from '../../assets/core.js'
import slider from '../../assets/slider.js'
export default {
	
	data() {
		return {
			songData: {},												//音乐包含的信息
			songSrc: '',//当前播放音乐链接
			// http://ws.stream.qqmusic.qq.com/200812326.m4a?fromtag=46
			// http://ws.stream.qqmusic.qq.com/200221528.m4a?fromtag=46
			songStatus: 'glyphicon-play',								//播放器按钮应该显示的状态
			songStatusMap: {
				play: 'glyphicon-play',
				pause: 'glyphicon-pause',
				stop: 'glyphicon-stop'
			},
			songName: '---',											//当前音乐名称
			isActive: false,											//播放器是否全屏
			albumpic_small: require('../../../static/img/placeholder.png'),		//封面图
			audio: null,												//audio DOM对象
			slider: null,												//jQuery UI slider插件返回的对象。
			processBarLocked: false,									//进度条是否可调节
			progress: 0,												//当前进度
			volume: 50,													//当前音量
			totleTime: 0,												//音乐总时间
			couterFront: '--:--',										//进度条前，显示的当前时间
			couterEnd: '--:--',											//进度条后，显示的总时间
			lyrics: '',													//歌词
			lyricsHeight: 'auto',
		}
	},
	methods: {
		reload() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
			this.audio.play()
			this.songStatus = this.songStatusMap['pause'];
		},
		stop() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
			this.audio.pause()
			this.songStatus = this.songStatusMap['play'];
		},
		swift() {
			if(this.audio.readyState !== 4) return;
			if (this.audio.paused) {
				this.audio.play()
				this.songStatus = this.songStatusMap['pause'];
			} else {
				this.audio.pause();
				this.songStatus = this.songStatusMap['play'];
			}
		},
		toggleActive() {
			this.isActive = !this.isActive
			this.lyricsHeight = window.innerHeight - 100 + 'px'
		},
		adjustProgressEnd() {
			this.processBarLocked = false;
		},
		adjustProgressStart() {
			this.processBarLocked = true;
		}
	},
	created() {
		let self = this;
		bus.$on('play', function(receive) {
			let info = receive.info;

			self.songName = info.songname;
			self.songSrc = info.url;
			self.albumpic_small = info.albumpic_small.replace('http://', 'https://');
			self.totleTime = info.seconds || 59*60+59;
			self.songData = info;
			self.lyrics = receive.lyrics

			// console.log(self.audio.readyState)		//4
			//又不知道为什么，readyState已经等于4之后，直接play()没有播放。
			setTimeout(function() {
				self.audio.play();
			}, 20)
			self.songStatus = self.songStatusMap['pause'];

		})
	},
	mounted() {
		let self = this;
		this.audio = document.querySelector('#audio');

		let sliderObj = slider.init('#progressBar', {
			after: function(percent) {
				self.audio.currentTime = parseInt(parseInt(percent * self.totleTime) / 100)
			}
		});

		// //每秒更新一下进度条
	    setInterval(function() {
	    	let totleTime = self.totleTime
	    	let currentTime = self.audio.currentTime
	    	sliderObj.value(parseInt(currentTime * 100 / totleTime))
	    	self.couterFront = core.sec2Min(currentTime).formated
	    	self.couterEnd = core.sec2Min(totleTime).formated
	    }, 500)

	}

}


</script>

<style scoped>
#player{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 90px;
	padding: 0;
	transition: all .5s ease-in-out;
}
#player.active{
	height: 100%;
	background-color: rgba(0,0,0,.8);
}
#songName{
	max-width: 275px;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
#lyrics{
	overflow: auto;
}
.controller{
	margin: 10px 0;
}
#progressBar{
	margin: 10px 0;
	width: 80%;
	margin-left: 10%;
}

.song-info * {
	float: left;
	line-height: 90px;
	max-height: 90px;
}
.time{
	width: 10%;
	margin-top: -2px;
}
#lyrics::-webkit-scrollbar{
	width: 0;
}

</style>