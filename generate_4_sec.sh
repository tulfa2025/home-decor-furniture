#!/bin/bash

# Check if a directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Assign the directory from the command-line argument
directory="$1"

# Check if the provided directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory $directory does not exist."
    exit 1
fi

# Loop through all video files in the provided directory
for file in "$directory"/*.mp4 "$directory"/*.mkv "$directory"/*.avi "$directory"/*.mov; do
    # Check if the file exists (in case no video files match)
    if [[ -f "$file" ]]; then
        # Output file name (you can change the extension or format if needed)
        output="${directory}/output_$(basename "$file")"

        # Run ffmpeg command to extract the first 4 seconds
        ffmpeg -i "$file" -t 4 -c:v copy -c:a copy "$output"
        
        echo "Processed $file -> $output"
    fi
done

