import { dummyLinks } from "@/data/links"
import { dummyUser } from "@/data/user"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative flex min-h-svh flex-col items-center p-6 sm:p-12 overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="z-10 flex w-full max-w-md flex-col gap-8 mt-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {/* Profile Avatar */}
          <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full ring-4 ring-background/50 shadow-xl">
            <img
              src={dummyUser.photoURL}
              alt={`${dummyUser.displayName} Avatar`}
              className="h-full w-full object-cover bg-muted/30"
            />
          </div>
          
          <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl cursor-pointer hover:opacity-80 transition-opacity">
            {dummyUser.displayName}
          </h1>
          <p className="mt-4 text-base font-medium text-muted-foreground sm:text-lg cursor-pointer hover:text-foreground transition-colors">
            {dummyUser.bio}
          </p>
        </div>

        {/* Link List */}
        <div className="flex flex-col gap-4 mt-4">
          {dummyLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
            >
              <Card className="w-full overflow-hidden border-muted/30 bg-background/50 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:bg-background/80 hover:shadow-xl hover:shadow-primary/5 dark:bg-muted/10 dark:hover:bg-muted/20">
                <CardContent className="relative flex min-h-[72px] items-center p-4">
                  {/* Favicon */}
                  <div className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-background/60 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-background dark:bg-background/20 dark:group-hover:bg-background/40">
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=128`}
                      alt={`${link.title} 파비콘`}
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  {/* Title */}
                  <div className="flex-1 px-14 text-center">
                    <span className="text-[15px] font-semibold tracking-wide text-foreground/90 transition-colors group-hover:text-foreground">
                      {link.title}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
