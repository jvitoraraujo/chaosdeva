/* Ranqueamento de repositórios. Fonte única: usado pelo site (navegador) e pela Action (Node). */
(function (root) {
  function rankRepos(all, GH, now) {
    now = now || Date.now();
    const ex = GH.exclude.map((x) => x.toLowerCase());
    const score = (r) => {
      const months = (now - new Date(r.pushed_at)) / 2.63e9;
      return (GH.pin.includes(r.name) ? 100 : 0) + r.stargazers_count * 4 + r.forks_count * 3 +
        (r.homepage ? 2 : 0) + (r.description ? 2 : 0) + (months <= 6 ? 3 : months <= 12 ? 1 : 0);
    };
    return all
      .filter((r) => !r.fork && !r.archived && !r.disabled && !ex.includes(r.name.toLowerCase()))
      .sort((x, y) => score(y) - score(x) || new Date(y.pushed_at) - new Date(x.pushed_at))
      .slice(0, GH.limit)
      .map((r) => ({ name: r.name, description: r.description, language: r.language, topics: (r.topics || []).slice(0, 2),
        stargazers_count: r.stargazers_count, forks_count: r.forks_count, html_url: r.html_url, homepage: r.homepage, pushed_at: r.pushed_at }));
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { rankRepos };
  else root.rankRepos = rankRepos;
})(typeof window !== 'undefined' ? window : globalThis);
