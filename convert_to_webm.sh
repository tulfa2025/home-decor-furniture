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

# Loop through all video files (mp4, mkv, avi, mov, webm) in the directory
for file in "$DIRECTORY"/*.{mp4,mkv,avi,mov,webm}; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Check if the file is a .mov file
    if [[ "$file" == *.mov ]]; then
      # Set output filename for WebM with transparency
      output="${file%.*}_transparent.webm"
      
      # Convert MOV to WebM with VP8 codec and transparency (alpha channel)
      ffmpeg -i "$file" -c:v vp9 -auto-alt-ref 0 -quality best -cpu-used 0 -crf 10 -pix_fmt yuva420p -an "$output"

      
      echo "Converted $file to $output (WebM with transparency)"
    else
      # For other video formats (mp4, mkv, avi), compress and convert to mp4
      output="${file%.*}_compressed.mp4"
      
      # Compress video using ffmpeg (H.264 codec, CRF 22, preset 'veryslow')
      ffmpeg -i "$file" -vcodec libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -crf 22 -preset veryslow -movflags +faststart -an "$output"
      
      echo "Compressed $file to $output"
    fi
  fi
done
