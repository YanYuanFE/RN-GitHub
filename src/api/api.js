// const GET_POPULAR_REPO = (repo) => `https://api.github.com/search/repositories?q=${repo}&sort=stars`
export default {
  GET_POPULAR_REPO: (repo) => `https://api.github.com/search/repositories?q=${repo}&sort=stars`,
  GET_TRENDING_REPO: (repo) => `https://github.com/trending/${repo}`
}
