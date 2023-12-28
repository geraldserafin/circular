"use client"

import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Workspace } from "@prisma/client";
import { Grid2X2, Layers, LucideIcon, PenSquare, ScanText, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";


function NavItem(
  { href, label, Icon, active = false }: { href: string, label: string, Icon: LucideIcon, active?: boolean }
) {
  return (
    <Button className="w-full" size="sm" variant={active ? "outline" : "ghost"} asChild>
      <a href={href}>
        <p className="w-full text-left flex gap-2 items-center">
          <span>
            <Icon size={16} />
          </span>
          {label}
        </p>
      </a>
    </Button>
  );
}

export default function LayoutPanels({ children, workspace }: { children: React.ReactNode, workspace: Workspace }) {
  const user = useUser();
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel maxSize={12} defaultSize={12}>
        <aside className="p-2 flex flex-col gap-2">
          <div className="flex gap-2 items-center font-semibold ml-1 -mr-1 text-sm">
            <div className="flex gap-2 items-center flex-1">
              <div className="bg-primary rounded p-[1px]">
                {workspace.name.slice(0, 2).toLocaleUpperCase()}
              </div>
              {workspace.name}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="scale-50">
                  <AvatarImage src={user.user?.picture!} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuItem>
                  <a href="/api/auth/logout">Log out</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1 gap-2 w-full justify-start">
              <PenSquare size={16} />
              New Issue
            </Button>
            <Button size="icon" variant="secondary" className="h-8 " >
              <Search size={16} />
            </Button>
          </div>

          <nav className="flex flex-col gap-2 ">
            <NavItem href="/my-issues" label="My Issues" Icon={ScanText} active />
          </nav>


          <div className="text-sm flex flex-col gap-1 mt-4">
            <span className="text-xs text-muted-foreground">Your Projects</span>
            <Accordion type="multiple">
              <AccordionItem className="border-none" value="item-1">
                <AccordionTrigger className="hover:no-underline hover:bg-secondary hover:text-foreground h-8 rounded flex">
                  <div className="flex gap-2 items-center px-2">
                    <div className="bg-red-600 rounded text-foreground">
                      <Users size={14} />
                    </div>
                    Project 1
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs">
                  <Button size="sm" variant="ghost" className="w-full justify-start gap-2 pl-8">
                    <Grid2X2 size={14} />
                    Issues
                  </Button>
                  <div className="flex gap-2 w-full pl-8">
                    <Separator orientation="vertical" />
                    <div className="flex flex-col flex-1">
                      <Button variant="ghost" className="hover:bg-secondary w-full h-8 justify-start gap-2">
                        Active
                      </Button>

                      <Button variant="ghost" className="hover:bg-secondary w-full h-8 justify-start gap-2">
                        Backlog
                      </Button>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="w-full justify-start gap-2 pl-8">
                    <Grid2X2 size={14} />
                    Sprints
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={88}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}