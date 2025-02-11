import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, options) {
    config.module.rules.push(
      /* Use inbuilt Webpack loader to handle .tif files */
      {
        test: /\.tif$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]", // Output to the `static/media/` folder,

          /**
           * This property ensures that webpack outputs the media to the public location for loaded files
           * https://webpack.js.org/configuration/module/
           */
          outputPath: "../",
        },
      }
    );
    return config;
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/webp"],
  }

};

export default nextConfig;
