#!/bin/bash

# Directory to process (default: current directory)
INPUT_DIR="${1:-.}"
OUTPUT_DIR="${2:-$INPUT_DIR/blur}"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Image size for blur (10px)
BLUR_SIZE="10x10"

# Supported image formats
IMAGE_EXTENSIONS=("jpg" "jpeg" "png" "webp")

echo "Generating blurred images in $OUTPUT_DIR..."

# Loop through image files
for EXT in "${IMAGE_EXTENSIONS[@]}"; do
  find "$INPUT_DIR" -type f -iname "*.${EXT}" | while read -r IMG; do
    BASENAME=$(basename "$IMG")
    OUTPUT_IMG="$OUTPUT_DIR/$BASENAME"

    # Convert image to 10x10 and save
    convert "$IMG" -resize "$BLUR_SIZE" "$OUTPUT_IMG"

    echo "Created blurred image: $OUTPUT_IMG"
  done
done

echo "Blur generation complete."