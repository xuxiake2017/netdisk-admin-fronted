import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import StatisticsCard from './components/StatisticsCard';
import { useRequest } from 'umi';

import PageLoading from './components/PageLoading';
import type { TimeType } from './components/StatisticsCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';
import { getCardData, getStatisticsData } from '@/services/dashBoard';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';

const Analysis: FC<AnalysisProps> = () => {
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );

  const { data: cardData, loading } = useRequest(getCardData, {
    formatResult: (res) => res.data,
  });
  const { data: statisticsData, loading: statisticsCardLoading } = useRequest(
    () => {
      return getStatisticsData({
        startTime: rangePickerValue?.[0]?.valueOf(),
        endTime: rangePickerValue?.[1]?.valueOf(),
      });
    },
    {
      formatResult: (res) => res.data,
      refreshDeps: [rangePickerValue],
    },
  );

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };

  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} cardData={cardData} />
        </Suspense>

        <Suspense fallback={null}>
          <StatisticsCard
            rangePickerValue={rangePickerValue}
            statisticsData={
              statisticsData || {
                userStatisticsData: [],
                uploadStatisticsData: [],
                uploadSizeStatisticsData: [],
                smsStatisticsData: [],
              }
            }
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={statisticsCardLoading}
            selectDate={selectDate}
          />
        </Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
