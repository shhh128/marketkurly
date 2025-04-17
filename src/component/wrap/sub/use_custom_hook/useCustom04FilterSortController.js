import { useEffect } from "react";

export default function useCustom04FilterSortController(
    {
        setTab,
        setState,
        state,
        setOrder,
        refSub
    }
){
    // 상단 필터 버튼 클릭 이벤트
    const onClickFilterBtn=(e, 필터탭버튼, idx)=>{
        e.preventDefault();

        let a = Array(7).fill(false);
        a[idx] = true;
        setTab(a);

        setState({
            ...state,
            필터탭버튼: 필터탭버튼
        })

    }

    // 로딩시 필터탭버튼 인기신상랭킹
    // 필터탭버튼 클릭시 해당 필터탭버튼 메뉴 전달 구현
    useEffect(()=>{
        filterTabBtn(state.필터탭버튼);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.필터탭버튼]);
    
    // 필터탭버튼 메뉴 구현 함수
    function filterTabBtn(필터탭버튼){
        let imsi = [];
        imsi = state.product.filter((item)=>item['필터'].includes(필터탭버튼));
        setState({
            ...state,
            필터상품: imsi,
            상품: imsi
        })
    }

    useEffect(()=>{
        let idx = 0;
        if(state.정렬==='추천순'){
            idx = 0;
        }
        else if(state.정렬==='신상품순'){
            idx = 1;
        }
        else if(state.정렬==='판매량순'){
            idx = 2;
        }
        else if(state.정렬==='낮은 가격순'){
            idx = 3;
        }
        else if(state.정렬==='높은 가격순'){
            idx = 4;
        }
        
        onClickSortBtn(null, state.정렬, idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.필터상품]);

    // 우측 중간 정렬 버튼 클릭 이벤트
    const onClickSortBtn=(e, 정렬, idx)=>{
        if(e!==null){
            e.preventDefault();
        }

        let a = Array(5).fill(false);
        a[idx]=true;
        setOrder(a);

        let imsi = [];
        
        switch (정렬){
            case "추천순":
                imsi = state.필터상품.sort((a, b)=>a.상품번호 < b.상품번호 ? -1 : a.상품번호 > b.상품번호 ? 1 : 0);
                imsi = imsi.sort((a, b)=>a.추천 > b.추천 ? -1 : a.추천 < b.추천 ? 1 : 0);
                break;  
            case "신상품순":
                imsi = state.필터상품.sort((a, b)=>a.상품번호 < b.상품번호 ? -1 : a.상품번호 > b.상품번호 ? 1 : 0);
                break;  
            case "판매량순":
                imsi = state.필터상품.sort((a, b)=>a.상품번호 < b.상품번호 ? -1 : a.상품번호 > b.상품번호 ? 1 : 0);
                imsi = imsi.sort((a, b)=>b.판매량 - a.판매량);
                break;  
            case "낮은 가격순":
                imsi = state.필터상품.sort((a, b)=>a.상품번호 < b.상품번호 ? -1 : a.상품번호 > b.상품번호 ? 1 : 0);
                // imsi = imsi.sort((a, b)=>a.정가 - b.정가);
                imsi = imsi.sort((a, b)=>(a.정가*(1-a.할인율)) - (b.정가*(1-b.할인율)));
                break;  
            case "높은 가격순":
                imsi = state.필터상품.sort((a, b)=>a.상품번호 < b.상품번호 ? -1 : a.상품번호 > b.상품번호 ? 1 : 0);
                // imsi = imsi.sort((a, b)=>b.정가 - a.정가);
                imsi = imsi.sort((a, b)=>(b.정가*(1-b.할인율)) - (a.정가*(1-a.할인율)));
                break;  
            default:
                return false;    
        }
        
        setState({
            ...state,
            상품: imsi,
            정렬: 정렬
        });
    }
    
    // 필터메뉴가 들어오면 높이를 모두 각각 서브높이 설정
     useEffect(()=>{
        if(Object.keys(state.필터메뉴).length>0){
            Object.keys(state.필터메뉴).map((item, i)=>  
                refSub.current[i].style.height = `${38 * state.필터메뉴[item].length}px`
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.필터메뉴]);

    // 좌측 서브메뉴 버튼 클릭 이벤트
    const onClickSubBtn=(e, i, item)=>{
        e.preventDefault();
        // 픽셀단위를 => 숫자로 변환하고
        const num = Number(refSub.current[i].style.height.replace( /[^0-9]/g ,''));
        if(num>0){
            refSub.current[i].style.height = 0;
        }
        else{
            refSub.current[i].style.height = `${38 * state.필터메뉴[item].length}px`;
        }       
    }

    // 체크박스 온체인지(onChange) 이벤트
    const onChangeCheckEvent=(e, 필터메뉴, 필터항목)=>{
        let imsi = state.상품필터박스;

        if(e.target.checked === true){            
            if(필터메뉴.includes('가격')){
                imsi = imsi.filter((item)=> !Object.keys(item).includes('가격') ); // 이전 가격 제거 
                imsi = [...imsi, {[필터메뉴]: 필터항목}] // 새로 추가된 가격 저장
            }
            else{
                imsi = [...imsi, {[필터메뉴]: 필터항목}]
            }

        }
        else {
            imsi = imsi.filter((item)=>item[Object.keys(item)] !== 필터항목); // 삭제
        }

        setState({
            ...state,
            상품필터박스: imsi
        })
    }

    // 삭제
    const onClickProductFilterBoxDel=(e, 삭제항목)=>{
        let imsi = state.상품필터박스;

        imsi = imsi.filter((item) => item[Object.keys(item)] !== 삭제항목);
        setState({
            ...state,
            상품필터박스: imsi
        })
    }

    // 상품필터박스에 필터항목이 있거나 없거나 변경되면 반응
    useEffect(()=>{
        let imsi = [];

        if(state.상품필터박스.length > 0){
            imsi = [];

            // eslint-disable-next-line array-callback-return
            state.상품필터박스.map((필터항목) =>{   
                // 브랜드 {브랜드: "상온"}
                // 갸격 {갸격: "상온"}
                // 포장타입  {포장타입: "상온"}
                // 그외(else) 모든 필터메뉴
                if( Object.keys(필터항목)[0] ==='브랜드'){                   
                     imsi = [...imsi,  ...state.필터상품.filter((item)=> item['상품명'].includes(필터항목[Object.keys(필터항목)]) )]    
                }
                else if( Object.keys(필터항목)[0] ==='포장타입'){
                     imsi = [...imsi,  ...state.필터상품.filter((item)=> item[Object.keys(필터항목)]['보관방법'].includes(필터항목[Object.keys(필터항목)]) )]    
                }
                else if( Object.keys(필터항목)[0] ==='가격'){
                    const regExp = /[,|\s|원|미만|이상]/g; 

                    if(필터항목[Object.keys(필터항목)].includes('미만')){
                         imsi = [...imsi,  ...state.필터상품.filter((item)=> item['정가'] < Number(필터항목[Object.keys(필터항목)].replace(regExp, ''))  )] 
                        //  imsi = [...imsi,  ...state.필터상품.filter((item)=> (item['정가']*(1-item['할인율'])) < Number(필터항목[Object.keys(필터항목)].replace(regExp, ''))  )] 
                    }                    
                    else if(필터항목[Object.keys(필터항목)].includes('이상')){
                         imsi = [...imsi,  ...state.필터상품.filter((item)=> item['정가'] >= Number(필터항목[Object.keys(필터항목)].replace(regExp, ''))  )] 
                    }
                    else {
                         imsi = [...imsi,  ...state.필터상품.filter((item)=> item['정가'] >=  Number(필터항목[Object.keys(필터항목)].replace(regExp, '').split('~')[0])   &&   item['정가'] < Number(필터항목[Object.keys(필터항목)].replace(regExp, '').split('~')[1])  )] 
                    }
                    
                }
                else{
                     imsi = [...imsi,  ...state.필터상품.filter((item)=> item[Object.keys(필터항목)[0]] === 필터항목[Object.keys(필터항목)] )]     
                }
            })           
        }
        else {
              // 필터 메뉴박스가 미어 있으면 인기신생 랭킹 에서 가져오기  
              imsi = state.필터상품;
        }

        // console.log( imsi );
        // 중복제거
        const result = imsi.reduce((acc, item)=>acc.some((item2)=>item2.상품번호.includes(item.상품번호)) ? acc : [...acc, item] , []);
        setState({
            ...state,
            상품: result
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.상품필터박스])

    return {
        onClickFilterBtn,
        filterTabBtn,
        onClickSortBtn,
        onClickSubBtn,
        onChangeCheckEvent,
        onClickProductFilterBoxDel
    }
}