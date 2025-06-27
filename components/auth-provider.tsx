  "use client"

  import type React from "react"

  import { createContext, useContext, useState, useEffect } from "react"
  import { useRouter } from "next/navigation"
  import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
  import { auth } from "@/lib/firebase"
  import { signIn, signUp, signOut } from "@/lib/firebase-service"
  import { useToast } from "@/components/ui/use-toast"

  type User = {
    uid: string
    email: string | null
    displayName: string | null
  }

  type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    signup: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    isLoading: boolean
  }

  const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    signup: async () => false,
    logout: async () => {},
    isLoading: true,
  })

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        } else {
          setUser(null)
        }
        setIsLoading(false)
      })

      return () => unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
      try {
        const { user, error } = await signIn(email, password)
        
        if (error) {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          })
          return false
        }

        toast({
          title: "Login successful",
          description: `Welcome back${user && user.displayName ? ", " + user.displayName : ""}!`,
        })
        return true
      } catch (error) {
        toast({
          title: "Login failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
        return false
      }
    }

    const signup = async (name: string, email: string, password: string) => {
      try {
        const { user, error } = await signUp(email, password, name)

        if (error) {
          toast({
            title: "Signup failed",
            description: "This email might already be in use",
            variant: "destructive",
          })
          return false
        }

        toast({
          title: "Account created",
          description: "Welcome to Livwell!",
        })
        return true
      } catch (error) {
        toast({
          title: "Signup failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
        return false
      }
    }

    const logout = async () => {
      try {
        await signOut()
        router.push("/")
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        })
      } catch (error) {
        toast({
          title: "Logout failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      }
    }

    const value = {
      user,
      login,
      signup,
      logout,
      isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  export function useAuth() {
    return useContext(AuthContext)
  }
