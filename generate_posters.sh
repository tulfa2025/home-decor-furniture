#!/bin/bash

# Check if input and output directories are provided as arguments
if [ $# -lt 2 ]; then
  echo "Usage: $0 <input_directory> <output_directory>"
  exit 1
fi

# Input directory containing videos
VIDEO_DIR="$1"

# Output directory where posters will be saved
POSTER_DIR="$2"

# Create the output directory if it doesn't exist
mkdir -p "$POSTER_DIR"

# Loop through all video files in the specified input directory
for video in "$VIDEO_DIR"/*.{mp4,mkv,avi}; do
  # Check if it's a valid video file
  if [[ -f "$video" ]]; then
    # Get the filename without extension
    filename=$(basename "$video")
    filename_noext="${filename%.*}"

    # Output poster file names for desktop and mobile sizes
    output_poster_desktop="$POSTER_DIR/$filename_noext-desktop.jpg"
    output_poster_mobile="$POSTER_DIR/$filename_noext-mobile.jpg"

    # Generate the desktop-sized poster (1280x720)
    ffmpeg -i "$video" -vframes 1 -an -s 1280x720 -f image2 "$output_poster_desktop"
    echo "Generated desktop-sized poster for $video at $output_poster_desktop"

    # Generate the mobile-sized poster (720x1280)
    ffmpeg -i "$video" -vframes 1 -an -s 720x1280 -f image2 "$output_poster_mobile"
    echo "Generated mobile-sized poster for $video at $output_poster_mobile"
  fi
done