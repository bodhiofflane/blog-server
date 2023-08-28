type User = {
  login: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  firstName?: string;
  lastName?: string;
  avatarURL?: string;
  role?: 'admin' | 'user' | 'moderator' | 'locked';
};

export default User;
