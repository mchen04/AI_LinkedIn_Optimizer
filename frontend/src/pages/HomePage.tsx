import React, { useState, useEffect } from 'react';
import { 
  LinkedinIcon, 
  Upload, 
  Sparkles, 
  TrendingUp,
  CheckCircle2,
  Menu,
  X,
  Shield,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { AuthButton } from '../components/AuthButton';
import { TryItFreeButton } from '../components/TryItFreeButton';

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Intersection Observer setup for reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 transition-all duration-300">
        <div className="container-width">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-fade-in-up">
              <LinkedinIcon className="icon-lg text-primary-600 animate-bounce-in" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
                ProfileOptimizer
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Home</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Testimonials</a>
              <div className="nav-auth-section">
                <AuthButton />
              </div>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="icon-md text-gray-600" />
              ) : (
                <Menu className="icon-md text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-slide-up">
            <div className="container-width space-y-4">
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Home</a>
              <a href="#how-it-works" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">How It Works</a>
              <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Features</a>
              <a href="#testimonials" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Testimonials</a>
              <div className="px-4 nav-auth-section">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="section-padding pt-12 md:pt-12">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 reveal">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm animate-pulse-slow">
                <Sparkles className="icon-xs" />
                <span>100% Free for a Limited Time</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight reveal reveal-delay-1">
                Unlock Job Opportunities with a Free LinkedIn Profile Optimization Tool
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed reveal reveal-delay-2">
                Get AI-powered suggestions and boost your LinkedIn profile visibility at no cost. Take advantage of this limited-time offer today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 reveal reveal-delay-3">
                <TryItFreeButton />
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="icon-sm text-primary-600 mr-2" />
                  Limited time offer
                </p>
              </div>
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-primary-50"
                      src={`https://source.unsplash.com/random/100x100?face&${i}`}
                      alt="User"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">1,000+</span>
                    <Users className="icon-sm text-primary-600 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Professionals optimized
                  </p>
                </div>
              </div>
            </div>
            <div className="relative reveal animate-float">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="LinkedIn Profile"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="icon-sm text-green-500" />
                    <span className="text-sm font-medium">Profile views +147%</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Award className="icon-sm text-primary-600" />
                    <span className="text-sm font-medium">Top 1% Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections... */}
      {/* Trust Badges */}
      <section className="section-padding py-12">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="icon-md" />, text: "Bank-Level Security" },
              { icon: <Users className="icon-md" />, text: "10k+ Active Users" },
              { icon: <Award className="icon-md" />, text: "Industry Leading" },
              { icon: <CheckCircle2 className="icon-md" />, text: "99% Success Rate" }
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="icon-container w-12 h-12 rounded-full bg-primary-50 text-primary-600 animate-pulse-slow">
                  {badge.icon}
                </div>
                <span className="text-sm font-medium text-gray-600">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to transform your LinkedIn profile and attract more opportunities, completely free.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Upload className="icon-lg text-primary-600" />,
                title: "Upload Your Profile",
                description: "Export your LinkedIn profile as PDF and upload it to our platform"
              },
              {
                icon: <Sparkles className="icon-lg text-primary-600" />,
                title: "Get AI Suggestions",
                description: "Receive personalized recommendations to improve your profile"
              },
              {
                icon: <TrendingUp className="icon-lg text-primary-600" />,
                title: "Boost Visibility",
                description: "Implement changes and watch your profile views increase"
              }
            ].map((step, i) => (
              <div key={i} className="card p-8 text-center fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="icon-container h-16 w-16 rounded-xl bg-primary-50 mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Premium Features, Now Free
            </h2>
            <p className="text-lg text-gray-600">
              Access all our powerful features at no cost during this limited-time offer.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Complete Profile Analysis",
              "AI-Powered Optimization",
              "Keyword Enhancement",
              "Industry-Specific Suggestions",
              "Progress Tracking",
              "Recruiter-Focused Content"
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 card fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <CheckCircle2 className="icon-md text-green-500" />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Access Banner */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 animate-pulse-slow opacity-50"></div>
        <div className="container-width relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started Today - 100% Free
            </h2>
            <p className="text-xl mb-8 opacity-90">
              For a limited time, access all premium features at no cost. Don't miss out on this opportunity to transform your LinkedIn profile.
            </p>
            <TryItFreeButton />
            <p className="mt-4 text-sm opacity-75">
              No credit card required • Premium features included • Limited time offer
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of professionals who have transformed their LinkedIn presence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                quote: "My profile views increased by 200% in just two weeks after implementing the AI suggestions."
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                quote: "The keyword optimization helped me land interviews with top tech companies."
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                quote: "Best investment I've made in my career. The AI suggestions were spot-on."
              }
            ].map((testimonial, i) => (
              <div key={i} className="card p-8 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full ring-4 ring-primary-50"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="section-padding">
          <div className="container-width">
            <div className="grid md:grid-cols-4 gap-12 reveal">
              <div>
                <div className="flex items-center">
                  <LinkedinIcon className="icon-lg text-primary-400" />
                  <span className="ml-2 text-xl font-bold">ProfileOptimizer</span>
                </div>
                <p className="mt-4 text-gray-400">
                  AI-powered LinkedIn profile optimization to help you land your dream job.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Get Started</h4>
                <TryItFreeButton />
                <p className="mt-4 text-sm text-gray-400">
                  Join thousands of professionals who trust ProfileOptimizer
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Currently free for all users. Premium features may be introduced in the future.
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 reveal">
              <p>&copy; 2025 ProfileOptimizer. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
