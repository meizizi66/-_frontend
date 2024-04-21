import React, { useState, useEffect } from 'react';
import { Tabs, Button, Form, Input, Select, Space, Tag, message, Alert, Spin } from 'antd';
import { WeiboOutlined } from '@ant-design/icons';
import axios from 'axios'
import { connect } from 'dva';
// import './index.css';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const Crawl: React.FC = ({ crawl, dispatch }) => {
    const crawling = crawl.crawling;
    const status = crawl.status;
    const [type, setType] = useState<string>('keywords');
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    // const [crawling, setCrawling] = useState(false)
    // const [status, setStatus] = useState('pending');
    const setStatus = (value: String) => {
        dispatch({
            type: 'crawl/alterStatus',
            payload: { status: value }
        })
    }
    const setCrawling = (value: boolean) => {
        dispatch({
            type: 'crawl/alterCrawling',
            payload: { crawling: value }
        })
    }
    const onKeywordFinish = async (values: any) => {
        setStatus('started')
        messageApi.open({
            type: 'success',
            content: '爬虫任务提交成功，请稍等',
        });
        setCrawling(true)
        const response = await axios.post('http://127.0.0.1:8000/demo/keyword_crawl/', values)
        setCrawling(false)
        setStatus('finished')
        const responseData = response.data
        if (responseData.code === 1) {
            messageApi.open({
                type: 'success',
                content: '爬虫任务已顺利完成！',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '提交格式有误',
            });
        }
    };

    const onBlogFinish = async (values: any) => {
        setStatus('started')
        messageApi.open({
            type: 'success',
            content: '爬虫任务提交成功，请稍等',
        });
        setCrawling(true)
        const response = await axios.post('http://127.0.0.1:8000/demo/blog_crawl/', values)
        setCrawling(false)
        setStatus('finished')
        const responseData = response.data
        if (responseData.code === 1) {
            messageApi.open({
                type: 'success',
                content: '爬虫任务已顺利完成！',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '提交格式有误',
            });
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({ keyWords: 'python,go语言', crawlCount: '100', isCrawlComment: 'flase' });
    };
    return (
        <>
            {contextHolder}
            <Tabs
                activeKey={type}
                onChange={setType}
                items={[
                    {
                        key: 'keywords',
                        label: '关键词爬虫',
                    },
                    {
                        key: 'blog',
                        label: '指定博文爬虫',
                    },
                ]}
            />
            <div className='margin-16'></div>
            {type === 'keywords' && (
                <Form
                    {...layout}
                    form={form}
                    onFinish={onKeywordFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name="keyword"
                        label="关键词"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='多个关键词需用逗号隔开' />
                    </Form.Item>
                    <Form.Item
                        name="count"
                        label="爬取帖子的数量控制"
                        rules={[{ required: true }]}>
                        <Input placeholder='请输入你想要爬取帖子的数量' />
                    </Form.Item>
                    <Form.Item
                        name="isCrawlComment"
                        label="是否爬评论"
                        rules={[{ required: true }]}>
                        <Select
                            allowClear
                        >
                            <Option value="true">是</Option>
                            <Option value="false">否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled={crawling}>
                                开始爬虫
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                默认配置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>)}
            {type === 'blog' && (
                <Form
                    {...layout}
                    form={form}
                    onFinish={onBlogFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name="note_id"
                        label="Blog ID"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder='多个blog id需用逗号隔开' />
                    </Form.Item>
                    <Form.Item
                        name="isCrawlComment"
                        label="是否爬评论">
                        <Select
                            defaultValue="true"
                            allowClear
                            placeholder="默认开启爬评论模式"
                        >
                            <Option value="true">是</Option>
                            <Option value="false">否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled={crawling}>
                                开始爬虫
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                            <a href='https://m.weibo.cn/'>
                                <Tag icon={<WeiboOutlined />} color="#55acee">
                                    微博
                                </Tag>
                            </a>
                        </Space>
                    </Form.Item>
                </Form>)}
            {status !== 'pending' && (
                <Spin spinning={crawling}>
                    {status === 'started' ? (
                        <Alert
                            type="info"
                            message="后台正在执行爬虫任务，请耐心等待..."
                            description="任务时长取决于你爬虫的数量和博文评论的数量"
                        />) : (
                        <Alert
                            type="info"
                            message="任务执行完成！"
                            description="您可以做进一步的舆情分析啦！"
                        />
                    )}

                </Spin>
            )}

        </>
    )
};

export default connect(({ crawl }) => ({ crawl }))(Crawl);
