const withTM = require('next-transpile-modules')(['rc-util']); // Add rc-util to be transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
