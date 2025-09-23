
import ChatLayout from '@/components/chat/chat-layout';
import { cookies } from 'next/headers';

export default function ChatsPage() {
  const layout = cookies().get('react-resizable:chat-layout');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  
  return (
    <div className="h-[calc(100vh_-_120px)]">
        <ChatLayout defaultLayout={defaultLayout} />
    </div>
  );
}
