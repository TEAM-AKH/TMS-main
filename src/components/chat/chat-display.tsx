
import * as React from 'react';
import {
  Paperclip,
  Mic,
  Send,
  MoreVertical,
  Phone,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Conversation, Message } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ChatDisplayProps {
  conversation: Conversation | null;
}

export function ChatDisplay({ conversation }: ChatDisplayProps) {
  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a conversation to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={conversation.avatar} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">{conversation.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-6">
        {conversation.messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>

      <Separator />

      <footer className="p-4">
        <div className="relative">
          <Input placeholder="Type a message..." className="pr-28" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
            <Button size="icon" className='ml-2'>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface MessageItemProps {
  message: Message;
}

function MessageItem({ message }: MessageItemProps) {
  const isSender = message.sender === 'You';
  return (
    <div className={cn('flex items-end gap-3', isSender && 'flex-row-reverse')}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.avatar} />
        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'p-3 rounded-lg max-w-xs lg:max-w-md',
          isSender
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}
