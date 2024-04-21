export default {
    namespace: 'crawl',
    state: {
        crawling: false,
        status: 'pending'
    },
    reducers: {
        changeCrawling(state, action) {
            return { ...state, crawling: action.payload };
        },
        changeStatus(state, action) {
            return { ...state, status: action.payload };
        }
    },
    effects: {
        *alterCrawling({ payload }, { call, put }) {
            const crawling = payload.crawling
            yield put({ type: 'changeCrawling', payload: crawling });
        },
        *alterStatus({ payload }, { call, put }) {
            const status = payload.status
            yield put({ type: 'changeStatus', payload: status });
        },
    },
};
