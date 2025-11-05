import React, { useState, useEffect } from "react";
import axios from "axios";
import { FolderKanban, Briefcase, Code2, MessageSquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Analytics data (misol uchun statik)
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

  // Stats (dynamic qilish uchun state orqali)
  const [stats, setStats] = useState([
    {
      label: "Total Projects",
      value: "0",
      icon: FolderKanban,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Years Experience",
      value: "0",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Technologies",
      value: "0",
      icon: Code2,
      color: "from-teal-500 to-teal-600",
    },
    {
      label: "Messages",
      value: "0",
      icon: MessageSquare,
      color: "from-pink-500 to-pink-600",
    },
  ]);

  // Backend API'dan ma’lumot olish
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/skills/")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/experiences/")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/messages/")
      .then((res) => {
        const updatedStats = [...stats];
        updatedStats[3].value = res.data.length;
        setStats(updatedStats);
      })
      .catch((err) => console.error(err));
  }, []);

  // Statsni backend ma’lumotlari bilan yangilash
  useEffect(() => {
    setStats((prev) => [
      { ...prev[0], value: projects.length },
      { ...prev[1], value: experiences.length },
      { ...prev[2], value: skills.length },
      { ...prev[3], value: prev[3].value }, // Messages length allaqachon set qilingan
    ]);
  }, [skills, projects, experiences]);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl mb-2 font-semibold">
          Dashboard Overview
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 mb-1 text-sm sm:text-base">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart */}
      <div className="rounded-2xl p-4 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10">
        <h3 className="text-lg sm:text-xl mb-4 sm:mb-6 font-medium">
          Visitor Analytics
        </h3>
        <div className="h-64 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                tick={{ fontSize: 12 }}
              />
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
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
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
