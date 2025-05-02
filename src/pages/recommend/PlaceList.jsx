import caxios from "../../api/caxios"
import RecommendStyle from './PlaceList.module.css'

const PlaceList = ()=>{
    return(
        <>
        <div className={RecommendStyle.placeList}>장소 목록 보여주는 곳</div>
        <div className={RecommendStyle.map}>지도 보여주는 곳</div>
        </>
    )
    
}

export default PlaceList;