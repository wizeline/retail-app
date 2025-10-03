import Link from "next/link"
import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart, Apple, Milk, Beef, TrendingUp, MapPin, Users } from "lucide-react"

const sectionData = {
  produce: {
    name: "Produce",
    description: "Fresh fruits and vegetables section optimization",
    icon: Apple,
    color: "text-green-600",
    bgColor: "bg-green-50",
    items: ["Apples", "Bananas", "Lettuce", "Tomatoes", "Carrots", "Onions"],
    metrics: {
      currentEfficiency: 82,
      revenueImpact: 12,
      footTraffic: 145,
      avgDwell: "2.3 min",
      conversionRate: 68,
    },
    suggestions: [
      { title: "Move seasonal fruits to eye level", impact: "+8% sales" },
      { title: "Create organic produce endcap", impact: "+15% margin" },
      { title: "Optimize refrigeration layout", impact: "+5% efficiency" },
    ]
  },
  dairy: {
    name: "Dairy",
    description: "Milk, cheese, and dairy products section optimization",
    icon: Milk,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: ["Milk", "Cheese", "Yogurt", "Butter", "Eggs", "Cream"],
    metrics: {
      currentEfficiency: 89,
      revenueImpact: 18,
      footTraffic: 198,
      avgDwell: "1.8 min",
      conversionRate: 74,
    },
    suggestions: [
      { title: "Expand plant-based alternatives", impact: "+22% sales" },
      { title: "Optimize cold chain efficiency", impact: "+12% cost saving" },
      { title: "Create family-size bundles", impact: "+9% basket size" },
    ]
  },
  meat: {
    name: "Meat & Seafood",
    description: "Fresh meat and seafood section optimization",
    icon: Beef,
    color: "text-red-600",
    bgColor: "bg-red-50",
    items: ["Beef", "Chicken", "Pork", "Fish", "Shrimp", "Deli Meats"],
    metrics: {
      currentEfficiency: 76,
      revenueImpact: 25,
      footTraffic: 167,
      avgDwell: "3.1 min",
      conversionRate: 61,
    },
    suggestions: [
      { title: "Implement dynamic pricing", impact: "+19% margin" },
      { title: "Create value-pack promotions", impact: "+14% volume" },
      { title: "Optimize display temperature", impact: "+8% freshness" },
    ]
  },
  grocery: {
    name: "Grocery",
    description: "Packaged and canned goods section optimization",
    icon: ShoppingCart,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    items: ["Canned Goods", "Pasta", "Rice", "Snacks", "Beverages", "Condiments"],
    metrics: {
      currentEfficiency: 91,
      revenueImpact: 16,
      footTraffic: 234,
      avgDwell: "4.2 min",
      conversionRate: 79,
    },
    suggestions: [
      { title: "Reorganize by meal occasions", impact: "+11% basket size" },
      { title: "Create cross-category displays", impact: "+7% discovery" },
      { title: "Optimize shelf height allocation", impact: "+13% visibility" },
    ]
  }
}

interface PageProps {
  params: Promise<{ section: string }>
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params

  if (!sectionData[section as keyof typeof sectionData]) {
    notFound()
  }

  const data = sectionData[section as keyof typeof sectionData]
  const Icon = data.icon

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className={`p-2 rounded-lg ${data.bgColor}`}>
                <Icon className={`h-6 w-6 ${data.color}`} />
              </div>
              {data.name}
            </h2>
            <p className="text-muted-foreground">{data.description}</p>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Efficiency</span>
            </div>
            <div className="text-2xl font-bold">{data.metrics.currentEfficiency}%</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Daily Traffic</span>
            </div>
            <div className="text-2xl font-bold">{data.metrics.footTraffic}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Avg. Dwell</span>
            </div>
            <div className="text-2xl font-bold">{data.metrics.avgDwell}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Conversion</span>
            </div>
            <div className="text-2xl font-bold">{data.metrics.conversionRate}%</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Revenue Impact</span>
            </div>
            <div className="text-2xl font-bold text-green-600">+{data.metrics.revenueImpact}%</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Products */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm">{item}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r from-${data.color.split('-')[1]}-400 to-${data.color.split('-')[1]}-600`}
                        style={{ width: `${100 - index * 12}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {100 - index * 12}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">AI Optimization Suggestions</h3>
            <div className="space-y-4">
              {data.suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected impact: <span className="text-green-600 font-medium">{suggestion.impact}</span>
                      </p>
                    </div>
                    <Button size="sm" className="ml-2">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layout Visualization */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Section Layout</h3>
          <div className="h-64 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Interactive section layout visualization</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}