"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Clock, Send, MessageCircle, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/services";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface CommentsSectionProps {
  requestId: string;
}

const MOCK_COMMENTS: Comment[] = [
  { id: "c1", author: "Sarah Chen", content: "I've worked on similar issues before. The key is to properly structure your useEffect dependencies.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: "c2", author: "Mike Johnson", content: "Have you tried using useReducer instead? It might help with the complex state transitions.", timestamp: new Date(Date.now() - 1000 * 60 * 60) },
];

export function CommentsSection({ requestId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      content: newComment.trim(),
      timestamp: new Date(),
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        {/* Add comment */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            Y
          </div>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[60px] text-sm rounded-xl border-slate-200 resize-none"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Send className="h-3 w-3" /> Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4 pt-2">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                    <span className="text-[9px] text-slate-400">{formatDate(comment.timestamp, "relative")}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] text-slate-400 hover:text-primary flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" /> Like
                    </button>
                    <button className="text-[10px] text-slate-400 hover:text-primary">Reply</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
