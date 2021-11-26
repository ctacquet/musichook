module.exports = {
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "albums.content.hardstyle.com", "m.media-amazon.com", "i.scdn.co", "source.unsplash.com"],
    }
}


/*
const withCSS = require('@zeit/next-css');

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {};
}

module.exports = {
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        };

        return config;
    },
};

module.exports = withCSS({
    cssModules: true,
    cssLoaderOptions: {
        url: true,
    },
});*/
