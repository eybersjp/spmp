import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileCheck,
  Clipboard,
  HardHat,
  Zap,
  Eye,
  Download,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Activity
} from "lucide-react";

export default function SafetyCompliance() {
  const [selectedProject, setSelectedProject] = useState("SP-001");

  const projects = [
    { id: "SP-001", name: "Residential Solar - Sandton", status: "in-progress" },
    { id: "SP-002", name: "Commercial Rooftop - Midrand", status: "planning" },
    { id: "SP-003", name: "Residential Solar - Centurion", status: "completed" },
    { id: "SP-004", name: "Industrial Solar Farm - Rustenburg", status: "completed" }
  ];

  const complianceMetrics = [
    {
      title: "SANS Compliance Rate",
      value: "98.2%",
      target: "100%",
      trend: "+2.1%",
      icon: Shield,
      color: "text-success"
    },
    {
      title: "Safety Incidents",
      value: "0",
      target: "0", 
      trend: "0%",
      icon: AlertTriangle,
      color: "text-success"
    },
    {
      title: "COC Certificates",
      value: "127",
      target: "127",
      trend: "+12",
      icon: FileCheck,
      color: "text-primary"
    },
    {
      title: "Training Hours",
      value: "248",
      target: "200",
      trend: "+24%",
      icon: BookOpen,
      color: "text-warning"
    }
  ];

  const safetyChecklist = [
    {
      category: "Pre-Installation Safety",
      items: [
        { id: 1, task: "Site risk assessment completed", completed: true, critical: true },
        { id: 2, task: "Safety equipment inventory check", completed: true, critical: true },
        { id: 3, task: "Team safety briefing conducted", completed: true, critical: true },
        { id: 4, task: "Emergency contact list distributed", completed: true, critical: false },
        { id: 5, task: "Weather conditions verified safe", completed: false, critical: true }
      ]
    },
    {
      category: "Electrical Safety (SANS Standards)",
      items: [
        { id: 6, task: "Main switch isolation verified", completed: true, critical: true },
        { id: 7, task: "Earth leakage protection tested", completed: true, critical: true },
        { id: 8, task: "Insulation resistance measured", completed: false, critical: true },
        { id: 9, task: "Polarity testing completed", completed: false, critical: true },
        { id: 10, task: "SANS 10142-1 compliance verified", completed: false, critical: true }
      ]
    },
    {
      category: "Installation Safety",
      items: [
        { id: 11, task: "Roof structure assessment", completed: true, critical: true },
        { id: 12, task: "Fall protection systems in place", completed: true, critical: true },
        { id: 13, task: "Ladder safety protocols followed", completed: true, critical: false },
        { id: 14, task: "Tool and equipment safety check", completed: true, critical: false },
        { id: 15, task: "Live work procedures followed", completed: false, critical: true }
      ]
    }
  ];

  const certificates = [
    {
      id: "COC-001",
      type: "Certificate of Compliance",
      project: "SP-001 - Residential Solar Sandton",
      standard: "SANS 10142-1:2017",
      issueDate: "2024-12-15",
      expiryDate: "2025-12-15",
      status: "valid",
      inspector: "John Williams (Reg. 12345)"
    },
    {
      id: "COC-002",
      type: "Electrical Installation Certificate",
      project: "SP-002 - Commercial Rooftop Midrand",
      standard: "SANS 10142-1:2017",
      issueDate: "2024-12-10",
      expiryDate: "2025-12-10", 
      status: "pending",
      inspector: "Sarah Davis (Reg. 67890)"
    },
    {
      id: "COC-003",
      type: "SSEG Grid Compliance",
      project: "SP-003 - Residential Solar Centurion",
      standard: "NRS 097-2-1:2017",
      issueDate: "2024-12-05",
      expiryDate: "2025-12-05",
      status: "valid",
      inspector: "Mike Johnson (Reg. 54321)"
    }
  ];

  const riskAssessments = [
    {
      id: "RA-001",
      project: "SP-001",
      riskLevel: "Medium",
      hazards: ["Working at height", "Electrical hazards", "Weather exposure"],
      mitigations: ["Fall protection", "Lockout/tagout", "Weather monitoring"],
      lastUpdated: "2024-12-15",
      nextReview: "2024-12-22"
    },
    {
      id: "RA-002", 
      project: "SP-002",
      riskLevel: "High",
      hazards: ["High voltage", "Structural loading", "Multi-story access"],
      mitigations: ["Qualified electrician", "Structural engineer approval", "Professional rigging"],
      lastUpdated: "2024-12-10",
      nextReview: "2024-12-17"
    }
  ];

  const trainingRecords = [
    {
      employee: "Mike Johnson",
      role: "Installation Lead",
      certifications: ["SANS Electrical", "Working at Height", "First Aid"],
      lastTraining: "2024-11-15",
      nextDue: "2025-11-15",
      compliance: "100%"
    },
    {
      employee: "Sarah Williams", 
      role: "Senior Installer",
      certifications: ["SANS Electrical", "Working at Height"],
      lastTraining: "2024-10-20",
      nextDue: "2025-10-20",
      compliance: "100%"
    },
    {
      employee: "David Smith",
      role: "Apprentice",
      certifications: ["Working at Height"],
      lastTraining: "2024-12-01",
      nextDue: "2025-06-01",
      compliance: "67%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "expired": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage === 100) return "text-success";
    if (percentage >= 75) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safety & Compliance</h1>
          <p className="text-muted-foreground">
            SANS electrical standards and SSEG compliance management
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
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-gradient-solar hover:opacity-90">
            <FileCheck className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric) => (
          <Card key={metric.title} className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <Badge variant="outline" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.title}</p>
                <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety & Compliance Tabs */}
      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="checklist">Safety Checklist</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-primary" />
                Installation Safety Checklist - {selectedProject}
              </CardTitle>
              <CardDescription>
                SANS-compliant safety procedures and installation checklists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {safetyChecklist.map((category) => {
                const completed = category.items.filter(item => item.completed).length;
                const total = category.items.length;
                const percentage = Math.round((completed / total) * 100);
                
                return (
                  <div key={category.category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{category.category}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getCompletionColor(percentage)}`}>
                          {completed}/{total} ({percentage}%)
                        </span>
                        <Progress value={percentage} className="w-32" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            item.critical ? 'bg-warning/5 border border-warning/20' : 'bg-muted/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={item.completed}
                              className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                            />
                            <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                              {item.task}
                            </span>
                            {item.critical && (
                              <Badge variant="outline" className="text-xs text-warning">
                                Critical
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-warning" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <div className="flex gap-3 pt-4 border-t">
                <Button className="bg-gradient-solar hover:opacity-90">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Assessment
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <div className="grid gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cert.type}</h3>
                        <p className="text-sm text-muted-foreground">{cert.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">{cert.id}</Badge>
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status === "valid" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {cert.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {cert.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Standard</p>
                          <p className="font-semibold">{cert.standard}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Inspector</p>
                          <p className="font-semibold">{cert.inspector}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Issue Date</p>
                          <p className="font-semibold">{cert.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expiry Date</p>
                          <p className="font-semibold">{cert.expiryDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      {cert.status === "pending" && (
                        <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid gap-6">
            {riskAssessments.map((assessment) => (
              <Card key={assessment.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Risk Assessment - {assessment.project}</h3>
                        <p className="text-sm text-muted-foreground">ID: {assessment.id}</p>
                      </div>
                    </div>
                    <Badge className={`${getRiskColor(assessment.riskLevel)} border-current`} variant="outline">
                      {assessment.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Identified Hazards</h4>
                        <ul className="space-y-1">
                          {assessment.hazards.map((hazard, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-warning" />
                              {hazard}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Mitigation Measures</h4>
                        <ul className="space-y-1">
                          {assessment.mitigations.map((mitigation, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Shield className="h-3 w-3 text-success" />
                              {mitigation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Last Updated</p>
                          <p className="font-semibold">{assessment.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Review</p>
                          <p className="font-semibold">{assessment.nextReview}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-solar hover:opacity-90">
                          <Calendar className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Team Training & Certifications
              </CardTitle>
              <CardDescription>
                Safety training records and certification status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingRecords.map((record, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.employee}</h4>
                        <p className="text-sm text-muted-foreground">{record.role}</p>
                      </div>
                    </div>
                    <Badge className={`${getCompletionColor(parseInt(record.compliance))} border-current`} variant="outline">
                      {record.compliance} Compliant
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {record.certifications.map((cert, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Training</p>
                      <p className="font-semibold">{record.lastTraining}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Due</p>
                      <p className="font-semibold">{record.nextDue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  SANS Standards Reference
                </CardTitle>
                <CardDescription>
                  South African National Standards for electrical installations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded border border-primary/20">
                    <h4 className="font-semibold">SANS 10142-1:2017</h4>
                    <p className="text-sm text-muted-foreground">
                      The wiring of premises - Low voltage installations
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-secondary/10 rounded border border-secondary/20">
                    <h4 className="font-semibold">NRS 097-2-1:2017</h4>
                    <p className="text-sm text-muted-foreground">
                      Grid connection code for small-scale embedded generation
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-warning/10 rounded border border-warning/20">
                    <h4 className="font-semibold">SANS 10199:2014</h4>
                    <p className="text-sm text-muted-foreground">
                      Installation rules for solar photovoltaic (PV) arrays
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Compliance Dashboard
                </CardTitle>
                <CardDescription>
                  Overall compliance status and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SANS 10142-1 Compliance</span>
                    <span className="text-sm font-semibold text-success">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SSEG Grid Compliance</span>
                    <span className="text-sm font-semibold text-warning">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Safety Training Compliance</span>
                    <span className="text-sm font-semibold text-primary">95.8%</span>
                  </div>
                  <Progress value={95.8} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-success">127</p>
                      <p className="text-xs text-muted-foreground">Valid COCs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">5</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}