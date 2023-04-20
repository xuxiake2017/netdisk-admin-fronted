import { Card, Col, DatePicker, Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Column } from '@ant-design/charts';

import styles from '../style.less';
import { formatByte } from '@/utils';

import type { StatisticsData } from '@/services/dashBoard/typings';
import type { Moment } from 'moment';
import { useMemo } from 'react';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;

const titleMap = {
  userStatisticsData: '用户新增统计',
  uploadStatisticsData: '上传统计',
  uploadSizeStatisticsData: '上传数据量统计',
  smsStatisticsData: '短信发送统计',
};
const metaMap = {
  userStatisticsData: '新增用户',
  uploadStatisticsData: '上传文件',
  uploadSizeStatisticsData: '上传数据量',
  smsStatisticsData: '短信发送',
};

const getGroupType = (startTime: Moment, endTime: Moment): 'hour' | 'day' | 'month' => {
  const oneDayTimestamp = 24 * 60 * 60 * 1000;
  const timePeriod = endTime.valueOf() - startTime.valueOf();
  if (timePeriod <= 2 * oneDayTimestamp) {
    return 'hour';
  } else if (timePeriod < 31 * oneDayTimestamp) {
    return 'day';
  } else {
    return 'month';
  }
};

const StatisticsCard = ({
  rangePickerValue,
  statisticsData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: TimeType) => string;
  statisticsData: StatisticsData;
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: TimeType) => void;
}) => {
  const dataMap = useMemo<{
    userStatisticsData: Map<string, number>;
    uploadStatisticsData: Map<string, number>;
    uploadSizeStatisticsData: Map<string, number>;
    smsStatisticsData: Map<string, number>;
  }>(() => {
    const {
      userStatisticsData,
      uploadStatisticsData,
      uploadSizeStatisticsData,
      smsStatisticsData,
    } = statisticsData;
    return {
      userStatisticsData: userStatisticsData.reduce((previousValue, currentValue) => {
        previousValue.set(currentValue.label, currentValue.count);
        return previousValue;
      }, new Map<string, number>()),
      uploadSizeStatisticsData: uploadSizeStatisticsData.reduce((previousValue, currentValue) => {
        previousValue.set(currentValue.label, currentValue.count);
        return previousValue;
      }, new Map<string, number>()),
      uploadStatisticsData: uploadStatisticsData.reduce((previousValue, currentValue) => {
        previousValue.set(currentValue.label, currentValue.count);
        return previousValue;
      }, new Map<string, number>()),
      smsStatisticsData: smsStatisticsData.reduce((previousValue, currentValue) => {
        previousValue.set(currentValue.label, currentValue.count);
        return previousValue;
      }, new Map<string, number>()),
    };
  }, [statisticsData]);
  const data = useMemo<StatisticsData>(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const data: StatisticsData = {
      userStatisticsData: [],
      uploadStatisticsData: [],
      uploadSizeStatisticsData: [],
      smsStatisticsData: [],
    };
    if (rangePickerValue) {
      const startTime = rangePickerValue[0] as Moment;
      const endTime = rangePickerValue[1] as Moment;
      const groupType = getGroupType(startTime, endTime);
      const dataArr: { label: string; count: number }[] = [];
      let tmp = startTime.clone();
      switch (groupType) {
        case 'hour':
          do {
            dataArr.push({
              label: tmp.format('MM-DD HH:mm'),
              count: 0,
            });
            tmp = tmp.add(1, 'hours');
          } while (tmp.valueOf() < endTime.valueOf());
          break;
        case 'day':
          do {
            dataArr.push({
              label: tmp.format('YYYY-MM-DD'),
              count: 0,
            });
            tmp = tmp.add(1, 'days');
          } while (tmp.valueOf() < endTime.valueOf());
          break;
        case 'month':
          do {
            dataArr.push({
              label: tmp.format('YYYY-MM'),
              count: 0,
            });
            tmp = tmp.add(1, 'months');
          } while (tmp.valueOf() < endTime.valueOf());
          break;
      }
      Object.entries(data).forEach(([key, value]) => {
        const dataArr_ = JSON.parse(JSON.stringify(dataArr)) as { label: string; count: number }[];
        dataArr_.forEach((item) => {
          const map = dataMap[key as keyof typeof dataMap];
          if (map.has(item.label)) {
            item.count = map.get(item.label) as number;
          }
        });
        data[key] = dataArr_;
      });
    }
    return data;
  }, [rangePickerValue, dataMap]);
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="统计图表"
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a className={isActive('today')} onClick={() => selectDate('today')}>
              今日
            </a>
            <a className={isActive('week')} onClick={() => selectDate('week')}>
              本周
            </a>
            <a className={isActive('month')} onClick={() => selectDate('month')}>
              本月
            </a>
            <a className={isActive('year')} onClick={() => selectDate('year')}>
              本年
            </a>
          </div>
          <RangePicker
            value={rangePickerValue}
            onChange={handleRangePickerChange}
            style={{ width: 256 }}
          />
        </div>
      }
    >
      <Row>
        {Object.keys(data).map((key) => {
          return (
            <Col key={key} xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <div style={{ marginBottom: 20, fontSize: 14 }}>{titleMap[key]}</div>
                <Column
                  height={300}
                  data={data[key]}
                  xField="label"
                  yField="count"
                  meta={{
                    count: {
                      alias: metaMap[key],
                      formatter: (val) => {
                        if (key === 'uploadSizeStatisticsData') {
                          return formatByte(val);
                        }
                        return val;
                      },
                    },
                  }}
                  maxColumnWidth={30}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default StatisticsCard;
