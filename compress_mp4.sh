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

# Loop through all video files (mp4, mkv, avi) in the directory
for file in "$DIRECTORY"/*.{mp4,mkv,avi,mov,webm}; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Set output filename with '_compressed' suffix
    output="${file%.*}_compressed.mp4"
    
    # Compress video using ffmpeg (H.264 codec, CRF 28, preset 'fast')
ffmpeg -i "$file" -vcodec libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -crf 22 -preset veryslow -movflags +faststart -an "$output"
    
    echo "Compressed $file to $output"
  fi
done
