import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { ChatService } from "../../services/ChatService";
import { ChatSender, type ChatMessage } from "../../types/chatMessage";
import "./ChatWidget.css";

const ChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [predefinedQuestions, setPredefinedQuestions] = useState([
    "What is your return policy?",
    "Do you offer free shipping?",
    "How can I track my order?",
  ]);

  const PREDEFINED_FAQS: { [question: string]: string } = {
    "What is your return policy?":
      "You can return items within 30 days of purchase. Please keep the receipt and ensure the item is unused.",
    "Do you offer free shipping?":
      "Yes, we offer free shipping on orders over $50!",
    "How can I track my order?":
      "To track your order:\n\n1. Check your email for a tracking link.\n2. Or log into your account and view your order history.",
  };

  const scrollToBottom = () => {
    const el = document.getElementById("chat-body");
    if (el) el.scrollTop = el.scrollHeight;
  };

  const addMessage = (from: ChatSender, text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: from, content: text, userId: user?._id || "" },
    ]);
    setTimeout(scrollToBottom, 100);
  };

  const loadChatHistory = async () => {
    if (!user?._id) return;
    try {
      const history = await ChatService.getChatHistory(user._id);
      setMessages(history);
      setTimeout(scrollToBottom, 100);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  };

  const handlePredefinedClick = async (faq: { question: string }) => {
    const answer = PREDEFINED_FAQS[faq.question];
    if (!answer) return;

    // Remove clicked question from the list
    setPredefinedQuestions((prev) => prev.filter((q) => q !== faq.question));

    addMessage(ChatSender.User, faq.question);
    setTimeout(() => {
      addMessage(ChatSender.Bot, answer);
    }, 300); // Simulate slight delay
  };

  const handleMessageSend = async (question: string) => {
    addMessage(ChatSender.User, question);
    setInput("");
    setIsTyping(true);

    try {
      await ChatService.askChatBot(user?._id!, question);
      setTimeout(async () => {
        const updatedHistory = await ChatService.getChatHistory(user?._id!);
        setMessages(updatedHistory);
        setIsTyping(false);
        scrollToBottom();
      }, 1000);
    } catch (err) {
      setIsTyping(false);
      addMessage(
        ChatSender.Bot,
        "Sorry, something went wrong. Please try again."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;
    await handleMessageSend(question);
  };

  useEffect(() => {
    if (isOpen && user?._id) {
      loadChatHistory();
    } else {
      setMessages([]); // reset if anonymous
    }
  }, [isOpen, user]);

  return (
    <div
      className="chat-widget position-fixed bottom-0 end-0 m-3"
      style={{ zIndex: 1050 }}
    >
      {isOpen && (
        <Card
          className="shadow-lg d-flex flex-column"
          style={{ width: "350px", height: "500px" }}
        >
          <Card.Header className="navbar-blue-gradient text-white d-flex justify-content-between align-items-center py-2 px-3">
            <strong>HelpBot 🤖</strong>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </Card.Header>

          <Card.Body
            id="chat-body"
            className="flex-grow-1 overflow-auto px-3 py-2 bg-light"
          >
            {!user && predefinedQuestions.length > 0 && (
              <>
                <p className="text-muted">Try one of these questions:</p>
                <div className="d-flex flex-column gap-2 mb-3">
                  {predefinedQuestions.map((question, i) => (
                    <Button
                      key={i}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handlePredefinedClick({ question })}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.role === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                style={{
                  whiteSpace: msg.role != "user" ? "pre-wrap" : "",
                }}
              >
                <div
                  className={`chat-bubble px-3 py-2 rounded ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="d-flex justify-content-start mb-2">
                <div className="chat-bubble bg-white border px-3 py-2 rounded">
                  <Spinner animation="grow" size="sm" /> Typing...
                </div>
              </div>
            )}
          </Card.Body>

          <Card.Footer className="p-2 bg-white">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                {!user && (
                  <div className="text-muted small px-2">
                    Please log in to start a full conversation.
                  </div>
                )}
                {user && (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!input.trim()}
                    >
                      Send
                    </Button>
                  </>
                )}
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}

      {!isOpen && (
        <Button
          variant="primary"
          className="rounded-circle shadow"
          style={{ width: "56px", height: "56px" }}
          onClick={() => setIsOpen(true)}
        >
          💬
        </Button>
      )}
    </div>
  );
};

export default ChatWidget;
