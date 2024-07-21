import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import withTM from 'next-transpile-modules';

const withTranspileModules = withTM(['rc-util']);

const nextConfig = {
  reactStrictMode: true,
  // Your other configurations
};

export default withTranspileModules(nextConfig);
