import * as React from "react"
import { Dancing_Script } from 'next/font/google'
import { cn } from "@/lib/utils"
const dancingScript = Dancing_Script({
  weight: ['400', '700'], // Use the desired weights
  subsets: ['latin'],
});
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        dancingScript.className,
        "flex h-[80vh] w-full max-h-500px font-extrabold rounded-md bg-transparent px-4 py-5 text-lg placeholder:text-amber-950   ",
        className
      )}
      style={{
        scrollbarWidth: 'thin', /* For Firefox */
        scrollbarColor: '#D2B48C #F5DEB3', /* Thumb and track color for Firefox */

      }}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
