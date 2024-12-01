import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";

export default function Home() {
      
  return (
    <>
      {/* hero */}
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 border-none"
            >
            <p className="text-sm font-semibold text-gray-700 dark:text-violet-200">Adugu is now public!</p>
          </HoverBorderGradient>
        </div>
        <h1 className="max-w-4xl font-bold text-5xl sm:text-6xl md:text-7xl">
          Chat with your <span className="text-blue-600">documents</span> in seconds.
        </h1> 
        <p className="max-w-prose mt-5 px-4 text-zinc-700 dark:text-gray-500 sm:text-lg">
          Adugu allows you to have conversations with any PDF document. Simply upload your file and start asking questions right away.
        </p>
        <Link className={buttonVariants({
          size : 'lg',
          className : "mt-5"
        })} href={'/dashboard'} target="_blank">
          Get started <ArrowRight/>
        </Link>
      </MaxWidthWrapper>	

      {/* value proposiition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath: 
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 mb-4 rounded-xl bg-gray-900/5 dark:bg-gray-500/15 p-2 ring ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image 
                      alt="product preview"
                      src={'/dashboard-preview.jpg'}
                      width={1364}
                      height={866}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring ring-gray-900/10"
                    />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath: 
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* feature section */}
      <div className="mx-auto max-w-5xl my-32 sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto sm:text-center max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Start chatting in minutes
            </h2>
            <p className="mt-4 text-lg dark:text-gray-500 text-gray-600  ">
              Chatting to your PDF files has never been easier that with Adugu.
            </p>
          </div>
        </div>
        
        {/* steps */}
        <ol className="md:flex pt-4 space-y-4 md:space-y-0 md:space-x-10 mt-20">
          <li className="flex-1">
              <div className="pl-4 py-2 flex flex-col space-y-2 border-l-4 border-zinc-300  md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 mb:pt-4">
                <span className="text-blue-600 text-sm font-medium ">
                  Step 1
                </span>
                <span className="font-bold text-xl">
                  Sign up for an account 
                </span>
                <span className="text-zinc-700 dark:text-gray-500">
                  Either starting out with a free plan or choose our {" "} 
                  <Link 
                    href='/pricing'
                    className="text-blue-700 underline underline-offset-2"
                  >
                    pro plan
                  </Link>
                  .
                </span>
              </div>
          </li>
          <li className="flex-1">
              <div className="pl-4 py-2 flex flex-col space-y-2 border-l-4 border-zinc-300 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 mb:pt-4">
                <span className="text-blue-600 text-sm font-medium ">
                  Step 2
                </span>
                <span className="font-bold text-xl">
                  Upload your PDF file
                </span>
                <span className="text-zinc-700 dark:text-gray-500">
                  We'll process your file and make it ready for you to chat with.
                </span>
              </div>
          </li>
          <li className="flex-1">
              <div className="pl-4 py-2 flex flex-col space-y-2 border-l-4 border-zinc-300 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 mb:pt-4">
                <span className="text-blue-600 text-sm font-medium ">
                  Step 3
                </span>
                <span className="font-bold text-xl">
                  Start asking questions
                </span>
                <span className="text-zinc-700 dark:text-gray-500">
                  It&apos;s that simple. Try out Adugu today - it really takes less than a minute.
                </span>
              </div>
          </li>
        </ol>

        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 mb-4 rounded-xl bg-gray-900/5 p-2 ring ring-inset ring-gray-900/10 dark:bg-gray-500/15 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image 
                    alt="file upload preview"
                    src={'/file-upload-preview.jpg'}
                    width={1419}
                    height={371}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring ring-gray-900/10"
                  />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
