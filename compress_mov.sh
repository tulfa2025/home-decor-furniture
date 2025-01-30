#!/bin/bash

# Check if the directory path is provided
if [ -z "$1" ]; then
  echo "Please provide a directory path."
  exit 1
fi

# Define the directory containing your videos
DIRECTORY="$1"

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "The directory '$DIRECTORY' does not exist."
  exit 1
fi

# Loop through all .mov files in the directory
for file in "$DIRECTORY"/*.mov; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Set output filename with '_compressed' suffix
    output="${file%.*}_compressed.mov"
    
    # Compress .mov file using ProRes 4444 codec (maintaining transparency)
    ffmpeg -i "$file" -c:v prores_ks -profile 4 -pix_fmt yuva444p10le -s 640x360 -r 15 -an "$output"

    
    echo "Compressed $file to $output"
  fi
done
