import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  PiggyBank,
  FileText,
  Download,
  Send,
  Edit,
  Copy
} from "lucide-react";

export default function FinancialAnalysis() {
  const [selectedProject, setSelectedProject] = useState("SP-001");
  const [financeOption, setFinanceOption] = useState("cash");

  const projects = [
    { id: "SP-001", name: "Residential Solar - Sandton", capacity: "8.5 kW" },
    { id: "SP-002", name: "Commercial Rooftop - Midrand", capacity: "150 kW" },
    { id: "SP-003", name: "Residential Solar - Centurion", capacity: "12 kW" }
  ];

  const quotes = [
    {
      id: "QT-001",
      client: "John Smith",
      project: "Residential Solar - Sandton",
      total: "R 180,000",
      status: "Pending",
      validUntil: "2025-02-15",
      items: [
        { description: "8.5kW Solar Panel System", qty: 1, rate: "R 120,000", amount: "R 120,000" },
        { description: "Installation & Labor", qty: 1, rate: "R 35,000", amount: "R 35,000" },
        { description: "Electrical Compliance (COC)", qty: 1, rate: "R 15,000", amount: "R 15,000" },
        { description: "SSEG Application", qty: 1, rate: "R 10,000", amount: "R 10,000" }
      ]
    },
    {
      id: "QT-002", 
      client: "TechCorp Limited",
      project: "Commercial Rooftop - Midrand",
      total: "R 2,400,000",
      status: "Approved",
      validUntil: "2025-01-30",
      items: [
        { description: "150kW Commercial Solar System", qty: 1, rate: "R 1,800,000", amount: "R 1,800,000" },
        { description: "Commercial Installation", qty: 1, rate: "R 350,000", amount: "R 350,000" },
        { description: "Grid-tie Equipment", qty: 1, rate: "R 150,000", amount: "R 150,000" },
        { description: "Project Management", qty: 1, rate: "R 100,000", amount: "R 100,000" }
      ]
    }
  ];

  const financingOptions = [
    {
      type: "cash",
      name: "Cash Purchase",
      description: "Pay upfront for maximum savings",
      upfront: "R 180,000",
      monthly: "R 0",
      totalCost: "R 180,000",
      savings: "R 34,200/year",
      payback: "5.3 years",
      roi: "18.9%"
    },
    {
      type: "loan",
      name: "Solar Loan",
      description: "7.5% APR over 10 years",
      upfront: "R 18,000",
      monthly: "R 2,125",
      totalCost: "R 273,000",
      savings: "R 34,200/year",
      payback: "6.8 years", 
      roi: "12.5%"
    },
    {
      type: "lease",
      name: "Equipment Lease",
      description: "Lease with purchase option",
      upfront: "R 0",
      monthly: "R 2,850",
      totalCost: "R 342,000",
      savings: "R 34,200/year",
      payback: "7.2 years",
      roi: "10.0%"
    },
    {
      type: "ppa",
      name: "Power Purchase Agreement",
      description: "Pay per kWh generated",
      upfront: "R 0", 
      monthly: "R 1,950",
      totalCost: "R 468,000",
      savings: "R 34,200/year",
      payback: "8.5 years",
      roi: "7.3%"
    }
  ];

  const roiAnalysis = {
    year1: { production: 14500, savings: 34200, cumulative: 34200 },
    year5: { production: 13950, savings: 42500, cumulative: 189500 },
    year10: { production: 13100, savings: 52800, cumulative: 458200 },
    year15: { production: 12300, savings: 65600, cumulative: 812400 },
    year20: { production: 11600, savings: 81500, cumulative: 1345200 },
    year25: { production: 10900, savings: 101200, cumulative: 2134800 }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Analysis</h1>
          <p className="text-muted-foreground">
            Generate quotes, analyze financing options, and calculate ROI
          </p>
        </div>
        <Button className="bg-gradient-solar hover:opacity-90">
          <FileText className="mr-2 h-4 w-4" />
          New Quote
        </Button>
      </div>

      {/* Financial Tabs */}
      <Tabs defaultValue="quotes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quotes">Quotes & Proposals</TabsTrigger>
          <TabsTrigger value="financing">Financing Options</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="calculator">Price Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-6">
          <div className="grid gap-6">
            {quotes.map((quote) => (
              <Card key={quote.id} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-mono">{quote.id}</Badge>
                      <Badge variant={quote.status === "Approved" ? "default" : "secondary"}>
                        {quote.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button size="sm" className="bg-gradient-solar hover:opacity-90">
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{quote.project}</h3>
                        <p className="text-sm text-muted-foreground">Client: {quote.client}</p>
                        <p className="text-sm text-muted-foreground">Valid until: {quote.validUntil}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Quote Items</h4>
                        {quote.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                            <div className="flex-1">
                              <span className="font-medium">{item.description}</span>
                              <span className="text-muted-foreground ml-2">× {item.qty}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{item.amount}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-solar/10 rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground">Total Quote Value</p>
                        <p className="text-2xl font-bold text-primary">{quote.total}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{quote.total.replace(/R\s/, 'R ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VAT (15%):</span>
                          <span>R {(parseInt(quote.total.replace(/[R\s,]/g, '')) * 0.15).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total (Incl VAT):</span>
                          <span>R {(parseInt(quote.total.replace(/[R\s,]/g, '')) * 1.15).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financing" className="space-y-6">
          <div className="mb-6">
            <Label htmlFor="project-select">Select Project for Analysis</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} ({project.capacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {financingOptions.map((option) => (
              <Card key={option.type} className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {option.type === "cash" && <PiggyBank className="h-5 w-5 text-success" />}
                      {option.type === "loan" && <CreditCard className="h-5 w-5 text-primary" />}
                      {option.type === "lease" && <FileText className="h-5 w-5 text-warning" />}
                      {option.type === "ppa" && <TrendingUp className="h-5 w-5 text-secondary" />}
                      <div>
                        <h3 className="text-lg font-semibold">{option.name}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant={financeOption === option.type ? "default" : "outline"}
                      onClick={() => setFinanceOption(option.type)}
                    >
                      {financeOption === option.type ? "Selected" : "Select"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Upfront Cost</p>
                      <p className="font-semibold text-lg">{option.upfront}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold text-lg">{option.monthly}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Cost</p>
                      <p className="font-semibold">{option.totalCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Annual Savings</p>
                      <p className="font-semibold text-success">{option.savings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payback Period</p>
                      <p className="font-semibold">{option.payback}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ROI</p>
                      <p className="font-semibold text-primary">{option.roi}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  25-Year ROI Projection
                </CardTitle>
                <CardDescription>
                  Long-term return on investment analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(roiAnalysis).map(([year, data]) => (
                    <div key={year} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium">Year {year.replace('year', '')}</p>
                        <p className="text-xs text-muted-foreground">{data.production.toLocaleString()} kWh</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">R {data.savings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">R {data.cumulative.toLocaleString()} total</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-muted-foreground">Total 25-Year Savings</p>
                  <p className="text-3xl font-bold text-success">R 2,134,800</p>
                  <p className="text-sm text-muted-foreground">1,085% return on investment</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Financial Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed cost and savings analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/10 rounded">
                    <p className="text-sm text-muted-foreground">System Cost</p>
                    <p className="text-xl font-bold text-primary">R 180,000</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded">
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-xl font-bold text-success">R 34,200</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Cost Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Equipment (67%)</span>
                      <span>R 120,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Installation (19%)</span>
                      <span>R 35,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance (8%)</span>
                      <span>R 15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permits & SSEG (6%)</span>
                      <span>R 10,000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Savings Sources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Electricity Offset (78%)</span>
                      <span>R 26,700/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grid Export (15%)</span>
                      <span>R 5,100/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Incentives (7%)</span>
                      <span>R 2,400/year</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Solar System Price Calculator
              </CardTitle>
              <CardDescription>
                Auto-calculate recommended pricing based on system specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="capacity">System Capacity (kW)</Label>
                    <Input id="capacity" placeholder="8.5" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="panel-type">Panel Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select panel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mono">Monocrystalline (Premium)</SelectItem>
                        <SelectItem value="poly">Polycrystalline (Standard)</SelectItem>
                        <SelectItem value="bifacial">Bifacial (High-Efficiency)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inverter">Inverter Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select inverter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String Inverter</SelectItem>
                        <SelectItem value="power">Power Optimizers</SelectItem>
                        <SelectItem value="micro">Microinverters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="complexity">Installation Complexity</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (Single story, easy access)</SelectItem>
                        <SelectItem value="moderate">Moderate (Two story, some obstacles)</SelectItem>
                        <SelectItem value="complex">Complex (Multi-story, difficult access)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-solar/10 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-3">Recommended Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Equipment Cost:</span>
                        <span>R 120,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Installation:</span>
                        <span>R 35,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance & Permits:</span>
                        <span>R 25,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total Quote:</span>
                        <span className="text-primary">R 180,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Pricing Options</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-success/10 rounded">
                        <span className="text-sm">Competitive (-5%)</span>
                        <span className="font-medium text-success">R 171,000</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-primary/10 rounded border-2 border-primary">
                        <span className="text-sm">Recommended</span>
                        <span className="font-medium text-primary">R 180,000</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-warning/10 rounded">
                        <span className="text-sm">Premium (+10%)</span>
                        <span className="font-medium text-warning">R 198,000</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-solar hover:opacity-90">
                    Generate Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}