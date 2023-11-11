#01
  #1 Using git commands
  git clone https://github.com/SUContent/playground.git
  git add .
  git commit -m "Changed Readme.MD"
  git push

#02
  #1 conflict
  git status
  git add .
  git commit-m "ResolvedMergeConflict."
  git push

#03
  #1 create and clone repo
  git clone https://github.com/qceka88/DevOps.git
  #2 add and commit files
  git status
  #3 push to github
  git push

  #4 Create new branches
  git branch second
  git branch (select: second)

  #5 Commit new branch changes
  git add .
  git commit -m "added branches"
  git push

  #6 Add upstream and push changes
  git push --set-upstream origin upstreamtitle

  #7 Merge branches
  git checkout main
  git merge origin/second
  git merge origin/third

  #8 Delete Branch
  git branch
  git branch -d second
  git branch -d third
  git push oirigin -d second
  git push oirigin -d third

#04
  #1 create branch, make changes and push
  git branch second
  git checkout second
  #2 open pull request in github

  #3 request a review

  #4 team discusion
