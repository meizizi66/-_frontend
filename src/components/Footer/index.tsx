import { MonitorOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'weibo-analysis',
          title: '微博舆情分析系统',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <MonitorOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'weibo-analysis',
          title: 'Weibo Analysis',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
