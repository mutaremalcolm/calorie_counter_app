import { Bar, Pie } from 'react-chartjs-2';
import { CalorieGoal, WeeklyGoal } from '../lib/types';
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Dummy Data
const dummyDailyGoals: CalorieGoal[] = [
  { date: '2024-09-01', caloriesConsumed: 1800, dailyGoal: 2000 },
  { date: '2024-09-02', caloriesConsumed: 2100, dailyGoal: 2000 },
  { date: '2024-09-03', caloriesConsumed: 1750, dailyGoal: 2000 },
  { date: '2024-09-04', caloriesConsumed: 2200, dailyGoal: 2000 },
  { date: '2024-09-05', caloriesConsumed: 1950, dailyGoal: 2000 },
  { date: '2024-09-06', caloriesConsumed: 2050, dailyGoal: 2000 },
  { date: '2024-09-07', caloriesConsumed: 1900, dailyGoal: 2000 },
];

const dummyWeeklyGoals: WeeklyGoal[] = [
  { startDate: '2024-09-01', endDate: '2024-09-07', caloriesConsumed: 13750, weeklyGoal: 14000 },
  { startDate: '2024-09-08', endDate: '2024-09-14', caloriesConsumed: 13200, weeklyGoal: 14000 },
];

const Dashboard = () => {
  const dailyCalorieData = {
    labels: dummyDailyGoals.map((goal) => goal.date),
    datasets: [
      {
        label: 'Calories Consumed',
        data: dummyDailyGoals.map((goal) => goal.caloriesConsumed),
        backgroundColor: 'rgba(128, 0, 128, 0.6)', 
        borderColor: 'rgba(128, 0, 128, 1)', 
        borderWidth: 1,
      },
      {
        label: 'Daily Goal',
        data: dummyDailyGoals.map((goal) => goal.dailyGoal),
        backgroundColor: 'rgba(153, 102, 255, 0.6)', 
        borderColor: 'rgba(153, 102, 255, 1)', 
        borderWidth: 1,
      },
    ],
  };

  const generateWeeklyPieData = (goal: WeeklyGoal) => ({
    labels: ['Calories Consumed', 'Calories Remaining'],
    datasets: [
      {
        data: [goal.caloriesConsumed, goal.weeklyGoal - goal.caloriesConsumed],
        backgroundColor: ['#6D28D9', '#A78BFA'], 
      },
    ],
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="container mx-auto p-6"> 
          {/* Daily Calorie Bar Chart */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Daily Calorie Consumption</h2>
            <Bar data={dailyCalorieData} options={{ responsive: true }} />
          </section>

          {/* Weekly Calorie Pie Charts */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Weekly Calorie Goals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dummyWeeklyGoals.map((goal) => (
                <div key={goal.startDate} className="bg-white shadow-md p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-purple-600">
                    {goal.startDate} to {goal.endDate}
                  </h3>
                  <Pie data={generateWeeklyPieData(goal)} options={{ responsive: true }} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
