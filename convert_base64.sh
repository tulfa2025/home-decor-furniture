#!/bin/bash

# Check if input and output directories are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <input_directory> <output_directory>"
  exit 1
fi

# Set the input and output directories
INPUT_DIR="$1"
OUTPUT_DIR="$2"

# Check if the input directory exists
if [ ! -d "$INPUT_DIR" ]; then
  echo "Error: The input directory '$INPUT_DIR' does not exist."
  exit 1
fi

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through all image files in the input directory
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,webp}; do
  # Check if the file exists to avoid errors if no matches
  if [[ -f "$img" ]]; then
    # Extract the filename without extension
    filename=$(basename "$img")
    filename_no_ext="${filename%.*}"

    # Get the MIME type based on the file extension
    case "${img##*.}" in
      jpg|jpeg) mime="image/jpeg" ;;
      png) mime="image/png" ;;
      webp) mime="image/webp" ;;
      *) mime="application/octet-stream" ;;
    esac

    # Convert the image to base64 and save it to a .txt file in the output directory
    base64 "$img" | awk -v mime="$mime" '{print "data:" mime ";base64," $0}' > "$OUTPUT_DIR/${filename_no_ext}_base64.txt"

    echo "Converted $img → $OUTPUT_DIR/${filename_no_ext}_base64.txt"
  fi
done

echo "✅ All images in '$INPUT_DIR' have been converted to Base64 and saved in '$OUTPUT_DIR'."