import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { ChatService } from "../../services/ChatService";
import type { User } from "../../types/user";
import "./AdminChatViewer.css";
import AdminChatHistoryViewer from "./AdminChatHistoryViewer";
import Avatar from "../../components/common/Avatar";

export interface UserChatSummary {
  _id: string;
  lastMessage: string;
  lastTimestamp: string;
  user?: User;
}

export const AdminChatViewer = () => {
  const [selectedUser, setSelectedUser] = useState<User>();

  const { data: allUserChats, isLoading } = useQuery({
    queryKey: ["users-chat-summary"],
    queryFn: () => ChatService.getUserSummary(),
  });

  return (
    <Container fluid className="admin-chat-container p-3">
      <Row className="admin-chat-wrapper shadow rounded-3">
        {/* Sidebar */}
        <Col
          md={4}
          className="admin-chat-sidebar border-end"
          style={{ overflowY: "auto", maxHeight: "750px" }}
        >
          <h5 className="px-3 pt-3 mb-3 fw-bold">Recent Chats</h5>

          {isLoading ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
              <p className="text-muted mt-2">Loading users...</p>
            </div>
          ) : allUserChats?.length === 0 ? (
            <p className="text-muted text-center">No users found.</p>
          ) : (
            <ListGroup variant="flush">
              {allUserChats?.map((u) => {
                const isActive = u.user?._id === selectedUser?._id;
                return (
                  <ListGroup.Item
                    action
                    key={u._id}
                    onClick={() =>
                      setSelectedUser((p) => (p == u.user ? undefined : u.user))
                    }
                    className={`admin-chat-user-item ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <div className="d-flex align-items-start gap-2">
                      <Avatar name={u.user!.name} />

                      <div className="flex-grow-1">
                        <div className="fw-semibold">{u.user?.name}</div>
                        <div className="text-muted small text-truncate">
                          {u.lastMessage.length > 80
                            ? u.lastMessage.slice(0, 50) + "..."
                            : u.lastMessage}
                        </div>
                        <div className="small text-secondary">
                          {new Date(u.lastTimestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>

        {/* Chat Panel */}
        <Col md={8} className="admin-chat-main">
          <div className="h-100 d-flex flex-column">
            {selectedUser ? (
              <AdminChatHistoryViewer selectedUser={selectedUser} />
            ) : (
              <div className="text-center text-muted mt-5">
                👈 Select a user from the sidebar to view their messages.
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
