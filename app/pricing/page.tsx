'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Plan {
  name: string
  monthlyPrice: number | string
  yearlyPrice: number | string
  description: string
  buckets: number | string
  teamMembers: number | string
  objects: string
  objectTypes: string
  aiTokens: string
  aiAgents: string
  apiNonCached: string
  apiCached: string
  apiBandwidth: string
  mediaFiles: string
  mediaStorage: string
  mediaRequests: string
  mediaBandwidth: string
  webhooks: string
  localization: string
  revisionHistory: string
  automaticBackups: string
  addOnBundle: string
  comments: string
  support: string
  migration: boolean
  brandedWorkspace: boolean
  sso: boolean
  sla: string
  popular?: boolean
  cta: string
  ctaLink: string
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for trying out Cosmic.',
    buckets: 1,
    teamMembers: 2,
    objects: '1,000',
    objectTypes: '50',
    aiTokens: '300K input / 300K output',
    aiAgents: '3 (manual only)',
    apiNonCached: '10K',
    apiCached: '100K',
    apiBandwidth: '1 GB',
    mediaFiles: '1,000',
    mediaStorage: '1 GB',
    mediaRequests: '1M',
    mediaBandwidth: '1 GB',
    webhooks: 'Add-on $99/mo',
    localization: 'Add-on $99/mo',
    revisionHistory: 'Add-on $99/mo',
    automaticBackups: 'Add-on $99/mo',
    addOnBundle: '$199/mo (Save 50%)',
    comments: '✓',
    support: 'Community',
    migration: false,
    brandedWorkspace: false,
    sso: false,
    sla: '—',
    cta: 'Choose Free',
    ctaLink: 'https://app.cosmicjs.com/signup',
  },
  {
    name: 'Builder',
    monthlyPrice: 49,
    yearlyPrice: 44,
    description: 'For indie devs and small projects.',
    buckets: 2,
    teamMembers: 3,
    objects: '5,000',
    objectTypes: '100',
    aiTokens: '500K input / 500K output',
    aiAgents: '5 (with scheduling)',
    apiNonCached: '15K',
    apiCached: '150K',
    apiBandwidth: '10 GB',
    mediaFiles: '5K',
    mediaStorage: '2 GB',
    mediaRequests: '2M',
    mediaBandwidth: '10 GB',
    webhooks: 'Add-on $99/mo',
    localization: 'Add-on $99/mo',
    revisionHistory: 'Add-on $99/mo',
    automaticBackups: 'Add-on $99/mo',
    addOnBundle: '$199/mo (Save 50%)',
    comments: '✓',
    support: 'Community',
    migration: false,
    brandedWorkspace: false,
    sso: false,
    sla: '—',
    cta: 'Choose Builder',
    ctaLink: 'https://app.cosmicjs.com/signup?plan=builder',
  },
  {
    name: 'Team',
    monthlyPrice: 299,
    yearlyPrice: 269,
    description: 'For teams collaborating on content.',
    buckets: 3,
    teamMembers: 5,
    objects: '20,000',
    objectTypes: '300',
    aiTokens: '1M input / 1M output',
    aiAgents: '15 (with scheduling)',
    apiNonCached: '25K',
    apiCached: '250K',
    apiBandwidth: '100 GB',
    mediaFiles: '20K',
    mediaStorage: '3 GB',
    mediaRequests: '3M',
    mediaBandwidth: '100 GB',
    webhooks: 'Add-on $99/mo',
    localization: 'Add-on $99/mo',
    revisionHistory: 'Add-on $99/mo',
    automaticBackups: 'Add-on $99/mo',
    addOnBundle: '$199/mo (Save 50%)',
    comments: '✓',
    support: 'Community + Chat',
    migration: false,
    brandedWorkspace: false,
    sso: false,
    sla: '—',
    popular: true,
    cta: 'Choose Team',
    ctaLink: 'https://app.cosmicjs.com/signup?plan=team',
  },
  {
    name: 'Business',
    monthlyPrice: 499,
    yearlyPrice: 449,
    description: 'For companies running on Cosmic.',
    buckets: 5,
    teamMembers: 10,
    objects: '50,000',
    objectTypes: '1,000',
    aiTokens: '3M input / 3M output',
    aiAgents: '25 (with scheduling)',
    apiNonCached: '150K',
    apiCached: '1M',
    apiBandwidth: '250 GB',
    mediaFiles: '50K',
    mediaStorage: '10 GB',
    mediaRequests: '10M',
    mediaBandwidth: '500 GB',
    webhooks: 'Add-on $99/mo',
    localization: 'Add-on $99/mo',
    revisionHistory: 'Add-on $99/mo',
    automaticBackups: 'Add-on $99/mo',
    addOnBundle: '$199/mo (Save 50%)',
    comments: '✓',
    support: 'Community + Chat',
    migration: true,
    brandedWorkspace: false,
    sso: false,
    sla: '—',
    cta: 'Choose Business',
    ctaLink: 'https://app.cosmicjs.com/signup?plan=business',
  },
]

const enterprisePlan = {
  name: 'Enterprise',
  description: 'Work with us to build your ideal solution.',
  features: [
    'Custom Projects',
    'Custom Buckets',
    'Custom team members',
    'Branded workspace',
    'Custom usage limits',
    'Optional Features',
    '24/7 support',
    'Single sign on',
    'Enterprise SLA',
  ],
}

const addOns = [
  { name: 'Bundle (Save 50%)', price: '$199/mo', description: 'Webhooks, Localization, Revision History, Automatic Backups', highlight: true },
  { name: 'Webhooks', price: '$99/mo', description: 'Real-time event notifications' },
  { name: 'Revision History', price: '$99/mo', description: 'Track content changes over time' },
  { name: 'Localization', price: '$99/mo', description: 'Multi-language content support' },
  { name: 'Automatic Backups', price: '$99/mo', description: 'Scheduled content backups' },
]

const usageAddOns = [
  { name: 'Additional Users', price: '$29 per user/month' },
  { name: 'Additional Buckets', price: '$29 per bucket/month' },
]

const tokenPacks = [
  { tokens: '2M', price: '$25', perMillion: '$12.50' },
  { tokens: '10M', price: '$110', perMillion: '$11', popular: true },
  { tokens: '50M', price: '$475', perMillion: '$9.50' },
]

const tokenMultipliers = [
  { tier: '1x Budget', models: 'GPT-5 Nano, Haiku' },
  { tier: '2x Standard', models: 'GPT-5 Mini, Sonnet' },
  { tier: '4x Premium', models: 'GPT-5, Opus' },
  { tier: '8x Reasoning', models: 'o3, o4-mini' },
]

const overageRates = [
  { resource: 'API requests (non-cached)', rate: '$0.23 per 10K' },
  { resource: 'API requests (cached)', rate: '$0.023 per 10K' },
  { resource: 'API request bandwidth', rate: '$0.36 per GB' },
  { resource: 'Media count', rate: '$3 per 1,000' },
  { resource: 'Media storage', rate: '$0.069 per GB' },
  { resource: 'Media requests', rate: '$0.225 per 10K' },
  { resource: 'Media bandwidth', rate: '$0.30 per GB' },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get the right plan for your needs
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get started for free. Custom plans available.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2.5 rounded-md font-medium transition-all text-sm ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2.5 rounded-md font-medium transition-all text-sm ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Yearly billing (save 10%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg p-6 relative flex flex-col ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.buckets} Bucket{Number(plan.buckets) > 1 ? 's' : ''}
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.teamMembers} Team members
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.objects} Objects
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.aiAgents} AI Agents
                </li>
              </ul>
              <a
                href={plan.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise Card */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-300 mb-4">{enterprisePlan.description}</p>
                <div className="flex flex-wrap gap-2">
                  {enterprisePlan.features.map((feature) => (
                    <span key={feature} className="bg-white/10 text-sm px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://www.cosmicjs.com/enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Add-ons */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Feature Add-ons</h2>
          <p className="text-gray-600 text-center mb-8">All feature add-ons include a 14-day free trial.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.name}
                className={`p-5 rounded-xl border-2 ${
                  addOn.highlight
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {addOn.highlight && (
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                    Save 50%
                  </span>
                )}
                <h3 className="font-bold text-lg">{addOn.name}</h3>
                <p className="text-blue-600 font-semibold">{addOn.price}</p>
                <p className="text-sm text-gray-600 mt-1">{addOn.description}</p>
              </div>
            ))}
          </div>

          {/* Usage Add-ons */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Usage Add-ons</h3>
            <p className="text-gray-600 mb-4">Expand your project capabilities with additional resources.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usageAddOns.map((addOn) => (
                <div key={addOn.name} className="bg-white p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold">{addOn.name}</h4>
                  <p className="text-blue-600 font-semibold">{addOn.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">AI Agents</h2>
            <p className="text-gray-600 text-center mb-8">
              Autonomous AI assistants that can work on tasks independently.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="font-bold text-lg mb-2">Code Agents</h3>
                <p className="text-gray-600 text-sm mb-3">Connect to GitHub repositories to build features, fix bugs, and deploy code changes.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Work on isolated Git branches</li>
                  <li>✓ Create pull requests automatically</li>
                  <li>✓ Deploy to production or preview</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold text-lg mb-2">Content Agents</h3>
                <p className="text-gray-600 text-sm mb-3">Generate and manage CMS content automatically.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Create and update content objects</li>
                  <li>✓ Bulk operations and migrations</li>
                  <li>✓ Progressive web content discovery</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-3">🖥️</div>
                <h3 className="font-bold text-lg mb-2">Computer Use</h3>
                <p className="text-gray-600 text-sm mb-3">Automate browser tasks with visual AI.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Record demo videos automatically</li>
                  <li>✓ Cross-post media between platforms</li>
                  <li>✓ Extract data with visual AI</li>
                </ul>
              </div>
            </div>

            {/* Agent Limits */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Agent Limits by Plan</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="font-bold">Free</div>
                  <div className="text-sm text-gray-600">3 agents</div>
                  <div className="text-xs text-gray-500">(manual only)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Builder</div>
                  <div className="text-sm text-gray-600">5 agents</div>
                  <div className="text-xs text-gray-500">(with scheduling)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Team</div>
                  <div className="text-sm text-gray-600">15 agents</div>
                  <div className="text-xs text-gray-500">(with scheduling)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Business</div>
                  <div className="text-sm text-gray-600">25 agents</div>
                  <div className="text-xs text-gray-500">(with scheduling)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Enterprise</div>
                  <div className="text-sm text-gray-600">Custom</div>
                  <div className="text-xs text-gray-500">limits</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Scheduled agents (hourly, daily, weekly, monthly) are available on paid plans. Free plan agents can only be executed manually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Packs */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Token Packs</h2>
          <p className="text-gray-600 text-center mb-8">
            Universal tokens that work with all AI models. Use them for content generation, image generation, AI Agents, and more.
          </p>

          {/* Token Multipliers */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-3">How Token Multipliers Work</h3>
            <p className="text-sm text-gray-600 mb-4">
              Different AI models consume tokens at different rates based on their tier. Your plan includes a base token allowance; higher-tier models use more tokens per request.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tokenMultipliers.map((tm) => (
                <div key={tm.tier} className="bg-white p-3 rounded-lg text-center">
                  <div className="font-bold text-blue-600">{tm.tier}</div>
                  <div className="text-xs text-gray-500">{tm.models}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tokenPacks.map((pack) => (
              <div
                key={pack.tokens}
                className={`p-6 rounded-xl border-2 text-center ${
                  pack.popular
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white'
                } relative`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <h3 className="font-bold text-xl mb-1">{pack.tokens} Token Pack</h3>
                <p className="text-xs text-gray-500 mb-3">Works with any AI model for both input and output tokens</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">{pack.price}</div>
                <div className="text-sm text-gray-500">{pack.perMillion} per million tokens</div>
                <a
                  href="https://app.cosmicjs.com/account/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2.5 rounded-lg font-medium transition-colors"
                >
                  Purchase
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Plans Table */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-3 font-semibold text-gray-900 min-w-[180px]">Feature</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className={`text-center py-4 px-3 font-semibold min-w-[120px] ${plan.popular ? 'text-blue-600' : 'text-gray-900'}`}>
                        {plan.name}
                        {plan.popular && <span className="block text-xs font-normal text-blue-500">Most popular</span>}
                      </th>
                    ))}
                    <th className="text-center py-4 px-3 font-semibold text-gray-900 min-w-[120px]">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>Pricing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Monthly price</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center font-medium">${plan.monthlyPrice}/mo</td>
                    ))}
                    <td className="py-3 px-3 text-center font-medium">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>Resources</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Projects</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">1</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Buckets</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.buckets}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Team members</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.teamMembers}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Object types</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.objectTypes}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Objects</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.objects}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>AI</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">AI tokens per month</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.aiTokens}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">AI Agents per project</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.aiAgents}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>API</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">API requests (non-cached) /mo</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.apiNonCached}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">API requests (cached) /mo</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.apiCached}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">API bandwidth /mo</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.apiBandwidth}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>Media</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Media files</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.mediaFiles}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Media storage</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.mediaStorage}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Media requests /mo</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.mediaRequests}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Media bandwidth /mo</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.mediaBandwidth}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>Features</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Webhooks</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.webhooks}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Localization</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.localization}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Revision History</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.revisionHistory}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Automatic Backups</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.automaticBackups}</td>
                    ))}
                    <td className="py-3 px-3 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Comments</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.comments}</td>
                    ))}
                    <td className="py-3 px-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900" colSpan={6}>Support &amp; Compliance</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Support</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center text-xs">{plan.support}</td>
                    ))}
                    <td className="py-3 px-3 text-center text-xs">24/7 Support</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Migration assistance</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.migration ? '✓' : '—'}</td>
                    ))}
                    <td className="py-3 px-3 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Branded workspace</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.brandedWorkspace ? '✓' : '—'}</td>
                    ))}
                    <td className="py-3 px-3 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">Single sign-on</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.sso ? '✓' : '—'}</td>
                    ))}
                    <td className="py-3 px-3 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-gray-600">SLA</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-3 px-3 text-center">{plan.sla}</td>
                    ))}
                    <td className="py-3 px-3 text-center text-xs">99.95% / Custom</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Overage Rates */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Overage Rates</h2>
          <p className="text-gray-600 text-center mb-8">
            Any applicable overages are charged at the end of each month. You can keep track of usage in Project Settings &gt; Usage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {overageRates.map((rate) => (
              <div key={rate.resource} className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="font-medium text-gray-900">{rate.resource}</div>
                <div className="text-blue-600 font-semibold">{rate.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl italic mb-6">
                &ldquo;After discovering Cosmic, our developer was able to get our new blog up and running within days. Cosmic worked exactly how we hoped it would.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src="https://imgix.cosmicjs.com/e9ddbff0-c1c7-11ed-a7cf-214a7cc687a9-john.jpeg?w=100&h=100&fit=crop&auto=compression,format"
                  alt="John Contreras"
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold">John Contreras</div>
                  <div className="text-gray-400 text-sm">CEO at MoveSpring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start building for free today
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Start free, upgrade anytime • No credit card required
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Start Building Free
            </a>
            <a
              href="https://www.cosmicjs.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </a>
          </div>
          <div className="mt-8">
            <Link
              href="/calculator"
              className="text-white underline hover:text-blue-100 font-medium"
            >
              Use the Pricing Calculator to estimate your costs →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}