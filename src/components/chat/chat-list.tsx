
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Search, SquarePen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Conversation } from '@/lib/data';

interface ChatListProps {
  isCollapsed: boolean;
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

export function ChatList({
  isCollapsed,
  conversations,
  selectedConversation,
  setSelectedConversation,
}: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Chats</h2>
            <Button variant="ghost" size="icon">
              <SquarePen className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>
      )}
      <Tabs defaultValue="all" className="flex flex-col flex-grow">
        {!isCollapsed && (
          <TabsList className="mx-4">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="direct" className="flex-1">
              Direct
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex-1">
              Groups
            </TabsTrigger>
          </TabsList>
        )}
        <div className="flex-grow overflow-auto">
          <TabsContent value="all" className="m-0">
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isCollapsed={isCollapsed}
                isSelected={selectedConversation?.id === conv.id}
                onClick={() => setSelectedConversation(conv)}
              />
            ))}
          </TabsContent>
          <TabsContent value="direct" className="m-0">
            {conversations
              .filter((c) => c.type === 'direct')
              .map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isCollapsed={isCollapsed}
                  isSelected={selectedConversation?.id === conv.id}
                  onClick={() => setSelectedConversation(conv)}
                />
              ))}
          </TabsContent>
          <TabsContent value="groups" className="m-0">
            {conversations
              .filter((c) => c.type === 'group')
              .map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isCollapsed={isCollapsed}
                  isSelected={selectedConversation?.id === conv.id}
                  onClick={() => setSelectedConversation(conv)}
                />
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

function ConversationItem({
  conversation,
  isSelected,
  isCollapsed,
  onClick,
}: ConversationItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'w-full h-auto justify-start p-4 rounded-none',
        isSelected && 'bg-accent'
      )}
    >
      <div className="flex items-center gap-4 w-full">
        <Avatar>
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex-grow text-left">
            <p className="font-semibold truncate">{conversation.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage}
            </p>
          </div>
        )}
      </div>
    </Button>
  );
}
