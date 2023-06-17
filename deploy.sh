#!/bin/sh -e

# Synchronize local changes to the server
git push $@

# Start building local changes
NODE_ENV=production npm run build

# Commit the output
DIST=dist
git add -f $DIST/*
git commit -m $DIST -n

# Make a branch to host the output
BRANCH=gh-pages
git subtree split --prefix $DIST -b $BRANCH

# Push the branch to gh-pages
git push -f origin $BRANCH:$BRANCH

# Clean up
git branch -D $BRANCH
git reset HEAD~
rm -rf $DIST
git checkout $DIST
