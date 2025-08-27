import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Zap,
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: "SP-001",
      name: "Residential Solar Installation - Sandton",
      client: "John Smith",
      status: "In Progress",
      phase: "Installation",
      capacity: "8.5 kW",
      location: "Sandton, Johannesburg",
      startDate: "2024-12-01",
      targetDate: "2025-01-15",
      completion: 75,
      value: "R 180,000"
    },
    {
      id: "SP-002", 
      name: "Commercial Rooftop System - Midrand",
      client: "TechCorp Limited",
      status: "Planning",
      phase: "Design Review",
      capacity: "150 kW",
      location: "Midrand, Gauteng",
      startDate: "2024-11-15",
      targetDate: "2025-02-01",
      completion: 45,
      value: "R 2,400,000"
    },
    {
      id: "SP-003",
      name: "Residential Solar - Centurion",
      client: "Mary Johnson",
      status: "Approval",
      phase: "SSEG Application",
      capacity: "12 kW",
      location: "Centurion, Pretoria",
      startDate: "2024-10-20",
      targetDate: "2025-01-20",
      completion: 90,
      value: "R 250,000"
    },
    {
      id: "SP-004",
      name: "Industrial Solar Farm - Rustenburg",
      client: "Mining Corp SA",
      status: "Completed",
      phase: "Grid Connection",
      capacity: "500 kW",
      location: "Rustenburg, North West",
      startDate: "2024-08-01",
      targetDate: "2024-12-15",
      completion: 100,
      value: "R 8,500,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/20";
      case "In Progress": return "bg-primary/10 text-primary border-primary/20";
      case "Planning": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Approval": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleNewProject = () => {
    toast({
      title: "New Project",
      description: "Opening project creation wizard...",
    });
    navigate('/designer');
  };

  const handleFilters = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon...",
    });
  };

  const handleProjectAction = (projectId: string, action: string) => {
    toast({
      title: `Project ${action}`,
      description: `${action} for project ${projectId}`,
    });
  };
  
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Manage solar installations with SANS/SSEG compliance tracking
          </p>
        </div>
        <Button className="bg-gradient-solar hover:opacity-90" onClick={handleNewProject}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, clients, or project IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={handleFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
          <TabsTrigger value="planning">Planning ({projects.filter(p => p.status === 'Planning').length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({projects.filter(p => p.status === 'In Progress').length})</TabsTrigger>
          <TabsTrigger value="approval">Approval ({projects.filter(p => p.status === 'Approval').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({projects.filter(p => p.status === 'Completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-elegant hover:shadow-energy transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {project.id}
                      </Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status}</span>
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleProjectAction(project.id, 'Options')}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">Phase: {project.phase}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>{project.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{project.targetDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{project.completion}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-solar transition-all duration-300"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Value</span>
                        <span className="text-sm font-medium">{project.value}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would filter the projects accordingly */}
        <TabsContent value="planning">
          <div className="grid gap-4">
            {filteredProjects.filter(p => p.status === 'Planning').map((project) => (
              <Card key={project.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.client} • {project.capacity}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add similar content for other tabs */}
      </Tabs>
    </div>
  );
}
