#!/bin/bash

file="../home/microblog.json"

text="$(echo "$*" | sed 's/\"/\\\"/g')"
date="$(date '+%I%M%p %d%m %A')"
json="{\"text\":\"$text\",\"date\":\"$date\"}"

cat "$file" | jq ". += [$json]" | tee "$file"