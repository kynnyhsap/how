#!/usr/bin/env bash

VERSION="$1"

OUT_DIR="./out/*"

gh release create $VERSION \
    --title $VERSION \
    --target main \
    --generate-notes \
    --draft \
    $OUT_DIR