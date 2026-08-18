/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://mobltak.ir',
    generateRobotsTxt: false,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin', '/admin/*'], // ← این خط را اضافه کنید
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};