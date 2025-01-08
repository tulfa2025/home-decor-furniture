import fs from 'fs';
import path from 'path';

type ImageSet = {
    [key: string]: {
        images: Array<string>
    },
};

export async function getStaticProps(dirPath: string, fetchNextLayer: boolean) {

    const imagesDir = path.join(process.cwd(), `src/app/assets/images/${dirPath}`);
    const imageFiles = fs.readdirSync(imagesDir);

    const imageSet: ImageSet = {};

    if (fetchNextLayer) {

        imageFiles.forEach((file) => {

            //Get path of nested image
            const fullPath = path.join(dirPath, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                const imageFiles = fs
                    .readdirSync(fullPath)
                    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file)) // Filter image files
                    .map((file) => {
                        return `../assets/images/${file}`; // This will give you the path to the image in the bundle
                    });

                // Store the directory name (without path) and the image files
                imageSet[file].images = imageFiles;

            }
        })

    } else {

        imageSet["top"].images = imageFiles
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file)) // Filter image files
            .map((file) => {
                return `../assets/images/${file}`; // This will give you the path to the image in the bundle
            });

    }

    return imageSet
}

export default getStaticProps;