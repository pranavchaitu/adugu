// 'use client'
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // the method which can be used for alternative solve for theme hydration issue
  // const [mounted, setMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <>{children}</>; // Render children without ThemeProvider during SSR
  // }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
