import React, { useEffect, useState, useRef } from 'react'
import ReactEcharts from 'echarts-for-react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import { WordCloud } from '@ant-design/plots';
import { connect } from 'dva';

const Analysis = ({ chart, dispatch }) => {
  const pieChart = chart.ipData
  const barChart = chart.emotionData
  const wordCloud = chart.freqData
  const [loading, setLoading] = useState(false)
  const loadData = async () => {
    console.log(wordCloud.length)
    console.log(pieChart.length)
    if (wordCloud.length === 0)
      dispatch({ type: 'chart/fetchFreqData' });
    if (pieChart.length === 0)
      dispatch({ type: 'chart/fetchIpData' });
    // if (Object.keys(barChart).length === 0) {
    //   setLoading(true);
    //   dispatch({ type: 'chart/fetchEmoData' });
    //   setLoading(false);
    // }

  }
  useEffect(() => {
    loadData()
  }, [dispatch])
  const optionPie = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: pieChart,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const optionBar = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: Object.keys(barChart),
      axisLabel: {
        interval: 0
      }
    },
    series: [
      {
        data: Object.values(barChart),
        type: 'bar',
        barWidth: 30,
        //配置样式
        itemStyle: {
          //通常情况下：
          normal: {
            color: (params) => {
              var colorList = ['rgb(241, 157, 154)', 'rgb(241, 157, 154)', 'rgb(25,46,94)', 'rgb(195,229,235)'];
              return colorList[params.dataIndex];
            }
          }
        }
      }
    ]
  };
  const config = {
    paddingTop: 40,
    data: wordCloud,
    layout: { spiral: 'rectangular' },
    colorField: 'text',
  };


  return (<>
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="全局话题热度"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="实时话题热度"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
    <div className='margin-12'></div>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="地区讨论度" bordered={false}>
          <div style={{ height: '400px' }}>
            <ReactEcharts option={optionPie} />
          </div>

        </Card>
      </Col>
      <Col span={12}>
        <Card title="热点词条" bordered={false} >
          <div style={{ height: '400px' }}>
            <WordCloud {...config} />
          </div>

        </Card>
      </Col>
    </Row>
    {/* <Spin tip="大众情绪分析中，请稍等" spinning={loading}>
      <Card title="大众情绪" style={{ width: '100 %', marginTop: 16 }}>
        <ReactEcharts option={optionBar} />
      </Card>
    </Spin> */}
  </>)
}

export default connect(({ chart }) => ({ chart }))(Analysis);
