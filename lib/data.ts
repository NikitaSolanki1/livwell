export type User = {
  id: string
  name: string
  email: string
  password: string
  address?: string
  phone?: string
}

export type Fruit = {
  id: string
  name: string
  image: string
  color: string
}

export type Juice = {
  id: string
  name: string
  description: string
  category: string
  price: number
  image: string
  ingredients: string[]
  benefits: string[]
  featured?: boolean
  popular?: boolean
  new?: boolean
}

export type Dish = {
  id: string
  name: string
  description: string
  category: string
  price: number
  image: string
  ingredients: string[]
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  prepTime: number // in minutes
  cookTime: number // in minutes
  featured?: boolean
  popular?: boolean
  new?: boolean
  vegan?: boolean
  vegetarian?: boolean
  glutenFree?: boolean
  dairyFree?: boolean
}

export type CartItem = {
  id: string
  juiceId?: string
  dishId?: string
  quantity: number
  customIngredients?: string[]
  isCustom?: boolean
  customName?: string
  price: number
}

export type Order = {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "delivered"
  paymentMethod: "cod" | "upi"
  createdAt: Date
  address: string
  phone: string
}

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
]

// Mock fruits data
export const fruits: Fruit[] = [
  {
    id: "1",
    name: "Apple",
    image: "/images/fruits/apple.png",
    color: "#ff6b6b",
  },
  {
    id: "2",
    name: "Orange",
    image: "/images/fruits/orange.png",
    color: "#ffa502",
  },
  {
    id: "3",
    name: "Kiwi",
    image: "/images/fruits/kiwi.png",
    color: "#2ed573",
  },
  {
    id: "4",
    name: "Strawberry",
    image: "/images/fruits/strawberry.png",
    color: "#ff4757",
  },
  {
    id: "5",
    name: "Banana",
    image: "/images/fruits/banana.png",
    color: "#ffd43b",
  },
  {
    id: "6",
    name: "Blueberry",
    image: "/images/fruits/blueberry.png",
    color: "#5352ed",
  },
  {
    id: "7",
    name: "Pineapple",
    image: "/images/fruits/pineapple.png",
    color: "#feca57",
  },
  {
    id: "8",
    name: "Spinach",
    image: "/images/fruits/spinach.png",
    color: "#26de81",
  },
  {
    id: "9",
    name: "Ginger",
    image: "/images/fruits/ginger.png",
    color: "#f7b731",
  },
]

// Mock juices data
export const juices: Juice[] = [
  {
    id: "1",
    name: "Detox Green",
    description: "A refreshing blend to cleanse your body and boost your immune system.",
    category: "Detox",
    price: 69.99,
    image: "/images/juices/spinach.webp",
    ingredients: ["Spinach", "Apple", "Kiwi", "Ginger"],
    benefits: ["Detoxifies", "Boosts immunity", "Improves digestion"],
    featured: true,
  },
  {
    id: "2",
    name: "Immunity Booster",
    description: "Packed with vitamin C to strengthen your immune system.",
    category: "Immunity",
    price: 89.99,
    image: "/images/juices/immunity-booster.jpg",
    ingredients: ["Orange", "Pineapple", "Ginger"],
    benefits: ["Strengthens immunity", "Reduces inflammation", "Rich in antioxidants"],
    popular: true,
  },
  {
    id: "3",
    name: "Energy Blast",
    description: "Natural energy boost to kickstart your day.",
    category: "Energy",
    price: 79.49,
    image: "/images/juices/energy-blast.jpeg",
    ingredients: ["Banana", "Strawberry", "Orange"],
    benefits: ["Increases energy", "Improves focus", "Supports workout recovery"],
    new: true,
  },
  {
    id: "4",
    name: "Berry Bliss",
    description: "A delicious mix of berries packed with antioxidants.",
    category: "Antioxidant",
    price: 79.49,
    image: "/images/juices/berry-bliss.jpeg",
    ingredients: ["Strawberry", "Blueberry", "Apple"],
    benefits: ["Rich in antioxidants", "Supports heart health", "Improves skin health"],
    featured: true,
  },
  {
    id: "5",
    name: "Tropical Paradise",
    description: "A taste of the tropics in every sip.",
    category: "Refreshing",
    price: 79.99,
    image: "/images/juices/tropical-paradise.jpg",
    ingredients: ["Pineapple", "Orange", "Banana"],
    benefits: ["Hydrates", "Boosts mood", "Supports digestive health"],
    popular: true,
  },
  {
    id: "6",
    name: "Green Machine",
    description: "Nutrient-dense green juice for optimal health.",
    category: "Detox",
    price: 89.99,
    image: "/images/juices/green-machine.webp",
    ingredients: ["Spinach", "Kiwi", "Apple", "Ginger"],
    benefits: ["Cleanses", "Alkalizes", "Provides essential nutrients"],
    new: true,
  },
]

// Mock dishes data
export const dishes: Dish[] = [
  {
    id: "1",
    name: "Quinoa Vegetable Salad",
    description: "A refreshing quinoa salad with colorful vegetables, herbs, and a zesty lemon dressing.",
    category: "Salads",
    price: 99.99,
    image: "/images/dishes/quinoa-salad.jpg",
    ingredients: ["Quinoa", "Bell Peppers", "Cucumber", "Red Onion", "Parsley", "Lemon Juice", "Olive Oil"],
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 8,
    },
    prepTime: 15,
    cookTime: 20,
    featured: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
  },
  {
    id: "2",
    name: "Greek Yogurt Parfait",
    description: "Creamy Greek yogurt layered with fresh berries, honey, and crunchy granola.",
    category: "Breakfast",
    price: 169.99,
    image: "/images/dishes/yogurt-parfait.jpg",
    ingredients: ["Greek Yogurt", "Mixed Berries", "Granola", "Honey", "Mint"],
    nutritionalInfo: {
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 8,
      fiber: 5,
    },
    prepTime: 10,
    cookTime: 0,
    popular: true,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: "3",
    name: "Zucchini Pasta with Cherry Tomatoes",
    description: "Light and healthy zucchini noodles tossed with cherry tomatoes, garlic, and herbs.",
    category: "Mains",
    price: 119.99,
    image: "/images/dishes/zucchini-pasta.jpg",
    ingredients: ["Zucchini", "Cherry Tomatoes", "Garlic", "Olive Oil", "Basil", "Parmesan Cheese"],
    nutritionalInfo: {
      calories: 220,
      protein: 8,
      carbs: 18,
      fat: 12,
      fiber: 6,
    },
    prepTime: 15,
    cookTime: 10,
    new: true,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: "4",
    name: "Lemon Herb Salmon",
    description: "Perfectly baked salmon fillet with fresh herbs, lemon, and a side of green beans.",
    category: "Mains",
    price: 149.99,
    image: "/images/dishes/lemon-salmon.jpg",
    ingredients: ["Salmon Fillet", "Lemon", "Dill", "Parsley", "Olive Oil", "Green Beans", "Garlic"],
    nutritionalInfo: {
      calories: 380,
      protein: 32,
      carbs: 12,
      fat: 22,
      fiber: 4,
    },
    prepTime: 10,
    cookTime: 20,
    featured: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "5",
    name: "Roasted Vegetable & Chickpea Bowl",
    description: "A hearty bowl of roasted vegetables, chickpeas, and brussels sprouts with tahini sauce.",
    category: "Bowls",
    price: 129.99,
    image: "/images/dishes/roasted-veggie-bowl.jpg",
    ingredients: ["Sweet Potato", "Broccoli", "Brussels Sprouts", "Chickpeas", "Tahini", "Lemon", "Spices"],
    nutritionalInfo: {
      calories: 420,
      protein: 15,
      carbs: 60,
      fat: 16,
      fiber: 14,
    },
    prepTime: 15,
    cookTime: 30,
    popular: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "6",
    name: "Berry Smoothie Bowl",
    description: "Thick and creamy berry smoothie topped with banana, granola, and chia seeds.",
    category: "Breakfast",
    price: 189.99,
    image: "/images/dishes/berry-smoothie-bowl.jpg",
    ingredients: ["Mixed Berries", "Banana", "Almond Milk", "Granola", "Chia Seeds", "Coconut Flakes"],
    nutritionalInfo: {
      calories: 340,
      protein: 8,
      carbs: 65,
      fat: 10,
      fiber: 12,
    },
    prepTime: 10,
    cookTime: 0,
    new: true,
    vegetarian: true,
    vegan: true,
    dairyFree: true,
  },
  {
    id: "7",
    name: "Baked Vegetable Sticks",
    description: "Crispy baked vegetable sticks served with a variety of dipping sauces.",
    category: "Snacks",
    price: 179.99,
    image: "/images/dishes/veggie-sticks-dip.jpg",
    ingredients: ["Zucchini", "Sweet Potato", "Carrot", "Breadcrumbs", "Herbs", "Yogurt Dip", "BBQ Sauce"],
    nutritionalInfo: {
      calories: 260,
      protein: 6,
      carbs: 40,
      fat: 8,
      fiber: 6,
    },
    prepTime: 20,
    cookTime: 25,
    popular: true,
    vegetarian: true,
  },
  {
    id: "8",
    name: "Rainbow Buddha Bowl",
    description: "A colorful bowl packed with various vegetables, grains, and seeds for a nutritional powerhouse.",
    category: "Bowls",
    price: 139.99,
    image: "/images/dishes/rainbow-bowl.jpg",
    ingredients: [
      "Brown Rice",
      "Purple Cabbage",
      "Carrot",
      "Yellow Bell Pepper",
      "Cucumber",
      "Radish",
      "Sunflower Seeds",
    ],
    nutritionalInfo: {
      calories: 390,
      protein: 12,
      carbs: 58,
      fat: 14,
      fiber: 12,
    },
    prepTime: 20,
    cookTime: 30,
    featured: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "9",
    name: "Protein-Packed Buddha Bowl",
    description: "A satisfying bowl with quinoa, roasted vegetables, avocado, and plant-based protein.",
    category: "Bowls",
    price: 139.99,
    image: "/images/dishes/buddha-bowl.jpg",
    ingredients: ["Quinoa", "Roasted Chickpeas", "Sweet Potato", "Avocado", "Kale", "Tofu", "Tahini Dressing"],
    nutritionalInfo: {
      calories: 450,
      protein: 18,
      carbs: 55,
      fat: 20,
      fiber: 14,
    },
    prepTime: 15,
    cookTime: 25,
    new: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "10",
    name: "Turkey Avocado Sandwich",
    description: "Hearty sandwich with sliced turkey, fresh avocado, crisp lettuce, and tomato on multigrain bread.",
    category: "Sandwiches",
    price: 109.99,
    image: "/images/dishes/turkey-sandwich.jpg",
    ingredients: ["Turkey Breast", "Avocado", "Lettuce", "Tomato", "Red Onion", "Multigrain Bread", "Light Mayo"],
    nutritionalInfo: {
      calories: 420,
      protein: 28,
      carbs: 40,
      fat: 18,
      fiber: 8,
    },
    prepTime: 10,
    cookTime: 0,
    popular: true,
    dairyFree: true,
  },
  {
    id: "11",
    name: "Fresh Fruit Cups",
    description: "Refreshing cups of seasonal fresh fruits, perfect for a light snack or dessert.",
    category: "Snacks",
    price: 159.99,
    image: "/images/dishes/fresh-fruit-cups.jpg",
    ingredients: ["Pineapple", "Strawberry", "Kiwi", "Mango", "Watermelon"],
    nutritionalInfo: {
      calories: 120,
      protein: 2,
      carbs: 30,
      fat: 0,
      fiber: 5,
    },
    prepTime: 15,
    cookTime: 0,
    new: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "12",
    name: "Grilled Chicken Wrap",
    description: "Flavorful grilled chicken with fresh vegetables and light dressing in a whole wheat wrap.",
    category: "Sandwiches",
    price: 149.99,
    image: "/images/dishes/chicken-wrap.jpg",
    ingredients: ["Grilled Chicken", "Lettuce", "Tomato", "Cucumber", "Light Ranch", "Whole Wheat Wrap"],
    nutritionalInfo: {
      calories: 380,
      protein: 30,
      carbs: 35,
      fat: 14,
      fiber: 6,
    },
    prepTime: 10,
    cookTime: 15,
    popular: true,
    dairyFree: false,
  },
  {
    id: "13",
    name: "Blueberry Protein Smoothie",
    description: "Antioxidant-rich blueberry smoothie with protein powder, perfect for post-workout recovery.",
    category: "Drinks",
    price: 99.99,
    image: "/images/dishes/blueberry-smoothie.jpg",
    ingredients: ["Blueberries", "Banana", "Greek Yogurt", "Almond Milk", "Protein Powder", "Honey"],
    nutritionalInfo: {
      calories: 280,
      protein: 20,
      carbs: 40,
      fat: 5,
      fiber: 7,
    },
    prepTime: 5,
    cookTime: 0,
    featured: true,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: "14",
    name: "Tofu Vegetable Stir-Fry",
    description: "Protein-rich tofu stir-fried with colorful vegetables in a savory sauce.",
    category: "Mains",
    price: 129.99,
    image: "/images/dishes/tofu-stir-fry.jpg",
    ingredients: ["Tofu", "Broccoli", "Bell Peppers", "Green Beans", "Zucchini", "Sesame Seeds", "Stir-Fry Sauce"],
    nutritionalInfo: {
      calories: 320,
      protein: 18,
      carbs: 30,
      fat: 16,
      fiber: 8,
    },
    prepTime: 15,
    cookTime: 15,
    new: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
  },
  {
    id: "15",
    name: "Herb Roasted Chicken",
    description: "Juicy herb-roasted chicken with lemon, perfect for a protein-rich main dish.",
    category: "Mains",
    price: 199.99,
    image: "/images/dishes/lemon-chicken.jpg",
    ingredients: ["Chicken Breast", "Lemon", "Thyme", "Rosemary", "Garlic", "Olive Oil", "Black Pepper"],
    nutritionalInfo: {
      calories: 350,
      protein: 40,
      carbs: 5,
      fat: 18,
      fiber: 1,
    },
    prepTime: 15,
    cookTime: 30,
    featured: true,
    glutenFree: true,
    dairyFree: true,
  },
]

// In-memory storage for orders
export const orders: Order[] = []

// In-memory storage for cart items
export const cartItems: { [userId: string]: CartItem[] } = {}

// Helper functions
export function addToCart(userId: string, item: CartItem) {
  if (!cartItems[userId]) {
    cartItems[userId] = []
  }

  const existingItemIndex = cartItems[userId].findIndex(
    (cartItem) =>
      (item.juiceId && cartItem.juiceId === item.juiceId && !cartItem.isCustom) ||
      (item.dishId && cartItem.dishId === item.dishId),
  )

  if (existingItemIndex > -1 && !item.isCustom) {
    cartItems[userId][existingItemIndex].quantity += item.quantity
  } else {
    cartItems[userId].push(item)
  }

  return cartItems[userId]
}

export function removeFromCart(userId: string, itemId: string) {
  if (!cartItems[userId]) return []

  cartItems[userId] = cartItems[userId].filter((item) => item.id !== itemId)
  return cartItems[userId]
}

export function updateCartItemQuantity(userId: string, itemId: string, quantity: number) {
  if (!cartItems[userId]) return []

  const itemIndex = cartItems[userId].findIndex((item) => item.id === itemId)
  if (itemIndex > -1) {
    cartItems[userId][itemIndex].quantity = quantity
  }

  return cartItems[userId]
}

export function clearCart(userId: string) {
  cartItems[userId] = []
  return []
}

export function createOrder(order: Omit<Order, "id" | "createdAt">) {
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date(),
  }

  orders.push(newOrder)
  clearCart(order.userId)

  return newOrder
}

export function getOrdersByUserId(userId: string) {
  return orders.filter((order) => order.userId === userId)
}

// Authentication helpers
export function findUserByEmail(email: string) {
  return users.find((user) => user.email === email)
}

export function createUser(user: Omit<User, "id">) {
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
  }

  users.push(newUser)
  return newUser
}

export function updateUserProfile(userId: string, data: Partial<User>) {
  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex > -1) {
    users[userIndex] = { ...users[userIndex], ...data }
    return users[userIndex]
  }
  return null
}

// Dish helpers
export function getDishById(id: string) {
  return dishes.find((dish) => dish.id === id)
}

export function getDishesByCategory(category: string) {
  return dishes.filter((dish) => dish.category === category)
}

export function getFeaturedDishes() {
  return dishes.filter((dish) => dish.featured)
}

export function getPopularDishes() {
  return dishes.filter((dish) => dish.popular)
}

export function getNewDishes() {
  return dishes.filter((dish) => dish.new)
}

export function getVegetarianDishes() {
  return dishes.filter((dish) => dish.vegetarian)
}

export function getVeganDishes() {
  return dishes.filter((dish) => dish.vegan)
}

export function getGlutenFreeDishes() {
  return dishes.filter((dish) => dish.glutenFree)
}

export function getDairyFreeDishes() {
  return dishes.filter((dish) => dish.dairyFree)
}
