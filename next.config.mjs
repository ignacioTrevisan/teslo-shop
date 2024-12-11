import { hostname } from "os";

const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    }
    ]
  }
};

export default nextConfig;
