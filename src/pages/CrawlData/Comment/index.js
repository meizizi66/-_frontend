import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';



const columns = [
  {
    title: '微博用户ID',
    width: 60,
    dataIndex: 'user_id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: '微博名',
    width: 70,
    dataIndex: 'nickname',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'sex',
    width: 40,
  },
  {
    title: '评论',
    dataIndex: 'content',
    key: 'comment',
    width: 200,
    ellipsis: true,
  },
  {
    title: '发布时间',
    dataIndex: 'create_date_time',
    key: 'date',
    width: 100,
  },
  {
    title: '点赞数',
    dataIndex: 'comment_like_count',
    key: 'likes',
    width: 50,
  },
  {
    title: '评论回复数',
    dataIndex: 'sub_comment_count',
    key: 'subComment',
    width: 60,
  },
];
const CrawlData = () => {
  const initParams = {
    page: 1,
  }
  const [commentList, setCommentList] = useState([]);
  const [searchParams, setSearchParams] = useState({ ...initParams })
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const loadData = async () => {
    setLoading(true);
    const res = await axios.get('http://127.0.0.1:8000/demo/comment-filter/', { params: searchParams })
    setCommentList(res.data.results);
    setTotal(res.data.count);
    setLoading(false);
  }
  useEffect(() => {
    loadData();
  }, [searchParams])

  return (<>
    <Table columns={columns}
      dataSource={commentList}
      scroll={{ x: 1500, y: 500 }}
      pagination={{
        onChange: (page, pageSize) => {
          setSearchParams(pre => ({ ...pre, page }))
        },
        current: searchParams.page,
        pageSize: 10,
        total: total,
      }}
      loading={loading}
    />
  </>
  )
};

export default CrawlData;
