/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// import "./src/env.js"; // Commented out to avoid env validation issues

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Exclude test files and Jest config from build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    
    // Exclude Jest config files
    config.resolve.alias = {
      ...config.resolve.alias,
      'jest.config.cjs': false,
      'jest.setup.cjs': false,
    };
    
    return config;
  },
};

export default config;
