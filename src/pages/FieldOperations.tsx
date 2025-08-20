import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Camera, 
  Clock, 
  Users,
  Navigation,
  Zap,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Upload,
  Download,
  Phone,
  MessageSquare,
  Settings,
  Target,
  Activity,
  Truck
} from "lucide-react";

export default function FieldOperations() {
  const [selectedTeam, setSelectedTeam] = useState("team-1");
  const [activeTask, setActiveTask] = useState(null);

  const teams = [
    { id: "team-1", name: "Installation Team A", lead: "Mike Johnson", location: "Sandton" },
    { id: "team-2", name: "Installation Team B", lead: "Sarah Williams", location: "Midrand" },
    { id: "team-3", name: "Maintenance Team", lead: "David Smith", location: "Centurion" }
  ];

  const fieldTasks = [
    {
      id: "FT-001",
      project: "SP-001 - Residential Solar Sandton",
      client: "John Smith",
      type: "installation",
      status: "in-progress",
      priority: "high",
      team: "Installation Team A",
      location: "123 Solar Street, Sandton",
      coordinates: "-26.1076, 28.0567",
      startTime: "08:00",
      estimatedDuration: "6 hours",
      progress: 65,
      tasks: [
        { id: 1, name: "Site preparation", status: "completed" },
        { id: 2, name: "Panel mounting", status: "in-progress" },
        { id: 3, name: "Electrical connections", status: "pending" },
        { id: 4, name: "System testing", status: "pending" },
        { id: 5, name: "Final inspection", status: "pending" }
      ]
    },
    {
      id: "FT-002",
      project: "SP-002 - Commercial Rooftop Midrand", 
      client: "TechCorp Limited",
      type: "inspection",
      status: "completed",
      priority: "medium",
      team: "Installation Team B",
      location: "456 Business Park, Midrand",
      coordinates: "-25.9886, 28.1281",
      startTime: "09:00",
      estimatedDuration: "3 hours",
      progress: 100,
      tasks: [
        { id: 1, name: "Site assessment", status: "completed" },
        { id: 2, name: "Roof condition check", status: "completed" },
        { id: 3, name: "Electrical audit", status: "completed" },
        { id: 4, name: "Documentation", status: "completed" }
      ]
    },
    {
      id: "FT-003",
      project: "SP-003 - Residential Solar Centurion",
      client: "Mary Johnson", 
      type: "maintenance",
      status: "scheduled",
      priority: "low",
      team: "Maintenance Team",
      location: "789 Green Avenue, Centurion",
      coordinates: "-25.8601, 28.1881",
      startTime: "14:00",
      estimatedDuration: "2 hours",
      progress: 0,
      tasks: [
        { id: 1, name: "Panel cleaning", status: "pending" },
        { id: 2, name: "Connection check", status: "pending" },
        { id: 3, name: "Performance test", status: "pending" }
      ]
    }
  ];

  const inspectionPhotos = [
    {
      id: "IMG-001",
      task: "FT-001",
      filename: "site_preparation_before.jpg",
      timestamp: "2024-12-16 08:15",
      location: "-26.1076, 28.0567",
      notes: "Site cleared and ready for installation"
    },
    {
      id: "IMG-002", 
      task: "FT-001",
      filename: "panel_mounting_progress.jpg",
      timestamp: "2024-12-16 11:30",
      location: "-26.1076, 28.0567", 
      notes: "50% of panels mounted, weather conditions good"
    },
    {
      id: "IMG-003",
      task: "FT-002",
      filename: "roof_condition_assessment.jpg",
      timestamp: "2024-12-15 10:45",
      location: "-25.9886, 28.1281",
      notes: "Roof in excellent condition, no repairs needed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-primary/10 text-primary border-primary/20";
      case "scheduled": return "bg-warning/10 text-warning border-warning/20";
      case "pending": return "bg-secondary/10 text-secondary border-secondary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "installation": return <Zap className="h-4 w-4" />;
      case "inspection": return <CheckCircle className="h-4 w-4" />;
      case "maintenance": return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Field Operations</h1>
          <p className="text-muted-foreground">
            Mobile-first operations with GPS tracking and offline capabilities
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name} - {team.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-gradient-solar hover:opacity-90">
            <Target className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Operations Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="inspection">Site Inspection</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {fieldTasks.map((task) => (
              <Card key={task.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getTypeIcon(task.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{task.project}</h3>
                        <p className="text-sm text-muted-foreground">Client: {task.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {task.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                        {task.status === "scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{task.team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{task.startTime} ({task.estimatedDuration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{task.coordinates}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Task Progress</h4>
                        {task.tasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                            <span>{subtask.name}</span>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(subtask.status)}
                            >
                              {subtask.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {subtask.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                              {subtask.status === "pending" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {subtask.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">{task.progress}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-solar transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Client
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Camera className="h-4 w-4 mr-1" />
                          Take Photo
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-solar hover:opacity-90">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                Field operations scheduled for {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fieldTasks
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold">{task.startTime}</p>
                        <p className="text-xs text-muted-foreground">{task.estimatedDuration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">{task.project}</h4>
                        <p className="text-sm text-muted-foreground">{task.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{task.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspection" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Site Inspection Photos
                </CardTitle>
                <CardDescription>
                  GPS-tagged photos from field operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inspectionPhotos.map((photo) => (
                  <div key={photo.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <Camera className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{photo.filename}</h4>
                        <p className="text-sm text-muted-foreground">Task: {photo.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {photo.timestamp} • GPS: {photo.location}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{photo.notes}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-success" />
                  Upload New Inspection
                </CardTitle>
                <CardDescription>
                  Add photos and notes from current site visit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Task</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose active task" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTasks
                        .filter(task => task.status !== 'completed')
                        .map((task) => (
                          <SelectItem key={task.id} value={task.id}>
                            {task.id} - {task.project}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Inspection Notes</label>
                  <Textarea 
                    placeholder="Add detailed notes about the site condition, progress, or any issues..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Current Location</label>
                    <Input 
                      placeholder="GPS coordinates..."
                      value="-26.1076, 28.0567"
                      disabled
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timestamp</label>
                    <Input 
                      value={new Date().toLocaleString()}
                      disabled
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Take photos or upload from gallery
                  </p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-1" />
                      Camera
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Gallery
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-solar hover:opacity-90">
                  Save Inspection Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Live Team Locations
                  </CardTitle>
                  <CardDescription>
                    Real-time GPS tracking of field teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      <p className="text-sm text-muted-foreground">Showing real-time team locations and routes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-success" />
                    Team Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teams.map((team) => (
                    <div key={team.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{team.name}</h4>
                        <div className="h-2 w-2 bg-success rounded-full"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Lead: {team.lead}</p>
                      <p className="text-sm text-muted-foreground">Location: {team.location}</p>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-warning" />
                    Vehicle Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Van A - GP123ABC</span>
                      <Badge variant="outline" className="text-success">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Installation Team A</p>
                    <p className="text-xs text-muted-foreground">Speed: 45 km/h • Sandton</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Van B - GP456DEF</span>
                      <Badge variant="outline" className="text-primary">
                        En Route
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Installation Team B</p>
                    <p className="text-xs text-muted-foreground">Speed: 60 km/h • To Midrand</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}