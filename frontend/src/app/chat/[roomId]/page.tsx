// frontend/app/chat/[roomId]/page.tsx
import ChatRoom from '../../../components/ChatRoom';

interface ChatPageProps {
  params: {
    roomId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { roomId } = params;

  return <ChatRoom roomId={roomId} />;
}