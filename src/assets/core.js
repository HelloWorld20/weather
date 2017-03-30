import bus from './eventBus.js'
export default {
	//秒数换成分：秒
	sec2Min: function(val) {
		if(!val || val === 0) {
			return {
				formated: '--:--',
				sec: -1,
				min: -1
			}
		}

		return {
			formated: parseInt(val / 60) + ':' + parseInt(val % 60),
			sec: val.seconds % 60,
			min: parseInt(val.seconds / 60)
		}
	},

	fetch: function(key, id, handler) {
		bus.$emit('loading', true);
		this.$http.get(key.url, {
			params: key.params(id)
		}).then(res => {
			bus.$emit('loading', false);
			if(res.body) {
				handler(res.body)
			} else {
				console.log('获取资源失败')
			}
		}, err => {
			bus.$emit('loading', false);
			console.log(err)
		})
	} 
}
