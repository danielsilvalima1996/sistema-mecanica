# # ng build --prod --base-href "https://danielsilvalima1996.github.io/sistema-mecanica/"
# # git subtree push --prefix dist origin gh-pages
# # git add dist -f
# # git commit -m "buiid gh pages adicionado dist"
# # git subtree push --prefix dist origin gh-pages

# # ng build --prod --base-href "https://danielsilvalima1996.github.io/sistema-mecanica/"
# # ngh --dir=dist/

# ng build --prod --base-href "/sistema-mecanica/"
# git add dist/ -f
# git commit -m "adicionado dist"
# git subtree push --prefix dist origin gh-pages

#!/bin/bash
directory=dist
branch=gh-pages
build_command() {
  ng build --prod --base-href "/sistema-mecanica/"
}

echo -e "\033[0;32mDeleting old content...\033[0m"
rm -rf $directory

echo -e "\033[0;32mChecking out $branch....\033[0m"
git worktree add $directory $branch

echo -e "\033[0;32mGenerating site...\033[0m"
build_command

echo -e "\033[0;32mDeploying $branch branch...\033[0m"
cd $directory &&
  git add --all &&
  git commit -m "Deploy updates" &&
  git push origin $branch

echo -e "\033[0;32mCleaning up...\033[0m"
git worktree remove $directory