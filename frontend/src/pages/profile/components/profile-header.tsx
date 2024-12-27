import { User } from 'lucide-react';
import type { User as UserType } from '../../../types';

interface ProfileHeaderProps {
  user: UserType;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {


  return (
    <div className="flex items-center justify-between mb-8 mx-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.name} className="w-16 h-16 rounded-full" />
          ) : <User className="w-8 h-8 text-primary" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
}