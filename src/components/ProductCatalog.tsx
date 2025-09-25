import React, { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  inStock: boolean
  imageUrl: string
  rating: number
}

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [cart, setCart] = useState<Product[]>([])

  // Code smell: useEffect with complex logic and no error handling
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)

      // Code smell: Hardcoded delay
      setTimeout(() => {
        // Code smell: Large mock data in component
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Laptop Gaming Pro',
            price: 1299.99,
            category: 'Electronics',
            description: 'High-performance gaming laptop with RGB keyboard',
            inStock: true,
            imageUrl: 'https://via.placeholder.com/200x150/667eea/white?text=Laptop',
            rating: 4.5
          },
          {
            id: 2,
            name: 'Wireless Headphones',
            price: 199.99,
            category: 'Electronics',
            description: 'Noise-canceling wireless headphones',
            inStock: true,
            imageUrl: 'https://via.placeholder.com/200x150/f093fb/white?text=Headphones',
            rating: 4.2
          },
          {
            id: 3,
            name: 'Coffee Maker Deluxe',
            price: 89.99,
            category: 'Home',
            description: 'Automatic coffee maker with timer',
            inStock: false,
            imageUrl: 'https://via.placeholder.com/200x150/4ecdc4/white?text=Coffee',
            rating: 4.0
          },
          {
            id: 4,
            name: 'Running Shoes',
            price: 129.99,
            category: 'Sports',
            description: 'Comfortable running shoes for all terrains',
            inStock: true,
            imageUrl: 'https://via.placeholder.com/200x150/ff6b6b/white?text=Shoes',
            rating: 4.8
          },
          {
            id: 5,
            name: 'Smart Watch',
            price: 299.99,
            category: 'Electronics',
            description: 'Fitness tracking smart watch',
            inStock: true,
            imageUrl: 'https://via.placeholder.com/200x150/95e1d3/white?text=Watch',
            rating: 4.1
          },
          {
            id: 6,
            name: 'Yoga Mat',
            price: 29.99,
            category: 'Sports',
            description: 'Non-slip yoga mat for all exercises',
            inStock: true,
            imageUrl: 'https://via.placeholder.com/200x150/a8e6cf/white?text=Yoga',
            rating: 4.3
          }
        ]

        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
        setLoading(false)
      }, 2000)
    }

    loadProducts()
  }, [])

  // Code smell: useEffect with too many dependencies
  useEffect(() => {
    let result = [...products]

    // Code smell: Nested filtering logic
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory)
    }

    // Code smell: Complex sorting logic
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [products, searchTerm, selectedCategory, sortBy])

  // Code smell: Function with side effects in event handler
  const addToCart = (product: Product) => {
    const existingProduct = cart.find(item => item.id === product.id)

    if (existingProduct) {
      // Code smell: Alert in production code
      alert('Product already in cart!')
      return
    }

    setCart([...cart, product])

    // Code smell: Console.log in production
    console.log('Added to cart:', product.name)
    console.log('Cart now has:', cart.length + 1, 'items')
  }

  // Code smell: Complex render function for product card
  const renderProductCard = (product: Product) => {
    const cardStyle = {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '15px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '280px',
      display: 'inline-block',
      verticalAlign: 'top'
    }

    const imageStyle = {
      width: '100%',
      height: '150px',
      objectFit: 'cover' as const,
      borderRadius: '4px',
      marginBottom: '10px'
    }

    const priceStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
      color: product.inStock ? '#2d3748' : '#999',
      marginBottom: '10px'
    }

    const stockStyle = {
      color: product.inStock ? '#38a169' : '#e53e3e',
      fontWeight: 'bold',
      fontSize: '14px'
    }

    // Code smell: Inline star rating generation
    const renderStars = (rating: number) => {
      const stars = []
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 !== 0

      for (let i = 0; i < fullStars; i++) {
        stars.push('⭐')
      }

      if (hasHalfStar) {
        stars.push('⭐')
      }

      return stars.join('')
    }

    return (
      <div key={product.id} style={cardStyle}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={imageStyle}
          onError={(e) => {
            // Code smell: Inline error handling
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/200x150/cccccc/666666?text=No+Image'
          }}
        />

        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', minHeight: '44px' }}>
          {product.name}
        </h3>

        <p style={{ color: '#666', fontSize: '14px', margin: '10px 0', minHeight: '40px' }}>
          {product.description}
        </p>

        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {renderStars(product.rating)} ({product.rating})
          </span>
        </div>

        <div style={priceStyle}>
          €{product.price.toFixed(2)}
        </div>

        <div style={stockStyle}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '15px',
            backgroundColor: product.inStock ? '#667eea' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: product.inStock ? 'pointer' : 'not-allowed'
          }}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    )
  }

  // Code smell: Multiple return statements
  if (loading) {
    return (
      <div className="card">
        <h2>Product Catalog</h2>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading products...
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Product Catalog</h2>

      {/* Code smell: Complex header with inline styles */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ marginRight: '10px' }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
            style={{ marginRight: '10px' }}
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <div style={{ backgroundColor: '#667eea', color: 'white', padding: '10px', borderRadius: '4px' }}>
          Cart: {cart.length} items
        </div>
      </div>

      <div style={{ marginBottom: '20px', color: '#666' }}>
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No products found matching your criteria
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          {filteredProducts.map(product => renderProductCard(product))}
        </div>
      )}

      {/* Code smell: Cart summary with hardcoded styling */}
      {cart.length > 0 && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3>Shopping Cart Summary</h3>
          <div>
            <strong>Items: </strong>{cart.length}
          </div>
          <div>
            <strong>Total: </strong>€{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
          <button
            onClick={() => setCart([])}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}