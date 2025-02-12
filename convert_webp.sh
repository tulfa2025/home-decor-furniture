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

# Recursively find all image files (jpg, jpeg, png) in the provided directory and subdirectories
find "$ROOT_DIRECTORY" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
  # Set output filename with .webp extension (in the same directory as the original file)
  output="${file%.*}.webp"
  
  # Convert image to WebP using cwebp
  cwebp -q 10 "$file" -o "$output"
  
  echo "Converted $file to $output"
done
