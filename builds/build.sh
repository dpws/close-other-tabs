#!/bin/bash

filename="./builds/build-$(date +%F_%H-%M-%S).zip"

if [ -f "$filename" ]; then
    unlink "$filename"
fi

zip $filename * -r -x builds/\* .git\* Makefile README.md

echo  "Successfully build to $filename"