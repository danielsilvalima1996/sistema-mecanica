ng build --prod --base-href "/sistema-mecanica"
git subtree push --prefix dist origin gh-pages
git add .
git add dist/ -f
git commit -m "buiid gh pages adicionado dist"
git subtree push --prefix dist origin gh-pages