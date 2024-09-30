import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import Sidebar from '../components/Sidebar';
import CaloriesBurnt from '@/components/CaloriesBurnt';
import CaloriesConsumed from '@/components/CaloriesConsumed';
import DailyTarget from '@/components/DailyTarget';
import WeeklyTarget from '@/components/WeeklyTarget';
import ProgressTracker from '@/components/ProgressTracker';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 bg-gray-100 overflow-y-auto">
        <section className="container mx-auto p-6"> 
          <CaloriesBurnt />
          <CaloriesConsumed />
          <DailyTarget />
          <WeeklyTarget />
          <ProgressTracker />
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
