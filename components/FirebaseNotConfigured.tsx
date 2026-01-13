'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function FirebaseNotConfigured() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 flex items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="w-6 h-6" />
            <CardTitle>Configuration Firebase Requise</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            AlcoTrack nécessite Firebase pour fonctionner et permettre le partage d&apos;événements entre utilisateurs.
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">📋 Étapes rapides :</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Créez un projet sur <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Firebase Console</a></li>
              <li>Activez &quot;Realtime Database&quot;</li>
              <li>Copiez vos clés de configuration</li>
              <li>Créez un fichier <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
              <li>Redémarrez le serveur avec <code className="bg-blue-100 px-1 rounded">npm run dev</code></li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Guide complet :</strong> Consultez le fichier <code className="bg-gray-200 px-1 rounded">FIREBASE_SETUP.md</code> à la racine du projet.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Temps estimé :</strong> 10-15 minutes
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-500">
              💡 <strong>Pourquoi Firebase ?</strong> Firebase permet à vos amis de rejoindre vos événements et de voir le classement en temps réel, même depuis différents appareils.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
