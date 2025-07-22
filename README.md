# React + TypeScript + Vite + GithubPages + GithubActions

## 使用技術

- Vite
- React
- TypeScript
- Github Actions
- Github Pages

## 自動化について

診療報酬改定時にfrontend/data/内のcsvファイルを更新してmainにpushすると、自動でtsファイルに変換し、
GithubPagesにデプロイしてくれます。

csvの1行目は、

``` csv
code,name,stem_code,note
```

である必要があります。

[Kコード検索](https://kemickoko.github.io/kcode-viewer/)
