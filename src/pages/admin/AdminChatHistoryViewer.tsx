import { Card, Spinner, Button } from "react-bootstrap";
import type { User } from "../../types/user";
import { ChatService } from "../../services/ChatService";
import { useQuery } from "@tanstack/react-query";
import { ChatSender } from "../../types/chatMessage";
import Avatar from "../../components/common/Avatar";
import { useEffect, useRef, useState } from "react";

type AdminChatHistoryViewerProps = {
  selectedUser: User;
};

const AdminChatHistoryViewer = ({
  selectedUser,
}: AdminChatHistoryViewerProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const { data: chats, isLoading } = useQuery({
    queryKey: ["users-chats", selectedUser._id],
    queryFn: () => ChatService.getChatHistory(selectedUser._id),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setShowScrollDown(false);
    }
  }, [chats, selectedUser]);

  const onScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollHeight - scrollTop - clientHeight > 100) {
      setShowScrollDown(true);
    } else {
      setShowScrollDown(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setShowScrollDown(false);
    }
  };

  return (
    <Card
      className="d-flex flex-column shadow-sm rounded-3 position-relative"
      style={{ height: "750px" }}
    >
      <Card.Header className="bg-white border-bottom">
        <div>
          <h5 className="mb-0">{selectedUser.name}</h5>
          <small className="text-muted">{selectedUser.email}</small>
        </div>
      </Card.Header>

      <Card.Body
        className="overflow-auto p-4 bg-light"
        style={{ flexGrow: 1 }}
        ref={scrollRef}
        onScroll={onScroll}
      >
        {isLoading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : !chats || chats.length === 0 ? (
          <div className="text-center text-muted mt-5">
            No messages found for this user.
          </div>
        ) : (
          chats.map((msg) => {
            const isUser = msg.role === ChatSender.User;

            return (
              <div
                key={msg._id}
                className={`d-flex mb-3 ${
                  // Swap alignment:
                  isUser ? "justify-content-start" : "justify-content-end"
                }`}
              >
                {isUser && (
                  <div className="me-2">
                    <Avatar name={selectedUser.name} size={36} />
                  </div>
                )}

                <div
                  className={`p-3 rounded shadow-sm ${
                    // Swap colors:
                    isUser
                      ? "bg-white border text-dark"
                      : "bg-primary text-white"
                  }`}
                  style={{
                    maxWidth: "65%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content}
                </div>

                {!isUser && (
                  <div className="ms-2">
                    <Avatar name="Bot" size={36} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </Card.Body>

      {/* Scroll to bottom button */}
      {showScrollDown && (
        <Button
          variant="primary"
          size="sm"
          className="position-absolute"
          style={{
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            padding: "8px 10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
          onClick={scrollToBottom}
          aria-label="Scroll to latest message"
          title="Scroll to bottom"
        >
          <i className="fa-solid fa-arrow-down"></i>{" "}
        </Button>
      )}
    </Card>
  );
};

export default AdminChatHistoryViewer;
