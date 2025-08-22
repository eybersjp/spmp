import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Edit,
  Save,
  X,
  Calendar,
  Users,
  Zap,
  MapPin,
  DollarSign,
  FileText,
  Camera,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Upload
} from "lucide-react";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>({});

  // Mock project data - in real app this would come from API
  const getProjectData = (id: string) => {
    const projects = {
      'SP-001': {
        id: 'SP-001',
        name: 'Residential Solar Installation - Sandton',
        client: 'John Smith',
        clientId: 'CL-001',
        status: 'In Progress',
        phase: 'Installation',
        capacity: '8.5 kW',
        location: 'Sandton, Johannesburg',
        address: '123 Solar Street, Sandton, Johannesburg',
        startDate: '2024-12-01',
        targetDate: '2025-01-15',
        completion: 75,
        value: 'R 180,000',
        description: 'Residential rooftop solar installation with battery backup system including SSEG registration and grid connection.',
        panels: 20,
        inverters: 1,
        batteries: 4,
        installer: 'Solar Tech Solutions',
        permits: ['Municipal Building Plan', 'SSEG Application', 'CoC Electrical']
      },
      'SP-002': {
        id: 'SP-002',
        name: 'Commercial Rooftop System - Midrand',
        client: 'TechCorp Limited',
        clientId: 'CL-002',
        status: 'Planning',
        phase: 'Design Review',
        capacity: '150 kW',
        location: 'Midrand, Gauteng',
        address: '45 Business Park, Midrand, Gauteng',
        startDate: '2024-11-15',
        targetDate: '2025-02-01',
        completion: 45,
        value: 'R 2,400,000',
        description: 'Large-scale commercial rooftop installation with grid-tie system for corporate office building.',
        panels: 400,
        inverters: 6,
        batteries: 0,
        installer: 'Commercial Solar Pro',
        permits: ['Environmental Impact', 'Municipal Approval', 'NERSA License']
      }
    };
    return projects[id as keyof typeof projects] || projects['SP-001'];
  };

  const project = getProjectData(projectId || 'SP-001');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/20";
      case "In Progress": return "bg-primary/10 text-primary border-primary/20";
      case "Planning": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Approval": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const timeline = [
    { date: '2024-12-01', event: 'Project Started', status: 'completed' },
    { date: '2024-12-05', event: 'Site Survey Completed', status: 'completed' },
    { date: '2024-12-10', event: 'Materials Delivered', status: 'completed' },
    { date: '2024-12-15', event: 'Installation Begun', status: 'completed' },
    { date: '2024-12-20', event: 'Electrical Work', status: 'current' },
    { date: '2025-01-05', event: 'System Testing', status: 'pending' },
    { date: '2025-01-15', event: 'Final Inspection', status: 'pending' }
  ];

  const documents = [
    { name: 'Site Survey Report', type: 'PDF', date: '2024-12-05', size: '2.1 MB' },
    { name: 'Installation Photos', type: 'ZIP', date: '2024-12-18', size: '15.3 MB' },
    { name: 'Electrical Certificate', type: 'PDF', date: '2024-12-20', size: '1.2 MB' }
  ];

  const handleEdit = () => {
    setEditData(project);
    setEditMode(true);
  };

  const handleSave = () => {
    // In real app, save to API
    console.log('Saving project data:', editData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditData({});
    setEditMode(false);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{project.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">
                {project.id}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <Badge variant="outline">
                Phase: {project.phase}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {!editMode ? (
            <Button onClick={handleEdit} className="bg-gradient-solar hover:opacity-90">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-gradient-solar hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Client</span>
            </div>
            <p className="text-sm text-muted-foreground cursor-pointer hover:text-primary" 
               onClick={() => navigate(`/clients/${project.clientId}`)}>
              {project.client}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Capacity</span>
            </div>
            <p className="text-lg font-bold text-primary">{project.capacity}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Target Date</span>
            </div>
            <p className="text-sm text-muted-foreground">{project.targetDate}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Project Value</span>
            </div>
            <p className="text-lg font-bold text-success">{project.value}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Project Progress</h3>
            <span className="text-2xl font-bold text-primary">{project.completion}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-solar transition-all duration-300"
              style={{ width: `${project.completion}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{project.address}</span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Complete project specifications and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input 
                      id="name"
                      value={editData.name || project.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={editData.description || project.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">System Capacity</Label>
                      <Input 
                        id="capacity"
                        value={editData.capacity || project.capacity}
                        onChange={(e) => setEditData({...editData, capacity: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={editData.status || project.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Approval">Approval</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">System Components</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Solar Panels:</span>
                          <span>{project.panels} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inverters:</span>
                          <span>{project.inverters} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Batteries:</span>
                          <span>{project.batteries} units</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Installation Team</h4>
                      <p className="text-sm text-muted-foreground">{project.installer}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Required Permits</h4>
                      <div className="space-y-1">
                        {project.permits.map((permit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Track project milestones and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {item.status === 'completed' && <CheckCircle className="h-5 w-5 text-success" />}
                      {item.status === 'current' && <Clock className="h-5 w-5 text-primary" />}
                      {item.status === 'pending' && <Clock className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{item.event}</h4>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Documents</h3>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <Card key={index} className="border-0 shadow-elegant">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Photos</h3>
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Add Photos
            </Button>
          </div>
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="font-medium mb-2">No Photos Yet</h4>
              <p className="text-sm text-muted-foreground">
                Upload progress photos to track installation milestones.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Manage project configuration and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Archive Project</h4>
                  <p className="text-sm text-muted-foreground">Move this project to archived status</p>
                </div>
                <Button variant="outline">Archive</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
                <div>
                  <h4 className="font-medium text-destructive">Delete Project</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete this project and all associated data</p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}