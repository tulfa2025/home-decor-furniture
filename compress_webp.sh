#!/bin/bash

# Check if the directory path is provided
if [ -z "$1" ]; then
  echo "Please provide a directory path."
  exit 1
fi

# Define the directory containing your images (first command line argument)
ROOT_DIRECTORY="$1"

# Check if the directory exists
if [ ! -d "$ROOT_DIRECTORY" ]; then
  echo "The directory '$ROOT_DIRECTORY' does not exist."
  exit 1
fi

# Recursively find all .webp files in the provided directory and subdirectories
find "$ROOT_DIRECTORY" -type f -iname "*.webp" | while read -r file; do
  # Set output filename (overwriting the original file after compression)
  output="$file"
  
  # Compress the WebP file using cwebp with lossless compression
  cwebp -q 15 "$file" -o "$output"
  
  echo "Compressed $file"
done
