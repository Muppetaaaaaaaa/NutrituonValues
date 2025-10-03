'use client'

import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Star, 
  Dumbbell,
  TrendingUp,
  Apple,
  Zap,
  Target,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const plans = [
  {
    id: 1,
    name: 'Beginner Full Body Workout',
    type: 'workout',
    level: 'beginner',
    price: 29,
    duration: '8 weeks',
    description: 'Perfect for those new to fitness. Build a strong foundation with full-body workouts.',
    features: [
      '3 workouts per week',
      'Video demonstrations',
      'Progressive overload system',
      'Warm-up & cool-down routines',
      'Exercise substitutions'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Intermediate Strength Builder',
    type: 'workout',
    level: 'intermediate',
    price: 49,
    duration: '12 weeks',
    description: 'Take your strength to the next level with advanced training techniques.',
    features: [
      '4-5 workouts per week',
      'Push/Pull/Legs split',
      'Progressive overload tracking',
      'Deload weeks included',
      'Form check guidelines',
      'Nutrition timing tips'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Advanced Muscle Gain',
    type: 'workout',
    level: 'advanced',
    price: 69,
    duration: '16 weeks',
    description: 'Elite program for serious lifters looking to maximize muscle growth.',
    features: [
      '5-6 workouts per week',
      'Advanced periodization',
      'Hypertrophy-focused training',
      'Peak week protocols',
      'Recovery optimization',
      'Supplement guide',
      'Monthly progress assessments'
    ],
    popular: false
  },
  {
    id: 4,
    name: 'Weight Loss Meal Plan',
    type: 'meal',
    level: 'beginner',
    price: 39,
    duration: '4 weeks',
    description: 'Sustainable calorie deficit with delicious, easy-to-prepare meals.',
    features: [
      'Daily meal plans',
      'Shopping lists included',
      'Macro-balanced recipes',
      '1500-1800 calories/day',
      'Vegetarian options',
      'Meal prep guides'
    ],
    popular: false
  },
  {
    id: 5,
    name: 'Muscle Gain Meal Plan',
    type: 'meal',
    level: 'intermediate',
    price: 45,
    duration: '4 weeks',
    description: 'High-protein meal plan designed to support muscle growth and recovery.',
    features: [
      'Daily meal plans',
      'Shopping lists included',
      'High-protein recipes',
      '2500-3000 calories/day',
      'Pre/post workout meals',
      'Meal timing strategies',
      'Supplement recommendations'
    ],
    popular: true
  },
  {
    id: 6,
    name: 'Beginner Cardio Program',
    type: 'workout',
    level: 'beginner',
    price: 25,
    duration: '6 weeks',
    description: 'Build cardiovascular endurance with progressive cardio training.',
    features: [
      '3-4 sessions per week',
      'Low-impact options',
      'Heart rate zone training',
      'Progress tracking',
      'Recovery protocols'
    ],
    popular: false
  },
  {
    id: 7,
    name: 'Flexible Dieting Guide',
    type: 'meal',
    level: 'intermediate',
    price: 35,
    duration: '4 weeks',
    description: 'Learn to track macros and enjoy your favorite foods while hitting your goals.',
    features: [
      'Macro calculation guide',
      'Food tracking tutorials',
      'Restaurant eating tips',
      'Recipe database access',
      'Flexible meal templates'
    ],
    popular: false
  },
  {
    id: 8,
    name: 'Advanced HIIT Training',
    type: 'workout',
    level: 'advanced',
    price: 55,
    duration: '8 weeks',
    description: 'High-intensity interval training for maximum fat loss and conditioning.',
    features: [
      '4 HIIT sessions per week',
      'Metabolic conditioning',
      'Tabata protocols',
      'Recovery strategies',
      'Performance tracking',
      'Nutrition guidelines'
    ],
    popular: false
  }
]

export default function PlansPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')

  const filteredPlans = plans.filter(plan => {
    const matchesType = typeFilter === 'all' || plan.type === typeFilter
    const matchesLevel = levelFilter === 'all' || plan.level === levelFilter
    return matchesType && matchesLevel
  })

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

        {/* Filters Section */}
        <section className="py-8 px-4 border-b bg-background sticky top-16 z-40">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Filter Plans:</span>
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
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'}
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
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <h4 className="font-semibold text-sm">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700" 
                      size="lg"
                    >
                      Purchase Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No plans match your filters. Try adjusting your selection.
                </p>
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
