<template>
	<nav class="navbar navbar-inverse">
		<div id="loading" :class="{active: isLoading}"></div>
		<div class="container">
			<div class="navbar-header">
				<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="#" class="navbar-brand"></a>
			</div>

			<div class="collapse navbar-collapse" id="bs-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li :class="{active: isHome}"><a href="#">home <span class="sr-only">(current)</span></a></li>
					<li :class="{active: isWeather}"><a href="#/weather">weather</a></li>
					<li :class="{active: isMusic}"><a href="#/music">music</a></li>
					<!-- <li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
			          	<ul class="dropdown-menu">
						    <li><a href="#">Action</a></li>
						    <li><a href="#">Another action</a></li>
						    <li><a href="#">Something else here</a></li>
						    <li role="separator" class="divider"></li>
						    <li><a href="#">Separated link</a></li>
						    <li role="separator" class="divider"></li>
						    <li><a href="#">One more separated link</a></li>
						</ul>

					</li> -->
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import bus from '../../assets/eventBus.js'
	export default {
		data() {
			return {
				isLoading: false
			}
		},
		computed: {
			isHome: function() {
				return this.$route.path === '/'
			},
			isWeather: function() {
				return this.$route.path === '/weather'
			},
			isMusic: function() {
				return this.$route.path === '/music'
			}
		},
		created() {
			let self = this;
			bus.$on('loading', function(msg) {
				self.isLoading = msg;
			})
		}
	}
</script>

<style scoped>
#loading{
	position: fixed;
    top: 0;
    left: -100%;
    z-index: 70;
    width: 100%;
    height: 3px;
    background: #FF4081;
}
#loading.active{
	-webkit-animation: loading-anim 1s ease-in-out infinite;
	animation: loading-anim 1s ease-in-out infinite;
}
@-webkit-keyframes loading-anim {
    to {
        -webkit-transform: translateX(200%);
        transform: translateX(200%)
    }
}

@keyframes loading-anim {
    to {
        -webkit-transform: translateX(200%);
        transform: translateX(200%)
    }
}
.navbar{
	border-radius: 0;
}
</style>