export interface StatisticsDataItem {
  label: string;
  count: number;
}

export interface CardData {
  pvData: {
    todayPVNum: number;
    currentMonthPVNum: number;
    statisticsData: StatisticsDataItem[];
  };
  userMomData: {
    todayIncreasedUserNum: number;
    dayMomData: number;
    currentWeekIncreasedUserNum: number;
    weekMomData: number;
    totalUserNum: number;
  };
  uploadData: {
    currentMonthUploadNum: number;
    statisticsData: StatisticsDataItem[];
    todayUploadNum: number;
  };
  smsSendData: {
    currentMonthSendNum: number;
    statisticsData: StatisticsDataItem[];
    todaySendNum: number;
  };
}

export interface StatisticsData {
  userStatisticsData: StatisticsDataItem[];
  uploadStatisticsData: StatisticsDataItem[];
  uploadSizeStatisticsData: StatisticsDataItem[];
  smsStatisticsData: StatisticsDataItem[];
}
