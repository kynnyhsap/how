#!/usr/bin/env bash

# enable strict error handling
set -euo pipefail

PLATFORM=$(uname -ms)

# determine the target platform
case $PLATFORM in
'Darwin x86_64')
    TARGET=darwin-x64
    ;;
'Darwin arm64')
    TARGET=darwin-arm64
    ;;
'Linux aarch64' | 'Linux arm64')
    TARGET=linux-arm64
    ;;
'Linux x86_64' | *)
    TARGET=linux-x64
    ;;
esac


# create installation directory if it doesn't exist
INSTALL_DIR="$HOME/.how/bin"

mkdir -p "$INSTALL_DIR"


# download binary from GitHub
BINARY_URL="https://github.com/kynnyhsap/how/releases/latest/download/how-$TARGET"

EXECUTABLE_NAME="how"

curl -L "$BINARY_URL" -o "$INSTALL_DIR/$EXECUTABLE_NAME"

# make the binary executable
chmod +x "$INSTALL_DIR/$EXECUTABLE_NAME"

# update PATH in shell profile

if [[ "$SHELL" == */zsh ]]; then
    PROFILE="$HOME/.zshrc"
elif [[ "$SHELL" == */bash ]]; then
    PROFILE="$HOME/.bashrc"
else
    echo "Unsupported shell. Please add $INSTALL_DIR to your PATH manually."
    exit 1
fi

if ! grep -q "$INSTALL_DIR" "$PROFILE"; then
    echo -e "\n\n# how cli" >> "$PROFILE"
    echo "export PATH=\$PATH:$INSTALL_DIR" >> "$PROFILE"

    echo "Added $INSTALL_DIR to PATH in $PROFILE"
else
    echo "PATH already includes $INSTALL_DIR"
fi

echo "Installation complete."

echo "Please restart your terminal or run 'source $PROFILE' to use the command."

echo "Run 'how --help' to get started."


