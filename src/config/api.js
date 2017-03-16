export const weather = {
	key: "60317f77a63c432a872bbacbbed9e204",
	default: 'https://free-api.heweather.com/v5/forecast?city=guangzhou&key=60317f77a63c432a872bbacbbed9e204',
	forcast: "https://free-api.heweather.com/v5/forecast",
	url: 'https://free-api.heweather.com/v5/forecast',
	params: (id) => {
		return {
			city: id,
			key: "60317f77a63c432a872bbacbbed9e204"
		}
	}
};
export const music = {
    america: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 3,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    mainland: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 5,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    hongkong: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 6,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    korea: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 16,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    japan: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 17,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    ballad: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 18,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    rock: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 19,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    bestSeller: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 23,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },
    hot: {
        url: 'https://route.showapi.com/213-4?showapi_appid=31967',
        params: (id) => {
            return {
                showapi_timestamp: null,
                topid: 26,
                showapi_sign: '7c45d428c1024a5e88c3cbc78a506646',
            }
        },
    },

}