// 라이브러리 갖고 오기
const axios =require('axios'); // axios는 HTTP 클라이언트
const {subDays} = require('date-fns'); // data-fns는 시간이나 날짜 포맷팅
const { format, utcToZonedTime }  =require('date-fns-tz'); 
const _=require('lodash'); // 편의 기능등

const countryInfo = require('../tools/downloaded/countryInfo.json');
// countryInfo 변수는 해당 파일의 국가정보 배열

async function getDataSource() {
  const countryByCc = _.keyBy(countryInfo, 'cc'); 
  // 국가 정보 배열 원본에다가 앞에 key를 cc로 지정! 찾기편하게!!
  const globalStats = await generateGlobalStats();
  // 국가별 코로나현황 정보 저장 변수로, 비동기 Api요청
  // 결과 준비될때까지 기다렸다가 함수 실행하는 await 키워드

  return {
    globalStats, // 반환
    countryByCc,
  };
}

async function generateGlobalStats() {
  const apiClient = axios.create({
    baseURL : process.env.CORONABOARD_API_BASE_URL || 'http://localhost:8000',
  });
  // api client로 Api 호출코드

  const response = await apiClient.get('global-stats');
  const groupedByDate = _.groupBy(response.data.result, 'date');
  // groupedByDate는 해당 날짜 기준의 데이터 크롤링

  const now = new Date('2021-06-05'); // 일단은 데이터업로드 마지막 날짜로,,
  const timeZone = 'Asia/Seoul'; // 한국(서울) 날짜 기준
  const today = format(utcToZonedTime(now, timezone), 'yyyy-MM-dd');
  const yesterday = format(
    utcToZonedTime(subDays(now, 1), timeZone),
    'yyyy-MM-dd',
  );
   
  if (!groupedByDate[today]) { // 오늘 날짜의 데이터가 존재하지 않으면
    throw new Error('Data for today is missing');
    // 오류메시지 출력
  }

  return createGlobalStatWithPrevField(
    groupedByDate[today],
    groupedByDate[yesterday],
  );
}

// 밑 함수는 오늘, 어제 데이터를 모두 가진 하나의 객체 만드는 역할
// 이렇게 담아두면, 전일 대비 증감량 비교 가능
function createGlobalStatWithPrevField(todayStats, yesterdayStats) {
  const yesterdayStatsByCc = _.keyBy(yesterdayStats, 'cc');

  const globalStatWithPrev = todayStats.map((todayStat) => {
    const cc = todayStat.cc;
    const yesterdayStat = yesterdayStatsByCc[cc];

    if (yesterdayStat) {
      return {
        ...todayStat,
        confirmedPrev : yesterdayStat.confirmed || 0,
        deathPrev : yesterdayStat.death || 0,
        negativePrev : yesterdayStat.negative || 0,
        releasedPrev : yesterdayStat.released || 0,
        testedPrev : yesterdayStat.tested || 0,
      };
    }

    return todayStat;
  });
  return globalStatWithPrev;  
}

module.exports = {
  getDataSource,
};
