<template>
	<div id="player" class="palette palette-night-dark" :class="{active: isActive}">
		<div class="container">
			<div class="row">
				<div class="col-md-5">
					<div class="song-info">
						<img :src="albumpic_small" :alt="songName">
						<div style="padding: 0 10px;">正在播放：</div>
						<div id="songName" :title="songName">{{songName}}</div>
					</div>
				</div>
				<div class="col-md-7">
					<div class="controller">	
						<button id="reload" @click="reload" class="btn btn-default glyphicon glyphicon-repeat"></button>
						<button id="swift" @click="swift" class="btn btn-default glyphicon" :class="songStatus"></button>
						<button id="stop" @click="stop" class="btn btn-default glyphicon glyphicon-stop"></button>
					</div>
				</div>
			</div>

			<audio id="audio" :src="songSrc" loop controls autoplay style="display: none">
			<!-- <source :src='songSrc' id="source"> -->
			</audio>
		</div>
	</div>
</template>

<script>
import bus from '../../assets/eventBus.js'
export default {
	
	data() {
		return {
			songData: {},												//音乐包含的信息
			songSrc: 'http://ws.stream.qqmusic.qq.com/200812326.m4a?fromtag=46',
			// http://ws.stream.qqmusic.qq.com/200221528.m4a?fromtag=46
			songStatus: 'glyphicon-play',								//播放器状态
			songStatusMap: {
				play: 'glyphicon-play',
				pause: 'glyphicon-pause',
				stop: 'glyphicon-stop'
			},
			songName: '---',											//当前音乐名称
			isActive: true,
			albumpic_small: '../../../static/img/placeholder.png',
			audio: null,
		}
	},
	methods: {
		reload() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
		},
		stop() {
			if(this.audio.readyState !== 4) return;
			this.audio.load()
			this.audio.pause()
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
	},
	created() {
		let self = this;
		bus.$on('play', function(receive) {
			self.songName = receive.songname;
			self.songSrc = receive.url;
			self.albumpic_small = receive.albumpic_small;
			self.songData = receive;
		})
	},
	mounted() {
		this.audio = document.querySelector('#audio');

	}
}

</script>

<style scoped>
#player{
	position: fixed;
	bottom: -80px;
	width: 100%;
	padding: 0;
}
#songName{
	max-width: 275px;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.controller{
	height: 90px;
	line-height: 90px;	
}
#player.active{
	bottom: 0;
}
.song-info * {
	float: left;
	line-height: 90px;
	max-height: 90px;
}
</style>