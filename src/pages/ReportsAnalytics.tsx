import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Download, 
  FileText, 
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Zap,
  DollarSign,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("12m");
  const [reportType, setReportType] = useState("performance");

  const dashboardMetrics = [
    {
      title: "Total Projects",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: Zap,
      color: "text-primary"
    },
    {
      title: "Active Clients", 
      value: "89",
      change: "+8%",
      trend: "up", 
      icon: Users,
      color: "text-success"
    },
    {
      title: "Revenue (YTD)",
      value: "R 12.4M",
      change: "+24%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary"
    },
    {
      title: "System Capacity",
      value: "2.1 MW",
      change: "+18%", 
      trend: "up",
      icon: Activity,
      color: "text-warning"
    }
  ];

  const performanceReports = [
    {
      name: "Monthly Performance Summary",
      description: "Energy production, consumption offset, and savings analysis",
      lastGenerated: "2024-12-15",
      format: "PDF",
      icon: BarChart3
    },
    {
      name: "Financial Performance Report",
      description: "Revenue, costs, profitability analysis by project and client",
      lastGenerated: "2024-12-15",
      format: "Excel", 
      icon: DollarSign
    },
    {
      name: "Client Portfolio Analysis",
      description: "Client demographics, project distribution, and satisfaction metrics",
      lastGenerated: "2024-12-10",
      format: "PDF",
      icon: Users
    },
    {
      name: "System Health Dashboard", 
      description: "Real-time monitoring, alerts, and maintenance requirements",
      lastGenerated: "2024-12-16",
      format: "PDF",
      icon: Activity
    }
  ];

  const complianceReports = [
    {
      name: "SANS Compliance Status",
      description: "Electrical safety standards compliance across all projects",
      status: "98% Compliant",
      lastUpdated: "2024-12-16",
      issues: 2,
      color: "success"
    },
    {
      name: "SSEG Application Tracker",
      description: "Small-Scale Embedded Generation application statuses",
      status: "87% Approved", 
      lastUpdated: "2024-12-15",
      issues: 5,
      color: "warning"
    },
    {
      name: "Safety Incident Report",
      description: "Workplace safety incidents and corrective actions",
      status: "0 Incidents",
      lastUpdated: "2024-12-16", 
      issues: 0,
      color: "success"
    },
    {
      name: "Environmental Impact",
      description: "Carbon footprint reduction and environmental benefits",
      status: "145.7 tons CO₂ saved",
      lastUpdated: "2024-12-15",
      issues: 0,
      color: "success"
    }
  ];

  const analytics = [
    {
      title: "Project Success Rate",
      value: "94.2%",
      trend: "+2.1%",
      description: "Projects completed on time and within budget"
    },
    {
      title: "Average Project Value",
      value: "R 186,500",
      trend: "+15.3%", 
      description: "Mean project value over the last 12 months"
    },
    {
      title: "Client Retention Rate",
      value: "87.4%",
      trend: "+5.2%",
      description: "Percentage of clients with repeat business"
    },
    {
      title: "Installation Time",
      value: "12.3 days",
      trend: "-1.8 days",
      description: "Average time from start to commissioning"
    },
    {
      title: "System Performance",
      value: "104.7%",
      trend: "+1.2%",
      description: "Actual vs predicted energy production"
    },
    {
      title: "Customer Satisfaction",
      value: "4.7/5.0",
      trend: "+0.3",
      description: "Average customer satisfaction rating"
    }
  ];

  const monthlyData = [
    { month: "Jan", projects: 8, revenue: 1200000, capacity: 145 },
    { month: "Feb", projects: 12, revenue: 1850000, capacity: 220 },
    { month: "Mar", projects: 15, revenue: 2100000, capacity: 285 },
    { month: "Apr", projects: 11, revenue: 1650000, capacity: 195 },
    { month: "May", projects: 14, revenue: 2200000, capacity: 310 },
    { month: "Jun", projects: 9, revenue: 1350000, capacity: 165 },
    { month: "Jul", projects: 13, revenue: 1950000, capacity: 245 },
    { month: "Aug", projects: 16, revenue: 2400000, capacity: 340 },
    { month: "Sep", projects: 18, revenue: 2650000, capacity: 385 },
    { month: "Oct", projects: 14, revenue: 2100000, capacity: 280 },
    { month: "Nov", projects: 17, revenue: 2800000, capacity: 425 },
    { month: "Dec", projects: 12, revenue: 1900000, capacity: 290 }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Interactive dashboards and exportable reports for performance tracking
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="12m">12 Months</SelectItem>
              <SelectItem value="24m">24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-solar hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title} className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6">
            {performanceReports.map((report) => (
              <Card key={report.name} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <report.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last: {report.lastGenerated}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {report.format}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6">
            {complianceReports.map((report) => (
              <Card key={report.name} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        report.color === 'success' ? 'bg-success/10' : 
                        report.color === 'warning' ? 'bg-warning/10' : 'bg-muted/10'
                      }`}>
                        {report.issues === 0 ? (
                          <CheckCircle className={`h-6 w-6 ${
                            report.color === 'success' ? 'text-success' : 'text-muted-foreground'
                          }`} />
                        ) : (
                          <AlertTriangle className={`h-6 w-6 ${
                            report.color === 'warning' ? 'text-warning' : 'text-destructive'
                          }`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant={report.color === 'success' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                          {report.issues > 0 && (
                            <span className="text-xs text-warning">
                              {report.issues} issues require attention
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Updated: {report.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.map((analytic) => (
              <Card key={analytic.title} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{analytic.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {analytic.trend}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">{analytic.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {analytic.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Business Intelligence Summary
              </CardTitle>
              <CardDescription>
                Key insights and recommendations for business growth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-success">Strengths</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      High customer satisfaction (4.7/5)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Excellent compliance record (98%)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Strong project success rate (94.2%)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Growing revenue (+24% YTD)
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-warning">Opportunities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-warning" />
                      Expand into commercial sector (15% growth potential)
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-warning" />
                      Reduce installation time (target: 10 days avg)
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-warning" />
                      Improve SSEG approval rate (target: 95%)
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-warning" />
                      Battery storage add-on sales (38% interested)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Monthly Performance Trends
              </CardTitle>
              <CardDescription>
                Track business performance over the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Projects Trend */}
                <div>
                  <h4 className="font-medium mb-3">Projects Completed</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data) => (
                      <div key={data.month} className="flex items-center gap-4">
                        <span className="w-8 text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-solar transition-all duration-300"
                            style={{ width: `${(data.projects / 20) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-medium text-right">{data.projects}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Trend */}
                <div>
                  <h4 className="font-medium mb-3">Monthly Revenue</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data) => (
                      <div key={data.month} className="flex items-center gap-4">
                        <span className="w-8 text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success transition-all duration-300"
                            style={{ width: `${(data.revenue / 3000000) * 100}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm font-medium text-right">
                          R {(data.revenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacity Trend */}
                <div>
                  <h4 className="font-medium mb-3">System Capacity Installed (kW)</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data) => (
                      <div key={data.month} className="flex items-center gap-4">
                        <span className="w-8 text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-warning transition-all duration-300"
                            style={{ width: `${(data.capacity / 500) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-medium text-right">{data.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}