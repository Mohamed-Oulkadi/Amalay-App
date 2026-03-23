import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp, MessageCircle, Send } from 'lucide-react';
import { PageWrapper } from '@/shared/components/layout/PageWrapper';
import { mockPosts } from '@/shared/lib/mockData';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

type CommentItem = {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
};

const initialCommentsByPost: Record<string, CommentItem[]> = {
  p1: [
    { id: 'c1', authorName: 'Lina', text: 'Magnifique spot, merci pour le partage !', createdAt: '2026-03-20' },
    { id: 'c2', authorName: 'Yassine', text: 'Je confirme, endroit incroyable.', createdAt: '2026-03-21' },
  ],
  p2: [
    { id: 'c3', authorName: 'Nadia', text: 'Le souk est top pour l artisanat.', createdAt: '2026-03-19' },
  ],
};

export default function CommunityFeedPage() {
  const currentUser = useAuthStore((s) => s.user);

  const [myVoteByPost, setMyVoteByPost] = useState<Record<string, -1 | 0 | 1>>({});
  const [scoreByPost, setScoreByPost] = useState<Record<string, number>>(() =>
    Object.fromEntries(mockPosts.map((post) => [post.id, post.likesCount]))
  );

  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommentItem[]>>(() => {
    const values = Object.fromEntries(mockPosts.map((post) => [post.id, initialCommentsByPost[post.id] ?? []]));
    return values;
  });

  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newCommentByPost, setNewCommentByPost] = useState<Record<string, string>>({});

  const commentCountByPost = useMemo(
    () => Object.fromEntries(Object.entries(commentsByPost).map(([postId, comments]) => [postId, comments.length])),
    [commentsByPost]
  );

  function vote(postId: string, direction: -1 | 1) {
    setMyVoteByPost((prev) => {
      const previousVote = prev[postId] ?? 0;
      const nextVote = previousVote === direction ? 0 : direction;
      const delta = nextVote - previousVote;

      setScoreByPost((scores) => ({
        ...scores,
        [postId]: (scores[postId] ?? 0) + delta,
      }));

      return { ...prev, [postId]: nextVote };
    });
  }

  function toggleComments(postId: string) {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }

  function addComment(postId: string, e: FormEvent) {
    e.preventDefault();

    const text = (newCommentByPost[postId] ?? '').trim();
    if (!text) return;

    const authorName = currentUser?.name || 'Vous';
    const createdAt = new Date().toISOString().slice(0, 10);

    const comment: CommentItem = {
      id: `${postId}-${Date.now()}`,
      authorName,
      text,
      createdAt,
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), comment],
    }));

    setNewCommentByPost((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  }

  return (
    <PageWrapper className="px-4 pt-14">
      <div className="py-4">
        <h1 className="text-display">Communauté</h1>
        <p className="text-body">Histoires et partages de voyageurs</p>
      </div>

      <div className="space-y-4">
        {mockPosts.map((post, i) => {
          const postComments = commentsByPost[post.id] ?? [];
          const myVote = myVoteByPost[post.id] ?? 0;
          const isExpanded = Boolean(expandedComments[post.id]);

          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {post.media[0] && <img src={post.media[0]} alt="" className="h-44 w-full object-cover" loading="lazy" />}

              <div className="p-4">
                <div className="mb-2 flex items-center gap-2.5">
                  <img src={post.authorAvatar} alt={post.authorName} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <span className="text-sm font-semibold">{post.authorName}</span>
                    <p className="text-caption">{post.placeName} · {post.createdAt}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{post.content}</p>

                <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
                  <div className="inline-flex items-center rounded-lg border border-border bg-background p-0.5">
                    <button
                      type="button"
                      onClick={() => vote(post.id, 1)}
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                        myVote === 1 ? 'bg-primary-light text-primary' : 'text-muted-foreground hover:bg-muted'
                      )}
                      aria-label="Upvote"
                    >
                      <ArrowBigUp className={cn('h-4 w-4', myVote === 1 && 'fill-primary')} />
                    </button>
                    <span className="min-w-10 text-center text-xs font-semibold">
                      {scoreByPost[post.id] ?? post.likesCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => vote(post.id, -1)}
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                        myVote === -1 ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground hover:bg-muted'
                      )}
                      aria-label="Downvote"
                    >
                      <ArrowBigDown className={cn('h-4 w-4', myVote === -1 && 'fill-destructive')} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <MessageCircle className="h-4 w-4" /> {commentCountByPost[post.id] ?? post.commentsCount}
                  </button>
                </div>

                <form onSubmit={(e) => addComment(post.id, e)} className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={newCommentByPost[post.id] ?? ''}
                    onChange={(e) => setNewCommentByPost((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Ajouter un commentaire..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button type="submit" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {isExpanded && (
                  <div className="mt-3 space-y-2 rounded-xl border border-border bg-background p-3">
                    {postComments.length > 0 ? (
                      postComments.map((comment) => (
                        <div key={comment.id} className="rounded-lg bg-card p-2.5">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold">{comment.authorName}</p>
                            <p className="text-[11px] text-muted-foreground">{comment.createdAt}</p>
                          </div>
                          <p className="text-xs text-foreground/90">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Aucun commentaire pour le moment.</p>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </PageWrapper>
  );
}
