#!/bin/bash

blog=''
blog_edit=''
changelog=''
emoji=''

date="$(date '+%s')"

while getopts 'bBce' flag; do
    case "${flag}" in
        b) blog='true' ;;
        B) blog_edit='true' ;;
        c) changelog='true' ;;
        e) emoji='true' ;;
    esac
done

if [ "$blog" = 'true' ]; then
    # TODO
    filepath="$(find -wholename "*/blog/blog.json")"
    post="$(jq '.posts[-1]' "$filepath")"
    echo $post
    blog_path="*/blog/posts/$(echo "$post" | jq -r '.title' | sed 's/ /_/' | tr '[:upper:]' '[:lower:]').html"
    echo $blog_path
    blog_path="$(find . -wholename "$blog_path")"
    filesize="$(wc -c "$blog_path" | numfmt --to=iec)B"
    jq -n \
        --argjson dt "$date" \
        --arg sz "$filesize" \
        '{}'
elif [ "$blog_edit" = 'true' ]; then
    filepath="$(find -wholename "*/blog/blog.json")"
    echo "blog edit"
elif [ "$changelog" = 'true' ]; then
    filepath="$(find -wholename "*/home/changelog.json")"
    json="$(jq -n \
        --argjson dt "$date" \
        --arg tx "$2" \
        '{date: $dt, html: $tx}')"
    json="$(jq ". += [$json]" "$filepath")"
    echo $json | tee $filepath
elif [ "$emoji" = 'true' ]; then
    echo "$2" >> "$(find -wholename '*/misc/emojis.txt')"
fi