<template>
	<div id="music" class="container">
		<div class="row">
			<div class="col-md-3">
				<button @click="getAmerica" :class="{'btn-active': isAmerica}" class="btn btn-inverse btn-block">欧美</button>
				<button @click="getMainland" :class="{'btn-active': isMainLand}" class="btn btn-inverse btn-block">内地</button>
				<button @click="getHongkong" :class="{'btn-active': isHongkong}" class="btn btn-inverse btn-block">港台</button>
				<button @click="getKorea" :class="{'btn-active': isKorea}" class="btn btn-inverse btn-block">韩国</button>
				<button @click="getJapan" :class="{'btn-active': isJapan}" class="btn btn-inverse btn-block">日本</button>
				<button @click="getBallad" :class="{'btn-active': isBallad}" class="btn btn-inverse btn-block">民谣</button>
				<button @click="getRock" :class="{'btn-active': isRock}" class="btn btn-inverse btn-block">摇滚</button>
				<button @click="getBestSeller" :class="{'btn-active': isBestSeller}" class="btn btn-inverse btn-block">销量</button>
				<button @click="getHot" :class="{'btn-active': isHot}" class="btn btn-inverse btn-block">热歌</button>
			</div>
			<div class="col-md-9">
				<div class="table">
					<table class="table">
						<thead>
							<tr>
								<th>封面</th>
								<th>歌名</th>
								<th>歌手</th>
								<th>时长</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="song in songList">
								<td>
									<a :href="song.url">
										<img :src="song.albumpic_small" alt="song.songname">
									</a>
								</td>
								<td>
									<div class="limit">
										<a :href="song.url">{{song.songname}}</a>
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.singername}}
									</div>
								</td>
								<td>
									<div class="limit">
										{{song.seconds}}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {music as api} from "../config/api.js"
import bus from '../assets/eventBus.js'
export default {
	data() {
		return {
			songList: [],
			activeItem: 'america'
		}
	},
	methods: {
		getAmerica(e) {
			getData.call(this, api.america, list => {
				this.songList = list;
				this.activeItem = 'america'
			})
		},
		getMainland() {
			getData.call(this, api.mainland, list => {
				this.songList = list;
				this.activeItem = 'mainland'
			})
		},
		getHongkong() {
			getData.call(this, api.hongkong, list => {
				this.songList = list;
				this.activeItem = 'hongkong'
			})
		},
		getKorea() {
			getData.call(this, api.korea, list => {
				this.songList = list;
				this.activeItem = 'korea'
			})
		},
		getJapan() {
			getData.call(this, api.japan, list => {
				this.songList = list;
				this.activeItem = 'japan'
			})
		},
		getBallad() {
			getData.call(this, api.ballad, list => {
				this.songList = list;
				this.activeItem = 'ballad'
			})
		},
		getRock() {
			getData.call(this, api.rock, list => {
				this.songList = list;
				this.activeItem = 'rock'
			})
		},
		getBestSeller() {
			getData.call(this, api.bestSeller, list => {
				this.songList = list;
				this.activeItem = 'bestSeller'
			})
		},
		getHot() {
			getData.call(this, api.hot, list => {
				this.songList = list;
				this.activeItem = 'hot'
			})
		}
	},
	created() {
		getData.call(this, api.america, list => {
			this.songList = list;
		})
	},
	computed:{
		isAmerica() {
			return this.activeItem === "america"
		},
		isMainLand() {
			return this.activeItem === "mainland"
		},
		isHongkong() {
			return this.activeItem === "hongkong"
		},
		isKorea() {
			return this.activeItem === "korea"
		},
		isJapan() {
			return this.activeItem === "japan"
		},
		isBallad() {
			return this.activeItem === "ballad"
		},
		isRock() {
			return this.activeItem === "rock"
		},
		isBestSeller() {
			return this.activeItem === "bestSeller"
		},
		isHot() {
			return this.activeItem === "hot"
		},
	}
}
function getData(district, handler) {
	bus.$emit('loading', true);
	this.$http.get(district.url, {
		params: district.params()
	}).then(res => {
		bus.$emit('loading', false);
		if(res.body.showapi_res_code === 0) {
			let songList;
			try{
				songList = res.body.showapi_res_body.pagebean.songlist.slice(0,10);
			} catch (e) {
				console.log(e)
			}
			handler(songList);
		} else {
			console.log('接口信息错误')
		}
	})
}
</script>

<style scoped>
	.table > tbody > tr > td{
		line-height: 107px;
		padding: 0;
	}
	.btn-active{
		color: #ffffff;
    	background-color: #48c9b0;
    	border-color: #48c9b0;
	}
	.limit{
		max-width: 300px;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
</style>