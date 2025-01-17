import Head from 'next/head';

const ImagePreloader = ({ imageSet }) => {
    return (
      <Head>
        {imageSet.map((image) => (
          <link key={image[0]} rel="preload" href={image[0]} as="image" />
        ))}
      </Head>
    );
  };

export default ImagePreloader