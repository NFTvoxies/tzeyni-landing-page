"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Mock data for earnings
const earningsData = [
    { month: "Jan", earnings: 2400, services: 24, growth: 12 },
    { month: "Feb", earnings: 3200, services: 28, growth: 15 },
    { month: "Mar", earnings: 2800, services: 26, growth: 8 },
    { month: "Apr", earnings: 3900, services: 32, growth: 22 },
    { month: "May", earnings: 4500, services: 38, growth: 28 },
    { month: "Jun", earnings: 5100, services: 42, growth: 35 },
];

const serviceBreakdown = [
    { name: "Hair Styling", value: 4200, percentage: 35 },
    { name: "Hair Coloring", value: 3800, percentage: 32 },
    { name: "Treatments", value: 2400, percentage: 20 },
    { name: "Braiding", value: 1600, percentage: 13 },
];

const transactions = [
    {
        id: 1,
        client: "Jessica Brown",
        service: "Hair Coloring",
        date: "2025-01-15",
        amount: 150,
        status: "completed",
        type: "earnings",
    },
    {
        id: 2,
        client: "Rachel Green",
        service: "Hair Styling",
        date: "2025-01-14",
        amount: 75,
        status: "completed",
        type: "earnings",
    },
    {
        id: 3,
        client: "Amanda White",
        service: "Treatment",
        date: "2025-01-13",
        amount: 100,
        status: "completed",
        type: "earnings",
    },
    {
        id: 4,
        client: "Withdrawn to Bank",
        service: "Bank Transfer",
        date: "2025-01-10",
        amount: 1000,
        status: "completed",
        type: "withdrawal",
    },
    {
        id: 5,
        client: "Monica Geller",
        service: "Hair Cut",
        date: "2025-01-09",
        amount: 60,
        status: "completed",
        type: "earnings",
    },
];

const stats = {
    totalEarnings: 12000,
    monthEarnings: 5100,
    pendingPayment: 450,
    totalServices: 156,
    averagePerService: 76.92,
    withdrawalLastMonth: 8000,
};

// Color palette for pie chart
const COLORS = ["#C6934F", "#D4A574", "#E8D5C4", "#8B7355"];

// Stats Card Component
const StatsCard = ({ icon, label, value, subtext, showToggle, onToggle, isVisible }) => (
    <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon icon={icon} className="w-4 h-4 text-[#C6934F]" />
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl font-bold text-foreground">
                        {isVisible !== undefined ? (isVisible ? value : "•••••") : value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
                </div>
                {showToggle && (
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Icon
                            icon={isVisible ? "solar:eye-linear" : "solar:eye-closed-linear"}
                            className="w-4 h-4 text-muted-foreground"
                        />
                    </button>
                )}
            </div>
        </CardContent>
    </Card>
);

export default function EarningsPage() {
    const [showBalance, setShowBalance] = useState(true);

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                        Your Earnings
                    </h1>
                    <p className="text-neutral-600 mt-2">
                        Track your income, payouts, and performance metrics
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                >
                    <StatsCard
                        icon="solar:dollar-linear"
                        label="Total Earnings"
                        value={`$${stats.totalEarnings.toLocaleString()}`}
                        subtext="All time"
                        showToggle={true}
                        onToggle={() => setShowBalance(!showBalance)}
                        isVisible={showBalance}
                    />
                    <StatsCard
                        icon="solar:graph-up-linear"
                        label="This Month"
                        value={`$${stats.monthEarnings.toLocaleString()}`}
                        subtext="+35% from last month"
                    />
                    <StatsCard
                        icon="solar:calendar-linear"
                        label="Pending Payment"
                        value={`$${stats.pendingPayment}`}
                        subtext="Paid on the 15th"
                    />
                    <StatsCard
                        icon="solar:chart-2-linear"
                        label="Services Completed"
                        value={stats.totalServices}
                        subtext={`$${stats.averagePerService} average per service`}
                    />
                    <StatsCard
                        icon="solar:dollar-linear"
                        label="Last Month Payout"
                        value={`$${stats.withdrawalLastMonth.toLocaleString()}`}
                        subtext="Successfully transferred"
                    />
                    <Card className="border-border/60 bg-[#FFF4E6]/30">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Next Payout
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">Jan 15</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Automated weekly payouts
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Charts Section */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>

                    {/* Overview Charts */}
                    <TabsContent value="overview" className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="border-border/60">
                                <CardHeader>
                                    <CardTitle>Earnings Trend</CardTitle>
                                    <CardDescription>
                                        Your earnings progression over the last 6 months
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={earningsData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                                            <XAxis dataKey="month" stroke="#666666" />
                                            <YAxis stroke="#666666" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "#FFFFFF",
                                                    border: "1px solid #E5E5E5",
                                                    borderRadius: "8px",
                                                }}
                                                cursor={{ stroke: "#C6934F" }}
                                            />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="earnings"
                                                stroke="#C6934F"
                                                dot={{ fill: "#C6934F" }}
                                                strokeWidth={2}
                                                name="Earnings ($)"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="border-border/60">
                                <CardHeader>
                                    <CardTitle>Services & Growth</CardTitle>
                                    <CardDescription>
                                        Number of services completed and growth rate
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={earningsData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                                            <XAxis dataKey="month" stroke="#666666" />
                                            <YAxis yAxisId="left" stroke="#666666" />
                                            <YAxis yAxisId="right" orientation="right" stroke="#666666" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "#FFFFFF",
                                                    border: "1px solid #E5E5E5",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <Legend />
                                            <Bar
                                                yAxisId="left"
                                                dataKey="services"
                                                fill="#C6934F"
                                                name="Services Completed"
                                            />
                                            <Bar
                                                yAxisId="right"
                                                dataKey="growth"
                                                fill="#D4A574"
                                                name="Growth (%)"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Services Breakdown */}
                    <TabsContent value="services" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="border-border/60">
                                    <CardHeader>
                                        <CardTitle>Revenue by Service</CardTitle>
                                        <CardDescription>Where your income comes from</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={serviceBreakdown}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percentage }) => `${name} ${percentage}%`}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {serviceBreakdown.map((entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={COLORS[index % COLORS.length]}
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "#FFFFFF",
                                                        border: "1px solid #E5E5E5",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card className="border-border/60 h-full">
                                    <CardHeader>
                                        <CardTitle>Service Performance</CardTitle>
                                        <CardDescription>
                                            Detailed breakdown by service type
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {serviceBreakdown.map((service, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-foreground">
                                                        {service.name}
                                                    </span>
                                                    <span className="text-sm font-bold text-[#C6934F]">
                                                        ${service.value.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-secondary rounded-full h-2">
                                                    <div
                                                        className="bg-[#C6934F] h-2 rounded-full transition-all"
                                                        style={{ width: `${service.percentage}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {service.percentage}% of total
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </TabsContent>

                    {/* Transactions */}
                    <TabsContent value="transactions" className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="border-border/60">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Transaction History</CardTitle>
                                        <CardDescription>
                                            All your earnings and withdrawals
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Icon icon="solar:download-linear" className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {transactions.map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-foreground">
                                                            {transaction.client}
                                                        </h4>
                                                        <Badge
                                                            className={
                                                                transaction.type === "earnings"
                                                                    ? "bg-[#C6934F] hover:bg-[#B8854A] text-white border-none"
                                                                    : "bg-secondary text-secondary-foreground border-none"
                                                            }
                                                        >
                                                            {transaction.type === "earnings"
                                                                ? "Earned"
                                                                : "Withdrawal"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                                        <span>{transaction.service}</span>
                                                        <span>
                                                            {new Date(transaction.date).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "numeric",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div
                                                        className={`text-lg font-bold ${transaction.type === "earnings"
                                                                ? "text-[#C6934F]"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {transaction.type === "earnings" ? "+" : "-"}$
                                                        {transaction.amount}
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs capitalize mt-1"
                                                    >
                                                        {transaction.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
