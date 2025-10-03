import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planId, planName, planType, planLevel, price, description, duration, overview, features } = body

    // Create purchased plan
    const purchasedPlan = await prisma.purchasedPlan.create({
      data: {
        userId,
        planId,
        planName,
        planType,
        planLevel,
        price,
        description,
        duration,
        overview,
        features
      }
    })

    return NextResponse.json({ success: true, plan: purchasedPlan })
  } catch (error) {
    console.error('Error purchasing plan:', error)
    return NextResponse.json({ success: false, error: 'Failed to purchase plan' }, { status: 500 })
  }
}
