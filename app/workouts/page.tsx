'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/ui/custom/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Dumbbell, 
  Play, 
  Pause, 
  Plus, 
  Timer, 
  Target,
  Activity,
  Calendar,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react'
import { toast } from 'sonner'

interface Exercise {
  id: string
  name: string
  category: string
  muscleGroup: string[]
  equipment: string
  description: string
}

interface WorkoutSet {
  id: string
  reps: number
  weight: number
  completed: boolean
  restTime?: number
}

interface WorkoutExercise {
  id: string
  exercise: Exercise
  sets: WorkoutSet[]
  notes?: string
}

interface Workout {
  id: string
  name: string
  date: Date
  duration?: number
  exercises: WorkoutExercise[]
  completed: boolean
}

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    category: 'Strength',
    muscleGroup: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'Barbell',
    description: 'Lie on bench, lower bar to chest, press up'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Strength',
    muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: 'Barbell',
    description: 'Stand with feet shoulder-width apart, squat down, stand up'
  },
  {
    id: '3',
    name: 'Deadlift',
    category: 'Strength',
    muscleGroup: ['Hamstrings', 'Glutes', 'Back'],
    equipment: 'Barbell',
    description: 'Lift bar from ground to hip level, lower with control'
  },
  {
    id: '4',
    name: 'Pull-ups',
    category: 'Strength',
    muscleGroup: ['Back', 'Biceps'],
    equipment: 'Pull-up Bar',
    description: 'Hang from bar, pull body up until chin over bar'
  },
  {
    id: '5',
    name: 'Push-ups',
    category: 'Bodyweight',
    muscleGroup: ['Chest', 'Triceps', 'Shoulders'],
    equipment: 'None',
    description: 'Start in plank, lower body, push back up'
  }
]

const workoutTemplates = [
  {
    id: '1',
    name: 'Push Day',
    description: 'Chest, shoulders, and triceps',
    exercises: ['1', '5'], // Bench Press, Push-ups
    estimatedTime: 60
  },
  {
    id: '2',
    name: 'Pull Day',
    description: 'Back and biceps',
    exercises: ['4'], // Pull-ups
    estimatedTime: 45
  },
  {
    id: '3',
    name: 'Leg Day',
    description: 'Quadriceps, hamstrings, and glutes',
    exercises: ['2', '3'], // Squats, Deadlift
    estimatedTime: 75
  }
]

export default function WorkoutsPage() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([])
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [workoutTimer, setWorkoutTimer] = useState(0)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWorkoutActive])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false)
            toast.success('Rest time complete!')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer])

  const startWorkout = (templateId?: string) => {
    const template = workoutTemplates.find(t => t.id === templateId)
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: template?.name || 'Custom Workout',
      date: new Date(),
      exercises: template ? template.exercises.map(exerciseId => {
        const exercise = mockExercises.find(e => e.id === exerciseId)!
        return {
          id: `${Date.now()}-${exerciseId}`,
          exercise,
          sets: [
            { id: '1', reps: 0, weight: 0, completed: false },
            { id: '2', reps: 0, weight: 0, completed: false },
            { id: '3', reps: 0, weight: 0, completed: false }
          ]
        }
      }) : [],
      completed: false
    }
    
    setCurrentWorkout(newWorkout)
    setIsWorkoutActive(true)
    setWorkoutTimer(0)
    toast.success(`Started ${newWorkout.name}`)
  }

  const completeSet = (exerciseId: string, setId: string, reps: number, weight: number) => {
    if (!currentWorkout) return
    
    setCurrentWorkout(prev => {
      if (!prev) return prev
      
      return {
        ...prev,
        exercises: prev.exercises.map(ex => 
          ex.id === exerciseId 
            ? {
                ...ex,
                sets: ex.sets.map(set => 
                  set.id === setId 
                    ? { ...set, reps, weight, completed: true }
                    : set
                )
              }
            : ex
        )
      }
    })
    
    // Start rest timer
    setRestTimer(90) // 90 seconds default rest
    setIsResting(true)
    toast.success(`Set completed! Rest for 90 seconds`)
  }

  const finishWorkout = () => {
    if (!currentWorkout) return
    
    const completedWorkout = {
      ...currentWorkout,
      duration: workoutTimer,
      completed: true
    }
    
    setWorkoutHistory(prev => [completedWorkout, ...prev])
    setCurrentWorkout(null)
    setIsWorkoutActive(false)
    setWorkoutTimer(0)
    setIsResting(false)
    setRestTimer(0)
    
    toast.success('Workout completed! Great job!')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const categories = ['All', 'Strength', 'Bodyweight', 'Cardio']
  const filteredExercises = selectedCategory === 'All' 
    ? mockExercises 
    : mockExercises.filter(ex => ex.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Workout Tracker</h1>
            <p className="text-muted-foreground">
              Plan, track, and analyze your workouts
            </p>
          </div>

          {/* Active Workout Timer */}
          {isWorkoutActive && (
            <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800 dark:text-green-200">
                        {currentWorkout?.name}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(workoutTimer)}
                    </Badge>
                    {isResting && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <Timer className="h-3 w-3 mr-1" />
                        Rest: {formatTime(restTimer)}
                      </Badge>
                    )}
                  </div>
                  <Button onClick={finishWorkout} variant="outline" size="sm">
                    Finish Workout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Quick Actions & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workoutTemplates.map(template => (
                    <Button
                      key={template.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => startWorkout(template.id)}
                      disabled={isWorkoutActive}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {template.estimatedTime} min
                        </div>
                      </div>
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => startWorkout()}
                    disabled={isWorkoutActive}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Custom Workout
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {workoutHistory.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Workouts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(workoutHistory.reduce((acc, w) => acc + (w.duration || 0), 0) / 60)}
                      </div>
                      <div className="text-sm text-muted-foreground">Minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Current Workout or Exercise Library */}
            <div className="lg:col-span-2 space-y-6">
              {currentWorkout ? (
                /* Active Workout */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Current Workout: {currentWorkout.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentWorkout.exercises.map((workoutExercise, exerciseIndex) => (
                      <div key={workoutExercise.id} className="border rounded-lg p-4">
                        <div className="mb-4">
                          <h3 className="font-semibold text-lg">{workoutExercise.exercise.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {workoutExercise.exercise.muscleGroup.join(', ')} • {workoutExercise.exercise.equipment}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {workoutExercise.sets.map((set, setIndex) => (
                            <div key={set.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                              <div className="font-medium min-w-[60px]">
                                Set {setIndex + 1}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Label htmlFor={`reps-${set.id}`} className="text-xs">Reps</Label>
                                <Input
                                  id={`reps-${set.id}`}
                                  type="number"
                                  className="w-16 h-8"
                                  defaultValue={set.reps || ''}
                                  disabled={set.completed}
                                />
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Label htmlFor={`weight-${set.id}`} className="text-xs">Weight</Label>
                                <Input
                                  id={`weight-${set.id}`}
                                  type="number"
                                  className="w-20 h-8"
                                  defaultValue={set.weight || ''}
                                  disabled={set.completed}
                                />
                                <span className="text-xs text-muted-foreground">kg</span>
                              </div>
                              
                              {set.completed ? (
                                <Badge variant="secondary" className="ml-auto">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Done
                                </Badge>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const repsInput = document.getElementById(`reps-${set.id}`) as HTMLInputElement
                                    const weightInput = document.getElementById(`weight-${set.id}`) as HTMLInputElement
                                    const reps = parseInt(repsInput.value) || 0
                                    const weight = parseFloat(weightInput.value) || 0
                                    completeSet(workoutExercise.id, set.id, reps, weight)
                                  }}
                                  className="ml-auto"
                                >
                                  Complete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                /* Exercise Library */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Exercise Library
                    </CardTitle>
                    <CardDescription>
                      Browse exercises and add them to your workout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Category Filter */}
                    <div className="mb-6">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Exercise Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredExercises.map(exercise => (
                        <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{exercise.name}</CardTitle>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="secondary">{exercise.category}</Badge>
                              <Badge variant="outline">{exercise.equipment}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {exercise.description}
                            </p>
                            <div className="text-xs text-muted-foreground mb-3">
                              <strong>Muscles:</strong> {exercise.muscleGroup.join(', ')}
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                              <Plus className="h-3 w-3 mr-2" />
                              Add to Workout
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Workout History */}
              {workoutHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Workouts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workoutHistory.slice(0, 5).map(workout => (
                        <div key={workout.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{workout.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {workout.date.toLocaleDateString()} • {formatTime(workout.duration || 0)}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {workout.exercises.length} exercises
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
