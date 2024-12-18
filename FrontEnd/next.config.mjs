/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.codegym.vn',
                port: '',
                pathname: '/wp-content/uploads/2022/01/khoa-hoc-lap-trinh-java-online-9.jpg',
            },
            {
                protocol: 'https',
                hostname: 'hoclaptrinhonline.asia',
                port: '',
                pathname: '/pluginfile.php/2137/course/overviewfiles/la%CC%A3%CC%82p-tri%CC%80nh-web-min.png',
            },
            {
                protocol: 'https',
                hostname: 'f.howkteam.vn',
                port: '',
                pathname: '/Upload/cke/images/1_LOGO%20SHOW%20WEB/7_JavaScript/Javascript%20c%C6%A1%20ba%CC%89n/00_%20Javascript%20basic_Kteam.png',
            },
            {
                protocol: 'https',
                hostname: 'img.allfootballapp.com',
                port: '',
                pathname: '/www/M00/51/75/720x-/-/-/CgAGVWaH49qAW82XAAEPpuITg9Y887.jpg.webp',
            },
        ],
    },
};

export default nextConfig;
