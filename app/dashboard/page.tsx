'use client'

import { Navigation } from '@/components/ui/custom/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Dumbbell,
  Apple,
  Calendar,
  TrendingUp,
  ShoppingBag
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface PurchasedPlan {
  id: string
  planName: string
  planType: string
  planLevel: string
  overview: string
  duration: string
  purchasedAt: string
}

export default function DashboardPage() {
  const [purchasedPlans, setPurchasedPlans] = useState<PurchasedPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, get from localStorage
    const plans = localStorage.getItem('purchasedPlans')
    if (plans) {
      setPurchasedPlans(JSON.parse(plans))
    }
    setLoading(false)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Track your fitness journey and access your plans</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Plans</CardDescription>
                <CardTitle className="text-3xl">{purchasedPlans.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Purchased
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Workouts This Week</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Dumbbell className="h-4 w-4 mr-1" />
                  Get started!
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Calories Tracked</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Apple className="h-4 w-4 mr-1" />
                  Today
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Streak</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Days
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Plans Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Plans</h2>
              <Button asChild variant="outline">
                <Link href="/plans">
                  Browse More Plans
                </Link>
              </Button>
            </div>

            {loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Loading your plans...</p>
                </CardContent>
              </Card>
            ) : purchasedPlans.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Plans Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Purchase your first workout or meal plan to get started!
                  </p>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/plans">
                      Browse Plans
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedPlans.map((plan) => (
                  <Card key={plan.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit">
                          {plan.planType === 'workout' ? (
                            <Dumbbell className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                          ) : (
                            <Apple className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                          )}
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {plan.planLevel}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{plan.planName}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {plan.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{plan.overview}</p>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        View Plan Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-teal-500 transition-colors cursor-pointer">
              <Link href="/workouts">
                <CardHeader>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mb-4">
                    <Dumbbell className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Start a Workout</CardTitle>
                  <CardDescription>
                    Log your exercises and track your progress
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="border-2 hover:border-teal-500 transition-colors cursor-pointer">
              <Link href="/nutrition">
                <CardHeader>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mb-4">
                    <Apple className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Track Nutrition</CardTitle>
                  <CardDescription>
                    Log your meals and monitor your macros
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
