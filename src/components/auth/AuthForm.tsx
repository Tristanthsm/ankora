import * as React from "react"
import { cn } from "@/lib/utils"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { Eye, EyeOff, KeyRound, Mail, Sparkles } from "lucide-react"

// Simple SVG components for brand icons
const GoogleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="https://svgl.app/library/google.svg" alt="Google" {...props} />
)

const MicrosoftIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="https://svgl.app/library/microsoft.svg" alt="Microsoft" {...props} />
)

const AppleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src="https://svgl.app/library/apple.svg" alt="Apple" {...props} />
)

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: 'login' | 'register'
    onEmailSubmit?: (data: { email: string; password?: string }) => void
    onSocialSignIn?: (provider: 'google' | 'microsoft' | 'apple' | 'sso') => void
    onEmailLink?: () => void
    isLoading?: boolean
    error?: string
}

const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(
    ({ className, mode = 'login', onEmailSubmit, onSocialSignIn, onEmailLink, isLoading, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const email = formData.get("email") as string
            const password = formData.get("password") as string
            onEmailSubmit?.({ email, password })
        }

        const isLogin = mode === 'login'

        return (
            <div ref={ref} className={cn("w-full max-w-md mx-auto bg-white rounded-xl border border-gray-200 shadow-sm", className)} {...props}>
                <div className="p-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {isLogin ? "Se connecter avec l'email" : "Créer un compte"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {isLogin
                            ? "Accédez à votre compte pour continuer votre aventure."
                            : "Entrez votre adresse e-mail pour créer votre compte."}
                    </p>
                </div>

                <div className="p-6 pt-0 space-y-4">
                    {/* Social Sign-in */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">
                            {isLogin ? "Se connecter avec" : "S'inscrire avec"}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            <Button variant="outline" onClick={() => onSocialSignIn?.('google')} className="w-full p-0">
                                <GoogleIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" onClick={() => onSocialSignIn?.('microsoft')} className="w-full p-0">
                                <MicrosoftIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" onClick={() => onSocialSignIn?.('apple')} className="w-full p-0">
                                <AppleIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" onClick={() => onSocialSignIn?.('sso')} className="w-full p-0">
                                <KeyRound className="h-5 w-5 text-gray-700" />
                                <span className="sr-only">SSO</span>
                            </Button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">ou</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Form */}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Adresse e-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nom@exemple.com"
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mot de passe</label>
                                {isLogin && (
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                        Mot de passe oublié ?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="pl-9 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 hover:text-gray-900 focus:outline-none z-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            {isLogin ? "Se connecter" : "Créer un compte"}
                        </Button>
                    </form>
                </div>

                <div className="p-6 pt-0 flex flex-col items-start space-y-4">
                    <Button variant="ghost" className="w-full text-gray-500 justify-start" onClick={() => onEmailLink?.()}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Ou envoyez-moi un lien par e-mail
                    </Button>
                    <p className="text-xs text-gray-500 text-center w-full">
                        En continuant, vous acceptez nos{' '}
                        <a href="#" className="underline hover:text-blue-600">
                            Conditions d'utilisation
                        </a>{' '}
                        et notre{' '}
                        <a href="#" className="underline hover:text-blue-600">
                            Politique de confidentialité
                        </a>
                        .
                    </p>
                    <div className="text-center w-full text-sm">
                        {isLogin ? (
                            <>
                                Vous n'avez pas de compte ?{' '}
                                <a href="/register" className="font-medium text-blue-600 hover:underline">
                                    Inscrivez-vous
                                </a>
                            </>
                        ) : (
                            <>
                                Vous avez déjà un compte ?{' '}
                                <a href="/login" className="font-medium text-blue-600 hover:underline">
                                    Connectez-vous
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
)
AuthForm.displayName = "AuthForm"

export { AuthForm }
