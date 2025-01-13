#!/bin/bash

# Define the directory containing your images
DIRECTORY="$1"

# Check if directory is provided
if [ -z "$DIRECTORY" ]; then
  echo "Please provide a directory path."
  exit 1
fi

# Loop through all image files in the directory (jpg, jpeg, png, etc.)
for file in "$DIRECTORY"/*.{jpg,jpeg,png}; do
  # Check if the file exists and is an image
  if [ -f "$file" ]; then
    # Set output filename with .webp extension
    output="${file%.*}.webp"
    
    # Convert image to WebP using cwebp
    cwebp -q 75 "$file" -o "$output"
    
    echo "Converted $file to $output"
  fi
done
#!/bin/bash

# Check if the directory path is provided
if [ -z "$1" ]; then
  echo "Please provide a directory path."
  exit 1
fi

# Define the directory containing your images (first command line argument)
DIRECTORY="$1"

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "The directory '$DIRECTORY' does not exist."
  exit 1
fi

# Loop through all image files in the directory (jpg, jpeg, png, etc.)
for file in "$DIRECTORY"/*.{jpg,jpeg,png}; do
  # Check if the file exists and is an image
  if [ -f "$file" ]; then
    # Set output filename with .webp extension
    output="${file%.*}.webp"
    
    # Convert image to WebP using cwebp
    cwebp -q 75 "$file" -o "$output"
    
    echo "Converted $file to $output"
  fi
done

