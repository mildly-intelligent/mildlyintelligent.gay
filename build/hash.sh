#!/bin/bash

output='/srv/build/hashes.txt'
prev="$(cat "$output")"
> $output

static='/srv/static/'

images_path="$static/images"
scripts_path="$static/scripts"
styles_path="$static/styles"
misc_path="$static/misc"

find "$images_path" "$scripts_path" "$styles_path" "$misc_path" -type f | while read file
do
    # file="$(realpath "$file")"
    hash="$(md5sum "$file" | awk '{print $1}')"
    prev_hash="$(echo "$prev" | grep "$file" | awk '{print $2}')"
    
    echo "$file $hash" >> $output

    if [ "$hash" != "$prev_hash" ] || [ "$1" == "--reset-all" ]; then
        echo "$(realpath "$file") $hash"
    fi
done