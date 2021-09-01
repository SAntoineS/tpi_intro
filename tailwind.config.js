module.exports = {
    purge: [
        './public/**/*.html',
        './src/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'gray-general': '#151515',
                'gray-card': '#202020',
                'gray-button': '#2c2c2c'
            },
            fontFamily: {
                body: ['Montserrat'],
            },
            width: {
                'customWidthCard': '365px'
            },
            height: {
                'customHeightCard': '385'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
