const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra({
  transpilePackages: ["@get-ui/react", ],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  // redirects: require("./next-redirect.js"),
  eslint: {
    ignoreDuringBuilds: true,
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
