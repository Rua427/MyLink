"use client"

import { useState } from "react"
import { dummyLinks, Link } from "@/data/links"
import { dummyUser } from "@/data/user"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Plus } from "lucide-react"

export default function Page() {
  const [links, setLinks] = useState<Link[]>(dummyLinks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")

  const handleAddLink = () => {
    if (!newLinkTitle || !newLinkUrl) return

    // Ensure url has https:// if no protocol is given
    let finalUrl = newLinkUrl
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`
    }

    const newLink: Link = {
      id: `link-${Date.now()}`,
      title: newLinkTitle,
      url: finalUrl,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setLinks([newLink, ...links])
    setNewLinkTitle("")
    setNewLinkUrl("")
    setIsDialogOpen(false)
  }

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
          {links.map((link) => (
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

          {/* Add Link Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="mt-2 w-full h-14 border-dashed border-2 border-muted-foreground/30 bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-foreground/30 transition-all rounded-xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                새 링크 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>새 링크 추가</DialogTitle>
                <DialogDescription>
                  추가할 링크의 제목과 URL을 입력해주세요.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    placeholder="예: 인스타그램"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="예: https://instagram.com/example"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddLink} disabled={!newLinkTitle || !newLinkUrl}>
                  추가하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
