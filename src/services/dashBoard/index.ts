import { get, postJSON } from '@/utils/request';

import type { CardData, StatisticsData } from './typings';

export const getCardData = () => {
  return get<RequestData<CardData>>('/dashBoard/getCardData');
};

export const getStatisticsData = (params: { startTime?: number; endTime?: number }) => {
  return postJSON<RequestData<StatisticsData>>('/dashBoard/getStatisticsData', params);
};
