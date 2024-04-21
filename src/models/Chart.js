import axios from "axios";
export default {
    namespace: 'chart',
    state: {
        freqData: [],
        ipData: [],
        emotionData: {},
    },
    reducers: {
        saveFreqData(state, action) {
            return { ...state, freqData: action.payload };
        },
        saveIpData(state, action) {
            return { ...state, ipData: action.payload };
        },
        saveEmoData(state, action) {
            return { ...state, emotionData: action.payload };
        },
    },
    effects: {
        *fetchFreqData(_, { call, put }) {
            const responseData = yield call(fetchFreq);
            const wordArray = Object.entries(responseData);
            const resWordArray = wordArray.map(([text, value]) => ({ text, value }));
            yield put({ type: 'saveFreqData', payload: resWordArray });
        },
        *fetchIpData(_, { call, put }) {
            const responseData = yield call(fetchIp);
            const IpArray = Object.entries(responseData);
            const resIpArray = IpArray.map(([name, value]) => ({ name, value }));
            yield put({ type: 'saveIpData', payload: resIpArray });
        },
        *fetchEmoData(_, { call, put }) {
            const responseData = yield call(fetchEmo);
            yield put({ type: 'saveEmoData', payload: responseData });
        },
    },
};
const fetchFreq = async () => {
    console.log("start call fetchFreq")
    const res = await axios.get('http://127.0.0.1:8000/demo/word-frequency/');
    return res.data
}
const fetchIp = async () => {
    console.log("start call fetchIp")
    const res = await axios.get('http://127.0.0.1:8000/demo/ip-statics/');
    return res.data
}
const fetchEmo = async () => {
    console.log("start call fetchEmo")
    const res = await axios.get('http://127.0.0.1:8000/demo/analysis/');
    return res.data
}
