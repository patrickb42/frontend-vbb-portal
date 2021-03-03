const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
            lessLoaderOptions: {
            lessOptions: {
                // Ant Design vars here: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                modifyVars: {
                    '@primary-color': 'fade(#ff914d, 85%)', //light orange
                    '@border-radius-base': '15px',
                    '@body-background': '#fffff6', //cream
                    '@font-family': 'Nunito, sans-serif',
                    '@icon-color': 'fade(#ff914d, 85%)', //light orange
                    '@font-size-base': '18px',
                    '@background-color-base': '#fffff6', //cream
                    '@btn-primary-bg': 'fade(#ff914d, 85%)',
                    // '#549bea', //blue
                },
                javascriptEnabled: true,
            },
            },
            },
        },
    ],
};