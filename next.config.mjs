/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Add a rule to handle video files
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/videos/',
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  