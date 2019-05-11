import AsyncStorage from '@react-native-community/async-storage';
import fetchUtils from '../utils/fetch';
import API from '../api/api';

export const TYPE = {
	Popular: 'POPULAR',
	Trending: 'TRENDING'
};

export default class RepositoryService {
	constructor(type) {
		this.type = type;
	}

	fetchData = (language) => {
		let url;
		if (this.type === TYPE.Popular) {
			url = API.GET_POPULAR_REPO(language);
		} else if (this.type === TYPE.Trending) {
			url = API.GET_TRENDING_REPO(language);
		}

		return new Promise((resolve, reject) => {
			this.fetchLocalData(url).then(data => {
				if (data) {
					resolve(data);
				} else {
					this.fetchOnlineData(url).then(data => {
						resolve(data);
					}).catch(err => {
						reject(err);
					})
				}
			}).catch(err => {
				this.fetchOnlineData(url).then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				})
			})
		})
	};

	searchData = (key) => {
		const url = API.GET_POPULAR_REPO(key);
		return new Promise((resolve, reject) => {
			this.fetchOnlineData(url).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			})
		});
	};

	fetchLocalData = (url) => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(url, (error, result) => {
				if (!error) {
					try {
						const resultData = JSON.parse(result);
						resolve(resultData.data);
					} catch (e) {
						reject(e);
					}
				} else {
					reject(error);
				}
			})
		})
	};

	fetchOnlineData = (url) => {
		return new Promise((resolve, reject) => {
			fetchUtils.get(url)
				.then(data => {
					resolve(data);
					this.saveData(url, data);
				})
				.catch(error => {
					reject(error);
				})
		});
	};

	fetchPopularData = (url) => {
		return new Promise((resolve, reject) => {
			fetchUtils.get(url)
				.then(data => {
					resolve(data);
					this.saveData(url, data);
				})
				.catch(error => {
					reject(error);
				})
		});
	};

	saveData = (url, data, callback) => {
		if (!url || !data) return;
		const resultData = { data, time: new Date().getTime()};
		AsyncStorage.setItem(url, JSON.stringify(resultData), callback);
	}
}
