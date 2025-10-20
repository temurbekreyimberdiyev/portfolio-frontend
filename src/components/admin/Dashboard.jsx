import React from "react";
import {
  FolderKanban,
  Briefcase,
  Code2,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Total Projects",
    value: "12",
    icon: FolderKanban,
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Years Experience",
    value: "5+",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
  },
  {
    label: "Technologies",
    value: "24",
    icon: Code2,
    color: "from-teal-500 to-teal-600",
  },
  {
    label: "Messages",
    value: "38",
    icon: MessageSquare,
    color: "from-pink-500 to-pink-600",
  },
];

const analyticsData = [
  { month: "Jan", views: 1200 },
  { month: "Feb", views: 1900 },
  { month: "Mar", views: 1600 },
  { month: "Apr", views: 2400 },
  { month: "May", views: 2100 },
  { month: "Jun", views: 2800 },
  { month: "Jul", views: 3200 },
  { month: "Aug", views: 2900 },
  { month: "Sep", views: 3400 },
  { month: "Oct", views: 3800 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl mb-2">Dashboard Overview</h2>
        <p className="text-white/60">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 mb-1">{stat.label}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl mb-6">Visitor Analytics</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 26, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient
                  id="colorGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
