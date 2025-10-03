'use client'

import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Check, 
  Star, 
  Dumbbell,
  TrendingUp,
  Apple,
  Zap,
  Target,
  Filter,
  Search,
  MessageSquare
} from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

const plans = [
  {
    id: '1',
    name: 'Beginner Full Body Workout',
    type: 'workout',
    level: 'beginner',
    price: 29,
    duration: '8 weeks',
    overview: 'Full-body training 3x per week for complete beginners',
    description: 'Perfect for those new to fitness. Build a strong foundation with full-body workouts designed to teach proper form and build strength progressively.',
    features: [
      '3 workouts per week (45-60 min each)',
      'Video demonstrations for every exercise',
      'Progressive overload system',
      'Warm-up & cool-down routines',
      'Exercise substitutions for home/gym',
      'Form check guidelines'
    ],
    popular: false
  },
  {
    id: '2',
    name: 'PPL Strength Builder',
    type: 'workout',
    level: 'intermediate',
    price: 49,
    duration: '12 weeks',
    overview: 'PPLPPL split for intermediate lifters seeking strength gains',
    description: 'Push-Pull-Legs split running 6 days per week. Designed for those with 6+ months of training experience looking to maximize strength and muscle growth.',
    features: [
      '6 workouts per week (60-75 min each)',
      'Push/Pull/Legs split repeated twice weekly',
      'Progressive overload tracking sheets',
      'Deload weeks included',
      'Compound movement focus',
      'Accessory work for weak points',
      'Nutrition timing recommendations'
    ],
    popular: true
  },
  {
    id: '3',
    name: 'Advanced Hypertrophy Program',
    type: 'workout',
    level: 'advanced',
    price: 69,
    duration: '16 weeks',
    overview: 'Elite muscle-building program with advanced periodization',
    description: 'Comprehensive hypertrophy-focused program for experienced lifters. Includes advanced techniques like drop sets, supersets, and periodized training blocks.',
    features: [
      '5-6 workouts per week (75-90 min each)',
      'Advanced periodization (accumulation/intensification)',
      'Hypertrophy-specific training techniques',
      'Peak week protocols',
      'Recovery optimization strategies',
      'Supplement timing guide',
      'Monthly progress assessments',
      'Direct coach support via email'
    ],
    popular: false
  },
  {
    id: '4',
    name: 'Weight Loss Meal Plan',
    type: 'meal',
    level: 'beginner',
    price: 39,
    duration: '4 weeks',
    overview: 'Sustainable calorie deficit with delicious, easy meals',
    description: 'Lose weight without feeling deprived. This meal plan provides balanced nutrition in a calorie deficit with recipes that are simple to prepare and actually taste good.',
    features: [
      'Daily meal plans (breakfast, lunch, dinner, snacks)',
      'Weekly shopping lists included',
      'Macro-balanced recipes (40% carbs, 30% protein, 30% fat)',
      '1500-1800 calories/day (adjustable)',
      'Vegetarian & vegan options',
      'Meal prep guides for busy schedules',
      '50+ delicious recipes'
    ],
    popular: false
  },
  {
    id: '5',
    name: 'Muscle Gain Meal Plan',
    type: 'meal',
    level: 'intermediate',
    price: 45,
    duration: '4 weeks',
    overview: 'High-protein nutrition to fuel muscle growth and recovery',
    description: 'Optimized for muscle building with high protein intake and strategic carb timing around workouts. Includes calorie surplus guidelines based on your training intensity.',
    features: [
      'Daily meal plans with 2500-3000 calories',
      'High-protein recipes (1g per lb bodyweight)',
      'Pre & post-workout meal timing',
      'Shopping lists included',
      'Meal timing strategies for muscle growth',
      'Supplement recommendations',
      'Recipe variations for dietary preferences',
      'Bulk cooking guides'
    ],
    popular: true
  },
  {
    id: '6',
    name: 'Beginner Cardio Program',
    type: 'workout',
    level: 'beginner',
    price: 25,
    duration: '6 weeks',
    overview: 'Build cardiovascular endurance from scratch',
    description: 'Progressive cardio program perfect for beginners. Start with low-impact activities and gradually build up your endurance and cardiovascular fitness.',
    features: [
      '3-4 sessions per week (20-40 min)',
      'Low-impact options (walking, cycling, swimming)',
      'Heart rate zone training explained',
      'Progress tracking templates',
      'Recovery protocols',
      'Transition to running program included'
    ],
    popular: false
  },
  {
    id: '7',
    name: 'Flexible Dieting Guide',
    type: 'meal',
    level: 'intermediate',
    price: 35,
    duration: '4 weeks',
    overview: 'Learn IIFYM (If It Fits Your Macros) approach to nutrition',
    description: 'Master flexible dieting and learn to track macros while still enjoying your favorite foods. Perfect for sustainable long-term nutrition habits.',
    features: [
      'Macro calculation guide for your goals',
      'Food tracking tutorials (MyFitnessPal)',
      'Restaurant eating strategies',
      'Recipe database access (200+ recipes)',
      'Flexible meal templates',
      'How to fit treats into your macros',
      'Alcohol and social eating guide'
    ],
    popular: false
  },
  {
    id: '8',
    name: 'HIIT Fat Loss Program',
    type: 'workout',
    level: 'advanced',
    price: 55,
    duration: '8 weeks',
    overview: 'High-intensity training for maximum fat loss',
    description: 'Intense HIIT workouts designed to maximize calorie burn and preserve muscle mass during a cut. Requires good cardiovascular base and training experience.',
    features: [
      '4 HIIT sessions per week (30-45 min)',
      'Metabolic conditioning workouts',
      'Tabata & EMOM protocols',
      'Active recovery strategies',
      'Performance tracking metrics',
      'Nutrition guidelines for fat loss',
      'Supplement recommendations'
    ],
    popular: false
  }
]

export default function PlansPage() {
  const router = useRouter()
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)

  const filteredPlans = plans.filter(plan => {
    const matchesType = typeFilter === 'all' || plan.type === typeFilter
    const matchesLevel = levelFilter === 'all' || plan.level === levelFilter
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesLevel && matchesSearch
  })

  const handlePurchase = (plan: typeof plans[0]) => {
    // Store in localStorage for demo (in production, this would be an API call)
    const existingPlans = localStorage.getItem('purchasedPlans')
    const purchasedPlans = existingPlans ? JSON.parse(existingPlans) : []
    
    // Check if already purchased
    if (purchasedPlans.some((p: any) => p.id === plan.id)) {
      alert('You already own this plan! Check your dashboard.')
      return
    }
    
    purchasedPlans.push({
      ...plan,
      purchasedAt: new Date().toISOString()
    })
    
    localStorage.setItem('purchasedPlans', JSON.stringify(purchasedPlans))
    
    // Show success and redirect
    alert(`Successfully purchased ${plan.name}! Redirecting to your dashboard...`)
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Target className="h-3 w-3 mr-1" />
              Choose Your Path
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Workout & Meal Plans
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Expert-designed plans for every fitness level. Purchase once, access forever.
            </p>
          </div>
        </section>

        {/* Search & Filters Section */}
        <section className="py-8 px-4 border-b bg-background sticky top-16 z-40">
          <div className="container mx-auto">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search plans by name, type, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Filters:</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Plan Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="workout">Workout Plans</SelectItem>
                      <SelectItem value="meal">Meal Plans</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Difficulty Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'}
              </div>
              
              {/* Custom Plan Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Request Custom Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request a Custom Plan</DialogTitle>
                    <DialogDescription>
                      Can't find what you're looking for? Let us create a personalized plan just for you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      Our expert trainers and nutritionists can design a completely custom workout or meal plan tailored to your:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>Specific fitness goals and timeline</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>Available equipment and training environment</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>Dietary restrictions and preferences</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                        <span>Schedule and time constraints</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <p className="text-sm font-semibold mb-2">Custom Plan Pricing:</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Custom workout plans start at $99 | Custom meal plans start at $79
                      </p>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        Contact Us for Custom Plan
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className={`relative flex flex-col ${plan.popular ? 'border-teal-500 border-2 shadow-lg' : 'border-2'}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-600">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit">
                        {plan.type === 'workout' ? (
                          <Dumbbell className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        ) : (
                          <Apple className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        )}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {plan.level}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-teal-600">${plan.price}</span>
                      <span className="text-sm text-muted-foreground">one-time</span>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Zap className="h-4 w-4" />
                      {plan.duration} program
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4 p-3 bg-teal-50 dark:bg-teal-950 rounded-lg border border-teal-200 dark:border-teal-800">
                      <p className="text-sm font-semibold text-teal-900 dark:text-teal-100">
                        {plan.overview}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <h4 className="font-semibold text-sm">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="text-sm text-muted-foreground pl-6">
                            + {plan.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline"
                            className="w-full" 
                            onClick={() => setSelectedPlan(plan)}
                          >
                            View Full Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{plan.name}</DialogTitle>
                            <DialogDescription>
                              <Badge variant="outline" className="capitalize mt-2">
                                {plan.level}
                              </Badge>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="font-semibold mb-2">Overview</h4>
                              <p className="text-sm text-muted-foreground">{plan.overview}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">All Features</h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <Check className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="pt-4 border-t">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">One-time payment</p>
                                  <p className="text-3xl font-bold text-teal-600">${plan.price}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Duration</p>
                                  <p className="text-lg font-semibold">{plan.duration}</p>
                                </div>
                              </div>
                              <Button 
                                className="w-full bg-teal-600 hover:bg-teal-700"
                                onClick={() => handlePurchase(plan)}
                              >
                                Purchase Plan
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        className="w-full bg-teal-600 hover:bg-teal-700" 
                        onClick={() => handlePurchase(plan)}
                      >
                        Purchase Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl font-semibold mb-2">No plans found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setTypeFilter('all')
                    setLevelFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose BetterU Plans?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mx-auto mb-4">
                    <Star className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Expert Designed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Created by certified trainers and nutritionists with years of experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Thousands of success stories from people just like you.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mx-auto mb-4">
                    <Zap className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Lifetime Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Purchase once and access your plan forever. No recurring fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Plan is Right for You?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contact our team for personalized recommendations based on your goals.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Help Choosing
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
