import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  Calendar,
  Shield,
  Settings,
  Mail,
  MessageSquare,
  Smartphone,
  Filter,
  CheckCheck,
  Trash2,
  Volume2,
  VolumeX,
  Eye,
  X
} from "lucide-react";

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    {
      id: "N-001",
      type: "alert",
      priority: "high",
      title: "System Fault Detected",
      message: "Inverter 2 at Sandton Residential (SP-001) has stopped responding. Immediate attention required.",
      project: "SP-001",
      timestamp: "2024-12-16 14:30",
      read: false,
      category: "system",
      actions: ["Call Client", "Dispatch Team", "Mark Resolved"]
    },
    {
      id: "N-002",
      type: "reminder",
      priority: "medium",
      title: "SSEG Application Due",
      message: "SSEG application for TechCorp Limited (SP-002) is due for submission in 2 days.",
      project: "SP-002",
      timestamp: "2024-12-16 09:15",
      read: false,
      category: "compliance",
      actions: ["Review Application", "Submit Now", "Request Extension"]
    },
    {
      id: "N-003",
      type: "update",
      priority: "low",
      title: "Installation Completed",
      message: "Mary Johnson's solar installation (SP-003) has been successfully completed and commissioned.",
      project: "SP-003",
      timestamp: "2024-12-15 16:45",
      read: true,
      category: "project",
      actions: ["View Report", "Schedule Follow-up", "Send Invoice"]
    },
    {
      id: "N-004",
      type: "warning",
      priority: "high",
      title: "Weather Alert",
      message: "Severe thunderstorm warning for Johannesburg area. Consider postponing outdoor installations.",
      project: null,
      timestamp: "2024-12-15 11:20",
      read: false,
      category: "weather",
      actions: ["Reschedule Tasks", "Notify Teams", "Update Schedule"]
    },
    {
      id: "N-005",
      type: "reminder",
      priority: "medium",
      title: "Annual Inspection Due",
      message: "Annual safety inspection for Mining Corp SA (SP-004) is scheduled for next week.",
      project: "SP-004",
      timestamp: "2024-12-15 08:00",
      read: true,
      category: "maintenance",
      actions: ["Schedule Inspector", "Prepare Checklist", "Notify Client"]
    },
    {
      id: "N-006",
      type: "alert",
      priority: "medium",
      title: "Performance Degradation",
      message: "Solar system at Centurion (SP-003) showing 8% performance drop over the last week.",
      project: "SP-003",
      timestamp: "2024-12-14 15:30",
      read: false,
      category: "performance",
      actions: ["Analyze Data", "Schedule Maintenance", "Check Panels"]
    }
  ];

  const alertCategories = [
    { value: "all", label: "All Notifications", count: notifications.length },
    { value: "system", label: "System Alerts", count: notifications.filter(n => n.category === 'system').length },
    { value: "compliance", label: "Compliance", count: notifications.filter(n => n.category === 'compliance').length },
    { value: "project", label: "Project Updates", count: notifications.filter(n => n.category === 'project').length },
    { value: "maintenance", label: "Maintenance", count: notifications.filter(n => n.category === 'maintenance').length },
    { value: "performance", label: "Performance", count: notifications.filter(n => n.category === 'performance').length },
    { value: "weather", label: "Weather", count: notifications.filter(n => n.category === 'weather').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "reminder": return <Clock className="h-5 w-5 text-primary" />;
      case "update": return <CheckCircle className="h-5 w-5 text-success" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-success bg-success/5";
      default: return "border-l-muted bg-muted/5";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications & Alerts</h1>
          <p className="text-muted-foreground">
            Real-time system monitoring and automated notifications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Settings Panel */}
      {showSettings && (
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Notification Settings
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">SMS Alerts</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sound Alerts</span>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Alert Categories</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Reminders</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weather Warnings</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maintenance Reminders</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">High Priority Hours</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="business">Business Hours (8AM-6PM)</SelectItem>
                    <SelectItem value="extended">Extended Hours (7AM-9PM)</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Escalation Delay</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="5min">5 Minutes</SelectItem>
                    <SelectItem value="15min">15 Minutes</SelectItem>
                    <SelectItem value="30min">30 Minutes</SelectItem>
                    <SelectItem value="1hour">1 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alertCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </SelectItem>
                ))}
                <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">
              {filteredNotifications.length} notifications
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="active">Active Issues</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-0 shadow-elegant border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </span>
                          {notification.project && (
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {notification.project}
                            </span>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {notification.actions.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {notification.actions.map((action, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {notifications
              .filter(n => n.type === 'alert' || n.type === 'warning')
              .map((notification) => (
                <Card 
                  key={notification.id}
                  className={`border-0 shadow-elegant border-l-4 ${getPriorityColor(notification.priority)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(notification.type)}
                        <div>
                          <h3 className="font-semibold text-destructive">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                      <Badge variant="destructive" className="animate-pulse">
                        ACTIVE
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-destructive hover:bg-destructive/90">
                        Resolve Now
                      </Button>
                      <Button variant="outline" size="sm">
                        Escalate
                      </Button>
                      <Button variant="outline" size="sm">
                        Snooze
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="space-y-4">
            {notifications
              .filter(n => n.type === 'reminder')
              .map((notification) => (
                <Card key={notification.id} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Scheduled: {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                          Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {notifications
              .filter(n => n.read)
              .slice(0, 10)
              .map((notification) => (
                <Card key={notification.id} className="border-0 shadow-elegant opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(notification.type)}
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Resolved
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}