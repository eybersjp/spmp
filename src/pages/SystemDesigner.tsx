import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Calculator, 
  MapPin, 
  Sun, 
  Home,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";

export default function SystemDesigner() {
  const [designStep, setDesignStep] = useState("input");
  const [formData, setFormData] = useState({
    address: "",
    monthlyUsage: "",
    systemGoal: "",
    roofType: "",
    budget: ""
  });

  const sampleResults = {
    recommendedCapacity: "8.5 kW",
    panelCount: 24,
    inverterType: "String Inverter",
    annualProduction: "14,500 kWh",
    roofSuitability: "Excellent",
    shadingAnalysis: "Minimal",
    complianceStatus: "SANS Compliant",
    estimatedCost: "R 180,000",
    paybackPeriod: "6.2 years",
    annualSavings: "R 28,500"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDesignCalculation = () => {
    // This would integrate with Google Solar API
    setDesignStep("results");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Designer</h1>
          <p className="text-muted-foreground">
            AI-powered solar system design with Google Solar API integration
          </p>
        </div>
        <Button variant="outline">
          <Sun className="mr-2 h-4 w-4" />
          Solar Database
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Form */}
        <Card className={`lg:col-span-2 border-0 shadow-elegant ${designStep === "results" ? "lg:col-span-1" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              System Design Input
            </CardTitle>
            <CardDescription>
              Enter basic information to generate optimal solar system design
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="123 Main Street, Johannesburg, Gauteng"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Used for Google Solar API irradiance and shading analysis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usage">Monthly Usage (kWh)</Label>
                <Input
                  id="usage"
                  type="number"
                  placeholder="800"
                  value={formData.monthlyUsage}
                  onChange={(e) => handleInputChange("monthlyUsage", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">System Goal</Label>
                <Select value={formData.systemGoal} onValueChange={(value) => handleInputChange("systemGoal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offset-50">50% Offset</SelectItem>
                    <SelectItem value="offset-75">75% Offset</SelectItem>
                    <SelectItem value="offset-100">100% Offset</SelectItem>
                    <SelectItem value="maximum">Maximum Capacity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roof">Roof Type</Label>
                <Select value={formData.roofType} onValueChange={(value) => handleInputChange("roofType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tile">Concrete Tile</SelectItem>
                    <SelectItem value="metal">Metal Sheeting</SelectItem>
                    <SelectItem value="slate">Slate</SelectItem>
                    <SelectItem value="flat">Flat Roof</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100-200k">R 100k - R 200k</SelectItem>
                    <SelectItem value="200-400k">R 200k - R 400k</SelectItem>
                    <SelectItem value="400k+">R 400k+</SelectItem>
                    <SelectItem value="no-limit">No Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleDesignCalculation}
              className="w-full bg-gradient-solar hover:opacity-90"
              disabled={!formData.address || !formData.monthlyUsage}
            >
              <Zap className="mr-2 h-4 w-4" />
              Generate System Design
            </Button>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        {designStep === "input" && (
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Design Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Optimal Sizing</h4>
                <p className="text-sm text-muted-foreground">
                  System size is calculated based on your usage, roof space, and local irradiance data.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">SANS Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  All designs automatically include SANS 204-1 and SANS 1973 compliance requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">SSEG Ready</h4>
                <p className="text-sm text-muted-foreground">
                  Designs include all requirements for Small-Scale Embedded Generation applications.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Panel */}
        {designStep === "results" && (
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  System Design Results
                </CardTitle>
                <CardDescription>
                  AI-optimized solar system for {formData.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border border-primary/20 bg-primary/5">
                        <CardContent className="p-4 text-center">
                          <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-2xl font-bold">{sampleResults.recommendedCapacity}</p>
                          <p className="text-sm text-muted-foreground">Recommended Capacity</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-secondary/20 bg-secondary/5">
                        <CardContent className="p-4 text-center">
                          <Sun className="h-8 w-8 text-secondary mx-auto mb-2" />
                          <p className="text-2xl font-bold">{sampleResults.annualProduction}</p>
                          <p className="text-sm text-muted-foreground">Annual Production</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-success/20 bg-success/5">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                          <p className="text-2xl font-bold">{sampleResults.annualSavings}</p>
                          <p className="text-sm text-muted-foreground">Annual Savings</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">System Components</h4>
                        <div className="space-y-1 text-sm">
                          <p>• {sampleResults.panelCount} Solar Panels (350W each)</p>
                          <p>• {sampleResults.inverterType} (8kW)</p>
                          <p>• DC Disconnect & AC Isolator</p>
                          <p>• Monitoring System</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Site Analysis</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Roof Suitability:</span>
                            <Badge variant="outline" className="bg-success/10 text-success">
                              {sampleResults.roofSuitability}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Shading Analysis:</span>
                            <Badge variant="outline" className="bg-success/10 text-success">
                              {sampleResults.shadingAnalysis}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="technical">
                    <div className="space-y-4">
                      <h4 className="font-medium">Technical Specifications</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Panel Configuration:</strong> 24 x 350W Monocrystalline</p>
                          <p><strong>String Configuration:</strong> 3 strings of 8 panels</p>
                          <p><strong>Inverter:</strong> Single-phase string inverter</p>
                          <p><strong>DC Voltage:</strong> 320V (operating)</p>
                        </div>
                        <div>
                          <p><strong>AC Output:</strong> 230V single phase</p>
                          <p><strong>Expected Performance Ratio:</strong> 85%</p>
                          <p><strong>System Efficiency:</strong> 92%</p>
                          <p><strong>Annual Degradation:</strong> 0.45%</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financial">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Investment Summary</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>System Cost:</span>
                                <span className="font-medium">{sampleResults.estimatedCost}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Installation:</span>
                                <span className="font-medium">R 25,000</span>
                              </div>
                              <div className="flex justify-between border-t pt-1">
                                <span>Total Investment:</span>
                                <span className="font-bold">R 205,000</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Returns</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Payback Period:</span>
                                <span className="font-medium">{sampleResults.paybackPeriod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>25-year ROI:</span>
                                <span className="font-medium text-success">285%</span>
                              </div>
                              <div className="flex justify-between border-t pt-1">
                                <span>Total Savings:</span>
                                <span className="font-bold text-success">R 582,000</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="compliance">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">SANS & SSEG Compliant</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">SANS Standards</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>SANS 204-1 (LV Installations)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>SANS 1973 (Conductors)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>SANS 474 (Earthing)</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">SSEG Requirements</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>≤1MVA Capacity</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>Grid Code Compliance</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span>Protection Settings</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4 mt-6">
                  <Button className="flex-1 bg-gradient-solar hover:opacity-90">
                    Generate Proposal
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Export Design
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}