# ng build --prod --base-href "/sistema-mecanica/"
npm run ghp-build
git add dist -f
git commit -m "build gh pages adicionado dist"
git subtree push --prefix dist origin gh-pages