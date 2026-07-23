export type FlightRecord = {
  id: string;
  routeKey: "pek-sha" | "sha-can" | "sha-szx";
  routeZh: string;
  routeEn: string;
  flight: string;
  airlineZh: string;
  airlineEn: string;
  departure: string;
  arrival: string;
  duration: string;
  current: number;
  history: number[];
};

export const routeInstanceCounts = {
  "pek-sha": 407,
  "sha-can": 363,
  "sha-szx": 296
} as const;

export const flightCatalog: FlightRecord[] = [
  {
    "id": "pek-sha-cz8803",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "CZ8803",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 20:00",
    "arrival": "22:10",
    "duration": "2h10m",
    "current": 690,
    "history": [
      870,
      870,
      1020,
      1020,
      690,
      690
    ]
  },
  {
    "id": "pek-sha-cz8879",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "CZ8879",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 12:00",
    "arrival": "14:10",
    "duration": "2h10m",
    "current": 1500,
    "history": [
      850,
      850,
      930,
      930,
      1500,
      1500
    ]
  },
  {
    "id": "pek-sha-cz8882",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "CZ8882",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 21:20",
    "arrival": "23:30",
    "duration": "2h10m",
    "current": 430,
    "history": [
      690,
      690,
      690,
      770,
      430,
      430
    ]
  },
  {
    "id": "pek-sha-cz8885",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "CZ8885",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 16:00",
    "arrival": "18:20",
    "duration": "2h20m",
    "current": 1180,
    "history": [
      1500,
      1500,
      1500,
      1500,
      1180,
      1180
    ]
  },
  {
    "id": "pek-sha-cz8899",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "CZ8899",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 08:00",
    "arrival": "10:10",
    "duration": "2h10m",
    "current": 610,
    "history": [
      520,
      770,
      770,
      770,
      610,
      610
    ]
  },
  {
    "id": "pek-sha-mu5100",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5100",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 07:00",
    "arrival": "09:05",
    "duration": "2h05m",
    "current": 550,
    "history": [
      550,
      550,
      550,
      550,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5102",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5102",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 08:00",
    "arrival": "10:05",
    "duration": "2h05m",
    "current": 550,
    "history": [
      550,
      550,
      550,
      650,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5104",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5104",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 09:00",
    "arrival": "10:45",
    "duration": "1h45m",
    "current": 650,
    "history": [
      650,
      650,
      650,
      650,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5106",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5106",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 10:00",
    "arrival": "12:15",
    "duration": "2h15m",
    "current": 650,
    "history": [
      650,
      650,
      650,
      810,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5108",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5108",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 11:00",
    "arrival": "13:25",
    "duration": "2h25m",
    "current": 650,
    "history": [
      810,
      810,
      810,
      810,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5110",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5110",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 12:00",
    "arrival": "14:30",
    "duration": "2h30m",
    "current": 650,
    "history": [
      810,
      810,
      810,
      810,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5112",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5112",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 13:00",
    "arrival": "15:05",
    "duration": "2h05m",
    "current": 550,
    "history": [
      990,
      990,
      990,
      990,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5114",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5114",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 14:00",
    "arrival": "16:15",
    "duration": "2h15m",
    "current": 650,
    "history": [
      2150,
      2150,
      2150,
      2150,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5116",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5116",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 15:00",
    "arrival": "17:20",
    "duration": "2h20m",
    "current": 1720,
    "history": [
      2150,
      2150,
      2150,
      2150,
      1720,
      1720
    ]
  },
  {
    "id": "pek-sha-mu5118",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5118",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:00",
    "arrival": "18:05",
    "duration": "2h05m",
    "current": 810,
    "history": [
      2150,
      2150,
      2150,
      2150,
      810,
      810
    ]
  },
  {
    "id": "pek-sha-mu5120",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5120",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 17:00",
    "arrival": "19:15",
    "duration": "2h15m",
    "current": 650,
    "history": [
      2150,
      2150,
      2150,
      2150,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5122",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5122",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 18:00",
    "arrival": "20:35",
    "duration": "2h35m",
    "current": 650,
    "history": [
      2150,
      2150,
      2150,
      2150,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5124",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5124",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 19:00",
    "arrival": "21:20",
    "duration": "2h20m",
    "current": 650,
    "history": [
      2150,
      2150,
      2150,
      2150,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5126",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5126",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 20:00",
    "arrival": "22:10",
    "duration": "2h10m",
    "current": 810,
    "history": [
      2150,
      2150,
      2150,
      2150,
      810,
      810
    ]
  },
  {
    "id": "pek-sha-mu5128",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5128",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 21:00",
    "arrival": "23:10",
    "duration": "2h10m",
    "current": 650,
    "history": [
      1720,
      1720,
      1720,
      1720,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5130",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5130",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 19:45",
    "arrival": "21:55",
    "duration": "2h10m",
    "current": 550,
    "history": [
      890,
      1064,
      890,
      890,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5152",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5152",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 08:30",
    "arrival": "10:35",
    "duration": "2h05m",
    "current": 810,
    "history": [
      650,
      650,
      650,
      650,
      810,
      810
    ]
  },
  {
    "id": "pek-sha-mu5154",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5154",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 11:30",
    "arrival": "13:35",
    "duration": "2h05m",
    "current": 988,
    "history": [
      1159,
      1159,
      1159,
      1159,
      988,
      988
    ]
  },
  {
    "id": "pek-sha-mu5156",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5156",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 13:30",
    "arrival": "15:25",
    "duration": "1h55m",
    "current": 550,
    "history": [
      990,
      990,
      990,
      990,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5158",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5158",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 14:30",
    "arrival": "16:55",
    "duration": "2h25m",
    "current": 988,
    "history": [
      1570,
      1570,
      1570,
      1570,
      988,
      988
    ]
  },
  {
    "id": "pek-sha-mu5160",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5160",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 17:30",
    "arrival": "19:45",
    "duration": "2h15m",
    "current": 550,
    "history": [
      1720,
      1720,
      1720,
      1720,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5162",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5162",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 18:30",
    "arrival": "20:45",
    "duration": "2h15m",
    "current": 650,
    "history": [
      2150,
      2150,
      2150,
      2150,
      650,
      650
    ]
  },
  {
    "id": "pek-sha-mu5164",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5164",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 19:30",
    "arrival": "21:50",
    "duration": "2h20m",
    "current": 988,
    "history": [
      1970,
      1970,
      1970,
      1970,
      988,
      988
    ]
  },
  {
    "id": "pek-sha-mu5166",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5166",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 21:30",
    "arrival": "23:25",
    "duration": "1h55m",
    "current": 550,
    "history": [
      1570,
      1570,
      1570,
      1570,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu5186",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5186",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 07:45",
    "arrival": "09:55",
    "duration": "2h10m",
    "current": 1620,
    "history": [
      450,
      450,
      550,
      550,
      1620,
      1620
    ]
  },
  {
    "id": "pek-sha-mu5196",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5196",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 12:55",
    "arrival": "14:50",
    "duration": "1h55m",
    "current": 710,
    "history": [
      1064,
      1064,
      1064,
      1064,
      710,
      710
    ]
  },
  {
    "id": "pek-sha-mu5231",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU5231",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 23:20",
    "arrival": "01:15",
    "duration": "1h55m",
    "current": 890,
    "history": [
      550,
      550,
      550,
      550,
      400,
      890
    ]
  },
  {
    "id": "pek-sha-mu6873",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU6873",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 08:15",
    "arrival": "10:15",
    "duration": "2h00m",
    "current": 550,
    "history": [
      550,
      550,
      550,
      550,
      550,
      550
    ]
  },
  {
    "id": "pek-sha-mu8201",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU8201",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 20:50",
    "arrival": "22:55",
    "duration": "2h05m",
    "current": 570,
    "history": [
      650,
      650,
      650,
      650,
      570,
      570
    ]
  },
  {
    "id": "pek-sha-mu8229",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU8229",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:30",
    "arrival": "18:40",
    "duration": "2h10m",
    "current": 570,
    "history": [
      1060,
      1060,
      1060,
      1060,
      650,
      570
    ]
  },
  {
    "id": "pek-sha-mu8332",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU8332",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:40",
    "arrival": "19:00",
    "duration": "2h20m",
    "current": 890,
    "history": [
      2150,
      2150,
      2150,
      2150,
      890,
      890
    ]
  },
  {
    "id": "pek-sha-mu9192",
    "routeKey": "pek-sha",
    "routeZh": "北京 → 上海",
    "routeEn": "Beijing → Shanghai",
    "flight": "MU9192",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 20:45",
    "arrival": "23:10",
    "duration": "2h25m",
    "current": 450,
    "history": [
      890,
      890,
      890,
      890,
      450,
      450
    ]
  },
  {
    "id": "sha-can-cz3504",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3504",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 20:00",
    "arrival": "22:30",
    "duration": "2h30m",
    "current": 510,
    "history": [
      800,
      800,
      800,
      800,
      510,
      510
    ]
  },
  {
    "id": "sha-can-cz3524",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3524",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 11:50",
    "arrival": "14:10",
    "duration": "2h20m",
    "current": 690,
    "history": [
      600,
      600,
      800,
      800,
      690,
      690
    ]
  },
  {
    "id": "sha-can-cz3526",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3526",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 16:50",
    "arrival": "19:15",
    "duration": "2h25m",
    "current": 710,
    "history": [
      1970,
      1150,
      1150,
      1150,
      710,
      710
    ]
  },
  {
    "id": "sha-can-cz3530",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3530",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 12:50",
    "arrival": "15:15",
    "duration": "2h25m",
    "current": 540,
    "history": [
      1010,
      800,
      800,
      800,
      540,
      540
    ]
  },
  {
    "id": "sha-can-cz3532",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3532",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 13:50",
    "arrival": "16:10",
    "duration": "2h20m",
    "current": 530,
    "history": [
      1760,
      880,
      860,
      860,
      530,
      530
    ]
  },
  {
    "id": "sha-can-cz3534",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3534",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 10:50",
    "arrival": "13:15",
    "duration": "2h25m",
    "current": 640,
    "history": [
      800,
      800,
      580,
      580,
      640,
      640
    ]
  },
  {
    "id": "sha-can-cz3538",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3538",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 14:50",
    "arrival": "17:15",
    "duration": "2h25m",
    "current": 590,
    "history": [
      1560,
      900,
      1010,
      1010,
      590,
      590
    ]
  },
  {
    "id": "sha-can-cz3540",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3540",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 15:50",
    "arrival": "18:15",
    "duration": "2h25m",
    "current": 800,
    "history": [
      1970,
      1120,
      1030,
      1030,
      800,
      800
    ]
  },
  {
    "id": "sha-can-cz3549",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3549",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 06:55",
    "arrival": "09:25",
    "duration": "2h30m",
    "current": 420,
    "history": [
      580,
      420,
      420,
      420,
      420,
      420
    ]
  },
  {
    "id": "sha-can-cz3572",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3572",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 18:50",
    "arrival": "21:15",
    "duration": "2h25m",
    "current": 800,
    "history": [
      760,
      910,
      910,
      910,
      800,
      800
    ]
  },
  {
    "id": "sha-can-cz3582",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3582",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 21:45",
    "arrival": "00:20",
    "duration": "2h35m",
    "current": 580,
    "history": [
      1120,
      730,
      730,
      730,
      430,
      580
    ]
  },
  {
    "id": "sha-can-cz3585",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3585",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 18:20",
    "arrival": "20:55",
    "duration": "2h35m",
    "current": 580,
    "history": [
      690,
      800,
      750,
      750,
      580,
      580
    ]
  },
  {
    "id": "sha-can-cz3596",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ3596",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 08:50",
    "arrival": "11:15",
    "duration": "2h25m",
    "current": 640,
    "history": [
      1220,
      1010,
      1120,
      1120,
      640,
      640
    ]
  },
  {
    "id": "sha-can-cz8212",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "CZ8212",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 22:05",
    "arrival": "00:30",
    "duration": "2h25m",
    "current": 690,
    "history": [
      690,
      690,
      420,
      540,
      510,
      690
    ]
  },
  {
    "id": "sha-can-mu4573",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU4573",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 09:30",
    "arrival": "11:55",
    "duration": "2h25m",
    "current": 730,
    "history": [
      730,
      730,
      730,
      730,
      730,
      730
    ]
  },
  {
    "id": "sha-can-mu5301",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5301",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 10:30",
    "arrival": "12:40",
    "duration": "2h10m",
    "current": 580,
    "history": [
      580,
      500,
      500,
      600,
      580,
      580
    ]
  },
  {
    "id": "sha-can-mu5303",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5303",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 11:30",
    "arrival": "13:40",
    "duration": "2h10m",
    "current": 580,
    "history": [
      580,
      530,
      530,
      630,
      580,
      580
    ]
  },
  {
    "id": "sha-can-mu5305",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5305",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 12:40",
    "arrival": "14:45",
    "duration": "2h05m",
    "current": 500,
    "history": [
      580,
      580,
      650,
      650,
      580,
      500
    ]
  },
  {
    "id": "sha-can-mu5307",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5307",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 14:30",
    "arrival": "16:50",
    "duration": "2h20m",
    "current": 500,
    "history": [
      730,
      730,
      730,
      730,
      500,
      500
    ]
  },
  {
    "id": "sha-can-mu5309",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5309",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 10:00",
    "arrival": "12:25",
    "duration": "2h25m",
    "current": 680,
    "history": [
      580,
      500,
      600,
      600,
      680,
      680
    ]
  },
  {
    "id": "sha-can-mu5311",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5311",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:20",
    "arrival": "18:45",
    "duration": "2h25m",
    "current": 708,
    "history": [
      582,
      582,
      708,
      708,
      708,
      708
    ]
  },
  {
    "id": "sha-can-mu5313",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5313",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 21:55",
    "arrival": "00:10",
    "duration": "2h15m",
    "current": 350,
    "history": [
      600,
      500,
      500,
      500,
      450,
      350
    ]
  },
  {
    "id": "sha-can-mu5315",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5315",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 19:30",
    "arrival": "21:50",
    "duration": "2h20m",
    "current": 430,
    "history": [
      730,
      730,
      880,
      880,
      530,
      430
    ]
  },
  {
    "id": "sha-can-mu5317",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5317",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 20:35",
    "arrival": "22:55",
    "duration": "2h20m",
    "current": 400,
    "history": [
      650,
      650,
      550,
      650,
      500,
      400
    ]
  },
  {
    "id": "sha-can-mu5319",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5319",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:30",
    "arrival": "18:55",
    "duration": "2h25m",
    "current": 500,
    "history": [
      730,
      730,
      730,
      730,
      500,
      500
    ]
  },
  {
    "id": "sha-can-mu5325",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5325",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 22:25",
    "arrival": "00:55",
    "duration": "2h30m",
    "current": 388,
    "history": [
      437,
      534,
      437,
      437,
      388,
      388
    ]
  },
  {
    "id": "sha-can-mu5327",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5327",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 18:35",
    "arrival": "21:00",
    "duration": "2h25m",
    "current": 450,
    "history": [
      730,
      730,
      880,
      880,
      550,
      450
    ]
  },
  {
    "id": "sha-can-mu5329",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5329",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 13:30",
    "arrival": "15:50",
    "duration": "2h20m",
    "current": 485,
    "history": [
      582,
      582,
      485,
      582,
      485,
      485
    ]
  },
  {
    "id": "sha-can-mu5361",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU5361",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 21:00",
    "arrival": "23:30",
    "duration": "2h30m",
    "current": 369,
    "history": [
      485,
      582,
      485,
      485,
      466,
      369
    ]
  },
  {
    "id": "sha-can-mu8413",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU8413",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 08:30",
    "arrival": "11:00",
    "duration": "2h30m",
    "current": 730,
    "history": [
      730,
      730,
      730,
      730,
      730,
      730
    ]
  },
  {
    "id": "sha-can-mu8414",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU8414",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 09:00",
    "arrival": "11:30",
    "duration": "2h30m",
    "current": 854,
    "history": [
      708,
      708,
      708,
      708,
      854,
      854
    ]
  },
  {
    "id": "sha-can-mu8418",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU8418",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 15:55",
    "arrival": "18:05",
    "duration": "2h10m",
    "current": 730,
    "history": [
      730,
      730,
      880,
      880,
      730,
      730
    ]
  },
  {
    "id": "sha-can-mu9199",
    "routeKey": "sha-can",
    "routeZh": "上海 → 广州",
    "routeEn": "Shanghai → Guangzhou",
    "flight": "MU9199",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 17:30",
    "arrival": "20:00",
    "duration": "2h30m",
    "current": 500,
    "history": [
      730,
      730,
      880,
      880,
      500,
      500
    ]
  },
  {
    "id": "sha-szx-cz3256",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3256",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 14:40",
    "arrival": "17:10",
    "duration": "2h30m",
    "current": 940,
    "history": [
      1050,
      1280,
      1280,
      1280,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz3544",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3544",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-30 21:40",
    "arrival": "00:10",
    "duration": "2h30m",
    "current": 870,
    "history": [
      870
    ]
  },
  {
    "id": "sha-szx-cz3552",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3552",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 15:40",
    "arrival": "18:15",
    "duration": "2h35m",
    "current": 940,
    "history": [
      1280,
      1280,
      1280,
      1280,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz3554",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3554",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 12:40",
    "arrival": "15:20",
    "duration": "2h40m",
    "current": 940,
    "history": [
      940,
      940,
      940,
      1050,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz3558",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3558",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 18:40",
    "arrival": "21:15",
    "duration": "2h35m",
    "current": 1050,
    "history": [
      1390,
      1280,
      1280,
      1160,
      1050,
      1050
    ]
  },
  {
    "id": "sha-szx-cz3562",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3562",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 16:40",
    "arrival": "19:20",
    "duration": "2h40m",
    "current": 830,
    "history": [
      1280,
      1280,
      1280,
      1280,
      830,
      830
    ]
  },
  {
    "id": "sha-szx-cz3564",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3564",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 19:50",
    "arrival": "22:35",
    "duration": "2h45m",
    "current": 830,
    "history": [
      1050,
      1280,
      1280,
      1280,
      830,
      830
    ]
  },
  {
    "id": "sha-szx-cz3576",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3576",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 09:55",
    "arrival": "12:20",
    "duration": "2h25m",
    "current": 1160,
    "history": [
      830,
      830,
      940,
      940,
      1160,
      1160
    ]
  },
  {
    "id": "sha-szx-cz3588",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3588",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 20:50",
    "arrival": "23:30",
    "duration": "2h40m",
    "current": 720,
    "history": [
      940,
      1050,
      1050,
      1050,
      720,
      720
    ]
  },
  {
    "id": "sha-szx-cz3590",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3590",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 07:55",
    "arrival": "10:25",
    "duration": "2h30m",
    "current": 1160,
    "history": [
      830,
      940,
      830,
      830,
      1160,
      1160
    ]
  },
  {
    "id": "sha-szx-cz3626",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3626",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 17:50",
    "arrival": "20:30",
    "duration": "2h40m",
    "current": 940,
    "history": [
      1500,
      1280,
      1160,
      1160,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz3912",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3912",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-30 21:40",
    "arrival": "00:10",
    "duration": "2h30m",
    "current": 900,
    "history": [
      900
    ]
  },
  {
    "id": "sha-szx-cz3966",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ3966",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 11:40",
    "arrival": "14:15",
    "duration": "2h35m",
    "current": 940,
    "history": [
      940,
      940,
      940,
      940,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz6752",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ6752",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-30 13:30",
    "arrival": "16:15",
    "duration": "2h45m",
    "current": 940,
    "history": [
      940,
      940,
      940,
      940,
      940,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-cz6756",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "CZ6756",
    "airlineZh": "南方航空",
    "airlineEn": "China Southern",
    "departure": "2026-07-31 20:00",
    "arrival": "22:55",
    "duration": "2h55m",
    "current": 940,
    "history": [
      940,
      940,
      940,
      940
    ]
  },
  {
    "id": "sha-szx-mu5331",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5331",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 09:20",
    "arrival": "11:45",
    "duration": "2h25m",
    "current": 1077,
    "history": [
      912,
      912,
      912,
      912,
      1077,
      1077
    ]
  },
  {
    "id": "sha-szx-mu5333",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5333",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 09:00",
    "arrival": "11:30",
    "duration": "2h30m",
    "current": 1400,
    "history": [
      930,
      930,
      830,
      830,
      1400,
      1400
    ]
  },
  {
    "id": "sha-szx-mu5335",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5335",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 10:05",
    "arrival": "12:25",
    "duration": "2h20m",
    "current": 1600,
    "history": [
      930,
      930,
      830,
      830,
      1600,
      1600
    ]
  },
  {
    "id": "sha-szx-mu5337",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5337",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 12:00",
    "arrival": "14:30",
    "duration": "2h30m",
    "current": 930,
    "history": [
      1010,
      930,
      930,
      930,
      930,
      930
    ]
  },
  {
    "id": "sha-szx-mu5339",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5339",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 11:25",
    "arrival": "13:30",
    "duration": "2h05m",
    "current": 1010,
    "history": [
      1010,
      930,
      830,
      830,
      1010,
      1010
    ]
  },
  {
    "id": "sha-szx-mu5341",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5341",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 15:15",
    "arrival": "17:25",
    "duration": "2h10m",
    "current": 1010,
    "history": [
      1400,
      1400,
      1010,
      1010,
      1010,
      1010
    ]
  },
  {
    "id": "sha-szx-mu5343",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5343",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 14:40",
    "arrival": "17:30",
    "duration": "2h50m",
    "current": 912,
    "history": [
      989,
      989,
      912,
      912,
      912,
      912
    ]
  },
  {
    "id": "sha-szx-mu5349",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5349",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 16:25",
    "arrival": "18:45",
    "duration": "2h20m",
    "current": 1010,
    "history": [
      1400,
      1400,
      1010,
      1010,
      1010,
      1010
    ]
  },
  {
    "id": "sha-szx-mu5351",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5351",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 17:40",
    "arrival": "20:05",
    "duration": "2h25m",
    "current": 930,
    "history": [
      1400,
      1400,
      1200,
      1200,
      930,
      930
    ]
  },
  {
    "id": "sha-szx-mu5353",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5353",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 18:30",
    "arrival": "20:55",
    "duration": "2h25m",
    "current": 1010,
    "history": [
      1400,
      1400,
      1200,
      1200,
      1010,
      1010
    ]
  },
  {
    "id": "sha-szx-mu5357",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5357",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 20:30",
    "arrival": "23:00",
    "duration": "2h30m",
    "current": 660,
    "history": [
      930,
      930,
      930,
      930,
      660,
      660
    ]
  },
  {
    "id": "sha-szx-mu5359",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU5359",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 21:45",
    "arrival": "00:10",
    "duration": "2h25m",
    "current": 679,
    "history": [
      805,
      805,
      805,
      805,
      679,
      679
    ]
  },
  {
    "id": "sha-szx-mu8431",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU8431",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 08:05",
    "arrival": "10:30",
    "duration": "2h25m",
    "current": 1200,
    "history": [
      930,
      930,
      710,
      710,
      1200,
      1200
    ]
  },
  {
    "id": "sha-szx-mu8433",
    "routeKey": "sha-szx",
    "routeZh": "上海 → 深圳",
    "routeEn": "Shanghai → Shenzhen",
    "flight": "MU8433",
    "airlineZh": "东方航空",
    "airlineEn": "China Eastern",
    "departure": "2026-07-31 13:40",
    "arrival": "15:45",
    "duration": "2h05m",
    "current": 930,
    "history": [
      1200,
      1200,
      1010,
      1010,
      930,
      930
    ]
  }
];
