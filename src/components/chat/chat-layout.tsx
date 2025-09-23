
'use client';

import * as React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { ChatList } from '@/components/chat/chat-list';
import { ChatDisplay } from '@/components/chat/chat-display';
import { conversations } from '@/lib/data';
import type { Conversation } from '@/lib/data';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
}

export default function ChatLayout({ defaultLayout = [320, 680] }: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selectedConversation, setSelectedConversation] =
    React.useState<Conversation | null>(conversations[0]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable:chat-layout=${JSON.stringify(sizes)}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={true}
        minSize={20}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable:chat-layout=${JSON.stringify([0, 100])}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable:chat-layout=${JSON.stringify(defaultLayout)}`;
        }}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
        )}
      >
        <ChatList
          isCollapsed={isCollapsed}
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <ChatDisplay
          conversation={
            selectedConversation
          }
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
