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

# Loop through all video files in the specified input directory (including MOV)
for video in "$VIDEO_DIR"/*.{mp4,mkv,avi,mov}; do
  # Check if it's a valid video file
  if [[ -f "$video" ]]; then
    # Get the filename without extension
    filename=$(basename "$video")
    filename_noext="${filename%.*}"

    # Output poster file names for desktop, mobile, and original aspect ratio sizes (using PNG)
    output_poster_desktop="$POSTER_DIR/$filename_noext-desktop.png"
    output_poster_mobile="$POSTER_DIR/$filename_noext-mobile.png"
    output_poster_natural="$POSTER_DIR/$filename_noext-natural.png"

    # Get the video's natural resolution (width and height)
    resolution=$(ffmpeg -i "$video" 2>&1 | grep -oP '(?<=, )\d+x\d+' | head -n 1)

    # If resolution is found, proceed to generate the posters
    if [ -n "$resolution" ]; then
      # Generate the desktop-sized poster (1280x720) with PNG format to preserve transparency
      ffmpeg -i "$video" -vframes 1 -an -s 1280x720 -f image2 -vcodec png "$output_poster_desktop"
      echo "Generated desktop-sized poster for $video at $output_poster_desktop"

      # Generate the mobile-sized poster (720x1280) with PNG format to preserve transparency
      ffmpeg -i "$video" -vframes 1 -an -s 720x1280 -f image2 -vcodec png "$output_poster_mobile"
      echo "Generated mobile-sized poster for $video at $output_poster_mobile"

      # Generate the still image based on the original video resolution (natural aspect ratio)
      ffmpeg -i "$video" -vframes 1 -an -s "$resolution" -f image2 -vcodec png "$output_poster_natural"
      echo "Generated natural aspect ratio-sized poster for $video at $output_poster_natural"
    else
      echo "Could not retrieve resolution for $video"
    fi
  fi
done
