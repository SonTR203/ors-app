/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	env: {
		NEXT_PUBLIC_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
		NEXT_PUBLIC_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	},
};

module.exports = nextConfig;