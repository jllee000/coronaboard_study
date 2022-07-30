import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Select from 'react-select';


const options = [
    { value:'KR', label:'한국'},
    { value:'JP', label:'일본'},
    { value:'US', label:'미국'},
    { value:'CH', label:'중국'},

];

export default function SelectPage(){
    const [selectedOptionSingle, setSelectedOptionSingle] = useState();
    const [selectedOptionMulti, setSelectedOptionMulti] = useState();
    return (
        <Container className="pt-3">
            <h5>단일 선택 상자</h5>
            <Select // Select 컴포넌트 사용
            value={(selectedOptionSingle) => {
                console.log('Single options selected', selectedOption);
                setSelectedOptionSingle(selectedOption);
            }}
            options={options}
            />

            <hr />
            <h5>다중 선택 상자</h5>
            <Select 
            isMulti={true}
            isSearchable={true} // 선택상자 종류와 무관하게 항목 검색 지원
            placeholder="국가 선택..."
            value={selectedOptionMulti}
            onChange={(selectedOptions) => { // 항목들이 배열형태로 됨
                console.log('Multiple options selected', selectedOptions);
                setSelectedOptionMulti(selectedOptions);
            }}
            options={options}
            />
        </Container>
    );
}