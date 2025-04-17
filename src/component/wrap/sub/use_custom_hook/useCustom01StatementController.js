import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useCustom01StatementController(){
    const location = useLocation();

    const refSub = useRef([]);
    const refOrder = useRef([]);
    const [order, setOrder] = useState([]);
    const [tab, setTab] = useState([]);
    const [state, setState] = useState({
        배너:'',
        title:'',
        필터: [],
        필터상품: [],
        필터메뉴:{},
        product:[],
        상품필터박스: [],
        상품: [],
        필터탭버튼: '',
        정렬: '추천순',
        pathName:''
    });

    // 상태관리 반환값
    return {
        location, 
        refSub, 
        refOrder, 
        order, 
        setOrder, 
        tab, 
        setTab, 
        state, 
        setState
    }
}