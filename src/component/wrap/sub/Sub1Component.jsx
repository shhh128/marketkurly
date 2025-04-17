import React from 'react';
import './scss/SubComponent.scss';
import useCustom01StatementController from './use_custom_hook/useCustom01StatementController';
import useCustom02AxiosApiController from './use_custom_hook/useCustom02AxiosApiController';
import useCustom03PagenationController from './use_custom_hook/useCustom03PagenationController';
import useCustom04FilterSortController from './use_custom_hook/useCustom04FilterSortController';
import BannerTitleComponent from './use_custom_component/BannerTitleComponent';
import TopTabFilterComponent from './use_custom_component/TopTabFilterComponent';
import LeftFilterCheckComponent from './use_custom_component/LeftFilterCheckComponent';
import RightSortButtonComponent from './use_custom_component/RightSortButtonComponent';
import RightSelectFilterComponent from './use_custom_component/RightSelectFilterComponent';
import RightProductListComponent from './use_custom_component/RightProductListComponent';
import RightPagenationButtonComponent from './use_custom_component/RightPagenationButtonComponent';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setViewProductAction } from '../../../store/viewProduct';

export default function Sub1Component() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1 커스텀 상태관리 훅
    const statement = useCustom01StatementController();
    
    // 비구조화
    const {
        location, 
        refSub, 
        refOrder, 
        order, 
        setOrder, 
        tab, 
        setTab, 
        state, 
        setState
    } = statement;

    // 2 커스텀 AXIOS API 훅
    useCustom02AxiosApiController(
        {
            location, 
            setState,
            state,
            setTab,
            setOrder
        }
    );
    
    // 3 커스텀 페이지네이션 훅
    const pagenation = useCustom03PagenationController({state});
    const {
        pageView,
        pageCurrent,
        pageNumber,
        pageArray,
        onClickPage,
        onClickFirst,
        onClickPrev,
        onClickNext,
        onClickLast
    } = pagenation;

    // 4 커스텀 필터 훅
    const filterSort = useCustom04FilterSortController(
        {
            setTab,
            setState,
            state,
            setOrder,
            refSub
        }
    );
    const {
        onClickFilterBtn,
        onClickSortBtn,
        onClickSubBtn,
        onChangeCheckEvent,
        onClickProductFilterBoxDel
    } = filterSort

    // 최근본상품
    const onClickViewProduct=(e, 상품, 이미지경로)=>{
        e.preventDefault();
        let 상품정보 = 상품;

        상품정보 = {
            ...상품정보,
            상품이미지: 이미지경로
        }
        let obj = {
            지금본상품: 상품정보         
        }
      
        // 지금본상품
        localStorage.setItem('view_product', JSON.stringify(obj.지금본상품))

        let arr = [];
        if(localStorage.getItem('view_product_list')!==null ){
            const result = JSON.parse(localStorage.getItem('view_product_list'));
            // 중복검사
            const imsi = result.map((item)=>item.상품번호.includes(obj.지금본상품.상품번호) ? true : false);
            if(imsi.includes(true)===true){
                arr = result;  // 그대로로
            }
            else{                
                arr = [obj.지금본상품, ...result]; // 추가
            }
        }
        else{
            arr = [obj.지금본상품];
        }

        obj = {
            ...obj,
            최근본상품: arr
        }       
        // 리덕스 저장
        dispatch(setViewProductAction(obj))
        // 로컬저장소 저장
        localStorage.setItem('view_product_list', JSON.stringify(arr))
        // 상세 페이지로 이동
        navigate('/product-view');
    }

    return (
        <main id={state.pathName} className='sub-page'>
            <div className="container">
                {/* BannerTitleComponent.jsx */}
                <BannerTitleComponent state={state} />
                {/* TopTabFilterComponent.jsx */}
                <TopTabFilterComponent state={state} onClickFilterBtn={onClickFilterBtn} tab={tab} />
                <div className="content">
                    {/* LeftFilterCheckComponent.jsx */}
                    <LeftFilterCheckComponent state={state} onClickSubBtn={onClickSubBtn} refSub={refSub} onChangeCheckEvent={onChangeCheckEvent} />
                    {/* RightSortButtonComponent.jsx */}
                    <div className="product-box">
                        <RightSortButtonComponent state={state} refOrder={refOrder} onClickSortBtn={onClickSortBtn} order={order} />
                        {/* 상품필터박스 */}
                        {/* RightSelectFilterComponent.jsx */}
                        <RightSelectFilterComponent state={state} onClickProductFilterBoxDel={onClickProductFilterBoxDel} />
                        {/* RightProductListComponent.jsx */}
                        <RightProductListComponent state={state} pageView={pageView} pageCurrent={pageCurrent} onClickViewProduct={onClickViewProduct} />
                        {/* 페이지 번호 */}
                        {/* RightPagenationButtonComponent.jsx */}
                        <RightPagenationButtonComponent onClickFirst={onClickFirst} onClickPrev={onClickPrev} pageNumber={pageNumber} onClickPage={onClickPage} pageArray={pageArray} onClickNext={onClickNext} onClickLast={onClickLast} />
                    </div>
                </div>
            </div>
        </main>
    );
}