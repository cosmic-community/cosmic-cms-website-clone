'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Plan data based on Cosmic pricing
interface PlanLimits {
  buckets: number
  teamMembers: number
  objectTypes: number
  objects: number
  aiTokensInput: number
  aiTokensOutput: number
  aiAgents: number
  apiRequestsNonCached: number
  apiRequestsCached: number
  apiBandwidth: number
  mediaFiles: number
  mediaStorage: number
  mediaRequests: number
  mediaBandwidth: number
}

interface Plan {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  limits: PlanLimits
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    limits: {
      buckets: 1,
      teamMembers: 2,
      objectTypes: 50,
      objects: 1000,
      aiTokensInput: 300000,
      aiTokensOutput: 300000,
      aiAgents: 2,
      apiRequestsNonCached: 10000,
      apiRequestsCached: 100000,
      apiBandwidth: 50,
      mediaFiles: 200,
      mediaStorage: 5,
      mediaRequests: 25000,
      mediaBandwidth: 50,
    },
    features: ['1 Project', 'Community Support', '2 AI Agents (manual only)'],
  },
  {
    name: 'Starter',
    monthlyPrice: 299,
    yearlyPrice: 269,
    limits: {
      buckets: 3,
      teamMembers: 5,
      objectTypes: 300,
      objects: 20000,
      aiTokensInput: 1000000,
      aiTokensOutput: 1000000,
      aiAgents: 5,
      apiRequestsNonCached: 25000,
      apiRequestsCached: 750000,
      apiBandwidth: 500,
      mediaFiles: 5000,
      mediaStorage: 50,
      mediaRequests: 100000,
      mediaBandwidth: 250,
    },
    features: ['1 Project', 'Community + Chat Support', '5 AI Agents (with scheduling)'],
  },
  {
    name: 'Pro',
    monthlyPrice: 499,
    yearlyPrice: 449,
    limits: {
      buckets: 5,
      teamMembers: 10,
      objectTypes: 1000,
      objects: 50000,
      aiTokensInput: 3000000,
      aiTokensOutput: 3000000,
      aiAgents: 10,
      apiRequestsNonCached: 150000,
      apiRequestsCached: 3000000,
      apiBandwidth: 2000,
      mediaFiles: 10000,
      mediaStorage: 100,
      mediaRequests: 500000,
      mediaBandwidth: 1000,
    },
    features: ['1 Project', 'Community + Chat Support', '10 AI Agents (with scheduling)', 'Migration Assistance'],
  },
]

// Changed: Create a default plan constant to guarantee type safety
const defaultPlan: Plan = plans[1] as Plan // Starter plan as default

// Overage rates
const overageRates = {
  apiRequestsNonCached: 0.23 / 10000, // $0.23 per 10k
  apiRequestsCached: 0.023 / 10000, // $0.023 per 10k
  apiBandwidth: 0.36, // $0.36 per GB
  mediaCount: 3 / 1000, // $3 per 1,000
  mediaStorage: 0.07, // $0.07 per GB
  mediaRequests: 0.225 / 10000, // $0.225 per 10k
  mediaBandwidth: 0.30, // $0.30 per GB
}

// Add-on prices
const addOns = {
  webhooks: 99,
  localization: 99,
  revisionHistory: 99,
  automaticBackups: 99,
  bundle: 199, // Save 50%
  additionalUser: 29,
  additionalBucket: 29,
}

export default function CalculatorPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string>('Starter')
  
  // Usage estimates
  const [usage, setUsage] = useState({
    apiRequestsNonCached: 25000,
    apiRequestsCached: 100000,
    apiBandwidth: 100,
    mediaFiles: 1000,
    mediaStorage: 10,
    mediaRequests: 50000,
    mediaBandwidth: 50,
    additionalUsers: 0,
    additionalBuckets: 0,
  })
  
  // Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState({
    webhooks: false,
    localization: false,
    revisionHistory: false,
    automaticBackups: false,
    useBundle: false,
  })

  // Changed: Use defaultPlan as fallback to ensure currentPlan is never undefined
  const currentPlan: Plan = plans.find(p => p.name === selectedPlan) ?? defaultPlan

  // Calculate costs
  const costs = useMemo(() => {
    // Changed: plan is now guaranteed to be defined since currentPlan is typed as Plan
    const plan = currentPlan
    const basePrice = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice

    // Calculate overages
    let overageCost = 0
    
    if (usage.apiRequestsNonCached > plan.limits.apiRequestsNonCached) {
      overageCost += (usage.apiRequestsNonCached - plan.limits.apiRequestsNonCached) * overageRates.apiRequestsNonCached
    }
    if (usage.apiRequestsCached > plan.limits.apiRequestsCached) {
      overageCost += (usage.apiRequestsCached - plan.limits.apiRequestsCached) * overageRates.apiRequestsCached
    }
    if (usage.apiBandwidth > plan.limits.apiBandwidth) {
      overageCost += (usage.apiBandwidth - plan.limits.apiBandwidth) * overageRates.apiBandwidth
    }
    if (usage.mediaFiles > plan.limits.mediaFiles) {
      overageCost += (usage.mediaFiles - plan.limits.mediaFiles) * overageRates.mediaCount
    }
    if (usage.mediaStorage > plan.limits.mediaStorage) {
      overageCost += (usage.mediaStorage - plan.limits.mediaStorage) * overageRates.mediaStorage
    }
    if (usage.mediaRequests > plan.limits.mediaRequests) {
      overageCost += (usage.mediaRequests - plan.limits.mediaRequests) * overageRates.mediaRequests
    }
    if (usage.mediaBandwidth > plan.limits.mediaBandwidth) {
      overageCost += (usage.mediaBandwidth - plan.limits.mediaBandwidth) * overageRates.mediaBandwidth
    }

    // Calculate add-ons cost
    let addOnsCost = 0
    if (selectedAddOns.useBundle) {
      addOnsCost = addOns.bundle
    } else {
      if (selectedAddOns.webhooks) addOnsCost += addOns.webhooks
      if (selectedAddOns.localization) addOnsCost += addOns.localization
      if (selectedAddOns.revisionHistory) addOnsCost += addOns.revisionHistory
      if (selectedAddOns.automaticBackups) addOnsCost += addOns.automaticBackups
    }

    // Additional users and buckets
    const additionalCost = (usage.additionalUsers * addOns.additionalUser) + (usage.additionalBuckets * addOns.additionalBucket)

    const totalMonthly = basePrice + overageCost + addOnsCost + additionalCost

    return {
      basePrice,
      overageCost: Math.round(overageCost * 100) / 100,
      addOnsCost,
      additionalCost,
      totalMonthly: Math.round(totalMonthly * 100) / 100,
      yearlyTotal: Math.round(totalMonthly * 12 * 100) / 100,
    }
  }, [currentPlan, billingPeriod, usage, selectedAddOns])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cost Calculator
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Estimate your monthly Cosmic costs based on your usage needs
            </p>
            <Link
              href="https://www.cosmicjs.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-blue-200"
            >
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Period Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Billing Period</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    billingPeriod === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yearly (Save 10%)
                </button>
              </div>
            </div>

            {/* Plan Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Select Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPlan === plan.name
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">
                      ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      <span className="text-sm font-normal text-gray-500">/mo</span>
                    </div>
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      <li>• {plan.limits.buckets} Bucket{plan.limits.buckets > 1 ? 's' : ''}</li>
                      <li>• {plan.limits.teamMembers} Team members</li>
                      <li>• {formatNumber(plan.limits.objects)} Objects</li>
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Estimates */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Estimate Your Usage</h2>
              <p className="text-gray-600 mb-6">
                Adjust the sliders to match your expected monthly usage. Any usage above your plan limits will incur overage charges.
              </p>

              <div className="space-y-6">
                {/* API Requests (Non-cached) */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">API Requests (Non-cached)</label>
                    <span className="text-gray-600">
                      {formatNumber(usage.apiRequestsNonCached)} / {formatNumber(currentPlan.limits.apiRequestsNonCached)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={usage.apiRequestsNonCached}
                    onChange={(e) => setUsage({ ...usage, apiRequestsNonCached: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.apiRequestsNonCached > currentPlan.limits.apiRequestsNonCached && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{formatNumber(usage.apiRequestsNonCached - currentPlan.limits.apiRequestsNonCached)} overage
                    </p>
                  )}
                </div>

                {/* API Requests (Cached) */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">API Requests (Cached)</label>
                    <span className="text-gray-600">
                      {formatNumber(usage.apiRequestsCached)} / {formatNumber(currentPlan.limits.apiRequestsCached)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={usage.apiRequestsCached}
                    onChange={(e) => setUsage({ ...usage, apiRequestsCached: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.apiRequestsCached > currentPlan.limits.apiRequestsCached && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{formatNumber(usage.apiRequestsCached - currentPlan.limits.apiRequestsCached)} overage
                    </p>
                  )}
                </div>

                {/* API Bandwidth */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">API Bandwidth (GB)</label>
                    <span className="text-gray-600">
                      {usage.apiBandwidth} GB / {currentPlan.limits.apiBandwidth} GB
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="10"
                    value={usage.apiBandwidth}
                    onChange={(e) => setUsage({ ...usage, apiBandwidth: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.apiBandwidth > currentPlan.limits.apiBandwidth && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{usage.apiBandwidth - currentPlan.limits.apiBandwidth} GB overage
                    </p>
                  )}
                </div>

                {/* Media Files */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Media Files</label>
                    <span className="text-gray-600">
                      {formatNumber(usage.mediaFiles)} / {formatNumber(currentPlan.limits.mediaFiles)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="100"
                    value={usage.mediaFiles}
                    onChange={(e) => setUsage({ ...usage, mediaFiles: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.mediaFiles > currentPlan.limits.mediaFiles && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{formatNumber(usage.mediaFiles - currentPlan.limits.mediaFiles)} overage
                    </p>
                  )}
                </div>

                {/* Media Storage */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Media Storage (GB)</label>
                    <span className="text-gray-600">
                      {usage.mediaStorage} GB / {currentPlan.limits.mediaStorage} GB
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    value={usage.mediaStorage}
                    onChange={(e) => setUsage({ ...usage, mediaStorage: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.mediaStorage > currentPlan.limits.mediaStorage && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{usage.mediaStorage - currentPlan.limits.mediaStorage} GB overage
                    </p>
                  )}
                </div>

                {/* Media Requests */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Media Requests</label>
                    <span className="text-gray-600">
                      {formatNumber(usage.mediaRequests)} / {formatNumber(currentPlan.limits.mediaRequests)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={usage.mediaRequests}
                    onChange={(e) => setUsage({ ...usage, mediaRequests: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.mediaRequests > currentPlan.limits.mediaRequests && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{formatNumber(usage.mediaRequests - currentPlan.limits.mediaRequests)} overage
                    </p>
                  )}
                </div>

                {/* Media Bandwidth */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Media Bandwidth (GB)</label>
                    <span className="text-gray-600">
                      {usage.mediaBandwidth} GB / {currentPlan.limits.mediaBandwidth} GB
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={usage.mediaBandwidth}
                    onChange={(e) => setUsage({ ...usage, mediaBandwidth: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  {usage.mediaBandwidth > currentPlan.limits.mediaBandwidth && (
                    <p className="text-orange-600 text-sm mt-1">
                      +{usage.mediaBandwidth - currentPlan.limits.mediaBandwidth} GB overage
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium block mb-2">
                    Additional Team Members
                    <span className="text-gray-500 font-normal ml-2">${addOns.additionalUser}/user/mo</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={usage.additionalUsers}
                    onChange={(e) => setUsage({ ...usage, additionalUsers: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium block mb-2">
                    Additional Buckets
                    <span className="text-gray-500 font-normal ml-2">${addOns.additionalBucket}/bucket/mo</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={usage.additionalBuckets}
                    onChange={(e) => setUsage({ ...usage, additionalBuckets: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Feature Add-ons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Feature Add-ons</h2>
              <p className="text-gray-600 mb-4">All feature add-ons include a 14-day free trial.</p>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.useBundle}
                    onChange={(e) => setSelectedAddOns({ 
                      ...selectedAddOns, 
                      useBundle: e.target.checked,
                      webhooks: false,
                      localization: false,
                      revisionHistory: false,
                      automaticBackups: false,
                    })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div>
                    <span className="font-bold text-blue-900">Bundle - Save 50%</span>
                    <span className="text-blue-600 ml-2">${addOns.bundle}/mo</span>
                    <p className="text-sm text-blue-700">Includes: Webhooks, Localization, Revision History, Automatic Backups</p>
                  </div>
                </label>
              </div>

              {!selectedAddOns.useBundle && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.webhooks}
                      onChange={(e) => setSelectedAddOns({ ...selectedAddOns, webhooks: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <span className="font-medium">Webhooks</span>
                      <span className="text-gray-600 ml-2">${addOns.webhooks}/mo</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.localization}
                      onChange={(e) => setSelectedAddOns({ ...selectedAddOns, localization: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <span className="font-medium">Localization</span>
                      <span className="text-gray-600 ml-2">${addOns.localization}/mo</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.revisionHistory}
                      onChange={(e) => setSelectedAddOns({ ...selectedAddOns, revisionHistory: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <span className="font-medium">Revision History</span>
                      <span className="text-gray-600 ml-2">${addOns.revisionHistory}/mo</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.automaticBackups}
                      onChange={(e) => setSelectedAddOns({ ...selectedAddOns, automaticBackups: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <span className="font-medium">Automatic Backups</span>
                      <span className="text-gray-600 ml-2">${addOns.automaticBackups}/mo</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Cost Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Estimated Cost</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedPlan} Plan</span>
                  <span className="font-medium">${costs.basePrice}/mo</span>
                </div>
                
                {costs.overageCost > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Estimated Overages</span>
                    <span className="font-medium">${costs.overageCost}/mo</span>
                  </div>
                )}
                
                {costs.addOnsCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {selectedAddOns.useBundle ? 'Bundle Add-ons' : 'Feature Add-ons'}
                    </span>
                    <span className="font-medium">${costs.addOnsCost}/mo</span>
                  </div>
                )}
                
                {costs.additionalCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Resources</span>
                    <span className="font-medium">${costs.additionalCost}/mo</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Monthly Total</span>
                  <span className="text-blue-600">${costs.totalMonthly}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Yearly Total</span>
                  <span>${costs.yearlyTotal}</span>
                </div>
              </div>

              <a
                href={`https://app.cosmicjs.com/signup?plan=${selectedPlan.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started with {selectedPlan}
              </a>

              <p className="text-center text-sm text-gray-500 mt-4">
                Start free, upgrade anytime • No credit card required
              </p>

              {/* Plan Limits Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Plan Includes:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between">
                    <span>Buckets</span>
                    <span className="font-medium">{currentPlan.limits.buckets}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Team Members</span>
                    <span className="font-medium">{currentPlan.limits.teamMembers}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Objects</span>
                    <span className="font-medium">{formatNumber(currentPlan.limits.objects)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>AI Tokens/mo</span>
                    <span className="font-medium">{formatNumber(currentPlan.limits.aiTokensInput)} in / {formatNumber(currentPlan.limits.aiTokensOutput)} out</span>
                  </li>
                  <li className="flex justify-between">
                    <span>AI Agents</span>
                    <span className="font-medium">{currentPlan.limits.aiAgents}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Overage Rates Reference */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Overage Rates Reference</h2>
          <p className="text-gray-600 mb-4">
            Any applicable overages are charged at the end of each month. You can keep track of usage in Project Settings &gt; Usage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">API Requests (non-cached)</div>
              <div className="text-gray-600">$0.23 per 10k</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">API Requests (cached)</div>
              <div className="text-gray-600">$0.023 per 10k</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">API Bandwidth</div>
              <div className="text-gray-600">$0.36 per GB</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">Media Count</div>
              <div className="text-gray-600">$3 per 1,000</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">Media Storage</div>
              <div className="text-gray-600">$0.07 per GB</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">Media Requests</div>
              <div className="text-gray-600">$0.225 per 10k</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">Media Bandwidth</div>
              <div className="text-gray-600">$0.30 per GB</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Enterprise Solution?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Work with us to build your ideal solution with custom projects, buckets, team members, branded workspace, and custom usage limits.
          </p>
          <a
            href="https://www.cosmicjs.com/enterprise"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Enterprise Sales
          </a>
        </div>
      </div>
    </div>
  )
}