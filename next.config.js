module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Локальный путь
          destination: "https://backend.qa.cms.chaika.com/:path*", // Путь к API
        },
      ];
    },
  };
  