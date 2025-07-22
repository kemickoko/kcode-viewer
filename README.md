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

csv内の形式は、
code,name,point_code,note1,note2
である必要があります。
