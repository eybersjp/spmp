import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronRight,
  FileText,
  Upload,
  Calendar,
  Users,
  MessageSquare,
  Camera,
  Settings,
  ExternalLink,
  Plus,
  Eye
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
  notes?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  required: boolean;
  uploaded: boolean;
  uploadDate?: string;
  size?: string;
}

interface WorkflowStage {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  progress: number;
  startDate?: string;
  endDate?: string;
  estimatedDuration: string;
  tasks: Task[];
  documents: Document[];
  dependencies?: string[];
  assignee: string;
  notes?: string;
}

interface WorkflowTimelineProps {
  stages: WorkflowStage[];
  onStageUpdate?: (stageId: string, updates: Partial<WorkflowStage>) => void;
  onTaskToggle?: (stageId: string, taskId: string) => void;
  onDocumentUpload?: (stageId: string, documentId: string) => void;
  onAddNote?: (stageId: string, note: string) => void;
}

export function WorkflowTimeline({ 
  stages, 
  onStageUpdate, 
  onTaskToggle, 
  onDocumentUpload,
  onAddNote 
}: WorkflowTimelineProps) {
  const [expandedStages, setExpandedStages] = useState<string[]>([]);
  const [newNotes, setNewNotes] = useState<{[key: string]: string}>({});

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const getStatusIcon = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'blocked':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return "bg-success/10 text-success border-success/20";
      case 'in-progress':
        return "bg-primary/10 text-primary border-primary/20";
      case 'blocked':
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleTaskToggle = (stageId: string, taskId: string) => {
    onTaskToggle?.(stageId, taskId);
  };

  const handleAddNote = (stageId: string) => {
    const note = newNotes[stageId];
    if (note?.trim()) {
      onAddNote?.(stageId, note);
      setNewNotes(prev => ({ ...prev, [stageId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const isExpanded = expandedStages.includes(stage.id);
        const completedTasks = stage.tasks.filter(task => task.completed).length;
        const totalTasks = stage.tasks.length;
        const completedDocs = stage.documents.filter(doc => doc.uploaded).length;
        const totalDocs = stage.documents.length;

        return (
          <Card key={stage.id} className="border-0 shadow-elegant">
            <Collapsible open={isExpanded} onOpenChange={() => toggleStage(stage.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold">
                          {index + 1}
                        </div>
                        {getStatusIcon(stage.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{stage.title}</CardTitle>
                          <Badge className={getStatusColor(stage.status)}>
                            {stage.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <CardDescription className="mb-3">
                          {stage.description}
                        </CardDescription>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{stage.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{stage.estimatedDuration}</span>
                          </div>
                          {stage.startDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{stage.startDate}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress indicators */}
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span className="font-medium">{stage.progress}%</span>
                          </div>
                          <Progress value={stage.progress} className="h-2" />
                          
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Tasks: {completedTasks}/{totalTasks}</span>
                            <span>Documents: {completedDocs}/{totalDocs}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Tasks Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Tasks & Checklist
                        </h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Task
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {stage.tasks.map(task => (
                          <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                            <Checkbox 
                              checked={task.completed}
                              onCheckedChange={() => handleTaskToggle(stage.id, task.id)}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                              </p>
                              {task.assignee && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Assigned to {task.assignee}
                                </p>
                              )}
                              {task.dueDate && (
                                <p className="text-xs text-muted-foreground">
                                  Due: {task.dueDate}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Required Documents
                        </h4>
                        <Button variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {stage.documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                              <FileText className={`h-4 w-4 ${doc.uploaded ? 'text-success' : 'text-muted-foreground'}`} />
                              <div>
                                <p className="text-sm font-medium">{doc.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{doc.type}</span>
                                  {doc.required && (
                                    <Badge variant="outline" className="text-xs">Required</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.uploaded ? (
                                <>
                                  <Badge variant="outline" className="text-success border-success">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Uploaded
                                  </Badge>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => onDocumentUpload?.(stage.id, doc.id)}
                                >
                                  <Upload className="h-3 w-3 mr-1" />
                                  Upload
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      View All Documents
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-3 w-3 mr-1" />
                      View Photos
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule Inspection
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Field Report
                    </Button>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <MessageSquare className="h-4 w-4" />
                      Stage Notes
                    </h4>
                    
                    {stage.notes && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">{stage.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Add notes for this stage..."
                        value={newNotes[stage.id] || ''}
                        onChange={(e) => setNewNotes(prev => ({ ...prev, [stage.id]: e.target.value }))}
                        className="flex-1"
                        rows={2}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddNote(stage.id)}
                        disabled={!newNotes[stage.id]?.trim()}
                      >
                        Add Note
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}