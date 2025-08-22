import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FolderKanban,
  DollarSign,
  Edit,
  FileText,
  Clock,
  CheckCircle,
  Zap
} from "lucide-react";

export default function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  // Mock client data - in real app this would come from API
  const client = {
    id: clientId,
    name: clientId === 'CL-001' ? 'John Smith' : 
          clientId === 'CL-002' ? 'TechCorp Limited' :
          clientId === 'CL-003' ? 'Mary Johnson' : 'Mining Corp SA',
    email: clientId === 'CL-001' ? 'john.smith@email.com' : 
           clientId === 'CL-002' ? 'projects@techcorp.co.za' :
           clientId === 'CL-003' ? 'mary.johnson@gmail.com' : 'energy@miningcorp.co.za',
    phone: clientId === 'CL-001' ? '+27 11 234 5678' : 
           clientId === 'CL-002' ? '+27 11 456 7890' :
           clientId === 'CL-003' ? '+27 12 345 6789' : '+27 14 567 8901',
    address: clientId === 'CL-001' ? '123 Solar Street, Sandton, Johannesburg' : 
             clientId === 'CL-002' ? '45 Business Park, Midrand, Gauteng' :
             clientId === 'CL-003' ? '78 Green Avenue, Centurion, Pretoria' : 'Industrial Zone, Rustenburg, North West',
    joinDate: clientId === 'CL-001' ? '2024-06-15' : 
              clientId === 'CL-002' ? '2024-05-20' :
              clientId === 'CL-003' ? '2024-04-10' : '2024-03-01',
    type: clientId === 'CL-001' || clientId === 'CL-003' ? 'Residential' : 
          clientId === 'CL-002' ? 'Commercial' : 'Industrial',
    status: clientId === 'CL-004' ? 'Completed' : 'Active',
    totalValue: clientId === 'CL-001' ? 'R 180,000' : 
                clientId === 'CL-002' ? 'R 3,200,000' :
                clientId === 'CL-003' ? 'R 250,000' : 'R 12,800,000'
  };

  const projects = [
    {
      id: "SP-001",
      name: "Residential Solar Installation - Sandton",
      status: "In Progress", 
      phase: "Installation",
      capacity: "8.5 kW",
      startDate: "2024-12-01",
      completion: 75,
      value: "R 180,000"
    },
    {
      id: "SP-002",
      name: "Commercial Rooftop System - Midrand", 
      status: "Planning",
      phase: "Design Review",
      capacity: "150 kW",
      startDate: "2024-11-15",
      completion: 45,
      value: "R 2,400,000"
    }
  ];

  const communications = [
    {
      type: "email",
      subject: "Project Update - Installation Progress",
      date: "2024-12-20",
      status: "sent"
    },
    {
      type: "call",
      subject: "Site inspection discussion",
      date: "2024-12-18",
      status: "completed"
    },
    {
      type: "meeting",
      subject: "System design review meeting",
      date: "2024-12-15",
      status: "completed"
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/20";
      case "In Progress": return "bg-primary/10 text-primary border-primary/20";
      case "Planning": return "bg-secondary/10 text-secondary border-secondary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Residential": return "bg-primary/10 text-primary border-primary/20";
      case "Commercial": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Industrial": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/clients')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-solar text-primary-foreground font-semibold">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs font-mono">
                  {client.id}
                </Badge>
                <Badge className={getTypeColor(client.type)}>
                  {client.type}
                </Badge>
                <Badge className={client.status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-muted/10 text-muted-foreground border-muted/20'}>
                  {client.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Button className="bg-gradient-solar hover:opacity-90">
          <Edit className="mr-2 h-4 w-4" />
          Edit Client
        </Button>
      </div>

      {/* Client Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Email</span>
            </div>
            <p className="text-sm text-muted-foreground">{client.email}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Phone</span>
            </div>
            <p className="text-sm text-muted-foreground">{client.phone}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Client Since</span>
            </div>
            <p className="text-sm text-muted-foreground">{client.joinDate}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Value</span>
            </div>
            <p className="text-lg font-bold text-success">{client.totalValue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Address */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Address</span>
          </div>
          <p className="text-muted-foreground">{client.address}</p>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Client Projects</h3>
            <Button className="bg-gradient-solar hover:opacity-90">
              <FolderKanban className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {project.id}
                      </Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
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
                  <div className="space-y-2">
                    <h4 className="font-semibold">{project.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {project.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Started {project.startDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {project.value}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Phase: {project.phase}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Communication History</h3>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
          <div className="space-y-4">
            {communications.map((comm, index) => (
              <Card key={index} className="border-0 shadow-elegant">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {comm.type === 'email' && <Mail className="h-4 w-4 text-primary" />}
                      {comm.type === 'call' && <Phone className="h-4 w-4 text-secondary" />}
                      {comm.type === 'meeting' && <Calendar className="h-4 w-4 text-accent" />}
                      <div>
                        <p className="font-medium">{comm.subject}</p>
                        <p className="text-xs text-muted-foreground capitalize">{comm.type} • {comm.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      {comm.status === 'sent' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                      {comm.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Client Documents</h3>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="font-medium mb-2">No Documents</h4>
              <p className="text-sm text-muted-foreground">
                Upload contracts, permits, and project documents for this client.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}