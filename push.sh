#!/bin/bash

# Push the changes to the remote repository

if [ -z "$1" ]; then
    echo "Please provide a commit message"
    exit 1
fi


git add .

git commit -m "$1"

git push