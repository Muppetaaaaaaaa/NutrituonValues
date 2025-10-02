import { Navigation } from '@/components/ui/custom/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Dumbbell, 
  Target, 
  Users, 
  Heart,
  Award,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Every feature is designed to help you achieve your specific fitness goals.'
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Built with feedback from thousands of fitness enthusiasts worldwide.'
  },
  {
    icon: Heart,
    title: 'Health-First',
    description: 'Promoting sustainable, healthy approaches to fitness and nutrition.'
  },
  {
    icon: Shield,
    title: 'Privacy-Focused',
    description: 'Your data is secure and never shared without your explicit consent.'
  }
]

const features = [
  {
    icon: Zap,
    title: 'Smart Tracking',
    description: 'Advanced algorithms to track your progress and suggest improvements.'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Thousands of success stories from users who achieved their goals.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Innovation',
    description: 'Regular updates with new features based on latest fitness science.'
  }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Dumbbell className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About FitnessPro
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We&apos;re on a mission to make fitness accessible, enjoyable, and effective for everyone. 
              Our comprehensive platform combines cutting-edge technology with proven fitness science.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground">
                Empowering individuals to achieve their fitness goals through intelligent tracking, 
                personalized guidance, and a supportive community.
              </p>
            </div>
            
            <Card className="p-8">
              <CardContent className="text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  "We believe that everyone deserves access to the tools and knowledge needed to live a healthier life. 
                  FitnessPro was born from the frustration of juggling multiple apps, complicated tracking systems, 
                  and generic advice that doesn&apos;t fit individual needs. Our platform brings everything together in 
                  one place, making it easier than ever to track nutrition, plan workouts, and see real progress."
                </p>
                <div className="mt-6 pt-6 border-t">
                  <p className="font-semibold">The FitnessPro Team</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Makes Us Different
              </h2>
              <p className="text-xl text-muted-foreground">
                Innovation meets simplicity in every feature
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Impact
              </h2>
              <p className="text-xl opacity-90">
                Numbers that show our commitment to your success
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Users', value: '10,000+' },
                { label: 'Workouts Completed', value: '50,000+' },
                { label: 'Pounds Lost', value: '25,000+' },
                { label: 'Success Stories', value: '2,000+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Passionate fitness enthusiasts and technology experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Founder & CEO',
                  bio: 'Former personal trainer with 10+ years experience. Passionate about making fitness accessible to everyone.',
                  specialties: ['Nutrition Science', 'Product Strategy']
                },
                {
                  name: 'Mike Chen',
                  role: 'Head of Engineering',
                  bio: 'Full-stack developer and fitness enthusiast. Loves building tools that make a real difference.',
                  specialties: ['Mobile Development', 'Data Analytics']
                },
                {
                  name: 'Dr. Emma Davis',
                  role: 'Fitness Science Advisor',
                  bio: 'PhD in Exercise Physiology. Ensures all our recommendations are backed by science.',
                  specialties: ['Exercise Physiology', 'Research']
                }
              ].map((member, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Learn More?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Whether you have questions, feedback, or just want to say hello.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Card className="p-6 max-w-sm">
                <CardContent className="text-center p-0">
                  <h3 className="font-semibold mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Have questions or feedback? We&apos;re here to help.
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> hello@fitnesspro.com<br />
                    <strong>Support:</strong> support@fitnesspro.com
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
