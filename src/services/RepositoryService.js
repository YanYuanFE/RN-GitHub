import { AsyncStorage } from 'react-native';
import GitHubTrending from 'GitHubTrending';
import fetchUtils from '../utils/fetch';
import API from '../api/api';

export const TYPE = {
	Popular: 'POPULAR',
	Trending: 'TRINDING'
};

export default class RepositoryService {
	constructor(type) {
		this.type = type;
	}

	fetchData = (repo) => {
		if (this.type === TYPE.Popular) {
			return this.fetchPopularData(API.GET_POPULAR_REPO(repo));
		} else if (this.type === TYPE.Trending) {
			return this.fetchTrendingData(API.GET_TRENDING_REPO(repo));
		}
	};

	fetchPopularData = (url) => {
		return fetchUtils.get(url);
	};

	fetchTrendingData = (url) => {
		return new Promise((resolve, reject) => {
			new GitHubTrending().fetchTrending(url)
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(error);
			})
		});
	}
}
