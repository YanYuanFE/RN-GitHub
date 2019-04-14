// const GET_POPULAR_REPO = (repo) => `https://api.github.com/search/repositories?q=${repo}&sort=stars`
export default {
  GET_POPULAR_REPO: (language) => `https://api.github.com/search/repositories?q=${language}&sort=stars`,
  GET_TRENDING_REPO: (language, since = 'daily') => `https://github-trending-api.now.sh/repositories?language=${language}&since=${since}`
}
