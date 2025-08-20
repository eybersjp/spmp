import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Zap, 
  Sun, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function EnergyAnalysis() {
  const [selectedProject, setSelectedProject] = useState("SP-001");
  const [timeRange, setTimeRange] = useState("12m");

  const projects = [
    { id: "SP-001", name: "Residential Solar - Sandton", capacity: "8.5 kW" },
    { id: "SP-002", name: "Commercial Rooftop - Midrand", capacity: "150 kW" },
    { id: "SP-003", name: "Residential Solar - Centurion", capacity: "12 kW" }
  ];

  const energyMetrics = [
    {
      title: "Monthly Production",
      value: "1,247 kWh",
      change: "+12%",
      trend: "up",
      icon: Sun,
      description: "vs last month"
    },
    {
      title: "Consumption Offset",
      value: "89%",
      change: "+5%",
      trend: "up",
      icon: Target,
      description: "of total usage"
    },
    {
      title: "Grid Export",
      value: "234 kWh",
      change: "-8%",
      trend: "down",
      icon: Activity,
      description: "excess generated"
    },
    {
      title: "Monthly Savings",
      value: "R 2,847",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "electricity cost saved"
    }
  ];

  const monthlyData = [
    { month: "Jan", production: 1180, consumption: 1350, savings: 2650 },
    { month: "Feb", production: 1220, consumption: 1300, savings: 2780 },
    { month: "Mar", production: 1190, consumption: 1280, savings: 2720 },
    { month: "Apr", production: 1160, consumption: 1200, savings: 2580 },
    { month: "May", production: 1100, consumption: 1150, savings: 2400 },
    { month: "Jun", production: 980, consumption: 1100, savings: 2150 },
    { month: "Jul", production: 1050, consumption: 1200, savings: 2350 },
    { month: "Aug", production: 1150, consumption: 1250, savings: 2550 },
    { month: "Sep", production: 1200, consumption: 1300, savings: 2700 },
    { month: "Oct", production: 1280, consumption: 1350, savings: 2890 },
    { month: "Nov", production: 1320, consumption: 1400, savings: 2950 },
    { month: "Dec", production: 1350, consumption: 1450, savings: 3100 }
  ];

  const scenarios = [
    {
      name: "Current System",
      capacity: "8.5 kW",
      annualProduction: "14,500 kWh",
      offset: "89%",
      roi: "7.2 years",
      savings: "R 34,200/year",
      status: "active"
    },
    {
      name: "Expanded System",
      capacity: "12 kW", 
      annualProduction: "20,500 kWh",
      offset: "125%",
      roi: "8.1 years",
      savings: "R 48,500/year",
      status: "scenario"
    },
    {
      name: "Battery Addition",
      capacity: "8.5 kW + 10kWh Battery",
      annualProduction: "14,500 kWh",
      offset: "95%",
      roi: "9.5 years", 
      savings: "R 42,800/year",
      status: "scenario"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Energy Analysis</h1>
          <p className="text-muted-foreground">
            Production vs consumption analysis with ROI and payback calculations
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name} ({project.capacity})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="12m">12 Months</SelectItem>
              <SelectItem value="24m">24 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {energyMetrics.map((metric) => (
          <Card key={metric.title} className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5 text-primary" />
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.title}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Comparison</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Production Chart */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Monthly Production vs Consumption
                </CardTitle>
                <CardDescription>
                  Track energy generation against household consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.slice(-6).map((data) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex gap-4 text-xs">
                          <span className="text-primary">Prod: {data.production}kWh</span>
                          <span className="text-muted-foreground">Use: {data.consumption}kWh</span>
                        </div>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div 
                          className="bg-gradient-solar rounded-l"
                          style={{ width: `${(data.production / Math.max(data.production, data.consumption)) * 100}%` }}
                        />
                        <div 
                          className="bg-muted rounded-r"
                          style={{ width: `${(data.consumption / Math.max(data.production, data.consumption)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Savings Timeline */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Cumulative Savings
                </CardTitle>
                <CardDescription>
                  Track your electricity bill savings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">R 32,847</p>
                    <p className="text-sm text-muted-foreground">Total saved this year</p>
                  </div>
                  <div className="space-y-3">
                    {monthlyData.slice(-4).map((data, index) => (
                      <div key={data.month} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                        <span className="font-medium">{data.month}</span>
                        <span className="text-success font-medium">R {data.savings.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid gap-6">
            {scenarios.map((scenario) => (
              <Card key={scenario.name} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{scenario.name}</h3>
                      <Badge variant={scenario.status === "active" ? "default" : "outline"}>
                        {scenario.status === "active" ? "Current" : "Scenario"}
                      </Badge>
                    </div>
                    {scenario.status !== "active" && (
                      <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                        Apply Scenario
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-semibold">{scenario.capacity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Annual Production</p>
                      <p className="font-semibold">{scenario.annualProduction}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Usage Offset</p>
                      <p className="font-semibold text-primary">{scenario.offset}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ROI Payback</p>
                      <p className="font-semibold">{scenario.roi}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Annual Savings</p>
                      <p className="font-semibold text-success">{scenario.savings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions to maximize your solar efficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-primary">Peak Usage Alignment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Shift 40% of your energy usage to 10AM-2PM to increase self-consumption by 15%
                  </p>
                </div>
                <div className="p-4 bg-warning/10 rounded-lg border-l-4 border-warning">
                  <h4 className="font-semibold text-warning">Panel Cleaning</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    3% production drop detected. Schedule cleaning to restore 120kWh/month
                  </p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <h4 className="font-semibold text-success">Battery Storage</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add 10kWh battery to capture 95% of excess production during peak generation
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Performance Alerts</CardTitle>
                <CardDescription>
                  Real-time monitoring and system health updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System Operating Normally</p>
                    <p className="text-xs text-muted-foreground">All inverters online, no faults detected</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded">
                  <div className="h-2 w-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Shading Detected</p>
                    <p className="text-xs text-muted-foreground">Panel 3A showing 12% production reduction</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hr ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Maintenance Reminder</p>
                    <p className="text-xs text-muted-foreground">Annual system inspection due in 14 days</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}