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
      <section className="flex-1 bg-pink-40 overflow-y-auto dark:bg-gray-900 transition-colors duration-200">
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
