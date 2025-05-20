import { motion } from 'framer-motion';

// const ProgressCircle = ({ percent }: { percent: number }) => {
//       const circumference = 40 * 2 * Math.PI;
//       const offset = circumference - (percent / 100) * circumference;

//       return (
//             <svg className="w-24 h-24 transform" viewBox="0 0 100 100">
//                   <circle
//                         className="text-gray-100"
//                         strokeWidth="10"
//                         stroke="currentColor"
//                         fill="transparent"
//                         r="40"
//                         cx="50"
//                         cy="50"
//                   />
//                   <circle
//                         className="text-blue-300"
//                         strokeWidth="10"
//                         strokeDasharray={circumference.toFixed(2)}
//                         strokeDashoffset={offset.toFixed(2)}
//                         strokeLinecap="round"
//                         stroke="currentColor"
//                         fill="transparent"
//                         r="40"
//                         cx="50"
//                         cy="50"
//                   />
//                   <text x="50" y="50" textAnchor="middle" dy="6" className="fill-white font-bold">
//                         {percent.toFixed(2)}%
//                   </text>
//             </svg>
//       );
// };

export default function AdminSelce({ totalOrders, totalRevenue, totalShipmentCost }: { totalOrders: number, totalRevenue: number, totalShipmentCost: number }) {

      const report = [];
      report.push({
            title: 'Total Orders',
            value: totalOrders,
            percent: 100,
            color: 'bg-[#bf74fa]',
            icon: '💰'
      });

      report.push({
            title: 'Total sale',
            value: totalRevenue,
            percent: 0,
            color: 'bg-[#fe929d]',
            icon: '🏧'
      });
      report.push({
            title: 'Shipment Cost',
            value: totalShipmentCost,
            percent: 0,
            color: 'bg-[#ffca71]',
            icon: '📋'
      });

      return (
            <div className="flex gap-10 p-6">
                  {report.map((stat, index) => (
                        <motion.div
                              key={index}
                              className={`p-6 rounded-2xl shadow-lg text-white w-full ${stat.color}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                              <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold">{stat.title}</h1>
                                    <span className="text-2xl">{stat.icon}</span>
                              </div>
                              <div className="flex justify-end items-center mt-4">
                                    {/* <ProgressCircle percent={stat.percent} /> */}
                                    <div className='text-center'>
                                          <p className="text-2xl font-bold">{stat.value}</p>
                                          {/* <p className="text-sm opacity-75">Last 24 hours</p> */}
                                    </div>
                              </div>
                        </motion.div>
                  ))}
            </div>
      );
}
