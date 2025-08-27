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
import WorkflowTimeline from "@/components/workflow/WorkflowTimeline";

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

  const workflowStages = [
    {
      id: 'stage-1',
      title: 'Project Initiation & Planning',
      description: 'Initial project setup, site assessment, and planning documentation',
      status: 'completed' as const,
      progress: 100,
      startDate: '2024-12-01',
      endDate: '2024-12-05',
      estimatedDuration: '5 days',
      assignee: 'Project Manager',
      notes: 'All initial assessments completed successfully. Client requirements documented.',
      tasks: [
        { id: 'task-1-1', title: 'Client requirements gathering', completed: true, assignee: 'Project Manager' },
        { id: 'task-1-2', title: 'Site feasibility assessment', completed: true, assignee: 'Technical Lead' },
        { id: 'task-1-3', title: 'Initial cost estimation', completed: true, assignee: 'Financial Analyst' },
        { id: 'task-1-4', title: 'Project timeline creation', completed: true, assignee: 'Project Manager' }
      ],
      documents: [
        { id: 'doc-1-1', name: 'Site Assessment Report', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-03', size: '2.1 MB' },
        { id: 'doc-1-2', name: 'Client Requirements', type: 'DOC', required: true, uploaded: true, uploadDate: '2024-12-02', size: '856 KB' },
        { id: 'doc-1-3', name: 'Project Proposal', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-04', size: '1.8 MB' }
      ]
    },
    {
      id: 'stage-2',
      title: 'Design & Engineering',
      description: 'System design, engineering calculations, and technical specifications',
      status: 'completed' as const,
      progress: 100,
      startDate: '2024-12-06',
      endDate: '2024-12-12',
      estimatedDuration: '7 days',
      assignee: 'Engineering Team',
      notes: 'Design optimized for maximum efficiency. All engineering calculations verified.',
      tasks: [
        { id: 'task-2-1', title: 'Electrical system design', completed: true, assignee: 'Electrical Engineer' },
        { id: 'task-2-2', title: 'Structural calculations', completed: true, assignee: 'Structural Engineer' },
        { id: 'task-2-3', title: 'Component specifications', completed: true, assignee: 'Technical Specialist' },
        { id: 'task-2-4', title: 'Design review & approval', completed: true, assignee: 'Senior Engineer' }
      ],
      documents: [
        { id: 'doc-2-1', name: 'Electrical Schematic', type: 'DWG', required: true, uploaded: true, uploadDate: '2024-12-10', size: '3.2 MB' },
        { id: 'doc-2-2', name: 'Structural Analysis', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-11', size: '4.1 MB' },
        { id: 'doc-2-3', name: 'Component Datasheet', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-12', size: '12.5 MB' }
      ]
    },
    {
      id: 'stage-3',
      title: 'Permits & Approvals',
      description: 'Regulatory permits, municipal approvals, and compliance documentation',
      status: 'completed' as const,
      progress: 100,
      startDate: '2024-12-13',
      endDate: '2024-12-20',
      estimatedDuration: '8 days',
      assignee: 'Compliance Officer',
      notes: 'All permits obtained ahead of schedule. SSEG application approved.',
      tasks: [
        { id: 'task-3-1', title: 'Building plan submission', completed: true, assignee: 'Compliance Officer' },
        { id: 'task-3-2', title: 'SSEG application', completed: true, assignee: 'Technical Specialist' },
        { id: 'task-3-3', title: 'Environmental clearance', completed: true, assignee: 'Environmental Consultant' },
        { id: 'task-3-4', title: 'Municipal approval', completed: true, assignee: 'Compliance Officer' }
      ],
      documents: [
        { id: 'doc-3-1', name: 'Building Plan Approval', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-18', size: '2.8 MB' },
        { id: 'doc-3-2', name: 'SSEG Certificate', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-19', size: '1.5 MB' },
        { id: 'doc-3-3', name: 'Environmental Clearance', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-17', size: '3.7 MB' }
      ]
    },
    {
      id: 'stage-4',
      title: 'Material Procurement',
      description: 'Equipment ordering, delivery coordination, and inventory management',
      status: 'completed' as const,
      progress: 100,
      startDate: '2024-12-15',
      endDate: '2024-12-22',
      estimatedDuration: '8 days',
      assignee: 'Procurement Team',
      notes: 'All materials delivered on schedule. Quality inspection completed.',
      tasks: [
        { id: 'task-4-1', title: 'Solar panel procurement', completed: true, assignee: 'Procurement Manager' },
        { id: 'task-4-2', title: 'Inverter and electrical components', completed: true, assignee: 'Technical Buyer' },
        { id: 'task-4-3', title: 'Mounting system delivery', completed: true, assignee: 'Logistics Coordinator' },
        { id: 'task-4-4', title: 'Material quality inspection', completed: true, assignee: 'Quality Inspector' }
      ],
      documents: [
        { id: 'doc-4-1', name: 'Material Delivery Receipt', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-22', size: '1.2 MB' },
        { id: 'doc-4-2', name: 'Quality Inspection Report', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-22', size: '2.4 MB' },
        { id: 'doc-4-3', name: 'Warranty Certificates', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-21', size: '5.8 MB' }
      ]
    },
    {
      id: 'stage-5',
      title: 'Installation & Mounting',
      description: 'Physical installation of solar panels, mounting systems, and primary components',
      status: 'in-progress' as const,
      progress: 75,
      startDate: '2024-12-23',
      estimatedDuration: '10 days',
      assignee: 'Installation Team',
      notes: 'Installation proceeding smoothly. Weather conditions favorable.',
      tasks: [
        { id: 'task-5-1', title: 'Mounting system installation', completed: true, assignee: 'Installation Foreman' },
        { id: 'task-5-2', title: 'Solar panel mounting', completed: true, assignee: 'Solar Technicians' },
        { id: 'task-5-3', title: 'DC wiring installation', completed: true, assignee: 'Electrical Technician' },
        { id: 'task-5-4', title: 'Inverter installation', completed: false, assignee: 'Electrical Specialist', dueDate: '2024-12-28' },
        { id: 'task-5-5', title: 'Grounding system', completed: false, assignee: 'Electrical Technician', dueDate: '2024-12-29' }
      ],
      documents: [
        { id: 'doc-5-1', name: 'Installation Progress Photos', type: 'ZIP', required: true, uploaded: true, uploadDate: '2024-12-26', size: '15.3 MB' },
        { id: 'doc-5-2', name: 'Daily Installation Reports', type: 'PDF', required: true, uploaded: true, uploadDate: '2024-12-26', size: '3.8 MB' },
        { id: 'doc-5-3', name: 'Safety Compliance Checklist', type: 'PDF', required: true, uploaded: false }
      ]
    },
    {
      id: 'stage-6',
      title: 'Electrical Integration',
      description: 'AC wiring, grid connection, monitoring system setup, and electrical testing',
      status: 'in-progress' as const,
      progress: 40,
      startDate: '2024-12-28',
      estimatedDuration: '5 days',
      assignee: 'Electrical Team',
      tasks: [
        { id: 'task-6-1', title: 'AC wiring installation', completed: true, assignee: 'Electrical Technician' },
        { id: 'task-6-2', title: 'Monitoring system setup', completed: false, assignee: 'System Technician', dueDate: '2024-12-30' },
        { id: 'task-6-3', title: 'Grid connection preparation', completed: false, assignee: 'Electrical Engineer', dueDate: '2025-01-02' },
        { id: 'task-6-4', title: 'Electrical safety testing', completed: false, assignee: 'Certified Electrician', dueDate: '2025-01-03' }
      ],
      documents: [
        { id: 'doc-6-1', name: 'Electrical Installation Certificate', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-6-2', name: 'Grid Connection Application', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-6-3', name: 'System Monitoring Setup', type: 'PDF', required: true, uploaded: false }
      ]
    },
    {
      id: 'stage-7',
      title: 'System Testing & Commissioning',
      description: 'Performance testing, system optimization, and commissioning procedures',
      status: 'not-started' as const,
      progress: 0,
      estimatedDuration: '3 days',
      assignee: 'Commissioning Engineer',
      tasks: [
        { id: 'task-7-1', title: 'System performance testing', completed: false, assignee: 'Test Engineer', dueDate: '2025-01-05' },
        { id: 'task-7-2', title: 'Energy production verification', completed: false, assignee: 'Performance Analyst', dueDate: '2025-01-06' },
        { id: 'task-7-3', title: 'System optimization', completed: false, assignee: 'Technical Specialist', dueDate: '2025-01-07' },
        { id: 'task-7-4', title: 'Commissioning documentation', completed: false, assignee: 'Documentation Specialist', dueDate: '2025-01-07' }
      ],
      documents: [
        { id: 'doc-7-1', name: 'Performance Test Results', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-7-2', name: 'Commissioning Report', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-7-3', name: 'System Optimization Settings', type: 'PDF', required: true, uploaded: false }
      ]
    },
    {
      id: 'stage-8',
      title: 'Final Inspection & Handover',
      description: 'Official inspections, final approvals, and project handover to client',
      status: 'not-started' as const,
      progress: 0,
      estimatedDuration: '5 days',
      assignee: 'Project Manager',
      tasks: [
        { id: 'task-8-1', title: 'Municipal final inspection', completed: false, assignee: 'Compliance Officer', dueDate: '2025-01-10' },
        { id: 'task-8-2', title: 'Client training session', completed: false, assignee: 'Technical Trainer', dueDate: '2025-01-12' },
        { id: 'task-8-3', title: 'Warranty documentation', completed: false, assignee: 'Documentation Specialist', dueDate: '2025-01-13' },
        { id: 'task-8-4', title: 'Project handover', completed: false, assignee: 'Project Manager', dueDate: '2025-01-15' }
      ],
      documents: [
        { id: 'doc-8-1', name: 'Final Inspection Certificate', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-8-2', name: 'Client Training Materials', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-8-3', name: 'Warranty Documentation', type: 'PDF', required: true, uploaded: false },
        { id: 'doc-8-4', name: 'Project Handover Certificate', type: 'PDF', required: true, uploaded: false }
      ]
    }
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

  const handleStageUpdate = (stageId: string, updates: any) => {
    console.log('Updating stage:', stageId, updates);
    // In real app, update via API
  };

  const handleTaskToggle = (stageId: string, taskId: string) => {
    console.log('Toggling task:', stageId, taskId);
    // In real app, update task status via API
  };

  const handleDocumentUpload = (stageId: string, documentId: string) => {
    console.log('Uploading document:', stageId, documentId);
    // In real app, handle file upload
  };

  const handleAddNote = (stageId: string, note: string) => {
    console.log('Adding note to stage:', stageId, note);
    // In real app, save note via API
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
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Project Workflow</h3>
              <Badge variant="outline" className="text-sm">
                {workflowStages.filter(s => s.status === 'completed').length} of {workflowStages.length} stages completed
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Comprehensive workflow tracking with tasks, documents, and actionable components for each project stage.
            </p>
          </div>
          
          <WorkflowTimeline 
            stages={workflowStages}
            onStageUpdate={handleStageUpdate}
            onTaskToggle={handleTaskToggle}
            onDocumentUpload={handleDocumentUpload}
            onAddNote={handleAddNote}
          />
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