import { useEffect } from 'react';
import axios from 'axios';

export default function useCustom02AxiosApiController(
    {
        location, 
        setState,
        state,
        setTab,
        setOrder
    }
){
    useEffect(()=>{
        axios({
            url: `./data/sub/${location.pathname}.json`,
            method: 'GET'
        })
        .then((res)=>{
            // console.log(res);
            const pathName = location.pathname.replace(/[/]/g, '')
            setState({
                ...state,
                pathName: pathName,
                배너: res.data[pathName].배너,
                title: res.data[pathName].title,
                필터: res.data[pathName].필터,
                필터메뉴: res.data[pathName].필터메뉴,
                product: res.data[pathName].product,
                필터상품: res.data[pathName].product.filter((item)=>item['필터'].includes(res.data[pathName].필터[0])),
                상품: res.data[pathName].product.filter((item)=>item['필터'].includes(res.data[pathName].필터[0]))
            })
            let a = Array(7).fill(false);
            a[0] =true;
            setTab(a);
    
            let b = Array(5).fill(false);
            b[0] =true;
            setOrder(b);
        })
        .catch((err)=>{
            console.log(err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // 반환값 없는 커스텀 훅
    // 외부데이터 저장만 해주는 역할
}