module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        // 配置 loader (第一步)
        {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 8192,
            name(resourcePath, resourceQuery) {
              let finalPath = resourcePath.replace(/^.*public\\/, '').replace(/\\/g, '/')
              if(/\//.test(resourcePath)) {
                finalPath = resourcePath.replace(/^.*public\//, '').replace(/\//g, '/')
              }
              return `${finalPath}`
            },
            publicPath: '/'
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    })

    return config
  }
}
