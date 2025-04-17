import { useState, useEffect } from "react";

export default function useCustom03PagenationController({state}){
    // 페이지네이션
    const [pageView, setPageView] = useState(6);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageNumber, setPageNumber] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [pageArray, setPageArray] = useState([]);
    
    // 페이지 번호 배열 저장
    useEffect(()=>{
        if(state.상품.length > 0){
            let imsi = [];
            let page = [];
            let pageArr = [];
            let num = 0;
            num = Math.ceil(state.상품.length / pageView);
            // for(let i=0; i<num; i++){
            //     imsi[i] = i+1;
            // }
            imsi = Array(num).fill(0);
            pageArr = Array(num).fill(false);
            pageArr[0] = true;
            imsi.reduce((acc, item, idx)=>
                page[idx] = acc + 1
            , 0)
            setPageNumber(page);
            setPageTotal(num);
            setPageArray(pageArr);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state]);

    useEffect(()=>{
        let pageArr = Array(pageTotal).fill(false);
        pageArr[pageCurrent-1] = true;
        setPageArray(pageArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCurrent]);

    // 페이지 번호 클릭 이벤트
    const onClickPage=(e, num, idx)=>{
        e.preventDefault();
        setPageCurrent(num);
    }

    // 처음, 이전, 다음, 마지막 페이지로 이동
    const onClickFirst=(e)=>{
        e.preventDefault();
        setPageCurrent(1);
    }
    const onClickPrev=(e)=>{
        e.preventDefault();
        setPageCurrent(pageCurrent-1 <= 1 ? 1 : pageCurrent-1);
    }
    const onClickNext=(e)=>{
        e.preventDefault();
        setPageCurrent(pageCurrent+1 >= pageTotal ? pageTotal : pageCurrent+1);
    }
    const onClickLast=(e)=>{
        e.preventDefault();
        setPageCurrent(pageTotal)
    }

    return {
        pageView, 
        setPageView,
        pageCurrent, 
        setPageCurrent,
        pageNumber, 
        setPageNumber,
        pageTotal, 
        setPageTotal,
        pageArray, 
        setPageArray,
        onClickPage,
        onClickFirst,
        onClickPrev,
        onClickNext,
        onClickLast
    }
}