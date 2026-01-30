import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Switch } from '../components/ui/Switch'
import { TextField } from '../components/ui/TextField'

type FormState = {
  login: string
  password: string
  remember: boolean
}

function isValidLogin(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return false
  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  const phoneLike = /^[+()\\d\\s-]{7,}$/.test(trimmed)
  return emailLike || phoneLike
}

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (!isValidLogin(state.login)) errors.login = 'Enter a valid email or phone number'
  if (!state.password.trim()) errors.password = 'Enter your password'
  return errors
}

function MobileChromeTop() {
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center justify-between text-[14px] font-semibold text-black">
        <div className="w-16">9:41</div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-4 rounded-[2px] border border-black/70">
            <div className="h-full w-3/4 bg-black/70" />
          </div>
          <div className="h-2 w-3.5 rounded-sm bg-black/70" />
          <div className="h-2 w-4 rounded-sm bg-black/70" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 flex-1 items-center justify-center rounded-full bg-[var(--color-black-50)] px-4 text-[14px] text-[var(--color-black-900)]">
          <span className="mr-2 inline-flex h-4 w-4 items-center justify-center text-[12px]">
            🔒
          </span>
          <span className="font-medium">uiunicorn.ru</span>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[18px] text-[var(--color-black-900)]"
          aria-label="Share"
        >
          ⤴︎
        </button>
      </div>
    </div>
  )
}

function MobileChromeBottom() {
  return (
    <div className="pointer-events-none">
      <div className="h-1 w-full bg-[var(--color-black-100)]" />
      <div className="flex items-center justify-between bg-white px-6 py-3 text-[18px] text-[var(--color-black-700)]">
        <span>‹</span>
        <span>›</span>
        <span>＋</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-black-100)] text-[12px]">
          1
        </span>
        <span>⋯</span>
      </div>
      <div className="bg-white pb-4">
        <div className="mx-auto h-1.5 w-32 rounded-full bg-black/80" />
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [state, setState] = useState<FormState>({
    login: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const canSubmit = useMemo(() => {
    const nextErrors = validate(state)
    return Object.keys(nextErrors).length === 0 && !isSubmitting
  }, [state, isSubmitting])

  const onBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }))
    const nextErrors = validate(state)
    setErrors((e) => ({ ...e, [field]: nextErrors[field] }))
  }

  const onSubmit = async () => {
    const nextErrors = validate(state)
    setErrors(nextErrors)
    setTouched({ login: true, password: true, remember: true })
    if (Object.keys(nextErrors).length > 0) return
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-black-100)] px-6 py-6">
      <main className="mx-auto w-full max-w-[375px] overflow-hidden rounded-[24px] bg-white lg:max-w-[1440px]">
        <div className="h-[812px] lg:h-[900px]">
          <div className="hidden h-full lg:grid lg:grid-cols-[minmax(0,1fr)_456px]">
            <section className="relative h-full overflow-hidden">
              <img
                src="./assets/images/hero-photo.png"
                alt="Coastal lighthouse view"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-6 text-[12px] leading-4 tracking-[-0.4px] text-white/90">
                Photo by{' '}
                <a
                  className="underline underline-offset-2"
                  href="https://unsplash.com/@irrabagon"
                  target="_blank"
                  rel="noreferrer"
                >
                  Alexandr Popadin
                </a>
              </div>
            </section>

            <section className="flex h-full flex-col justify-between px-12 py-12">
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <img
                    src="./assets/avatar-ui-unicorn.png"
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="text-[16px] font-bold tracking-tight text-[var(--color-black-900)]">
                    UI Unicorn
                  </div>
                </div>

                <div className="space-y-6">
                  <h1 className="text-[30px] font-bold leading-[36px] text-[var(--color-black-900)]">
                    Nice to see you again
                  </h1>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="text-[11px] leading-3 tracking-[0.3px] text-[var(--color-black-800)]">
                        Login
                      </div>
                      <TextField
                        id="login-desktop"
                        placeholder="Email or phone number"
                        value={state.login}
                        onChange={(e) => setState((s) => ({ ...s, login: e.target.value }))}
                        onBlur={() => onBlur('login')}
                        error={touched.login ? errors.login : undefined}
                        autoComplete="username"
                        inputMode="email"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="text-[11px] leading-3 tracking-[0.3px] text-[var(--color-black-800)]">
                        Password
                      </div>
                      <TextField
                        id="password-desktop"
                        placeholder="Enter password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={state.password}
                        onChange={(e) => setState((s) => ({ ...s, password: e.target.value }))}
                        onBlur={() => onBlur('password')}
                        error={touched.password ? errors.password : undefined}
                        autoComplete="current-password"
                        trailing={
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10"
                            onClick={() => setIsPasswordVisible((v) => !v)}
                            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                          >
                            <img src="./assets/icons/eye.svg" alt="" className="h-4 w-4" />
                          </button>
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Switch
                        id="remember-desktop"
                        checked={state.remember}
                        onChange={(e) => setState((s) => ({ ...s, remember: e.target.checked }))}
                        label="Remember me"
                      />
                      <a
                        href="#"
                        className="text-[12px] leading-5 tracking-[0.3px] text-[var(--color-system-blue)] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      isLoading={isSubmitting}
                      onClick={onSubmit}
                      disabled={!canSubmit}
                    >
                      Sign in
                    </Button>

                    <div className="h-px w-full bg-[var(--color-black-100)]" />

                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full font-[400]"
                      onClick={() => {}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <img src="./assets/icons/google.svg" alt="" className="h-5 w-5" />
                        <span className="text-[12px] font-[400] tracking-[0.3px]">
                          Or sign in with Google
                        </span>
                      </span>
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-[12px] leading-5 tracking-[0.3px]">
                      <span className="text-[var(--color-black-900)]">Dont have an account?</span>
                      <a
                        href="#"
                        className="text-[var(--color-system-blue)] hover:underline"
                      >
                        Sign up now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[12px] leading-4 tracking-[-0.4px] text-[var(--color-black-600)]">
                <div className="flex items-center gap-1">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/90">
                    <img
                      src="./assets/avatar-ui-unicorn.png"
                      alt=""
                      className="h-4 w-4 rounded-full"
                    />
                  </div>
                  <a
                    href="#"
                    className="text-[var(--color-system-blue)] hover:underline"
                  >
                    @uiunicorn
                  </a>
                </div>
                <div>© Perfect Login 2021</div>
              </div>
            </section>
          </div>

          <div className="flex h-full flex-col lg:hidden">
            <MobileChromeTop />
            <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-8">
              <div className="space-y-6">
                <h1 className="text-[28px] font-bold leading-[34px] text-[var(--color-black-900)]">
                  Nice to see you again
                </h1>

                <div className="space-y-4">
                  <TextField
                    id="login-mobile"
                    placeholder="Email or phone number"
                    value={state.login}
                    onChange={(e) => setState((s) => ({ ...s, login: e.target.value }))}
                    onBlur={() => onBlur('login')}
                    error={touched.login ? errors.login : undefined}
                    autoComplete="username"
                    inputMode="email"
                  />
                  <TextField
                    id="password-mobile"
                    placeholder="Enter password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={state.password}
                    onChange={(e) => setState((s) => ({ ...s, password: e.target.value }))}
                    onBlur={() => onBlur('password')}
                    error={touched.password ? errors.password : undefined}
                    autoComplete="current-password"
                    trailing={
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10"
                        onClick={() => setIsPasswordVisible((v) => !v)}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                      >
                        <img src="./assets/icons/eye.svg" alt="" className="h-4 w-4" />
                      </button>
                    }
                  />

                  <div className="flex items-center justify-between">
                    <Switch
                      id="remember-mobile"
                      checked={state.remember}
                      onChange={(e) =>
                        setState((s) => ({ ...s, remember: e.target.checked }))
                      }
                      label="Remember me"
                    />
                    <a
                      href="#"
                      className="text-[12px] leading-5 tracking-[0.3px] text-[var(--color-system-blue)]"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  isLoading={isSubmitting}
                  onClick={onSubmit}
                  disabled={!canSubmit}
                >
                  Sign in
                </Button>

                <Button type="button" variant="secondary" className="w-full font-[400]">
                  <span className="flex items-center justify-center gap-2">
                    <img src="./assets/icons/google.svg" alt="" className="h-5 w-5" />
                    <span className="text-[12px] font-[400] tracking-[0.3px]">
                      Or sign in with Google
                    </span>
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-2 text-[12px] leading-5 tracking-[0.3px]">
                  <span className="text-[var(--color-black-900)]">Dont have an account?</span>
                  <a href="#" className="text-[var(--color-system-blue)]">
                    Sign up now
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 pt-6">
                <div className="flex items-center gap-3">
                  <img
                    src="./assets/avatar-ui-unicorn.png"
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="text-[16px] font-bold text-[var(--color-black-900)]">
                    UI Unicorn
                  </div>
                </div>

                <div className="flex w-full items-center justify-between text-[12px] leading-4 tracking-[-0.4px] text-[var(--color-black-600)]">
                  <div className="flex items-center gap-1">
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/90">
                      <img
                        src="./assets/avatar-ui-unicorn.png"
                        alt=""
                        className="h-4 w-4 rounded-full"
                      />
                    </div>
                    <a
                      href="#"
                      className="text-[var(--color-system-blue)] hover:underline"
                    >
                      @uiunicorn
                    </a>
                  </div>
                  <div>© Perfect Login 2021</div>
                </div>
              </div>
            </div>
            <MobileChromeBottom />
          </div>
        </div>
      </main>
    </div>
  )
}

