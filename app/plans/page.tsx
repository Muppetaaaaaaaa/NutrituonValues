import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Star, 
  Users, 
  Clock, 
  Target,
  Dumbbell,
  Home,
  TrendingUp
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Basic nutrition tracking',
      'Access to exercise library',
      'Community support',
      'Progress tracking',
      'Mobile app access'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Pro',
    price: '$19/month',
    description: 'For serious fitness enthusiasts who want it all',
    features: [
      'Everything in Starter',
      'Personalized meal plans',
      'Custom workout programs',
      'Advanced analytics',
      'Priority support',
      'Barcode scanner',
      'Macro tracking',
      'Workout templates'
    ],
    popular: true,
    cta: 'Start Pro Trial'
  },
  {
    name: 'Elite',
    price: '$39/month',
    description: 'Premium experience with personal coaching',
    features: [
      'Everything in Pro',
      '1-on-1 coaching calls',
      'Custom meal prep plans',
      'Advanced body composition tracking',
      'Supplement recommendations',
      'Priority feature requests',
      'White-glove onboarding'
    ],
    popular: false,
    cta: 'Go Elite'
  }
]

const categories = [
  {
    icon: TrendingUp,
    title: 'Weight Loss',
    description: 'Sustainable fat loss with proper nutrition and exercise',
    programs: ['12-Week Transformation', 'Quick Start', 'Maintenance Mode']
  },
  {
    icon: Dumbbell,
    title: 'Muscle Gain',
    description: 'Build lean muscle with progressive overload training',
    programs: ['Beginner Bulk', 'Advanced Hypertrophy', 'Strength Focus']
  },
  {
    icon: Home,
    title: 'Home Workouts',
    description: 'Effective workouts with minimal equipment',
    programs: ['Bodyweight Basics', 'Resistance Band', 'Home Gym Setup']
  },
  {
    icon: Target,
    title: 'Athletic Performance',
    description: 'Sport-specific training for peak performance',
    programs: ['Endurance Training', 'Power Development', 'Agility Focus']
  }
]

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              🎯 Choose Your Path to Success
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fitness Plans for Every Goal
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Whether you're looking to lose weight, build muscle, or improve performance, 
              we have the perfect plan to help you achieve your goals.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-muted-foreground">
                Start free, upgrade when you're ready
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Program Categories */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Specialized Programs
              </h2>
              <p className="text-xl text-muted-foreground">
                Tailored programs for your specific fitness goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Available Programs:</h4>
                        <ul className="space-y-1">
                          {category.programs.map((program, programIndex) => (
                            <li key={programIndex} className="text-sm text-muted-foreground flex items-center">
                              <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What's Included
              </h2>
              <p className="text-xl text-muted-foreground">
                Compare features across all plans
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-4 gap-4 text-center border-b pb-4 mb-8">
                <div></div>
                <div className="font-semibold">Starter</div>
                <div className="font-semibold">Pro</div>
                <div className="font-semibold">Elite</div>
              </div>
              
              {[
                'Nutrition Tracking',
                'Exercise Library',
                'Progress Analytics',
                'Mobile App',
                'Barcode Scanner',
                'Custom Workouts',
                'Meal Planning',
                'Priority Support',
                'Personal Coaching',
                'Advanced Analytics'
              ].map((feature, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-muted items-center">
                  <div className="font-medium">{feature}</div>
                  <div className="text-center">
                    {index < 4 ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                  </div>
                  <div className="text-center">
                    {index < 8 ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <span className="text-muted-foreground">—</span>}
                  </div>
                  <div className="text-center">
                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Can I switch plans anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a free trial?",
                  answer: "We offer a 7-day free trial for Pro and Elite plans. No credit card required to start."
                },
                {
                  question: "What if I'm not satisfied?",
                  answer: "We offer a 30-day money-back guarantee. If you're not happy, we'll refund your payment."
                },
                {
                  question: "Do you offer student discounts?",
                  answer: "Yes! Students get 50% off Pro and Elite plans with valid student ID verification."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands who have already achieved their fitness goals with FitnessPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                View Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
