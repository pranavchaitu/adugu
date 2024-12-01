import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ModeToggle } from "./ui/mode-toggle";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = getUser()

	return (	
		<nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 dark:border-none bg-white/75 dark:bg-transparent backdrop-blur-lg transition-all">
				<MaxWidthWrapper>
					<div className="h-14 flex justify-between border-b border-zinc-200 dark:border-none items-center">
							<Link
								href='/'
								className="flex z-40 font-semibold md:text-xl"
							>
								<span>adugu.</span>		
							</Link>

							<div className="hidden sm:flex items-center space-x-4">
								{!user ? ( 
                <>
                  <Link
                    href='/pricing'
                    className={buttonVariants({
                      variant : 'ghost',
                      size : 'sm'
                    })}
                  >
                    <span>Pricing</span>		
                  </Link>
                  <LoginLink 
                    className={buttonVariants({
                      variant : 'ghost',
                      size : 'sm'
                    })}
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({
                      size : 'sm'
                    })}
                  >
                    Get started{" "}
                    <ArrowRight className="ml-0.5 h-5 w-5"/>		
                  </RegisterLink>
                </>
                ) : (
                 <>
                  <Link
                    href='/dashboard' 
                    className={buttonVariants({
                      variant : 'ghost',
                      size : 'sm'
                    })}
                  >
                    Dashboard
                  </Link>
                 </> 
                )} 
                <ModeToggle />
							</div>
					</div>
				</MaxWidthWrapper>
        </nav>
    )
}

export default Navbar;