import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Sun, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Activity,
  Calendar,
  Users,
  FolderKanban,
  Bell
} from "lucide-react";
import heroImage from "@/assets/solar-dashboard-hero.jpg";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Projects",
      value: "24",
      change: "+3 this month",
      icon: Zap,
      trend: "up"
    },
    {
      title: "Total Capacity",
      value: "2.4 MW",
      change: "+12% from last month",
      icon: Sun,
      trend: "up"
    },
    {
      title: "Revenue (YTD)",
      value: "R 8.4M",
      change: "+18% from last year",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "System Performance",
      value: "97.2%",
      change: "Above target",
      icon: Activity,
      trend: "stable"
    }
  ];

  const recentProjects = [
    {
      id: "1",
      name: "Residential Solar - Sandton",
      client: "J. Smith",
      status: "Installation",
      capacity: "8.5 kW",
      completion: 75,
      dueDate: "2025-01-15"
    },
    {
      id: "2", 
      name: "Commercial Rooftop - Midrand",
      client: "TechCorp Ltd",
      status: "Design Review",
      capacity: "150 kW",
      completion: 45,
      dueDate: "2025-02-01"
    },
    {
      id: "3",
      name: "Residential Solar - Centurion",
      client: "M. Johnson",
      status: "SSEG Approval",
      capacity: "12 kW",
      completion: 90,
      dueDate: "2025-01-20"
    }
  ];

  const alerts = [
    {
      type: "warning",
      message: "3 SSEG applications pending approval",
      time: "2 hours ago"
    },
    {
      type: "info", 
      message: "Monthly SANS compliance review due",
      time: "1 day ago"
    },
    {
      type: "success",
      message: "Project #SP-024 completed successfully",
      time: "3 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Installation": return "bg-primary/10 text-primary";
      case "Design Review": return "bg-secondary/10 text-secondary";
      case "SSEG Approval": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-secondary" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-solar p-8 text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Solar Dashboard" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Solar Project Manager Pro</h1>
          <p className="text-xl opacity-90 mb-6">
            Complete solar lifecycle management - from lead to grid connection
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg">
              <Zap className="mr-2 h-5 w-5" />
              New Project
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Sun className="mr-2 h-5 w-5" />
              System Designer
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              Recent Projects
            </CardTitle>
            <CardDescription>
              Track progress across your active solar installations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {project.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">{project.completion}%</p>
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-solar transition-all"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-lg border border-border/50 p-3"
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}