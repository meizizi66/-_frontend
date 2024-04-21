import React, { useEffect } from 'react'
import { connect } from 'dva';

const test = ({ chart, dispatch }) => {
    useEffect(() => {
        console.log(chart)
        if (Object.keys(chart.freqData).length === 0)
            dispatch({ type: 'chart/fetchFreqData' });
    }, [dispatch])
    return (
        <div>test</div>
    )
}
export default connect(({ chart }) => ({ chart }))(test);
