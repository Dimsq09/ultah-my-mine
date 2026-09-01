import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = "ultah-my-mine";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repo}` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
