import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  Eye,
  Edit,
  Trash2,
  Share,
  Filter,
  Calendar,
  User,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderOpen,
  File,
  Image,
  FileCheck
} from "lucide-react";

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const documents = [
    {
      id: "DOC-001",
      name: "SANS Electrical Compliance Certificate",
      project: "SP-001 - Residential Solar Sandton",
      client: "John Smith",
      category: "compliance",
      type: "certificate",
      size: "2.4 MB",
      uploadDate: "2024-12-15",
      status: "approved",
      signedBy: "Qualified Electrician",
      expiryDate: "2025-12-15"
    },
    {
      id: "DOC-002", 
      name: "SSEG Application Form",
      project: "SP-001 - Residential Solar Sandton",
      client: "John Smith",
      category: "regulatory",
      type: "application",
      size: "1.8 MB",
      uploadDate: "2024-12-10",
      status: "pending",
      signedBy: "Client",
      expiryDate: null
    },
    {
      id: "DOC-003",
      name: "Installation Photos - Before",
      project: "SP-002 - Commercial Rooftop Midrand",
      client: "TechCorp Limited",
      category: "installation",
      type: "photos",
      size: "15.7 MB",
      uploadDate: "2024-12-08",
      status: "approved",
      signedBy: null,
      expiryDate: null
    },
    {
      id: "DOC-004",
      name: "System Design Drawings",
      project: "SP-003 - Residential Solar Centurion",
      client: "Mary Johnson",
      category: "design",
      type: "drawings",
      size: "4.2 MB",
      uploadDate: "2024-12-05",
      status: "draft",
      signedBy: null,
      expiryDate: null
    },
    {
      id: "DOC-005",
      name: "Purchase Agreement - Signed",
      project: "SP-001 - Residential Solar Sandton", 
      client: "John Smith",
      category: "contract",
      type: "contract",
      size: "890 KB",
      uploadDate: "2024-12-01",
      status: "signed",
      signedBy: "Client & Company",
      expiryDate: "2025-12-01"
    },
    {
      id: "DOC-006",
      name: "Warranty Certificate - Panels",
      project: "SP-002 - Commercial Rooftop Midrand",
      client: "TechCorp Limited", 
      category: "warranty",
      type: "certificate",
      size: "1.2 MB",
      uploadDate: "2024-11-28",
      status: "approved",
      signedBy: "Manufacturer",
      expiryDate: "2044-11-28"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories", count: documents.length },
    { value: "compliance", label: "Compliance", count: documents.filter(d => d.category === 'compliance').length },
    { value: "regulatory", label: "Regulatory", count: documents.filter(d => d.category === 'regulatory').length },
    { value: "installation", label: "Installation", count: documents.filter(d => d.category === 'installation').length },
    { value: "design", label: "Design", count: documents.filter(d => d.category === 'design').length },
    { value: "contract", label: "Contracts", count: documents.filter(d => d.category === 'contract').length },
    { value: "warranty", label: "Warranties", count: documents.filter(d => d.category === 'warranty').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success border-success/20";
      case "signed": return "bg-primary/10 text-primary border-primary/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "draft": return "bg-secondary/10 text-secondary border-secondary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "photos": return <Image className="h-5 w-5 text-primary" />;
      case "certificate": return <FileCheck className="h-5 w-5 text-success" />;
      case "drawings": return <FileText className="h-5 w-5 text-warning" />;
      case "contract": return <Shield className="h-5 w-5 text-secondary" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">
            Store, organize and manage project documents with digital signatures
          </p>
        </div>
        <Button className="bg-gradient-solar hover:opacity-90">
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, projects, or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="border-0 shadow-elegant hover:shadow-energy transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted/50 rounded-lg">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {doc.id}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {doc.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {doc.status === "draft" && <Edit className="h-3 w-3 mr-1" />}
                        {doc.status === "signed" && <FileCheck className="h-3 w-3 mr-1" />}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Uploaded: {doc.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.size}</span>
                    </div>
                    {doc.expiryDate && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span>Expires: {doc.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  {doc.signedBy && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-success/10 rounded border border-success/20">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="text-sm">Digitally signed by: {doc.signedBy}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground capitalize">
                        {doc.category} documents
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {documents
              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
              .slice(0, 5)
              .map((doc) => (
                <Card key={doc.id} className="border-0 shadow-elegant">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.project}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{doc.uploadDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {documents
              .filter(doc => doc.status === "pending" || doc.status === "draft")
              .map((doc) => (
                <Card key={doc.id} className="border-0 shadow-elegant border-l-4 border-l-warning">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-warning" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.project}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <div className="grid gap-4">
            {documents
              .filter(doc => doc.expiryDate && new Date(doc.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
              .map((doc) => (
                <Card key={doc.id} className="border-0 shadow-elegant border-l-4 border-l-destructive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.project}</p>
                          <p className="text-sm text-destructive">Expires: {doc.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Renew
                        </Button>
                        <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                          Update
                        </Button>
                      </div>
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