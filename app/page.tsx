"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "@/data/links"
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
import { Plus, Loader2, Pencil, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { collection, getDocs, addDoc, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const linkSchema = z.object({
  title: z.string().trim().min(1, { message: "제목을 입력해주세요." }),
  url: z.string().trim().min(1, { message: "URL을 입력해주세요." }).transform(val => {
    if (!/^https?:\/\//i.test(val)) {
      return `https://${val}`
    }
    return val
  }).refine((val) => {
    try {
      new URL(val)
      return true
    } catch {
      return false
    }
  }, { message: "유효한 URL 형식이 아닙니다." })
})

type LinkFormValues = z.infer<typeof linkSchema>

export default function Page() {
  const [links, setLinks] = useState<Link[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [editingLinkId, setEditingLinkId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: "", url: "" })
  const [editError, setEditError] = useState({ title: "", url: "" })
  const [isUpdating, setIsUpdating] = useState(false)

  const [deletingLink, setDeletingLink] = useState<Link | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchLinks = useCallback(async () => {
    try {
      const q = query(collection(db, "users", "anonymous", "links"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const fetchedLinks: Link[] = []
      querySnapshot.forEach((doc) => {
        fetchedLinks.push({ id: doc.id, ...doc.data() } as Link)
      })
      setLinks(fetchedLinks)
    } catch (error) {
      console.error("Failed to fetch links:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    }
  })

  const onSubmit = async (data: LinkFormValues) => {
    try {
      const now = new Date().toISOString()
      const newLinkData = {
        title: data.title,
        url: data.url,
        clickCount: 0,
        createdAt: now,
        updatedAt: now,
      }

      const docRef = await addDoc(collection(db, "users", "anonymous", "links"), newLinkData)
      
      const newLink: Link = {
        id: docRef.id,
        ...newLinkData
      }

      setLinks([newLink, ...links])
      reset()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to add link:", error)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      reset()
    }
  }

  const handleUpdate = async (linkId: string) => {
    const result = linkSchema.safeParse(editForm)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setEditError({
        title: fieldErrors.title?.[0] || "",
        url: fieldErrors.url?.[0] || "",
      })
      return
    }

    setIsUpdating(true)
    try {
      const now = new Date().toISOString()
      const linkRef = doc(db, "users", "anonymous", "links", linkId)
      await updateDoc(linkRef, {
        title: result.data.title,
        url: result.data.url,
        updatedAt: now
      })

      await fetchLinks()
      setEditingLinkId(null)
    } catch (error) {
      console.error("Failed to update link:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingLink) return
    setIsDeleting(true)
    try {
      const linkRef = doc(db, "users", "anonymous", "links", deletingLink.id)
      await deleteDoc(linkRef)
      setLinks(links.filter(link => link.id !== deletingLink.id))
      setDeletingLink(null)
    } catch (error) {
      console.error("Failed to delete link:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center p-6 sm:p-12 overflow-hidden selection:bg-primary selection:text-primary-foreground">


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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : links.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              등록된 링크가 없습니다.
            </div>
          ) : (
            links.map((link) => {
              if (editingLinkId === link.id) {
                return (
                  <Card key={link.id} className="w-full border-primary/50 bg-background/80 shadow-md">
                    <CardContent className="flex flex-col gap-3 p-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={`edit-title-${link.id}`} className={editError.title ? "text-destructive" : ""}>제목</Label>
                        <Input 
                          id={`edit-title-${link.id}`}
                          value={editForm.title} 
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                          className={editError.title ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        {editError.title && <p className="text-xs font-medium text-destructive">{editError.title}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={`edit-url-${link.id}`} className={editError.url ? "text-destructive" : ""}>URL</Label>
                        <Input 
                          id={`edit-url-${link.id}`}
                          value={editForm.url} 
                          onChange={(e) => setEditForm({...editForm, url: e.target.value})} 
                          className={editError.url ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        {editError.url && <p className="text-xs font-medium text-destructive">{editError.url}</p>}
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingLinkId(null)}>취소</Button>
                        <Button size="sm" onClick={() => handleUpdate(link.id)} disabled={isUpdating}>
                          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          저장
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              
              return (
                <div key={link.id} className="group relative block w-full">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
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
                        <div className="flex-1 px-14 text-center pr-24">
                          <span className="text-[15px] font-semibold tracking-wide text-foreground/90 transition-colors group-hover:text-foreground">
                            {link.title}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                  
                  {/* Action Buttons */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 z-10">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80" 
                      onClick={(e) => {
                        e.preventDefault();
                        setEditForm({ title: link.title, url: link.url });
                        setEditError({ title: "", url: "" });
                        setEditingLinkId(link.id);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground" 
                      onClick={(e) => {
                        e.preventDefault();
                        setDeletingLink(link);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}

          {/* Add Link Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                className="mt-2 w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-xl font-semibold shadow-md hover:shadow-lg"
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>제목</Label>
                    <Input
                      id="title"
                      placeholder="예: 인스타그램"
                      {...register("title")}
                      className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="url" className={errors.url ? "text-destructive" : ""}>URL</Label>
                    <Input
                      id="url"
                      placeholder="예: https://instagram.com/example"
                      {...register("url")}
                      className={errors.url ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.url && <p className="text-sm font-medium text-destructive">{errors.url.message}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    추가하기
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deletingLink} onOpenChange={(open) => !open && setDeletingLink(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
                <DialogDescription>
                  <span className="font-semibold text-foreground">'{deletingLink?.title}'</span> 링크를 삭제합니다.<br />
                  이 작업은 되돌릴 수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 sm:justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setDeletingLink(null)}
                  disabled={isDeleting}
                >
                  취소
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  삭제하기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
