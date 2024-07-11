#!/usr/bin/env bash

SOURCE_FILE="./src/index.ts"

OUT_DIR="./out"

mkdir -p "$OUT_DIR"

# array of targets
targets=(
    "darwin-x64"
    "darwin-arm64"
    "linux-x64"
    "linux-arm64"
)

for target in "${targets[@]}"; do
    echo "Compiling for $target..."

    bun build --compile --minify --sourcemap --target="bun-$target" --outfile "$OUT_DIR/how-$target" $SOURCE_FILE
done

echo "Compilation complete for all targets!"