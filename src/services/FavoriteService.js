import { AsyncStorage } from 'react-native';

const FAVORITE_KEY = 'favorite_';

export default class FavoriteService {
	constructor(type) {
		this.type = type;
		this.favoriteKey = FAVORITE_KEY + type;
	}

	saveFavoriteItem = (key, value, callback) => {
		AsyncStorage.setItem(key, value, (error, result) => {
			if (!error) {
				this.updateFavoriteKeys(key, true);
				callback && callback();
			}
		})
	}

	updateFavoriteKeys = (key, isFavorite) => {
		AsyncStorage.getItem(this.favoriteKey, (error, result) => {
			if (!error) {
				let favoriteKeys = result ? JSON.parse(result) : [];
				const index = favoriteKeys.indexOf(key);
				if (isFavorite) {
					if (index === -1) favoriteKeys.push(key);
				} else {
					if (index !== -1) favoriteKeys.splice(index, 1);
				}
				AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
			}
		});
	}

	getFavoriteKeys = () => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(this.favoriteKey, (error, result) => {
				if (!error) {
					resolve(JSON.parse(result));
				} else {
					reject(error);
				}
			})
		})
	}

	removeFavoriteItem = (key, callback) => {
		AsyncStorage.removeItem(key, (error, result) => {
			if (!error) {
				this.updateFavoriteKeys(key, false);
				callback && callback();
			}
		})
	}

	getAllItems = () => {
		return new Promise((resolve, reject) => {
			this.getFavoriteKeys().then(keys => {
				let items = [];
				console.log(this.favoriteKey, keys);
				if (keys) {
					AsyncStorage.multiGet(keys, (error, stores) => {
						if (!error) {
							items = stores.map(result => {
								return JSON.parse(result[1]);
							})
							resolve(items);
						} else {
							reject(error);
						}
					})
				} else {
					resolve(items);
				}
			})
		})
	}



}
