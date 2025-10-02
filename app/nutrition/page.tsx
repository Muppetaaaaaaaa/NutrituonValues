'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Camera, 
  Upload, 
  Search, 
  Plus, 
  Target, 
  Apple,
  Zap,
  Beef,
  Wheat,
  Droplets,
  Settings,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'

interface NutritionGoals {
  calories: number
  protein: number
  fat: number
  carbs: number
}

interface DailyProgress {
  calories: number
  protein: number
  fat: number
  carbs: number
}

interface FoodItem {
  id: string
  name: string
  brand?: string
  barcode?: string
  calories: number
  protein: number
  fat: number
  carbs: number
  amount: number
  unit: string
  timestamp: Date
}

export default function NutritionPage() {
  const [goals, setGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    fat: 65,
    carbs: 250
  })
  
  const [progress, setProgress] = useState<DailyProgress>({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  })
  
  const [foodLog, setFoodLog] = useState<FoodItem[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [manualBarcode, setManualBarcode] = useState('')
  const [currentProduct, setCurrentProduct] = useState<any>(null)

  // Mock barcode lookup function
  const lookupBarcode = async (barcode: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock product data
    const mockProducts: { [key: string]: any } = {
      '737628064502': {
        name: 'Greek Yogurt',
        brand: 'Chobani',
        calories: 100,
        protein: 18,
        fat: 0,
        carbs: 6,
        per100g: true
      },
      '012345678901': {
        name: 'Banana',
        brand: 'Fresh',
        calories: 89,
        protein: 1.1,
        fat: 0.3,
        carbs: 23,
        per100g: true
      }
    }
    
    return mockProducts[barcode] || null
  }

  const handleBarcodeSubmit = async () => {
    if (!manualBarcode.trim()) {
      toast.error('Please enter a barcode')
      return
    }
    
    try {
      const product = await lookupBarcode(manualBarcode)
      if (product) {
        setCurrentProduct(product)
        toast.success(`Found: ${product.name}`)
      } else {
        toast.error('Product not found')
      }
    } catch (error) {
      toast.error('Failed to lookup product')
    }
  }

  const addFoodItem = (amount: number) => {
    if (!currentProduct) return
    
    const multiplier = amount / 100 // assuming per 100g data
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: currentProduct.name,
      brand: currentProduct.brand,
      calories: Math.round(currentProduct.calories * multiplier),
      protein: Math.round(currentProduct.protein * multiplier * 10) / 10,
      fat: Math.round(currentProduct.fat * multiplier * 10) / 10,
      carbs: Math.round(currentProduct.carbs * multiplier * 10) / 10,
      amount,
      unit: 'g',
      timestamp: new Date()
    }
    
    setFoodLog(prev => [...prev, newItem])
    setProgress(prev => ({
      calories: prev.calories + newItem.calories,
      protein: prev.protein + newItem.protein,
      fat: prev.fat + newItem.fat,
      carbs: prev.carbs + newItem.carbs
    }))
    
    setCurrentProduct(null)
    setManualBarcode('')
    toast.success(`Added ${newItem.name} to your log`)
  }

  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
            <p className="text-muted-foreground">
              Track your daily nutrition with barcode scanning and manual logging
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Progress & Goals */}
            <div className="lg:col-span-1 space-y-6">
              {/* Daily Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Today&apos;s Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Zap className="h-4 w-4 text-orange-500" />
                        Calories
                      </span>
                      <span className="text-sm">{progress.calories} / {goals.calories}</span>
                    </div>
                    <Progress value={calculatePercentage(progress.calories, goals.calories)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Beef className="h-4 w-4 text-red-500" />
                        Protein
                      </span>
                      <span className="text-sm">{progress.protein}g / {goals.protein}g</span>
                    </div>
                    <Progress value={calculatePercentage(progress.protein, goals.protein)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        Fat
                      </span>
                      <span className="text-sm">{progress.fat}g / {goals.fat}g</span>
                    </div>
                    <Progress value={calculatePercentage(progress.fat, goals.fat)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Wheat className="h-4 w-4 text-yellow-500" />
                        Carbs
                      </span>
                      <span className="text-sm">{progress.carbs}g / {goals.carbs}g</span>
                    </div>
                    <Progress value={calculatePercentage(progress.carbs, goals.carbs)} />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {foodLog.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Items Logged</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round((progress.calories / goals.calories) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Goal Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Scanner & Log */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scanner */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    Add Food
                  </CardTitle>
                  <CardDescription>
                    Scan barcodes, upload images, or search manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="barcode" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="barcode">
                        <Search className="h-4 w-4 mr-2" />
                        Barcode
                      </TabsTrigger>
                      <TabsTrigger value="camera">
                        <Camera className="h-4 w-4 mr-2" />
                        Camera
                      </TabsTrigger>
                      <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="barcode" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="barcode">Enter Barcode</Label>
                        <div className="flex gap-2">
                          <Input
                            id="barcode"
                            placeholder="e.g. 737628064502"
                            value={manualBarcode}
                            onChange={(e) => setManualBarcode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSubmit()}
                          />
                          <Button onClick={handleBarcodeSubmit}>
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Demo barcodes */}
                      <div className="text-sm text-muted-foreground">
                        <p>Try these demo barcodes:</p>
                        <div className="flex gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer"
                            onClick={() => setManualBarcode('737628064502')}
                          >
                            737628064502 (Greek Yogurt)
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer"
                            onClick={() => setManualBarcode('012345678901')}
                          >
                            012345678901 (Banana)
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="camera" className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">
                          Camera scanner would appear here
                        </p>
                        <Button variant="outline" disabled>
                          Start Camera Scanner
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upload" className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">
                          Upload an image with a barcode
                        </p>
                        <Button variant="outline" disabled>
                          Choose Image
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Current Product */}
              {currentProduct && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-200">
                      Product Found!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{currentProduct.name}</h3>
                      {currentProduct.brand && (
                        <p className="text-muted-foreground">{currentProduct.brand}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="font-semibold">{currentProduct.calories}</div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                      </div>
                      <div>
                        <div className="font-semibold">{currentProduct.protein}g</div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                      <div>
                        <div className="font-semibold">{currentProduct.fat}g</div>
                        <div className="text-xs text-muted-foreground">Fat</div>
                      </div>
                      <div>
                        <div className="font-semibold">{currentProduct.carbs}g</div>
                        <div className="text-xs text-muted-foreground">Carbs</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Amount (grams)</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="number" 
                          placeholder="100" 
                          id="amount-input"
                          defaultValue="100"
                        />
                        <Button 
                          onClick={() => {
                            const input = document.getElementById('amount-input') as HTMLInputElement
                            const amount = parseInt(input.value) || 100
                            addFoodItem(amount)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Log
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Food Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today&apos;s Food Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {foodLog.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Apple className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No food logged yet today</p>
                      <p className="text-sm">Start by scanning a barcode above</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {foodLog.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            {item.brand && (
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              {item.amount}{item.unit} • {new Date(item.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.calories} cal</div>
                            <div className="text-sm text-muted-foreground">
                              P: {item.protein}g • F: {item.fat}g • C: {item.carbs}g
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
