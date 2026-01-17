'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
              alt="Cosmic Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">Cosmic</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <Link href="/calculator" className="hover:text-blue-400 transition-colors">
              Pricing Calculator
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <a
              href="https://www.cosmicjs.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <Link
                href="/features"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/blog"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/calculator"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing Calculator
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="https://www.cosmicjs.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors py-2"
              >
                Docs
              </a>
              <a
                href="https://app.cosmicjs.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}