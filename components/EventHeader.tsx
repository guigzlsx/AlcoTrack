'use client';

import React from 'react';
import { Copy, Users, Calendar } from 'lucide-react';
import { Event } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface EventHeaderProps {
  event: Event;
  onLeaveEvent: () => void;
}

export function EventHeader({ event, onLeaveEvent }: EventHeaderProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(event.id);
    alert('Code copié !');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">{formatDate(event.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-sm">{event.participants.length} participant(s)</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 px-4 py-2 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Code de l&apos;événement</div>
            <div className="text-xl font-bold text-blue-600">{event.id}</div>
          </div>
          <Button variant="outline" onClick={handleCopyCode}>
            <Copy className="w-5 h-5" />
          </Button>
        </div>

        <Button variant="danger" onClick={onLeaveEvent} className="w-full">
          Quitter l&apos;événement
        </Button>
      </CardContent>
    </Card>
  );
}
