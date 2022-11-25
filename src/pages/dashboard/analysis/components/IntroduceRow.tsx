import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import styles from '../style.less';

import type { CardData } from '@/services/dashBoard/typings';
import { useMemo } from 'react';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, cardData }: { loading: boolean; cardData?: CardData }) => {
  const dayMom = useMemo(() => {
    if (cardData?.userMomData.todayIncreasedUserNum && cardData?.userMomData.dayMomData) {
      return Number(
        Number(
          ((cardData.userMomData.todayIncreasedUserNum - cardData.userMomData.dayMomData) /
            cardData.userMomData.dayMomData) *
            100,
        ).toFixed(1),
      );
    }
    return 0;
  }, [cardData?.userMomData.todayIncreasedUserNum, cardData?.userMomData.dayMomData]);
  const weekMom = useMemo(() => {
    if (cardData?.userMomData.currentWeekIncreasedUserNum && cardData?.userMomData.weekMomData) {
      return Number(
        Number(
          ((cardData.userMomData.currentWeekIncreasedUserNum - cardData.userMomData.weekMomData) /
            cardData.userMomData.weekMomData) *
            100,
        ).toFixed(1),
      );
    }
    return 0;
  }, [cardData?.userMomData.currentWeekIncreasedUserNum, cardData?.userMomData.weekMomData]);
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="日新增用户"
          loading={loading}
          total={() => cardData?.userMomData.todayIncreasedUserNum || 0}
          footer={<Field label="总用户数" value={cardData?.userMomData.totalUserNum || 0} />}
          contentHeight={46}
        >
          <Trend flag={weekMom > 0 ? 'up' : 'down'} style={{ marginRight: 16 }}>
            周环比
            <span className={styles.trendText}>{weekMom}%</span>
          </Trend>
          <Trend flag={dayMom > 0 ? 'up' : 'down'}>
            日环比
            <span className={styles.trendText}>{dayMom}%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="短信发送数"
          action={
            <Tooltip title="近一个月的短信发送数">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(cardData?.smsSendData.currentMonthSendNum || 0).format('0,0')}
          footer={
            <Field
              label="日发送量"
              value={numeral(cardData?.smsSendData.todaySendNum || 0).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <TinyArea
            color="#e0cff7"
            pattern={{
              type: 'line',
              cfg: {
                stroke: '#975FE4',
              },
            }}
            line={{
              color: '#975FE4',
            }}
            height={46}
            smooth
            data={cardData?.smsSendData.statisticsData.map((item) => item.count) || []}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="访问量"
          action={
            <Tooltip title="近一个月的访问量">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(cardData?.pvData.currentMonthPVNum || 0).format('0,0')}
          footer={
            <Field
              label="日访问量"
              value={numeral(cardData?.pvData.todayPVNum || 0).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <TinyArea
            color="#e0cff7"
            pattern={{
              type: 'line',
              cfg: {
                stroke: '#975FE4',
              },
            }}
            line={{
              color: '#975FE4',
            }}
            height={46}
            smooth
            data={cardData?.pvData.statisticsData.map((item) => item.count) || []}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="上传数量"
          action={
            <Tooltip title="近一个月的上传数量">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(cardData?.uploadData.currentMonthUploadNum).format('0,0')}
          footer={
            <Field
              label="日上传数量"
              value={numeral(cardData?.uploadData.todayUploadNum || 0).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <TinyColumn
            height={46}
            data={cardData?.uploadData.statisticsData.map((item) => item.count) || []}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
