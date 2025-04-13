
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isFarmer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L4 6V18L12 22L20 18V6L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 6.5C11.4477 6.5 11 6.94772 11 7.5V8.5C11 9.05228 11.4477 9.5 12 9.5C12.5523 9.5 13 9.05228 13 8.5V7.5C13 6.94772 12.5523 6.5 12 6.5Z" 
                fill="currentColor"
              />
              <path 
                d="M7 10.5C6.44772 10.5 6 10.9477 6 11.5V12.5C6 13.0523 6.44772 13.5 7 13.5C7.55228 13.5 8 13.0523 8 12.5V11.5C8 10.9477 7.55228 10.5 7 10.5Z" 
                fill="currentColor"
              />
              <path 
                d="M17 10.5C16.4477 10.5 16 10.9477 16 11.5V12.5C16 13.0523 16.4477 13.5 17 13.5C17.5523 13.5 18 13.0523 18 12.5V11.5C18 10.9477 17.5523 10.5 17 10.5Z" 
                fill="currentColor"
              />
              <path 
                d="M12 14.5C11.4477 14.5 11 14.9477 11 15.5V16.5C11 17.0523 11.4477 17.5 12 17.5C12.5523 17.5 13 17.0523 13 16.5V15.5C13 14.9477 12.5523 14.5 12 14.5Z" 
                fill="currentColor"
              />
            </svg>
            <span className="ml-2 text-xl font-display font-bold text-primary">CropConnect</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link to="/resources" className="text-foreground hover:text-primary transition-colors">
            Resources
          </Link>
          <Link to="/community" className="text-foreground hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          {isAuthenticated && isFarmer() && (
            <Link to="/add-product" className="text-foreground hover:text-primary transition-colors">
              Add Product
            </Link>
          )}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Log in</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">
                {user?.name} ({user?.role === 'farmer' ? 'Farmer' : 'Retailer'})
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
              {isFarmer() && (
                <Link to="/add-product">
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 
            <X className="h-6 w-6 text-foreground" /> : 
            <Menu className="h-6 w-6 text-foreground" />
          }
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container mx-auto py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/marketplace" 
                className="px-4 py-2 hover:bg-primary-50 rounded-md text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                to="/resources" 
                className="px-4 py-2 hover:bg-primary-50 rounded-md text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/community" 
                className="px-4 py-2 hover:bg-primary-50 rounded-md text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 hover:bg-primary-50 rounded-md text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && isFarmer() && (
                <Link 
                  to="/add-product" 
                  className="px-4 py-2 hover:bg-primary-50 rounded-md text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
              )}
            </nav>
            <div className="flex flex-col space-y-3 pt-3 border-t border-border">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Log in</span>
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full flex justify-center items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Register</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium">Signed in as: {user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role === 'farmer' ? 'Farmer Account' : 'Retailer Account'}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex justify-center items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
