'use client';

import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { User, Sex } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface UserProfileProps {
  user: User | null;
  onSave: (user: User) => void;
}

export function UserProfile({ user, onSave }: UserProfileProps) {
  const [name, setName] = useState(user?.name || '');
  const [weight, setWeight] = useState(user?.weight.toString() || '');
  const [sex, setSex] = useState<Sex>(user?.sex || 'male');
  const [errors, setErrors] = useState<{ name?: string; weight?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; weight?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 0 || weightNum > 300) {
      newErrors.weight = 'Poids invalide (entre 1 et 300 kg)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser: User = {
      id: user?.id || generateId(),
      name: name.trim(),
      weight: weightNum,
      sex,
    };

    onSave(newUser);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-blue-600" />
          <CardTitle>{user ? 'Modifier mon profil' : 'Créer mon profil'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <Input
            label="Poids (kg)"
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            error={errors.weight}
            step="0.1"
            min="1"
            max="300"
          />

          <Select
            label="Sexe"
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            options={[
              { value: 'male', label: 'Homme' },
              { value: 'female', label: 'Femme' },
            ]}
          />

          <Button type="submit" className="w-full" size="lg">
            {user ? 'Mettre à jour' : 'Créer mon profil'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
