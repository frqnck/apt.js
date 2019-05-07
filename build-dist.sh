#!/bin/bash

#
# Concateante all the files, removing extraneous ;function() wrappers.
#
OUT="";
for FILE in core ajax event dom src; do
    FILE="src/apt-$FILE.js"
    nb_lines=$(cat $FILE | wc -l)
    last_line=$(( $nb_lines - 1 ))
    txt=`sed "6,$last_line !D" $FILE`
    OUT+="$txt"
done
OUT=$(printf '%s\n' "$OUT" | sed 's,[\/&],\\&,g;s/$/\\/')
OUT=${OUT%?}
sed "s/{APT_SRC}/$OUT/g" src/_amd.js > dist/apt.js