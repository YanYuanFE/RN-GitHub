import API from './api';
import fetch from '../utils/fetch';

export function fetchPopularRepo(repo) {
  return fetch.get(API.GET_POPULAR_REPO(repo));
}
