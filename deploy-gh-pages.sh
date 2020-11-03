npm run ghp-build
git branch -d postgres
git add dist -f
git commit -m "build gh pages adicionado dist"
git subtree push --prefix dist origin gh-pages