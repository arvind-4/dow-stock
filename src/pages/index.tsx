import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getDefaultEndDate, getDefaultStartDate } from '@src/utils/dates';
import { fetchData } from '@src/utils/data';
import options from '@src/chart/options';
import Loading from '@src/components/Loading';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HomePage() {
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [defaultData, setDefaultData] = useState<any>(null);

  useEffect(() => {
    fetchData(startDate, endDate).then((data) => {
      if (data) setDefaultData(data);
    });
  }, [startDate, endDate]);

  return (
    <main>
      {defaultData ? (
        <Line data={defaultData} options={options} />
      ) : (
        <Loading />
      )}
      <div className='flex mt-6 mb-6 justify-center'>
        <Card className='w-1/2'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              Select Date Range (Start and End Date)
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='start'>Start Date</Label>
              <Input
                id='start'
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='end'>End Date</Label>
              <Input
                id='end'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
