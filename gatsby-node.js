const { getDataSource } = require('./src/data-loader');

exports.createPages = async({actions}) => {
    const {createPage} = actions;
    const dataSource = await getDataSource();
    // 기존 데이터소스를 getDataSource 함수 호출해서 받음
    createPage({ // 이거 실행되면, getDataSource 실행됨
        path: '/',
        component: require.resolve('./src/templates/single-page.js'),
        context: {dataSource}, // 실행
    });

};