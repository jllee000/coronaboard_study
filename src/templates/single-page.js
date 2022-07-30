import React from 'react';
import {Slide} from '../components/slide';


export default function SinglePage({pageContext}) {
    const {dataSource} = pageContext;
    const {countryByCc, globalStats} = dataSource;

    console.log(countryByCc);
    console.log(globalStats);

    return ( // 화면 출력도 가능하게 한다.
        <div>
            <h1>코로나보드</h1>
            <p>createPage로 만들어진 페이지입니다.</p>
            <Slide title="국가별 현황">국가별 현황을 보여줍니다.</Slide>
        </div>
    );
}