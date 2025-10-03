import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Dumbbell, 
  Target, 
  Apple, 
  Activity, 
  Users, 
  Trophy, 
  Clock, 
  Star,
  ArrowRight,
  Zap,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    icon: Dumbbell,
    title: 'Workout Plans',
    description: 'Expert-designed workout programs for all fitness levels - from beginner to advanced.',
    href: '/plans'
  },
  {
    icon: Apple,
    title: 'Meal Plans',
    description: 'Nutrition plans tailored to your goals - weight loss, muscle gain, or maintenance.',
    href: '/plans'
  },
  {
    icon: Target,
    title: 'Track Progress',
    description: 'Monitor your fitness journey with comprehensive tracking and analytics.',
    href: '/workouts'
  }
]

const stats = [
  { label: 'Active Members', value: '15K+', icon: Users },
  { label: 'Workouts Completed', value: '100K+', icon: Activity },
  { label: 'Success Stories', value: '5K+', icon: Trophy },
  { label: 'Avg. Results', value: '6 weeks', icon: Clock }
]

const testimonials = [
  {
    name: 'Jessica Martinez',
    role: 'Lost 30 lbs in 12 weeks',
    content: 'BetterU transformed my life! The beginner workout plan was perfect for getting started.',
    rating: 5
  },
  {
    name: 'David Thompson',
    role: 'Gained 20 lbs muscle',
    content: 'The advanced strength program helped me break through my plateau. Incredible results!',
    rating: 5
  },
  {
    name: 'Sarah Kim',
    role: 'Improved overall fitness',
    content: 'Love the meal plans! They made nutrition simple and helped me reach my goals faster.',
    rating: 5
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                Transform Your Body & Mind
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Your Journey to a Better You Starts Here
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Premium workout and meal plans designed by experts. 
                Choose your path, track your progress, and achieve your fitness goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="text-lg px-8 py-6 bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/plans">
                    Browse Plans
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link href="/workouts">
                    Start Training
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional fitness and nutrition plans at your fingertips
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-teal-500">
                    <Link href={feature.href}>
                      <CardHeader>
                        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Results from Real People
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands who have transformed their lives with BetterU
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      {testimonial.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Become a Better You?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start your transformation today with expert-designed workout and meal plans.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/plans">
                View All Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8">
                  <Image 
                    src="/logo.png" 
                    alt="BetterU Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl">BetterU</span>
              </div>
              <p className="text-muted-foreground">
                Transform your body and mind with expert fitness and nutrition plans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/plans" className="hover:text-foreground">Workout Plans</Link></li>
                <li><Link href="/plans" className="hover:text-foreground">Meal Plans</Link></li>
                <li><Link href="/workouts" className="hover:text-foreground">Track Progress</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BetterU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
