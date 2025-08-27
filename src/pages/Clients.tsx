import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FolderKanban,
  DollarSign
} from "lucide-react";

export default function Clients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: "CL-001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+27 11 234 5678",
      address: "123 Solar Street, Sandton, Johannesburg",
      joinDate: "2024-06-15",
      activeProjects: 1,
      completedProjects: 0,
      totalValue: "R 180,000",
      status: "Active",
      type: "Residential"
    },
    {
      id: "CL-002",
      name: "TechCorp Limited",
      email: "projects@techcorp.co.za",
      phone: "+27 11 456 7890",
      address: "45 Business Park, Midrand, Gauteng",
      joinDate: "2024-05-20",
      activeProjects: 2,
      completedProjects: 1,
      totalValue: "R 3,200,000",
      status: "Active",
      type: "Commercial"
    },
    {
      id: "CL-003",
      name: "Mary Johnson",
      email: "mary.johnson@gmail.com",
      phone: "+27 12 345 6789",
      address: "78 Green Avenue, Centurion, Pretoria",
      joinDate: "2024-04-10",
      activeProjects: 1,
      completedProjects: 0,
      totalValue: "R 250,000",
      status: "Active",
      type: "Residential"
    },
    {
      id: "CL-004",
      name: "Mining Corp SA",
      email: "energy@miningcorp.co.za",
      phone: "+27 14 567 8901",
      address: "Industrial Zone, Rustenburg, North West",
      joinDate: "2024-03-01",
      activeProjects: 0,
      completedProjects: 2,
      totalValue: "R 12,800,000",
      status: "Completed",
      type: "Industrial"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Residential": return "bg-primary/10 text-primary border-primary/20";
      case "Commercial": return "bg-secondary/10 text-secondary border-secondary/20";
      case "Industrial": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "Completed": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddClient = () => {
    toast({
      title: "Add Client",
      description: "Opening new client form...",
    });
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">
            Manage client relationships and project history
          </p>
        </div>
        <Button className="bg-gradient-solar hover:opacity-90" onClick={handleAddClient}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-success">+2 this month</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.reduce((sum, client) => sum + client.activeProjects, 0)}
            </div>
            <p className="text-xs text-success">Across all clients</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 16.4M</div>
            <p className="text-xs text-success">Combined portfolio</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-success">Above industry avg</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, email, or client ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="border-0 shadow-elegant hover:shadow-energy transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-solar text-primary-foreground font-semibold">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.type} Client</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs font-mono">
                  {client.id}
                </Badge>
                <Badge className={getTypeColor(client.type)}>
                  {client.type}
                </Badge>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">{client.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Client since {client.joinDate}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <FolderKanban className="h-3 w-3 text-primary" />
                      {client.activeProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <FolderKanban className="h-3 w-3 text-success" />
                      {client.completedProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <DollarSign className="h-3 w-3 text-accent" />
                      {client.totalValue.replace('R ', '')}
                    </div>
                    <p className="text-xs text-muted-foreground">Value</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/clients/${client.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}