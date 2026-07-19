#!/bin/bash

if [ "$1" == "--reset-all" ]; then
	hashes="$(/srv/build/hash.sh --reset-all)"
else
	hashes="$(/srv/build/hash.sh)"
fi


echo "$hashes" | while read line
do
	file="$(echo "$line" | awk '{print $1}')"
	file="$(basename -- "$file" | sed 's/\./\\\./g')"
	hash="$(echo "$line" | awk '{print $2}')"

	regex="\"(https:\/\/static\.mildlyintelligent\.gay\/[a-zA-z0-9\-_\/]+)\/($file)(\?hash\=[0-9a-f]{32})?\""
	
	if [ ! -z "$hash" ]; then
		echo hashing $file with hash $hash
	fi

	find /srv/www/ -type f -name "*.html" -printf 'Updating %p\n' -exec sed -i.bak -E "s/$regex/\\\"\1\/\2?hash=$hash\\\"/g" {} +
done